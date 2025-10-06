# 🏗️ Frontend Architecture

## 📁 Project Structure

```
src/
├── components/          # React components
│   ├── common/         # Reusable UI components
│   │   ├── Modal.tsx          # Generic modal wrapper
│   │   ├── PageHeader.tsx     # Page header component
│   │   ├── LoadingState.tsx   # Loading spinner
│   │   ├── ErrorState.tsx     # Error display
│   │   └── FormField.tsx      # Form input components
│   ├── reminder/       # Reminder-specific components
│   │   ├── QuickScheduleButtons.tsx
│   │   └── ChannelSelector.tsx
│   ├── ChannelModal.tsx       # Channel creation/validation modal
│   ├── ChannelsList.tsx
│   ├── Navbar.tsx
│   ├── OutputChannels.tsx
│   ├── ProtectedRoute.tsx     # Auth wrapper for routes
│   ├── ReminderFormModal.tsx  # Reminder creation/edit modal
│   ├── ReminderTable.tsx
│   ├── Sidebar.tsx
│   ├── StatsCard.tsx
│   └── StatusBadge.tsx
├── config/             # App configuration
│   └── themes.ts
├── constants/          # Application constants
│   ├── animations.ts   # Framer Motion variants
│   ├── time.ts
│   └── index.ts
├── contexts/           # React Context providers
│   ├── ModalContext.tsx  # Global modal state management
│   └── index.ts
├── hooks/              # Custom React hooks
│   ├── useChannelForm.ts   # Channel form logic
│   ├── useOutputs.ts       # Channel/Output operations (React Query)
│   ├── useReminderForm.ts  # Reminder form logic
│   ├── useReminders.ts     # Reminder operations (React Query)
│   └── useTheme.ts
├── layouts/            # Page layouts
│   └── MainLayout.tsx  # Main app layout with nav/sidebar
├── lib/                # External library configurations
│   ├── api.ts          # Axios instance & interceptors
│   └── queryClient.ts  # React Query configuration
├── pages/              # Route pages
│   ├── Channels.tsx    # Channel management page
│   ├── Dashboard.tsx   # Main dashboard
│   ├── Landing.tsx     # Public landing page
│   ├── Reminders.tsx   # Reminders list page
│   └── Settings.tsx    # User settings (Clerk)
├── types/              # TypeScript type definitions
│   └── reminder.types.ts
├── utils/              # Utility functions
│   ├── dateHelpers.ts
│   ├── errorHandler.ts
│   ├── reminder-helpers.ts
│   └── toast.tsx
├── App.tsx             # Main app with routing
├── main.tsx            # App entry point
└── index.css           # Global styles
```

---

## 🎯 Design Principles

### **1. Separation of Concerns**

- **Components**: UI rendering only
- **Hooks**: Data fetching & state management
- **Contexts**: Global state (modals, theme)
- **Utils**: Pure functions for transformations
- **Constants**: Centralized configuration

### **2. DRY (Don't Repeat Yourself)**

- Reusable components in `components/common/`
- Shared animations in `constants/animations.ts`
- Centralized constants in `constants/index.ts`
- Type definitions in one place
- **ModalContext** eliminates modal state duplication
- **ProtectedRoute** eliminates auth wrapper duplication

### **3. KISS (Keep It Simple, Stupid)**

- Components do one thing well
- Clear naming conventions
- No over-engineering
- **No "trigger" anti-patterns** (eliminated in refactoring)
- **No excessive prop drilling** (use Context when appropriate)

### **4. Clean Code**

- Consistent formatting (Prettier)
- TypeScript strict mode
- Descriptive variable names
- Comments for complex logic
- Maximum file size: ~200 lines (refactored when larger)

---

## 🔄 Data Flow

### **API Data Flow**

```
┌─────────────┐
│   Pages     │  ← Smart components: orchestrate data & UI
└──────┬──────┘
       │
       ▼
┌─────────────┐
│   Hooks     │  ← React Query hooks (API calls, caching, state)
│ (useReminders
│  useOutputs) │
└──────┬──────┘
       │
       ▼
┌─────────────┐
│   lib/api   │  ← Axios instance (HTTP client)
└──────┬──────┘
       │
       ▼
┌─────────────┐
│   Django    │  ← Backend API
│   Backend   │
└─────────────┘
```

### **Modal State Flow**

```
┌──────────────────┐
│  ModalContext    │  ← Single source of truth for modal state
│  (Context API)   │
└────────┬─────────┘
         │
    ┌────┴────┐
    │         │
    ▼         ▼
┌────────┐ ┌────────────┐
│ Sidebar│ │   Pages    │  ← Any component can open modals
│ (open) │ │   (open)   │
└────────┘ └────────────┘
    │         │
    └────┬────┘
         │
         ▼
┌──────────────────┐
│  Modal Components│  ← Listen to context, render when open
│ (ReminderModal,  │
│  ChannelModal)   │
└──────────────────┘
```

