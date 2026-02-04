// ===============================================
// JUNGLE YOURSELF - BADGE COMPONENT
// Product badges for features/labels
// ===============================================

import type { Badge as BadgeType } from '../../types';

interface BadgeProps {
  type: BadgeType;
  size?: 'sm' | 'md';
}

const badgeConfig: Record<BadgeType, { label: string; color: string; icon?: string }> = {
  'beginner-friendly': {
    label: 'Beginner Friendly',
    color: 'bg-sage/20 text-forest border-sage/40',
    icon: '👋',
  },
  'lightweight': {
    label: 'Lightweight',
    color: 'bg-sky-100 text-sky-700 border-sky-200',
    icon: '🪶',
  },
  'low-maintenance': {
    label: 'Low Maintenance',
    color: 'bg-amber-100 text-amber-700 border-amber-200',
    icon: '⏰',
  },
  'biodiversity': {
    label: 'Biodiversity',
    color: 'bg-emerald-100 text-emerald-700 border-emerald-200',
    icon: '🦋',
  },
  'best-seller': {
    label: 'Best Seller',
    color: 'bg-terracotta/20 text-terracotta-dark border-terracotta/40',
    icon: '⭐',
  },
  'new': {
    label: 'New',
    color: 'bg-purple-100 text-purple-700 border-purple-200',
    icon: '✨',
  },
};

export default function Badge({ type, size = 'sm' }: BadgeProps) {
  const config = badgeConfig[type];
  
  if (!config) return null;

  const sizeClasses = size === 'sm' 
    ? 'px-2 py-0.5 text-xs' 
    : 'px-3 py-1 text-sm';

  return (
    <span 
      className={`inline-flex items-center gap-1 rounded-full border font-medium ${config.color} ${sizeClasses}`}
    >
      {config.icon && <span className="text-xs">{config.icon}</span>}
      {config.label}
    </span>
  );
}
