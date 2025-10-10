# 🔔 Remindr Frontend

> **Modern reminder management application with multi-channel delivery**

A beautiful, professional React application built with TypeScript, Vite, Tailwind CSS, and shadcn/ui. Never miss what matters with smart reminders delivered via Email, WhatsApp, Telegram, or custom Webhooks.

## ✨ Features

### Core Functionality
- 📅 **Smart Scheduling**: Create reminders with flexible scheduling
- 📊 **Analytics Dashboard**: Visual insights with charts and statistics
- 📆 **Calendar View**: Month grid with day-level details
- 🔄 **Multi-Channel Delivery**: 
  - 📧 Email
  - 💬 WhatsApp  
  - 📱 Telegram
  - 🔗 Custom Webhooks
- 🌓 **Dark Mode**: System-aware theme with manual toggle
- 📱 **Responsive Design**: Mobile-first, works on all devices

### UI/UX Highlights
- **Professional Design**: Clean, modern interface using shadcn/ui
- **Smooth Animations**: Framer Motion for delightful interactions
- **Accessible**: WCAG compliant components
- **Fast**: Optimized performance with React Query caching
- **Type-Safe**: Full TypeScript coverage

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- Backend API running (see [remindr_backend](../remindr_backend))

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd remindr_frontend

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your Clerk and API keys

# Start development server
npm run dev
```

The app will be available at `http://localhost:5173`

### Environment Variables

Create a `.env` file in the root directory:

```env
# Clerk Authentication
VITE_CLERK_PUBLISHABLE_KEY=pk_test_xxxxxxxxxxxxx

# Backend API
VITE_API_URL=http://localhost:8000
```

## 📦 Tech Stack

### Core
- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool & dev server
- **React Router** - Client-side routing

### UI & Styling
- **Tailwind CSS v4** - Utility-first CSS
- **shadcn/ui** - High-quality React components
- **Lucide React** - Beautiful icons
- **Framer Motion** - Smooth animations

### State & Data
- **TanStack Query** (React Query) - Server state management
- **Axios** - HTTP client
- **Moment.js** - Date manipulation

### Authentication
- **Clerk** - Complete auth solution

### Charts & Visualization
- **Recharts** - Composable charting library

## 📁 Project Structure

```
src/
├── components/           # React components
│   ├── ui/              # shadcn/ui components
│   ├── calendar/        # Calendar feature components
│   ├── channels/        # Channel management components
│   ├── reminder/        # Reminder-specific components
│   ├── common/          # Shared components
│   ├── app-sidebar.tsx  # Main navigation sidebar
│   └── ...
├── config/              # App configuration
│   └── channels/        # Channel type configs (Email, WhatsApp, etc.)
├── constants/           # Constants (animations, time)
├── contexts/            # React contexts (Modal, Theme)
├── hooks/               # Custom React hooks
│   ├── useReminders.ts  # Reminder CRUD operations
│   └── useOutputs.ts    # Channel management
├── layouts/             # Layout components
├── lib/                 # Core utilities
│   ├── api.ts          # Axios instance with auth
│   └── queryClient.ts  # React Query config
├── pages/               # Route pages
│   ├── Dashboard.tsx    # Main dashboard
│   ├── Reminders.tsx    # Reminders list
│   ├── Calendar.tsx     # Calendar view
│   ├── Channels.tsx     # Channel management
│   ├── Settings.tsx     # User settings
│   └── Landing.tsx      # Public landing page
├── types/               # TypeScript types
├── utils/               # Utility functions
└── index.css            # Global styles & Tailwind config
```

## 🛠️ Available Scripts

```bash
# Development
npm run dev              # Start dev server (http://localhost:5173)

# Building
npm run build            # Build for production
npm run preview          # Preview production build locally

# Code Quality
npm run lint             # Run ESLint
npm run type-check       # Run TypeScript compiler check

# Clean
rm -rf node_modules dist # Clean install and build artifacts
```

## 🎨 Design System

### Color Palette
The app uses a carefully crafted color system that works in both light and dark modes:

- **Neutral Grays**: Soft, professional background colors
- **Primary Blue**: `hsl(217 91% 60%)` - Call-to-action color
- **Success Green**: `hsl(142 71% 45%)` - Positive actions
- **Destructive Red**: Error states

### Typography
- **Font**: Inter (Google Fonts)
- **Sizes**: Responsive scale from `text-xs` to `text-7xl`
- **Weights**: 400 (normal), 500 (medium), 600 (semibold), 700 (bold)

### Spacing & Layout
- **Container**: Max-width 7xl (80rem) with responsive padding
- **Grid**: CSS Grid for complex layouts, Flexbox for simple alignment
- **Shadows**: Subtle, light shadows removed in dark mode

## 📊 Features Deep Dive

