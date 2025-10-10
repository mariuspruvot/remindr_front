# 🏗️ Architecture Documentation

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # Shadcn/ui components (Button, Card, Dialog, etc.)
│   ├── calendar/       # Calendar-specific components
│   ├── channels/       # Channel management components
│   ├── reminder/       # Reminder-specific components
│   ├── common/         # Shared components (Loading, Error, etc.)
│   ├── app-sidebar.tsx # Application sidebar navigation
│   ├── theme-provider.tsx # Dark mode provider
│   └── ...            # Other feature components
├── config/             # Configuration files
│   └── channels/       # Channel type configurations
├── constants/          # App constants (animations, time, etc.)
├── contexts/           # React contexts (Modal, Theme)
├── hooks/              # Custom React hooks
├── layouts/            # Layout components
├── lib/                # Core utilities (API, query client)
├── pages/              # Page components (Dashboard, Reminders, etc.)
├── types/              # TypeScript type definitions
├── utils/              # Utility functions
└── index.css           # Global styles & Tailwind config
```

## 🎨 Design System

### UI Library
- **Primary**: [shadcn/ui](https://ui.shadcn.com/) - Modern, accessible React components
- **Styling**: Tailwind CSS v4 with custom design tokens
- **Icons**: [Lucide React](https://lucide.dev/)
- **Font**: Inter (Google Fonts) - Industry standard for SaaS

### Color Palette
- **Light Mode**: Soft neutral grays with subtle shadows
- **Dark Mode**: Nordic-inspired dark theme with excellent contrast
- **Accent Colors**: 
  - Primary: Soft blue (`hsl(217 91% 60%)`)
  - Success: Emerald green (`hsl(142 71% 45%)`)
  - Destructive: Red for errors

### Component Hierarchy
```
App (Theme + Query Provider)
└── MainLayout (Sidebar + Header + Footer)
    ├── AppSidebar (Navigation)
    ├── Header (Breadcrumbs + User Menu + Theme Toggle)
    ├── Main Content (Page)
    └── Footer
```

## 🔄 Data Flow

### State Management
1. **Server State**: React Query (TanStack Query)
   - Caching, refetching, optimistic updates
   - Located in `/src/hooks/useReminders.ts`, `/src/hooks/useOutputs.ts`

2. **UI State**: React Context API
   - Modal state: `ModalContext`
   - Theme state: `ThemeProvider`

3. **Local State**: React useState/useReducer for component-specific state

### API Integration
```typescript
// Central API instance
src/lib/api.ts
  - Axios instance with Clerk auth interceptor
  - Automatic token management
  - Error handling

// Hooks pattern
src/hooks/useReminders.ts
  - useReminders()        // GET /reminders
  - useCreateReminder()   // POST /reminders
  - useUpdateReminder()   // PUT /reminders/:id
  - useDeleteReminder()   // DELETE /reminders/:id
```

## 🧩 Component Patterns

### 1. Page Components
Located in `/src/pages/`, these are route-level components:
- **Dashboard.tsx**: Overview with stats, chart, recent reminders
- **Reminders.tsx**: Full reminders list with filters
- **Calendar.tsx**: Calendar view with day details
- **Channels.tsx**: Channel management
- **Settings.tsx**: User settings

### 2. Feature Components
Grouped by feature in `/src/components/`:
- **channels/**: Channel creation, validation, type selector
- **reminder/**: Quick schedule, channel selector
- **calendar/**: Calendar grid, day details sidebar

### 3. Common Components
Reusable across features:
- **LoadingSpinner**: Centralized loading states
- **ErrorState**: Consistent error handling
- **PageHeader**: Page title + actions
- **FormField**: Form input wrapper

### 4. Shadcn/ui Components
Pre-built, accessible components in `/src/components/ui/`:
- Button, Card, Dialog, Alert, Badge, etc.
- Fully customizable via Tailwind
- Type-safe with TypeScript

## 🎯 Key Features

### 1. Reminders Management
```typescript
// Create reminder with channels
const { mutate: createReminder } = useCreateReminder();
createReminder({
  message: "Meeting at 3pm",
  scheduled_at: "2024-01-15T15:00:00Z",
  output_ids: ["channel-1", "channel-2"], // Multiple channels
});
```

### 2. Multi-Channel Support
- **Email**: Verified via code
- **WhatsApp**: Verified via Twilio
- **Telegram**: Verified via bot
- **Webhook**: Custom endpoint

### 3. Analytics Dashboard
- **Stats Cards**: Total, Pending, Sent, Active Channels
- **Charts**: Weekly/Monthly activity visualization
- **Recent Activity**: Last 5 reminders
- **Channel Status**: Active channels sidebar

### 4. Calendar View
- **Month Grid**: Visual overview of scheduled reminders
- **Day Details**: Click day to see all reminders
- **Quick Actions**: Create/edit reminders directly from calendar

## 🔐 Authentication

### Clerk Integration
```typescript
// Protected routes
<ProtectedRoute>
  <Dashboard />