**Key Benefits:**

- ✅ No prop drilling (no passing callbacks through 3+ levels)
- ✅ No "trigger" anti-pattern (no counters to trigger actions)
- ✅ Any component can open/close modals directly
- ✅ Single source of truth for modal state

---

## 🎨 Component Patterns

### **Smart Components** (Pages)

- Handle data fetching
- Manage local state
- Pass data to dumb components

```tsx
// Example: pages/Dashboard.tsx
function Dashboard() {
  const { data: reminders } = useReminders(); // ← Fetch data
  const { openReminderModal } = useModals(); // ← Get modal actions

  return <ReminderTable reminders={reminders} />; // ← Pass to dumb component
}
```

### **Dumb Components** (UI)

- Receive props
- Render UI
- No data fetching
- Minimal state (UI-only)

```tsx
// Example: components/ReminderTable.tsx
function ReminderTable({ reminders }: { reminders: Reminder[] }) {
  return <table>...</table>; // ← Just render
}
```

### **Common Components** (Reusable)

- Generic, configurable
- Used across the app
- Well-documented props

```tsx
// Example: components/common/Modal.tsx
<Modal isOpen={true} title="Edit" onClose={() => {}}>
  <p>Content</p>
</Modal>
```

### **Layout Components**

- Provide consistent structure
- Handle responsive behavior
- Manage global UI elements

```tsx
// Example: components/common/PageHeader.tsx
<PageHeader
  title="Reminders"
  subtitle="Manage your reminders"
  action={<button>New</button>}
/>
```

---

## 🪝 Hooks Pattern

### **Data Hooks** (React Query)

All API operations use React Query hooks:

```tsx
// hooks/useReminders.ts
export const useReminders = () => {
  return useQuery({
    queryKey: ["reminders"],
    queryFn: async () => {
      const { data } = await api.get("/reminders/");
      return data.reminders;
    },
  });
};

export const useCreateReminder = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (reminder) => await api.post("/reminders/", reminder),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reminders"] }); // ← Auto-refresh
    },
  });
};
```

**Benefits:**

- ✅ Automatic caching
- ✅ Auto-refresh on mutations
- ✅ Loading & error states
- ✅ Retry logic

### **Form Hooks** (Business Logic)

Separate form logic from UI rendering:

```tsx
// hooks/useReminderForm.ts
export const useReminderForm = ({ mode, reminder, onSuccess }) => {
  const [reminderText, setReminderText] = useState("");
  const [scheduledAt, setScheduledAt] = useState("");
  // ... all form state and validation logic

  const handleSubmit = async (e) => {
    // ... submission logic
  };

  return { reminderText, setReminderText, handleSubmit, ... };
};
```

**Benefits:**

- ✅ Testable without rendering UI
- ✅ Reusable across different forms
- ✅ Keeps components focused on rendering

### **Context Hooks** (Global State)

Access global state without prop drilling:

```tsx
// contexts/ModalContext.tsx
export const useModals = () => {
  const context = useContext(ModalContext);
  return {
    openReminderModal: (reminder) => ...,
    closeReminderModal: () => ...,
    openChannelModal: (channel) => ...,
    closeChannelModal: () => ...,
  };
};
```

**Benefits:**

- ✅ No prop drilling
- ✅ Accessible from any component
- ✅ Type-safe with TypeScript

---

## 🎭 Animation Strategy

All animations are centralized in `constants/animations.ts`:

```tsx
import { fadeIn, staggerContainer } from "../constants/animations";

<motion.div variants={fadeIn} initial="initial" animate="animate">
  Content
</motion.div>;
```

**Why?**

- ✅ Consistent animations
- ✅ Easy to modify globally
- ✅ Reusable across components

---

## 🔐 Authentication Flow

```
User → Clerk (modal) → JWT token → Axios interceptor → Backend
```

1. User signs in via Clerk modal
2. Clerk provides JWT token
3. Axios interceptor adds token to all requests
4. Django verifies token with Clerk

**Route Protection:**

```tsx
// Using ProtectedRoute wrapper
<Route
  path="/dashboard"
  element={
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  }
/>
```

---

## 📝 Naming Conventions

### **Files**

- Components: `PascalCase.tsx` (e.g., `ReminderTable.tsx`)
- Hooks: `camelCase.ts` with `use` prefix (e.g., `useReminders.ts`)
- Utils: `kebab-case.ts` (e.g., `reminder-helpers.ts`)
- Contexts: `PascalCase.tsx` with `Context` suffix (e.g., `ModalContext.tsx`)

### **Variables**

- React components: `PascalCase`
- Functions: `camelCase`
- Constants: `UPPER_SNAKE_CASE`
- Types/Interfaces: `PascalCase`

### **React Query Keys**

