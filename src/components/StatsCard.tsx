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

  const getIconBg = () => {
    if (trend === "up") return "bg-success/10";
    if (trend === "down") return "bg-error/10";
    return "bg-primary/10";
  };

  const getIconColor = () => {
    if (trend === "up") return "text-success";
    if (trend === "down") return "text-error";
    return "text-primary";
  };

  return (
    <div className="card bg-base-100 border border-base-300 shadow-lg hover:shadow-xl transition-all duration-300">
      <div className="card-body p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <p className="text-sm font-medium text-base-content/60 mb-2">
              {title}
            </p>
            <p className="text-3xl font-bold text-base-content mb-1">{value}</p>
            {subtitle && (
              <p className={`text-sm font-medium ${getTrendColor()}`}>
                {subtitle}
              </p>
            )}
          </div>
          {Icon && (
            <div className={`p-3 rounded-xl ${getIconBg()}`}>
              <Icon className={`w-6 h-6 ${getIconColor()}`} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default StatsCard;
