import React from 'react';
import {
  Compass,
  Zap,
  Sparkles,
  Sigma,
  ShieldCheck,
  Award,
  Flame,
  Star,
  Crown,
  Trophy,
} from 'lucide-react';

interface RankBadgeIconProps {
  iconName: string;
  level: number;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  showGlow?: boolean;
}

export const RankBadgeIcon: React.FC<RankBadgeIconProps> = ({
  iconName,
  level,
  size = 'md',
  className = '',
  showGlow = false,
}) => {
  const getIcon = () => {
    switch (iconName) {
      case 'Compass':
        return <Compass className="w-full h-full" />;
      case 'Zap':
        return <Zap className="w-full h-full fill-current" />;
      case 'Sparkles':
        return <Sparkles className="w-full h-full" />;
      case 'Sigma':
        return <Sigma className="w-full h-full" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-full h-full" />;
      case 'Award':
        return <Award className="w-full h-full" />;
      case 'Flame':
        return <Flame className="w-full h-full fill-current" />;
      case 'Star':
        return <Star className="w-full h-full fill-current" />;
      case 'Crown':
        return <Crown className="w-full h-full fill-current" />;
      case 'Trophy':
        return <Trophy className="w-full h-full fill-current" />;
      default:
        return <Award className="w-full h-full" />;
    }
  };

  const sizeClasses = {
    sm: 'w-6 h-6 p-1',
    md: 'w-8 h-8 p-1.5',
    lg: 'w-12 h-12 p-2.5',
    xl: 'w-16 h-16 p-3.5',
  };

  // Level-specific styling (Apple-style minimal & confident)
  const getTierTheme = (lvl: number) => {
    switch (lvl) {
      case 1:
        return 'bg-zinc-100 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-300';
      case 2:
        return 'bg-zinc-100 dark:bg-zinc-800 border-zinc-300 dark:border-zinc-700 text-zinc-700 dark:text-zinc-200';
      case 3:
        return 'bg-blue-50 dark:bg-blue-950/40 border-blue-200 dark:border-blue-800/80 text-blue-700 dark:text-blue-300';
      case 4:
        return 'bg-blue-50 dark:bg-blue-950/50 border-blue-300 dark:border-blue-700 text-blue-800 dark:text-blue-200';
      case 5:
        return 'bg-indigo-50 dark:bg-indigo-950/40 border-indigo-200 dark:border-indigo-800/80 text-indigo-700 dark:text-indigo-300';
      case 6:
        return 'bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-800/70 text-amber-800 dark:text-amber-300';
      case 7:
        return 'bg-amber-100/70 dark:bg-amber-900/40 border-amber-300 dark:border-amber-700/80 text-amber-900 dark:text-amber-200';
      case 8:
        return 'bg-zinc-900 dark:bg-zinc-100 border-zinc-950 dark:border-white text-zinc-100 dark:text-zinc-950';
      case 9:
        return 'bg-zinc-900 dark:bg-zinc-100 border-zinc-800 dark:border-zinc-200 text-amber-400 dark:text-amber-600';
      case 10:
        return 'bg-zinc-900 dark:bg-zinc-100 border-amber-400/80 dark:border-amber-500/80 text-amber-400 dark:text-amber-600';
      default:
        return 'bg-zinc-100 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-300';
    }
  };

  return (
    <div
      className={`rounded-xl border flex items-center justify-center transition-all ${
        sizeClasses[size]
      } ${getTierTheme(level)} ${className}`}
    >
      {getIcon()}
    </div>
  );
};
