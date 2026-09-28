import React from 'react';
import {
  Flame,
  Calendar,
  Zap,
  CheckCircle2,
  Target,
  Compass,
  Award,
  ShieldCheck,
  Crosshair,
  Timer,
  BookOpen,
  FileCheck,
  Sparkles,
  Hourglass,
  GraduationCap,
  Crown,
  Layers,
  Sigma,
  Bookmark,
  Trophy,
  Lock,
} from 'lucide-react';
import { BadgeTier } from '../../types';

interface BadgeInsigniaProps {
  iconName: string;
  tier: BadgeTier;
  isUnlocked: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export const BadgeInsignia: React.FC<BadgeInsigniaProps> = ({
  iconName,
  tier,
  isUnlocked,
  size = 'md',
  className = '',
}) => {
  const renderIcon = () => {
    switch (iconName) {
      case 'Flame':
        return <Flame className="w-full h-full" />;
      case 'Calendar':
        return <Calendar className="w-full h-full" />;
      case 'Zap':
        return <Zap className="w-full h-full" />;
      case 'CheckCircle2':
        return <CheckCircle2 className="w-full h-full" />;
      case 'Target':
        return <Target className="w-full h-full" />;
      case 'Compass':
        return <Compass className="w-full h-full" />;
      case 'Award':
        return <Award className="w-full h-full" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-full h-full" />;
      case 'Crosshair':
        return <Crosshair className="w-full h-full" />;
      case 'Timer':
        return <Timer className="w-full h-full" />;
      case 'BookOpen':
        return <BookOpen className="w-full h-full" />;
      case 'FileCheck':
        return <FileCheck className="w-full h-full" />;
      case 'Sparkles':
        return <Sparkles className="w-full h-full" />;
      case 'Hourglass':
        return <Hourglass className="w-full h-full" />;
      case 'GraduationCap':
        return <GraduationCap className="w-full h-full" />;
      case 'Crown':
        return <Crown className="w-full h-full" />;
      case 'Layers':
        return <Layers className="w-full h-full" />;
      case 'Sigma':
        return <Sigma className="w-full h-full" />;
      case 'Bookmark':
        return <Bookmark className="w-full h-full" />;
      case 'Trophy':
        return <Trophy className="w-full h-full" />;
      default:
        return <Award className="w-full h-full" />;
    }
  };

  const sizeStyles = {
    sm: 'w-7 h-7 p-1.5 rounded-lg text-xs',
    md: 'w-10 h-10 p-2.5 rounded-xl text-sm',
    lg: 'w-14 h-14 p-3.5 rounded-2xl text-base',
    xl: 'w-20 h-20 p-5 rounded-3xl text-xl',
  };

  // Apple-style restrained metallic/neutral tier styles (minimal, elegant, crisp)
  const getTierClasses = () => {
    if (!isUnlocked) {
      return 'bg-zinc-100 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-800 text-zinc-400 dark:text-zinc-500';
    }

    switch (tier) {
      case 'bronze':
        return 'bg-amber-50/80 dark:bg-amber-950/30 border border-amber-200/80 dark:border-amber-800/60 text-amber-700 dark:text-amber-300';
      case 'silver':
        return 'bg-zinc-100/90 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 text-zinc-700 dark:text-zinc-200';
      case 'gold':
        return 'bg-amber-100/70 dark:bg-amber-900/30 border border-amber-300 dark:border-amber-700/80 text-amber-800 dark:text-amber-200';
      case 'platinum':
        return 'bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800/80 text-indigo-700 dark:text-indigo-300';
      default:
        return 'bg-zinc-100 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 text-zinc-700 dark:text-zinc-200';
    }
  };

  return (
    <div
      className={`relative inline-flex items-center justify-center transition-all shrink-0 ${
        sizeStyles[size]
      } ${getTierClasses()} ${className}`}
    >
      {renderIcon()}
      {!isUnlocked && size !== 'sm' && (
        <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-zinc-200 dark:bg-zinc-700 border border-zinc-300 dark:border-zinc-600 flex items-center justify-center text-zinc-600 dark:text-zinc-300 shadow-xs">
          <Lock className="w-2.5 h-2.5" />
        </div>
      )}
    </div>
  );
};
