import { type LucideProps } from "lucide-react";
import { type FC } from "react";

interface StatsCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  Icon?: FC<LucideProps>;
  trend?: "up" | "down" | "neutral";
}

function StatsCard({ title, value, subtitle, Icon, trend }: StatsCardProps) {
  const getTrendColor = () => {
    if (trend === "up") return "text-success";
    if (trend === "down") return "text-error";
    return "text-base-content/60";
  };

  return (
    <div className="border border-base-300 rounded-xl p-6 bg-base-100 shadow-lg hover:shadow-xl hover:border-base-content/20 transition-all">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-base-content/60 mb-2">
            {title}
          </p>
          <p className="text-3xl font-semibold text-base-content">{value}</p>
          {subtitle && (
            <p className={`text-sm mt-2 ${getTrendColor()}`}>{subtitle}</p>
          )}
        </div>
        {Icon && (
          <div className="p-2 rounded-lg bg-base-200">
            <Icon className="w-5 h-5 text-base-content/60" />
          </div>
        )}
      </div>
    </div>
  );
}

export default StatsCard;
