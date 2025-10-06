/**
 * Dashboard Page - Overview of reminders and channels
 * 
 * REFACTORED:
 * - Uses useModals() instead of prop callbacks (no prop drilling)
 * - Uses PageHeader, LoadingState, ErrorState components (DRY)
 * - Cleaner, more readable code
 */

import { Bell, Clock, Send, Radio, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { PageHeader, LoadingState } from "../components/common";
import StatsCard from "../components/StatsCard";
import ReminderTable from "../components/ReminderTable";
import ChannelsList from "../components/ChannelsList";
import { useReminders, useDeleteReminder } from "../hooks/useReminders";
import { useOutputs, useDeleteOutput } from "../hooks/useOutputs";
import { useModals } from "../contexts/ModalContext";

function Dashboard() {
  const { openReminderModal, openChannelModal } = useModals();
  
  // Fetch data using React Query hooks
  const { data: reminders = [], isLoading: remindersLoading } = useReminders();
  const { data: channels = [], isLoading: channelsLoading } = useOutputs();
  const deleteReminder = useDeleteReminder();
  const deleteOutput = useDeleteOutput();

  const handleDeleteReminder = async (reminderId: string) => {
    if (window.confirm("Are you sure you want to delete this reminder?")) {
      await deleteReminder.mutateAsync(reminderId);
    }
  };

  const handleDeleteChannel = async (channelId: string) => {
    await deleteOutput.mutateAsync(channelId);
  };

  // Calculate stats
  const totalReminders = reminders.length;
  const pendingReminders = reminders.filter((r) => !r.sent).length;
  const sentReminders = reminders.filter((r) => r.sent).length;
  const activeChannels = channels.filter((c) => c.confirmed).length;

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
      <PageHeader
        title="Dashboard"
        subtitle="Manage your reminders and channels"
      />

      {/* Stats Cards - Responsive Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-8">
        <StatsCard
          title="Total Reminders"
          value={remindersLoading ? "..." : totalReminders}
          subtitle="All time"
          Icon={Bell}
          trend="neutral"
        />
        <StatsCard
          title="Pending"
          value={remindersLoading ? "..." : pendingReminders}
          subtitle={pendingReminders > 0 ? "Scheduled" : "All sent"}
          Icon={Clock}
          trend="neutral"
        />
        <StatsCard
          title="Sent"
          value={remindersLoading ? "..." : sentReminders}
          subtitle={sentReminders > 0 ? "Delivered" : "No reminders yet"}
          Icon={Send}
          trend={sentReminders > 0 ? "up" : "neutral"}
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

        {remindersLoading ? (
          <LoadingState />
        ) : (
          <ReminderTable
            reminders={reminders.slice(0, 5)}
            onEdit={openReminderModal}
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

        {channelsLoading ? (
          <LoadingState />
        ) : (
          <ChannelsList
            channels={channels.slice(0, 3)}
            onDelete={handleDeleteChannel}
            onResendVerification={(channel) => openChannelModal(channel)}
          />
        )}
      </div>
    </div>
  );
}

export default Dashboard;
