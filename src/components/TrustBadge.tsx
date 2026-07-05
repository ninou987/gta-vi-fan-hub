import { CheckCircle2, ShieldCheck, HelpCircle, AlertTriangle, ShieldAlert } from 'lucide-react';
import { TrustBadgeType } from '../types';

interface TrustBadgeProps {
  badge: TrustBadgeType;
  showIcon?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export default function TrustBadge({ badge, showIcon = true, size = 'sm', className = '' }: TrustBadgeProps) {
  const getBadgeDetails = () => {
    switch (badge) {
      case 'official':
        return {
          label: 'Official',
          colorClass: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20 shadow-[0_0_10px_rgba(16,185,129,0.05)]',
          dotColor: 'bg-emerald-400',
          Icon: CheckCircle2,
          description: 'Officially released or confirmed by Rockstar Games or Take-Two Interactive.',
        };
      case 'trusted':
        return {
          label: 'Trusted Source',
          colorClass: 'bg-blue-500/10 text-blue-400 border-blue-500/20 shadow-[0_0_10px_rgba(59,130,246,0.05)]',
          dotColor: 'bg-blue-400',
          Icon: ShieldCheck,
          description: 'Reported by reputable journalists, established publications, or historically accurate industry insiders.',
        };
      case 'likely':
        return {
          label: 'Likely',
          colorClass: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20 shadow-[0_0_10px_rgba(234,179,8,0.05)]',
          dotColor: 'bg-yellow-400',
          Icon: HelpCircle,
          description: 'Highly plausible based on correlating leaks, patents, and developer activity, but not yet verified.',
        };
      case 'rumor':
        return {
          label: 'Rumor',
          colorClass: 'bg-orange-500/10 text-orange-400 border-orange-500/20 shadow-[0_0_10px_rgba(249,115,22,0.05)]',
          dotColor: 'bg-orange-400',
          Icon: AlertTriangle,
          description: 'Speculative talk, unverified community leaks, or claims from anonymous online forums.',
        };
      case 'fake':
        return {
          label: 'Fake',
          colorClass: 'bg-red-500/10 text-red-400 border-red-500/20 shadow-[0_0_10px_rgba(239,68,68,0.05)]',
          dotColor: 'bg-red-400',
          Icon: ShieldAlert,
          description: 'Debunked claims, fabricated screenshots, or intentionally misleading information.',
        };
    }
  };

  const details = getBadgeDetails();
  const Icon = details.Icon;

  const sizeClasses = {
    sm: 'px-2 py-1 text-[10px] gap-1.5',
    md: 'px-3 py-1.5 text-xs gap-2',
    lg: 'px-4 py-2 text-sm gap-2.5',
  };

  return (
    <span
      className={`inline-flex items-center font-mono font-black uppercase tracking-wider border rounded-none select-none ${sizeClasses[size]} ${details.colorClass} ${className}`}
      title={details.description}
      id={`trust-badge-${badge}`}
    >
      <span className={`h-1.5 w-1.5 shrink-0 ${details.dotColor}`} />
      {showIcon && <Icon className={`h-3 w-3 shrink-0`} />}
      <span>{details.label}</span>
    </span>
  );
}