</ProtectedRoute>

// Auth state
const { isSignedIn, user } = useUser();

// API authentication (automatic)
// Token injected via Axios interceptor in api.ts
```

## 🎨 Theming

### Dark Mode Support
```typescript
// Theme Provider
<ThemeProvider defaultTheme="system">
  <App />
</ThemeProvider>

// Theme Toggle
const { theme, setTheme } = useTheme();
setTheme("dark" | "light" | "system");
```

### Custom CSS Variables
All colors defined in `index.css`:
```css
:root {
  --background: 0 0% 100%;
  --foreground: 0 0% 3.9%;
  --primary: 217 91% 60%;
  /* ... */
}

.dark {
  --background: 0 0% 3.9%;
  --foreground: 0 0% 98%;
  /* ... */
}
```

## 📊 Performance

### Optimizations
1. **Code Splitting**: Route-based lazy loading
2. **React Query**: Intelligent caching & deduplication
3. **Memoization**: Strategic use of `useMemo`, `useCallback`
4. **Optimistic Updates**: Immediate UI updates before server response
5. **Image Optimization**: WebP format, lazy loading

### Bundle Size
- Main chunk: ~1.2MB (minified)
- Recommendation: Implement dynamic imports for heavy dependencies

## 🧪 Testing Strategy

### Recommended Testing Stack
```bash
# Unit Tests
- Vitest + React Testing Library

# E2E Tests
- Playwright or Cypress

# Type Safety
- TypeScript (strict mode)
```

## 🚀 Deployment

### Build Command
```bash
npm run build
# Output: /dist/
```

### Environment Variables
```env
VITE_CLERK_PUBLISHABLE_KEY=pk_test_xxx
VITE_API_URL=http://localhost:8000
```

### Vercel Configuration
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite"
}
```

## 🔮 Future Improvements

### Short Term
- [ ] Implement dynamic imports for charts (reduce initial bundle)
- [ ] Add unit tests for hooks
- [ ] Implement E2E tests for critical paths
- [ ] Add error boundaries

### Long Term
- [ ] Offline support (PWA)
- [ ] Real-time updates (WebSockets)
- [ ] Recurring reminders
- [ ] Reminder templates
- [ ] Team collaboration features

## 📝 Development Guidelines

### Code Style
1. **TypeScript**: Strict mode, explicit types
2. **Components**: Functional components with hooks
3. **Naming**: 
   - Components: PascalCase
   - Hooks: camelCase with `use` prefix
   - Utils: camelCase
   - Constants: UPPER_SNAKE_CASE
4. **File Structure**: Feature-based grouping

### Git Workflow
```bash
# Feature branch
git checkout -b feature/add-recurring-reminders

# Commit convention
git commit -m "feat: add recurring reminder support"
git commit -m "fix: correct date picker timezone issue"
git commit -m "docs: update API documentation"
```

### Pull Request Checklist
- [ ] Code follows style guidelines
- [ ] TypeScript types are correct
- [ ] Components are responsive
- [ ] Dark mode works correctly
- [ ] No console.log statements
- [ ] Linter passes (`npm run lint`)
- [ ] Build succeeds (`npm run build`)

## 📚 Resources

- [React Documentation](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Shadcn/ui](https://ui.shadcn.com/)
- [TanStack Query](https://tanstack.com/query/latest)
- [Clerk Authentication](https://clerk.com/docs)

---

**Last Updated**: January 2024  
**Maintainer**: Development Team  
**Version**: 1.0.0