### Dashboard
- **Stats Cards**: Total, Pending, Sent, Active Channels
- **Activity Chart**: Visualize reminders over time (Day/Week/Month/Year views)
- **Chart Types**: Toggle between Area, Bar, and Line charts
- **Recent Reminders**: Quick access to latest 5 reminders
- **Active Channels**: Sidebar with channel status and actions

### Reminders Management
- **Create/Edit**: Modal form with validation
- **Quick Schedule**: Preset buttons (1 hour, Today, Tomorrow, etc.)
- **Channel Selection**: Multi-select for delivery channels
- **Status Tracking**: Visual badges for pending/sent status
- **Bulk Actions**: Edit and delete with confirmations

### Calendar View
- **Month Grid**: Visual overview of all scheduled reminders
- **Day Details**: Click any day to see reminders for that date
- **Quick Create**: Add reminders directly from calendar
- **Color Coding**: Visual distinction for different reminder states

### Channel Management
- **Multi-Channel**: Support for Email, WhatsApp, Telegram, Webhook
- **Verification Flow**: Code-based verification for each channel
- **Status Indicators**: Clear visual status (verified/pending)
- **Quick Actions**: Resend codes, delete channels with hover actions

## 🔐 Authentication

### Clerk Integration
The app uses [Clerk](https://clerk.com) for authentication:

1. **Sign Up/Sign In**: Pre-built UI components
2. **User Management**: Profile, sessions, organization support
3. **Protected Routes**: Automatic redirection for unauthenticated users
4. **API Integration**: Automatic token injection in requests

```typescript
// Example: Protected route
<ProtectedRoute>
  <Dashboard />
</ProtectedRoute>

// Example: Get current user
const { user, isSignedIn } = useUser();
```

## 🌓 Dark Mode

The app features a professional dark mode implementation:

- **System Aware**: Respects OS theme preference
- **Manual Toggle**: Switch in the navbar
- **Persistent**: Choice saved to localStorage
- **Smooth Transitions**: Animated color changes
- **Complete Coverage**: All components support both themes

## 📱 Responsive Design

Built mobile-first with breakpoints:
- **sm**: 640px+ (tablets)
- **md**: 768px+ (small laptops)
- **lg**: 1024px+ (desktops)
- **xl**: 1280px+ (large screens)

### Mobile Optimizations
- **Collapsible Sidebar**: Icon-only on mobile
- **Touch-Friendly**: Larger tap targets
- **Optimized Typography**: Readable on small screens
- **Reduced Motion**: Respects user preferences

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

Output will be in the `dist/` directory. Serve these static files with any web server.

### Deploy to Vercel (Recommended)

1. Push code to GitHub
2. Import project in Vercel
3. Set environment variables
4. Deploy!

Vercel will automatically detect Vite and configure correctly.

### Other Platforms
- **Netlify**: Works out of the box
- **AWS S3 + CloudFront**: Upload `dist/` to S3
- **Docker**: See `Dockerfile` (if provided)

## 🧪 Testing

### Recommended Setup

```bash
# Install testing dependencies
npm install -D vitest @testing-library/react @testing-library/jest-dom

# Run tests
npm test
```

### Test Structure
```
src/
├── components/
│   └── __tests__/
│       └── Button.test.tsx
├── hooks/
│   └── __tests__/
│       └── useReminders.test.ts
└── utils/
    └── __tests__/
        └── dateHelpers.test.ts
```

## 🤝 Contributing

### Development Workflow

1. **Fork & Clone**
2. **Create Feature Branch**: `git checkout -b feature/amazing-feature`
3. **Make Changes**: Follow code style guidelines
4. **Test**: Ensure everything works
5. **Commit**: Use conventional commits (`feat:`, `fix:`, `docs:`)
6. **Push**: `git push origin feature/amazing-feature`
7. **Pull Request**: Describe your changes

### Code Style
- Use TypeScript with strict mode
- Follow ESLint rules (`npm run lint`)
- Use Prettier for formatting (if configured)
- Write meaningful commit messages

## 📝 Documentation

- **[Architecture](./ARCHITECTURE.md)**: Deep dive into project structure
- **[API Integration](./docs/API.md)**: Backend API documentation
- **[Component Guide](./docs/COMPONENTS.md)**: Component usage examples

## 🐛 Troubleshooting

### Common Issues

**Build fails with Tailwind errors**
```bash
# Clear Tailwind cache and rebuild
rm -rf node_modules/.cache
npm run build
```

**API calls fail with 401**
- Check Clerk keys in `.env`
- Ensure backend is running
- Verify VITE_API_URL is correct

**Dark mode not working**
- Clear localStorage
- Check if ThemeProvider wraps App

**Charts not loading**
- Verify `recharts` is installed
- Check console for errors
- Ensure data format matches expected structure

## 📄 License

This project is private and proprietary.

## 👥 Team

Built with ❤️ by the Remindr team

---

**Questions?** Open an issue or contact the team.

