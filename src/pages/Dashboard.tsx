/**
 * Dashboard - Beautiful and modern overview
 * Professional layout with stats, charts, and quick access
 */

import { Plus, TrendingUp, Clock, CheckCircle2, Radio } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PageHeader, LoadingState } from "../components/common";
import ReminderTable from "../components/ReminderTable";
import ChannelsList from "../components/ChannelsList";
import RemindersChart from "../components/RemindersChart";
import { useReminders, useDeleteReminder } from "../hooks/useReminders";
import {
  useOutputs,
  useDeleteOutput,
  useResendVerification,
} from "../hooks/useOutputs";
import { useModals } from "../contexts/ModalContext";
import type { Output } from "../types/reminder.types";
import moment from "moment";

function Dashboard() {
  const { openReminderModal, openChannelModal } = useModals();
  const { data: reminders = [], isLoading } = useReminders();
  const { data: channels = [] } = useOutputs();
  const deleteReminder = useDeleteReminder();
  const deleteOutput = useDeleteOutput();
  const resendVerification = useResendVerification();

  const handleDeleteReminder = async (reminderId: string) => {
    if (window.confirm("Delete this reminder?")) {
      await deleteReminder.mutateAsync(reminderId);
    }
  };

  const handleDeleteChannel = async (channelId: string) => {
    await deleteOutput.mutateAsync(channelId);
  };

  const handleResendVerification = async (channel: Output) => {
    await resendVerification.mutateAsync(channel.id);
  };

  const totalCount = reminders.length;
  const pendingCount = reminders.filter((r) => !r.sent).length;
  const sentCount = reminders.filter((r) => r.sent).length;
  const activeChannels = channels.filter((c) => c.confirmed).length;

  // Sort by creation date and get last 5
  const recentReminders = [...reminders]
    .sort(
      (a, b) => moment(b.created_at).valueOf() - moment(a.created_at).valueOf()
    )
    .slice(0, 5);

  if (isLoading) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <LoadingState size="lg" />
      </div>
    );
  }

  return (
    <div className="flex-1">
      <div className="mx-auto max-w-7xl space-y-6 p-4 sm:p-6 lg:p-8">
        <PageHeader
          title="Overview"
          subtitle="Your reminders at a glance"
          action={
            <Button onClick={() => openReminderModal()} size="sm">
              <Plus className="h-4 w-4" />
              New reminder
            </Button>
          }
        />

        {/* Stats Grid - 4 columns */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <Card className="p-4 shadow-[0_1px_2px_rgba(0,0,0,0.05)] dark:shadow-none">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                <TrendingUp className="h-5 w-5 text-primary" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-2xl font-semibold tracking-tight">
                  {totalCount}
                </p>
                <p className="text-xs text-muted-foreground">Total</p>
              </div>
            </div>
          </Card>

          <Card className="p-4 shadow-[0_1px_2px_rgba(0,0,0,0.05)] dark:shadow-none">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-500/10">
                <Clock className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-2xl font-semibold tracking-tight">
                  {pendingCount}
                </p>
                <p className="text-xs text-muted-foreground">Pending</p>
              </div>
            </div>
          </Card>

          <Card className="p-4 shadow-[0_1px_2px_rgba(0,0,0,0.05)] dark:shadow-none">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-green-500/10">
                <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-2xl font-semibold tracking-tight">
                  {sentCount}
                </p>
                <p className="text-xs text-muted-foreground">Sent</p>
              </div>
            </div>
          </Card>

          <Card className="p-4 shadow-[0_1px_2px_rgba(0,0,0,0.05)] dark:shadow-none">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-purple-500/10">
                <Radio className="h-5 w-5 text-purple-600 dark:text-purple-400" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-2xl font-semibold tracking-tight">
                  {activeChannels}
                </p>
                <p className="text-xs text-muted-foreground">Channels</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Chart - Full width */}
        <RemindersChart reminders={reminders} />

        {/* Two columns: Reminders (full width on mobile, 70% on desktop) + Channels (30% on desktop, below on mobile) */}
        <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
          {/* Recent reminders */}
          <div className="min-w-0">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h2 className="text-base font-semibold">Recent reminders</h2>
                <p className="text-xs text-muted-foreground">
                  Last 5 created reminders
                </p>
              </div>
              {totalCount > 5 && (
                <Button variant="ghost" size="sm" asChild>
                  <a href="/reminders">View all →</a>
                </Button>
              )}
            </div>

            {totalCount === 0 ? (
              <Card className="p-12 shadow-[0_1px_2px_rgba(0,0,0,0.05)] dark:shadow-none">
                <div className="flex flex-col items-center justify-center text-center">
                  <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
                    <Plus className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <p className="mb-2 text-sm font-medium">No reminders yet</p>
                  <p className="mb-4 text-sm text-muted-foreground">
                    Create your first reminder to get started
                  </p>
                  <Button onClick={() => openReminderModal()} size="sm">
                    <Plus className="h-4 w-4" />
                    Create reminder
                  </Button>
                </div>
              </Card>
            ) : (
              <ReminderTable
                reminders={recentReminders}
                onEdit={(reminder) => openReminderModal(reminder)}
                onDelete={handleDeleteReminder}
              />
            )}
          </div>

          {/* Active channels - Sidebar style */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-base font-semibold">Channels</h2>
                <p className="text-xs text-muted-foreground">
                  {activeChannels} active
                </p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => openChannelModal()}
              >
                <Plus className="h-3.5 w-3.5" />
                Add
              </Button>
            </div>

            {channels.length === 0 ? (
              <Card className="p-8 shadow-[0_1px_2px_rgba(0,0,0,0.05)] dark:shadow-none">
                <div className="flex flex-col items-center justify-center text-center">
                  <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-muted">
                    <Radio className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <p className="mb-2 text-sm font-medium">No channels</p>
                  <p className="mb-3 text-xs text-muted-foreground">
                    Add a channel to receive reminders
                  </p>
                  <Button
                    onClick={() => openChannelModal()}
                    size="sm"
                    variant="outline"
                  >
                    <Plus className="h-3.5 w-3.5" />
                    Add channel
                  </Button>
                </div>
              </Card>
            ) : (
              <ChannelsList
                channels={channels}
                onDelete={handleDeleteChannel}
                onResendVerification={handleResendVerification}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
