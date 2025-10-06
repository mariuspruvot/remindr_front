/**
 * PageHeader - Reusable page header component
 *
 * Why this exists?
 * - Every page (Dashboard, Reminders, Channels) had identical header structure
 * - DRY principle: Extract repeated UI patterns
 *
 * Usage:
 * ```tsx
 * <PageHeader
 *   title="Reminders"
 *   subtitle="Manage your scheduled reminders"
 *   action={<button>New Reminder</button>}
 * />
 * ```
 */

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
}

export function PageHeader({ title, subtitle, action }: PageHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-6 sm:mb-8">
      <div>
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-base-content mb-1 sm:mb-2">
          {title}
        </h1>
        {subtitle && (
          <p className="text-sm sm:text-base text-base-content/60">
            {subtitle}
          </p>
        )}
      </div>
      {action && <div>{action}</div>}
    </div>
  );
}
