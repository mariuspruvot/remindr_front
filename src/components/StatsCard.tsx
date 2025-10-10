import { type LucideIcon } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

interface StatsCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  Icon?: LucideIcon;
  trend?: "up" | "down" | "neutral";
}

export default function StatsCard({
  title,
  value,
  subtitle,
  Icon,
  trend = "neutral",
}: StatsCardProps) {
  const getIconStyles = () => {
    switch (trend) {
      case "up":
        return "bg-green-500/10 text-green-600 dark:text-green-500";
      case "down":
        return "bg-red-500/10 text-red-600 dark:text-red-500";
      default:
        return "bg-primary/10 text-primary";
    }
  };

  const getSubtitleStyles = () => {
    switch (trend) {
      case "up":
        return "text-green-600 dark:text-green-500";
      case "down":
        return "text-red-600 dark:text-red-500";
      default:
        return "text-muted-foreground";
    }
  };

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 space-y-1">
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p className="text-2xl font-bold tracking-tight">{value}</p>
            {subtitle && (
              <p className={`text-sm font-medium ${getSubtitleStyles()}`}>
                {subtitle}
              </p>
            )}
          </div>
          {Icon && (
            <div className={`rounded-lg p-3 ${getIconStyles()}`}>
              <Icon className="h-5 w-5" />
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
