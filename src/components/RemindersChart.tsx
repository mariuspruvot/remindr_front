/**
 * RemindersChart - Beautiful weekly reminders visualization
 * Shows sent vs scheduled reminders over time using shadcn/ui charts
 */

import { AreaChart, Area, XAxis, YAxis, CartesianGrid } from "recharts";
import { Card } from "@/components/ui/card";
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

const chartConfig = {
  scheduled: {
    label: "Scheduled",
    color: "hsl(var(--primary))",
  },
  sent: {
    label: "Sent",
    color: "hsl(142.1 76.2% 36.3%)",
  },
} satisfies ChartConfig;

export default function RemindersChart({ reminders }: RemindersChartProps) {
  // Get last 8 weeks of data
  const weeks = Array.from({ length: 8 }, (_, i) => {
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
      week: weekStart.format("MMM D"),
      scheduled,
      sent,
    };
  });

  return (
    <Card className="p-6">
      <div className="mb-6">
        <h3 className="text-base font-semibold">Weekly activity</h3>
        <p className="text-xs text-muted-foreground">
          Scheduled vs sent reminders over the last 8 weeks
        </p>
      </div>

      <ChartContainer config={chartConfig} className="h-[300px] w-full">
        <AreaChart data={weeks}>
          <defs>
            <linearGradient id="fillScheduled" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="5%"
                stopColor="var(--color-scheduled)"
                stopOpacity={0.8}
              />
              <stop
                offset="95%"
                stopColor="var(--color-scheduled)"
                stopOpacity={0.1}
              />
            </linearGradient>
            <linearGradient id="fillSent" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="5%"
                stopColor="var(--color-sent)"
                stopOpacity={0.8}
              />
              <stop
                offset="95%"
                stopColor="var(--color-sent)"
                stopOpacity={0.1}
              />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis
            dataKey="week"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            tickFormatter={(value) => value}
          />
          <YAxis
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            allowDecimals={false}
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
            strokeWidth={2}
          />
          <Area
            type="monotone"
            dataKey="sent"
            stroke="var(--color-sent)"
            fill="url(#fillSent)"
            strokeWidth={2}
          />
        </AreaChart>
      </ChartContainer>
    </Card>
  );
}
