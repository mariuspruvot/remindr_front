import { Bell, CheckCircle, Radio, ArrowRight } from "lucide-react";
import StatsCard from "../components/StatsCard";
import ReminderTable from "../components/ReminderTable";
import type { Reminder } from "../types/reminder.types";

// Dummy data - we'll replace this with API calls later
// Note: These match the backend API response structure
const DUMMY_REMINDERS: Reminder[] = [
  {
    id: "1",
    reminder_text: "Don't forget team meeting",
    scheduled_at: "2025-10-05T14:00:00Z",
    sent: false,
    created_at: "2025-10-01T10:00:00Z",
    outputs: [
      {
        id: "out1",
        output_type: "email",
        identifier: "user@example.com",
        confirmed: true,
        primary: true,
      },
      {
        id: "out2",
        output_type: "whatsapp",
        identifier: "+33612345678",
        confirmed: true,
        primary: false,
      },
    ],
  },
  {
    id: "2",
    reminder_text: "Submit quarterly report",
    target_url: "https://example.com/report",
    scheduled_at: "2025-10-06T09:00:00Z",
    sent: false,
    created_at: "2025-10-01T11:00:00Z",
    outputs: [
      {
        id: "out3",
        output_type: "email",
        identifier: "user@example.com",
        confirmed: true,
        primary: true,
      },
    ],
  },
  {
    id: "3",
    reminder_text: "Call dentist for appointment",
    scheduled_at: "2025-10-03T10:00:00Z",
    sent: true,
    created_at: "2025-10-01T09:00:00Z",
    outputs: [
      {
        id: "out4",
        output_type: "whatsapp",
        identifier: "+33612345678",
        confirmed: true,
        primary: false,
      },
    ],
  },
];

function Dashboard() {
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
          value={12}
          subtitle="+3 this week"
          Icon={Bell}
          trend="up"
        />
        <StatsCard
          title="Success Rate"
          value="98.5%"
          subtitle="Email delivery"
          Icon={CheckCircle}
          trend="up"
        />
        <StatsCard
          title="Active Channels"
          value={3}
          subtitle="All verified"
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
          <button className="inline-flex items-center gap-2 text-sm font-medium text-base-content/60 hover:text-base-content transition-colors">
            View All
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Reminders Table */}
        <ReminderTable reminders={DUMMY_REMINDERS} />
      </div>

      {/* Channel Management Section */}
      <div>
        <h2 className="text-xl lg:text-2xl font-semibold text-base-content mb-5">
          Channel Management
        </h2>
        <div className="border border-base-300 rounded-xl p-8 bg-base-100">
          <p className="text-base-content/60 text-center">
            Manage your notification channels here...
          </p>
          {/* We'll build this in the next iteration */}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