- Always array: `["reminders"]`, `["reminders", id]`
- Hierarchical: `["outputs", "validation"]`

---

## 🚀 Performance Optimization

### **React Query**

- Automatic caching (5 min stale time)
- Refetch on window focus
- Retry failed requests

### **Code Splitting**

- Lazy load routes
- Dynamic imports for modals (if needed)

### **Optimizations Applied**

- ✅ Framer Motion animations optimized
- ✅ React Query caching
- ✅ Memoized expensive calculations (when needed)
- ✅ Eliminated unnecessary re-renders (Context usage)

---

## 📚 Key Dependencies

| Dependency        | Purpose                 |
| ----------------- | ----------------------- |
| **React**         | UI framework            |
| **TypeScript**    | Type safety             |
| **Vite**          | Build tool              |
| **React Router**  | Navigation              |
| **React Query**   | Server state management |
| **Axios**         | HTTP client             |
| **Clerk**         | Authentication          |
| **Framer Motion** | Animations              |
| **Tailwind CSS**  | Styling                 |
| **DaisyUI**       | UI components           |
| **Lucide React**  | Icons                   |

---

## 🔧 Adding New Features

### **1. New Page**

1. Create file in `pages/`
2. Add route in `App.tsx` with `<ProtectedRoute>`
3. Add link in `Sidebar.tsx`

```tsx
// App.tsx
<Route
  path="/new-page"
  element={
    <ProtectedRoute>
      <NewPage />
    </ProtectedRoute>
  }
/>
```

### **2. New Modal**

1. Add modal state to `ModalContext.tsx`
2. Create modal component using `<Modal>` wrapper
3. Render modal in `MainLayout.tsx`
4. Use `useModals()` to open/close from any component

```tsx
// contexts/ModalContext.tsx
const { openNewModal, closeNewModal } = useModals();

// Any component
<button onClick={() => openNewModal()}>Open</button>;
```

### **3. New API Endpoint**

1. Add types in `types/reminder.types.ts`
2. Create hook in `hooks/` using React Query
3. Use hook in page/component

```tsx
// hooks/useNewFeature.ts
export const useNewFeature = () => {
  return useQuery({
    queryKey: ["newFeature"],
    queryFn: async () => {
      const { data } = await api.get("/new-feature/");
      return data;
    },
  });
};
```

### **4. New Reusable Component**

1. Create in `components/common/`
2. Export from `components/common/index.ts`
3. Add JSDoc comments
4. Keep it generic and configurable

---

## 📖 Best Practices

✅ **DO**

- Use TypeScript strict mode
- Write descriptive variable names
- Extract reusable logic into hooks/utils
- Use constants instead of magic values
- Add comments for complex logic
- Use Context for global state (modals, theme)
- Use ProtectedRoute for authenticated routes
- Keep components under 200 lines
- Use generic Modal component for consistency

❌ **DON'T**

- Fetch data in components (use hooks)
- Duplicate code (DRY principle)
- Use `any` type in TypeScript
- Put business logic in components
- Hardcode URLs, strings, numbers
- Pass callbacks through 3+ levels (use Context)
- Use "trigger" counters to open modals
- Create custom modals without using `<Modal>` wrapper

---

## 🔄 Recent Refactoring (December 2024)

### **Major Changes:**

1. **Modal System Refactored**

   - ✅ Created `ModalContext` for centralized modal state
   - ✅ Eliminated "trigger" anti-pattern (no more counters)
   - ✅ Eliminated prop drilling (4 levels → direct access)
   - ✅ All modals use generic `<Modal>` component

2. **Route Protection Simplified**

   - ✅ Created `ProtectedRoute` component
   - ✅ Eliminated 160 lines of duplicated code
   - ✅ DRY principle applied to routing

3. **Common Components Extracted**

   - ✅ `PageHeader` for consistent page headers
   - ✅ `LoadingState` for consistent loading UI
   - ✅ `ErrorState` for consistent error display

4. **App.tsx Simplified**
   - ✅ 183 lines → 60 lines (67% reduction)
   - ✅ No more trigger state management
   - ✅ No more callback prop drilling

### **Code Quality Improvements:**

- 🎯 **Lines of Code Reduced:** ~500 lines removed
- 🎯 **Files Refactored:** 10+ files simplified
- 🎯 **New Patterns:** Context API, ProtectedRoute
- 🎯 **Code Duplication:** Significantly reduced

---

## 📚 Learning Resources

For developers new to React:

- **Hooks**: Reusable functions that manage state/side-effects
- **Context**: Global state without prop drilling
- **React Query**: Server state management (caching, refetching)
- **Custom Hooks**: Extract business logic from components

**Key Concept:**

> "A component should focus on rendering UI. Business logic, data fetching, and state management belong in hooks."

---

**Need help? Check `SETUP.md` and `CONNEXION_API.md`!**
