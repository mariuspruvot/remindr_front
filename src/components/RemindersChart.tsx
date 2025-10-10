/**
 * RemindersChart - Beautiful reminders visualization with period selector
 * Shows sent vs scheduled reminders over time using shadcn/ui charts
 */

import { useState } from "react";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AreaChartIcon, BarChart3, LineChartIcon } from "lucide-react";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  type ChartConfig,
} from "@/components/ui/chart";
import type { Reminder } from "../types/reminder.types";
import moment from "moment";

interface RemindersChartProps {
  reminders: Reminder[];
}

type Period = "day" | "week" | "month" | "quarter";
type ChartType = "area" | "bar" | "line";

const chartConfig = {
  scheduled: {
    label: "Scheduled",
    color: "hsl(217 91% 60%)", // Soft blue
  },
  sent: {
    label: "Sent",
    color: "hsl(142 71% 45%)", // Soft green
  },
} satisfies ChartConfig;

export default function RemindersChart({ reminders }: RemindersChartProps) {
  const [period, setPeriod] = useState<Period>("month");
  const [chartType, setChartType] = useState<ChartType>("area");

  // Generate data based on selected period
  const chartData = () => {
    if (period === "day") {
      // Last 7 days
      return Array.from({ length: 7 }, (_, i) => {
        const day = moment()
          .subtract(6 - i, "days")
          .startOf("day");
        const dayEnd = moment()
          .subtract(6 - i, "days")
          .endOf("day");

        const scheduled = reminders.filter((r) => {
          const date = moment(r.scheduled_at);
          return date.isBetween(day, dayEnd, null, "[]");
        }).length;

        const sent = reminders.filter((r) => {
          const date = moment(r.scheduled_at);
          return date.isBetween(day, dayEnd, null, "[]") && r.sent;
        }).length;

        return {
          period: day.format("ddd D"),
          scheduled,
          sent,
        };
      });
    } else if (period === "week") {
      // Last 8 weeks
      return Array.from({ length: 8 }, (_, i) => {
        const weekStart = moment()
          .subtract(7 - i, "weeks")
          .startOf("week");
        const weekEnd = moment()
          .subtract(7 - i, "weeks")
          .endOf("week");

        const scheduled = reminders.filter((r) => {
          const date = moment(r.scheduled_at);
          return date.isBetween(weekStart, weekEnd, null, "[]");
        }).length;

        const sent = reminders.filter((r) => {
          const date = moment(r.scheduled_at);
          return date.isBetween(weekStart, weekEnd, null, "[]") && r.sent;
        }).length;

        return {
          period: weekStart.format("MMM D"),
          scheduled,
          sent,
        };
      });
    } else if (period === "month") {
      // Last 6 months
      return Array.from({ length: 6 }, (_, i) => {
        const monthStart = moment()
          .subtract(5 - i, "months")
          .startOf("month");
        const monthEnd = moment()
          .subtract(5 - i, "months")
          .endOf("month");

        const scheduled = reminders.filter((r) => {
          const date = moment(r.scheduled_at);
          return date.isBetween(monthStart, monthEnd, null, "[]");
        }).length;

        const sent = reminders.filter((r) => {
          const date = moment(r.scheduled_at);
          return date.isBetween(monthStart, monthEnd, null, "[]") && r.sent;
        }).length;

        return {
          period: monthStart.format("MMM YYYY"),
          scheduled,
          sent,
        };
      });
    } else {
      // Last 12 months (quarter)
      return Array.from({ length: 12 }, (_, i) => {
        const monthStart = moment()
          .subtract(11 - i, "months")
          .startOf("month");
        const monthEnd = moment()
          .subtract(11 - i, "months")
          .endOf("month");

        const scheduled = reminders.filter((r) => {
          const date = moment(r.scheduled_at);
          return date.isBetween(monthStart, monthEnd, null, "[]");
        }).length;

        const sent = reminders.filter((r) => {
          const date = moment(r.scheduled_at);
          return date.isBetween(monthStart, monthEnd, null, "[]") && r.sent;
        }).length;

        return {
          period: monthStart.format("MMM"),
          scheduled,
          sent,
        };
      });
    }
  };

  const data = chartData();

  const chartTypeIcon = {
    area: AreaChartIcon,
    bar: BarChart3,
    line: LineChartIcon,
  }[chartType];

  const ChartIcon = chartTypeIcon;

  return (
    <Card className="p-6 shadow-[0_1px_2px_rgba(0,0,0,0.05)] dark:shadow-none">
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <h3 className="text-base font-semibold">Activity overview</h3>
          <p className="text-xs text-muted-foreground">
            Scheduled vs sent reminders
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Chart type selector */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-8 gap-2 px-3">
                <ChartIcon className="h-3.5 w-3.5" />
                <span className="hidden sm:inline text-xs">
                  {chartType.charAt(0).toUpperCase() + chartType.slice(1)}
                </span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setChartType("area")}>
                <AreaChartIcon className="mr-2 h-4 w-4" />
                Area Chart
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setChartType("bar")}>
                <BarChart3 className="mr-2 h-4 w-4" />
                Bar Chart
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setChartType("line")}>
                <LineChartIcon className="mr-2 h-4 w-4" />
                Line Chart
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Period selector */}
          <div className="flex gap-1 rounded-lg border bg-muted/50 p-1">
            <Button
              variant={period === "day" ? "secondary" : "ghost"}
              size="sm"
              className="h-7 text-xs"
              onClick={() => setPeriod("day")}
            >
              Day
            </Button>
            <Button
              variant={period === "week" ? "secondary" : "ghost"}
              size="sm"
              className="h-7 text-xs"
              onClick={() => setPeriod("week")}
            >
              Week
            </Button>
            <Button
              variant={period === "month" ? "secondary" : "ghost"}
              size="sm"
              className="h-7 text-xs"
              onClick={() => setPeriod("month")}
            >
              Month
            </Button>
            <Button
              variant={period === "quarter" ? "secondary" : "ghost"}
              size="sm"
              className="h-7 text-xs"
              onClick={() => setPeriod("quarter")}
            >
              Year
            </Button>
          </div>
        </div>
      </div>

      <ChartContainer config={chartConfig} className="h-[300px] w-full">
        {chartType === "area" ? (
          <AreaChart data={data}>
            <defs>
              <linearGradient id="fillScheduled" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-scheduled)"
                  stopOpacity={0.4}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-scheduled)"
                  stopOpacity={0.05}
                />
              </linearGradient>
              <linearGradient id="fillSent" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-sent)"
                  stopOpacity={0.4}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-sent)"
                  stopOpacity={0.05}
                />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              className="stroke-muted/30"
            />
            <XAxis
              dataKey="period"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              className="text-muted-foreground text-xs"
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              allowDecimals={false}
              className="text-muted-foreground text-xs"
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dot" />}
            />
            <ChartLegend content={<ChartLegendContent />} />
            <Area
              type="monotone"
              dataKey="scheduled"
              stroke="var(--color-scheduled)"
              fill="url(#fillScheduled)"
              strokeWidth={2.5}
            />
            <Area
              type="monotone"
              dataKey="sent"
              stroke="var(--color-sent)"
              fill="url(#fillSent)"
              strokeWidth={2.5}
            />
          </AreaChart>
        ) : chartType === "bar" ? (
          <BarChart data={data}>
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              className="stroke-muted/30"
            />
            <XAxis
              dataKey="period"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              className="text-muted-foreground text-xs"
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              allowDecimals={false}
              className="text-muted-foreground text-xs"
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dot" />}
            />
            <ChartLegend content={<ChartLegendContent />} />
            <Bar
              dataKey="scheduled"
              fill="var(--color-scheduled)"
              radius={[4, 4, 0, 0]}
            />
            <Bar
              dataKey="sent"
              fill="var(--color-sent)"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        ) : (
          <LineChart data={data}>
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              className="stroke-muted/30"
            />
            <XAxis
              dataKey="period"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              className="text-muted-foreground text-xs"
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              allowDecimals={false}
              className="text-muted-foreground text-xs"
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <ChartLegend content={<ChartLegendContent />} />
            <Line
              type="monotone"
              dataKey="scheduled"
              stroke="var(--color-scheduled)"
              strokeWidth={2.5}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />
            <Line
              type="monotone"
              dataKey="sent"
              stroke="var(--color-sent)"
              strokeWidth={2.5}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        )}
      </ChartContainer>
    </Card>
  );
}
