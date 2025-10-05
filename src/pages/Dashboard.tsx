import { Bell, CheckCircle, Radio, ArrowRight, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import StatsCard from "../components/StatsCard";
import ReminderTable from "../components/ReminderTable";
import ChannelsList from "../components/ChannelsList";
import { useReminders, useDeleteReminder } from "../hooks/useReminders";
import { useOutputs, useDeleteOutput } from "../hooks/useOutputs";
import type { Reminder, Output } from "../types/reminder.types";

interface DashboardProps {
  onEditReminder: (reminder: Reminder) => void;
  onNewReminder: () => void;
  onAddChannel: () => void;
  onResendVerification: (channel: Output) => void;
}

function Dashboard({ onEditReminder, onResendVerification }: DashboardProps) {
  // Fetch data using React Query hooks
  const { data: reminders = [], isLoading: remindersLoading } = useReminders();
  const { data: channels = [], isLoading: channelsLoading } = useOutputs();
  const deleteReminder = useDeleteReminder();
  const deleteOutput = useDeleteOutput();

  const handleDeleteReminder = async (reminderId: string) => {
    await deleteReminder.mutateAsync(reminderId);
  };

  const handleDeleteChannel = async (channelId: string) => {
    await deleteOutput.mutateAsync(channelId);
  };

  // Calculate stats
  const totalReminders = reminders.length;
  const sentReminders = reminders.filter((r) => r.sent).length;
  const successRate =
    totalReminders > 0
      ? ((sentReminders / totalReminders) * 100).toFixed(1)
      : "0";
  const activeChannels = channels.filter((c) => c.confirmed).length;
  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-2xl lg:text-3xl font-semibold text-base-content mb-2">
          Dashboard
        </h1>
        <p className="text-base-content/60">
          Manage your reminders and channels
        </p>
      </div>

      {/* Stats Cards - Responsive Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 mb-8">
        <StatsCard
          title="Total Reminders"
          value={remindersLoading ? "..." : totalReminders}
          subtitle={
            sentReminders > 0 ? `${sentReminders} sent` : "No reminders sent"
          }
          Icon={Bell}
          trend="neutral"
        />
        <StatsCard
          title="Success Rate"
          value={remindersLoading ? "..." : `${successRate}%`}
          subtitle="Delivery rate"
          Icon={CheckCircle}
          trend={Number(successRate) >= 90 ? "up" : "neutral"}
        />
        <StatsCard
          title="Active Channels"
          value={channelsLoading ? "..." : activeChannels}
          subtitle={activeChannels > 0 ? "Verified" : "Add channels"}
          Icon={Radio}
          trend="neutral"
        />
      </div>

      {/* Recent Reminders Section */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-xl lg:text-2xl font-semibold text-base-content">
            Recent Reminders
          </h2>
          <Link
            to="/reminders"
            className="inline-flex items-center gap-2 text-sm font-medium text-base-content/60 hover:text-base-content transition-colors"
          >
            View All
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Loading State */}
        {remindersLoading && (
          <div className="flex items-center justify-center py-12 border border-base-300 rounded-xl">
            <Loader2 className="w-6 h-6 animate-spin text-primary" />
          </div>
        )}

        {/* Reminders Table */}
        {!remindersLoading && (
          <ReminderTable
            reminders={reminders.slice(0, 5)}
            onEdit={onEditReminder}
            onDelete={handleDeleteReminder}
          />
        )}
      </div>

      {/* Channel Management Section */}
      <div>
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-xl lg:text-2xl font-semibold text-base-content">
            Channels
          </h2>
          <Link
            to="/channels"
            className="inline-flex items-center gap-2 text-sm font-medium text-base-content/60 hover:text-base-content transition-colors"
          >
            View All
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Loading State */}
        {channelsLoading && (
          <div className="flex items-center justify-center py-12 border border-base-300 rounded-xl">
            <Loader2 className="w-6 h-6 animate-spin text-primary" />
          </div>
        )}

        {/* Channels List */}
        {!channelsLoading && (
          <ChannelsList
            channels={channels.slice(0, 3)}
            onDelete={handleDeleteChannel}
            onResendVerification={onResendVerification}
          />
        )}
      </div>
    </div>
  );
}

export default Dashboard;
