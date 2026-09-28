import React, { useState, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { NCERT_BOOKS_DATA, getNcertBookByGrade, NcertChapterPdf } from '../../data/ncertBooksData';
import { GradeLevel } from '../../types';
import {
  FileText,
  ExternalLink,
  Download,
  Maximize2,
  Minimize2,
  ZoomIn,
  ZoomOut,
  ChevronLeft,
  ChevronRight,
  BookOpen,
  ArrowLeft,
  Search,
  CheckCircle2,
  AlertCircle,
  Sparkles,
} from 'lucide-react';

export const NcertPdfView: React.FC = () => {
  const {
    profile,
    setCurrentView,
    setSelectedChapterId,
    playSound,
  } = useApp();

  const [selectedGrade, setSelectedGrade] = useState<GradeLevel>(profile.grade);
  const [selectedChapter, setSelectedChapter] = useState<NcertChapterPdf | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [zoomLevel, setZoomLevel] = useState<number>(100);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const viewerContainerRef = useRef<HTMLDivElement>(null);

  const currentBook = getNcertBookByGrade(selectedGrade);
  const chapters = currentBook?.chapters || [];

  const filteredChapters = searchQuery.trim()
    ? chapters.filter(
        ch =>
          ch.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          ch.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
          ch.keyTopics.some(t => t.toLowerCase().includes(searchQuery.toLowerCase())) ||
          (ch.hindiTitle && ch.hindiTitle.includes(searchQuery))
      )
    : chapters;

  const handleOpenPdf = (ch: NcertChapterPdf) => {
    playSound('click');
    setSelectedChapter(ch);
    setCurrentPage(1);
    setZoomLevel(100);
  };

  const handleToggleFullscreen = () => {
    playSound('click');
    if (!viewerContainerRef.current) return;

    if (!document.fullscreenElement) {
      viewerContainerRef.current.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  const handleStudyInMathverse = (chapterNumber: number) => {
    playSound('click');
    // Map to chapter id convention: c{grade}_ch{number}
    const targetChapterId = `c${selectedGrade}_ch${chapterNumber}`;
    setSelectedChapterId(targetChapterId);
    setCurrentView('learn');
  };

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-150 pb-16">
      {/* 1. Page Header */}
      <div className="pt-2 pb-1 border-b border-zinc-200 dark:border-zinc-800 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
        <div>
          <span className="text-xs font-medium uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
            Official Textbooks · National Council of Educational Research and Training
          </span>
          <h1 className="text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100 mt-1">
            NCERT PDFs
          </h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
            Read and reference the authentic, official NCERT chapter textbooks for Classes 5–10.
          </p>
        </div>

        {selectedChapter && (
          <button
            onClick={() => {
              playSound('click');
              setSelectedChapter(null);
            }}
            className="inline-flex items-center gap-1.5 text-xs font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>All Chapters</span>
          </button>
        )}
      </div>

      {/* 2. Main View: Selection Mode vs Embedded Viewer Mode */}
      {!selectedChapter ? (
        <div className="space-y-6">
          {/* Class Selector Segmented Tabs */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="inline-flex items-center gap-1 p-1 bg-zinc-100 dark:bg-zinc-800/80 rounded-xl border border-zinc-200/60 dark:border-zinc-800">
              {([5, 6, 7, 8, 9, 10] as GradeLevel[]).map(g => {
                const isSelected = selectedGrade === g;
                return (
                  <button
                    key={g}
                    onClick={() => {
                      playSound('click');
                      setSelectedGrade(g);
                    }}
                    className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                      isSelected
                        ? 'bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 shadow-xs'
                        : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200'
                    }`}
                  >
                    Class {g}
                  </button>
                );
              })}
            </div>

            {/* Search Filter */}
            <div className="relative w-full sm:w-72">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder={`Search Class ${selectedGrade} chapters...`}
                className="w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl pl-9 pr-3 py-1.5 text-xs text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-600 outline-none focus:border-zinc-400 dark:focus:border-zinc-600 transition-colors"
              />
            </div>
          </div>

          {/* Book Metadata Banner */}
          <div className="p-5 bg-white dark:bg-zinc-900 border border-zinc-200/90 dark:border-zinc-800 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
            <div>
              <span className="text-[11px] font-medium uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                Official Textbook
              </span>
              <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mt-0.5">
                {currentBook.bookTitle} {currentBook.hindiTitle ? `(${currentBook.hindiTitle})` : ''}
              </h2>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                {currentBook.publicationYear} · NCERT Code: <span className="font-mono">{currentBook.bookCode}</span>
              </p>
            </div>

            <div className="text-xs text-zinc-500 dark:text-zinc-400 flex items-center gap-2">
              <span>{chapters.length} Official Chapters</span>
              <span aria-hidden="true">·</span>
              <span className="text-emerald-600 dark:text-emerald-400 font-medium">Verified Official PDFs</span>
            </div>
          </div>

          {/* Chapter Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredChapters.map(ch => (
              <div
                key={ch.chapterNumber}
                className="p-5 bg-white dark:bg-zinc-900 border border-zinc-200/90 dark:border-zinc-800 rounded-xl hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors flex flex-col justify-between space-y-4 shadow-xs"
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-zinc-400 dark:text-zinc-500 mb-1">
                    <span>Chapter {ch.chapterNumber}</span>
                    <span className="font-mono text-[10px] uppercase">{ch.pdfCode}.pdf</span>
                  </div>

                  <h3 className="font-semibold text-base text-zinc-900 dark:text-zinc-100">
                    {ch.title}
                  </h3>
                  {ch.hindiTitle && (
                    <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-0.5">
                      {ch.hindiTitle}
                    </p>
                  )}

                  <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-2 line-clamp-2 leading-relaxed">
                    {ch.summary}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {ch.keyTopics.slice(0, 2).map((tp, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400"
                      >
                        {tp}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-zinc-100 dark:border-zinc-800/80 flex items-center justify-between gap-2">
                  <span className="text-xs text-zinc-400 dark:text-zinc-500 tabular-nums">
                    {ch.pageCount} pages
                  </span>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleStudyInMathverse(ch.chapterNumber)}
                      className="px-2.5 py-1 rounded-lg text-xs font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
                      title="Study in MATHVERSE interactive lesson"
                    >
                      Study
                    </button>
                    <button
                      onClick={() => handleOpenPdf(ch)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 dark:bg-zinc-100 dark:hover:bg-white text-white dark:text-zinc-950 text-xs font-medium transition-colors cursor-pointer shadow-xs"
                    >
                      <FileText className="w-3.5 h-3.5" />
                      <span>Open PDF</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* Embedded PDF Viewer Mode */
        <div
          ref={viewerContainerRef}
          className={`bg-white dark:bg-zinc-900 border border-zinc-200/90 dark:border-zinc-800 rounded-2xl overflow-hidden shadow-xs space-y-0 ${
            isFullscreen ? 'fixed inset-0 z-50 rounded-none h-screen' : ''
          }`}
        >
          {/* Viewer Toolbar */}
          <div className="p-3 sm:p-4 bg-zinc-50 dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  playSound('click');
                  setSelectedChapter(null);
                }}
                className="p-1.5 rounded-lg hover:bg-zinc-200 dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-400 transition-colors cursor-pointer"
                title="Back to chapter list"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>

              <div>
                <div className="flex items-center gap-2">
                  <h2 className="font-semibold text-sm sm:text-base text-zinc-900 dark:text-zinc-100">
                    Class {selectedGrade} · Chapter {selectedChapter.chapterNumber}: {selectedChapter.title}
                  </h2>
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-zinc-200 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400">
                    {selectedChapter.pdfCode}
                  </span>
                </div>
                <p className="text-[11px] text-zinc-400 dark:text-zinc-500">
                  Official NCERT Source: <span className="font-mono text-[10px]">{selectedChapter.officialPdfUrl}</span>
                </p>
              </div>
            </div>

            {/* Viewer Controls */}
            <div className="flex items-center gap-1.5 sm:gap-2">
              {/* Zoom Controls */}
              <div className="flex items-center bg-zinc-100 dark:bg-zinc-800 rounded-lg p-0.5 border border-zinc-200 dark:border-zinc-700">
                <button
                  onClick={() => {
                    playSound('click');
                    setZoomLevel(prev => Math.max(60, prev - 15));
                  }}
                  className="p-1 text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 cursor-pointer"
                  title="Zoom Out"
                >
                  <ZoomOut className="w-3.5 h-3.5" />
                </button>
                <span className="text-[11px] font-medium px-2 text-zinc-700 dark:text-zinc-300 tabular-nums">
                  {zoomLevel}%
                </span>
                <button
                  onClick={() => {
                    playSound('click');
                    setZoomLevel(prev => Math.min(180, prev + 15));
                  }}
                  className="p-1 text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 cursor-pointer"
                  title="Zoom In"
                >
                  <ZoomIn className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Page Navigator simulation */}
              <div className="flex items-center bg-zinc-100 dark:bg-zinc-800 rounded-lg p-0.5 border border-zinc-200 dark:border-zinc-700 text-[11px]">
                <button
                  onClick={() => {
                    playSound('click');
                    setCurrentPage(p => Math.max(1, p - 1));
                  }}
                  disabled={currentPage <= 1}
                  className="p-1 text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 disabled:opacity-40 cursor-pointer"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                </button>
                <span className="px-2 font-medium text-zinc-700 dark:text-zinc-300 tabular-nums">
                  Page {currentPage} / {selectedChapter.pageCount}
                </span>
                <button
                  onClick={() => {
                    playSound('click');
                    setCurrentPage(p => Math.min(selectedChapter.pageCount, p + 1));
                  }}
                  disabled={currentPage >= selectedChapter.pageCount}
                  className="p-1 text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 disabled:opacity-40 cursor-pointer"
                >
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Study in MATHVERSE Button */}
              <button
                onClick={() => handleStudyInMathverse(selectedChapter.chapterNumber)}
                className="px-3 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 dark:bg-zinc-100 dark:hover:bg-white text-white dark:text-zinc-950 text-xs font-medium transition-colors cursor-pointer flex items-center gap-1.5 shadow-xs"
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Study in MATHVERSE</span>
              </button>

              {/* Open in New Tab */}
              <a
                href={selectedChapter.officialPdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 rounded-lg border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-400 transition-colors inline-flex items-center"
                title="Open official NCERT PDF in new tab"
              >
                <ExternalLink className="w-4 h-4" />
              </a>

              {/* Fullscreen Toggle */}
              <button
                onClick={handleToggleFullscreen}
                className="p-1.5 rounded-lg border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-400 transition-colors cursor-pointer"
                title="Toggle Fullscreen"
              >
                {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Embedded PDF View Body */}
          <div className="relative bg-zinc-100 dark:bg-zinc-950 flex flex-col items-center justify-center p-2 sm:p-4 min-h-[560px] max-h-[calc(100vh-14rem)] overflow-auto">
            {/* Embedded Iframe / Object */}
            <div
              className="w-full max-w-4xl bg-white shadow-md rounded-lg overflow-hidden transition-transform duration-150"
              style={{ transform: `scale(${zoomLevel / 100})`, transformOrigin: 'top center' }}
            >
              <object
                data={`${selectedChapter.officialPdfUrl}#page=${currentPage}&zoom=${zoomLevel}`}
                type="application/pdf"
                className="w-full h-[640px] border-0"
              >
                {/* Fallback if browser blocks third-party iframe/object embedding */}
                <div className="p-8 sm:p-12 text-center space-y-4 max-w-lg mx-auto">
                  <div className="w-12 h-12 rounded-2xl bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 flex items-center justify-center mx-auto">
                    <FileText className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
                      Official NCERT Chapter PDF
                    </h3>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 leading-relaxed">
                      {selectedChapter.title} ({selectedChapter.pdfCode}.pdf) is hosted directly on the National Council of Educational Research and Training repository.
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                    <a
                      href={selectedChapter.officialPdfUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white dark:bg-zinc-100 dark:text-zinc-950 font-medium text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span>Open in Official Viewer</span>
                    </a>
                    <button
                      onClick={() => handleStudyInMathverse(selectedChapter.chapterNumber)}
                      className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-200 font-medium text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
                    >
                      <BookOpen className="w-4 h-4" />
                      <span>Study in MATHVERSE</span>
                    </button>
                  </div>
                </div>
              </object>
            </div>
          </div>

          {/* PDF Chapter Context Footer */}
          <div className="p-4 bg-white dark:bg-zinc-900 border-t border-zinc-200 dark:border-zinc-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-zinc-500 dark:text-zinc-400">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>Official 2026–27 CBSE/NCERT curriculum textbook text.</span>
            </div>

            <div className="flex items-center gap-4">
              <a
                href={selectedChapter.officialPdfUrl}
                download={`${selectedChapter.pdfCode}.pdf`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download Chapter PDF</span>
              </a>
              <button
                onClick={() => handleStudyInMathverse(selectedChapter.chapterNumber)}
                className="font-medium text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
              >
                Switch to Interactive Lesson →
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
