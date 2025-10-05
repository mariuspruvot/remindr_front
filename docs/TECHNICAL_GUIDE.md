# 📚 Guide Technique Complet - Remindr Frontend

**Pour** : Marius (Backend Dev apprenant React/TypeScript)  
**Date** : 2025-10-05  
**Stack** : React + TypeScript + Tailwind + React Query + Vite

---

## 📖 Table des Matières

1. [Vue d'ensemble de l'application](#vue-densemble)
2. [TypeScript - Les Fondamentaux](#typescript-fondamentaux)
3. [React - Les Concepts](#react-concepts)
4. [React Hooks - En Détail](#react-hooks)
5. [React Query - Data Fetching](#react-query)
6. [Architecture de l'App](#architecture-app)
7. [Patterns Utilisés](#patterns-utilises)
8. [Cheatsheet Rapide](#cheatsheet)

---

## 🎯 Vue d'ensemble de l'application {#vue-densemble}

### Qu'est-ce que Remindr ?

Une app de rappels avec notifications multi-canaux (email, WhatsApp).

### Stack Technique

```
Frontend
├── React 18          → Library UI
├── TypeScript        → Type safety
├── Vite             → Build tool (ultra rapide)
├── Tailwind CSS     → Utility-first CSS
├── DaisyUI          → Components Tailwind
├── React Query      → Data fetching + cache
├── Axios            → HTTP client
└── Clerk            → Authentication
```

### Architecture Globale

```
User (Browser)
    ↓
Clerk Auth (JWT Token)
    ↓
React App (SPA)
    ↓ (Axios + Interceptors)
Backend API (Django)
    ↓
PostgreSQL + Redis + Celery
```

---

## 📘 TypeScript - Les Fondamentaux {#typescript-fondamentaux}

### 1. **Qu'est-ce que TypeScript ?**

TypeScript = JavaScript + **Types statiques**

```typescript
// ❌ JavaScript (pas de types)
function add(a, b) {
  return a + b;
}
add(5, "10"); // "510" 😱 Bug silencieux !

// ✅ TypeScript (avec types)
function add(a: number, b: number): number {
  return a + b;
}
add(5, "10"); // ❌ Erreur de compilation !
```

**Avantage** : Les erreurs sont **détectées avant l'exécution** !

---

### 2. **Les Types de Base**

```typescript
// Types primitifs
let name: string = "Marius";
let age: number = 25;
let isActive: boolean = true;
let nothing: null = null;
let notDefined: undefined = undefined;

// Arrays
let numbers: number[] = [1, 2, 3];
let strings: Array<string> = ["a", "b", "c"];

// Objects
let user: { name: string; age: number } = {
  name: "Marius",
  age: 25,
};

// Any (à éviter !)
let anything: any = "peut être n'importe quoi"; // Pas de type checking !
```

---

### 3. **Interfaces vs Types**

#### Interface (pour les objets)

```typescript
// Dans ton app: src/types/reminder.types.ts
interface Output {
  uuid: string;
  output_type: OutputType;
  identifier: string;
  confirmed: boolean;
  primary: boolean;
}

// Utilisation
const channel: Output = {
  uuid: "abc-123",
  output_type: "email",
  identifier: "user@email.com",
  confirmed: true,
  primary: false,
};
```

#### Type Alias (plus flexible)

```typescript
// Union types
type OutputType = "email" | "whatsapp" | "telegram" | "webhook";

// Intersection
type User = { name: string } & { age: number };
// Équivalent à: { name: string; age: number }

// Type function
type OnClick = (event: React.MouseEvent) => void;
```

**Quand utiliser quoi ?**

- **Interface** : Objets, React props
- **Type** : Unions, intersections, primitives

---

### 4. **Generics - Types Paramétrés**

Les generics permettent de créer des types **réutilisables**.

```typescript
// Generic function
function identity<T>(value: T): T {
  return value;
}

identity<string>("hello"); // T = string
identity<number>(42); // T = number

// Generic interface
interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
}

// Utilisation
const reminderResponse: ApiResponse<Reminder> = {
  data: {
    /* reminder object */
  },
  status: 200,
  message: "Success",
};

const outputResponse: ApiResponse<Output[]> = {
  data: [
    /* array of outputs */
  ],
  status: 200,
  message: "Success",
};
```

**Dans ton app** :

```typescript
// hooks/useReminders.ts
export const useReminders = () => {
  return useQuery<Reminder[]>({
    // Generic : données = Reminder[]
    queryKey: ["reminders"],
    queryFn: fetchReminders,
  });
};
```

---

### 5. **Type Inference (Inférence)**

TypeScript peut **deviner** les types !

```typescript
// Type explicite
let name: string = "Marius";

// Type inféré (TS devine que c'est un string)
let name = "Marius"; // name: string

// Inférence dans les fonctions
const add = (a: number, b: number) => a + b;
// TypeScript sait que add retourne un number !

const result = add(5, 3); // result: number (inféré)
```

**Best practice** : Laisser TS inférer quand c'est évident, typer explicitement quand c'est ambigu.

---

### 6. **Type Guards**

Vérifier les types à runtime.

```typescript
// typeof guard
function processValue(value: string | number) {
  if (typeof value === "string") {
    // TS sait que value est un string ici
    return value.toUpperCase();
  } else {
    // TS sait que value est un number ici
    return value * 2;
  }
}

// Custom type guard
function isOutput(obj: any): obj is Output {
  return (
    obj && typeof obj.uuid === "string" && typeof obj.output_type === "string"
  );
}

// Utilisation
if (isOutput(data)) {
  // TS sait que data est de type Output
  console.log(data.uuid);
}
```

---

### 7. **Optional & Nullable**

```typescript
interface Reminder {
  uuid: string;
  reminder_text: string;
  target_url?: string; // Optional (peut être undefined)
  expires_at: string | null; // Nullable (peut être null)
}

// Utilisation
const reminder: Reminder = {
  uuid: "123",
  reminder_text: "Buy milk",
  // target_url: non fourni = OK (optional)
  expires_at: null, // null = OK
};

// Optional chaining
console.log(reminder.target_url?.toUpperCase());
// Si target_url est undefined, retourne undefined (pas d'erreur)

// Nullish coalescing
const url = reminder.target_url ?? "default-url";
// Si target_url est null/undefined, utilise "default-url"
```

---

## ⚛️ React - Les Concepts {#react-concepts}

### 1. **Qu'est-ce que React ?**

React = **Library** pour construire des UIs avec des **composants**.

**Concept clé** : L'UI est une **fonction de l'état**.

```
UI = f(state)
```

Quand l'état change → React re-calcule l'UI → Met à jour le DOM.

---

### 2. **Composants : Les Briques de Base**

#### Composant Fonction (moderne, recommandé)

```typescript
// components/StatusBadge.tsx
interface StatusBadgeProps {
  sent: boolean;
}

function StatusBadge({ sent }: StatusBadgeProps) {
  return (
    <span className={sent ? "badge-success" : "badge-warning"}>
      {sent ? "Sent" : "Pending"}
    </span>
  );
}

export default StatusBadge;
```

**Anatomie** :

1. **Props** : Paramètres passés au composant (comme args de fonction)
2. **Return** : JSX à afficher
3. **Export** : Rendre le composant utilisable ailleurs

---

### 3. **JSX : JavaScript + XML**

JSX = Syntaxe pour écrire du HTML dans JS.

```tsx
// ❌ Sans JSX (React.createElement)
return React.createElement(
  "div",
  { className: "card" },
  React.createElement("h1", null, "Title"),
  React.createElement("p", null, "Content")
);

// ✅ Avec JSX (plus lisible !)
return (
  <div className="card">
    <h1>Title</h1>
    <p>Content</p>
  </div>
);
```

#### Règles JSX

```tsx
// 1. Un seul élément parent
return (
  <>
    {" "}
    {/* Fragment : enveloppe sans créer de div */}
    <h1>Title</h1>
    <p>Content</p>
  </>
);

// 2. Expressions JS entre accolades
const name = "Marius";
return <h1>Hello {name}!</h1>;

// 3. className au lieu de class
return <div className="card">Content</div>;

// 4. htmlFor au lieu de for
return <label htmlFor="input-id">Label</label>;

// 5. Self-closing tags
return <input type="text" />; // Pas <input type="text"></input>

// 6. Conditions
return (
  <div>
    {isLoading ? <Loader /> : <Content />}
    {error && <ErrorMessage />}
  </div>
);

// 7. Listes avec key
return (
  <ul>
    {items.map((item) => (
      <li key={item.id}>{item.name}</li>
    ))}
  </ul>
);
```

---

### 4. **Props : Communication Parent → Enfant**

Les props sont **read-only** (immutables).

```tsx
// Parent
function Dashboard() {
  const reminders = [
    /* ... */
  ];

  return (
    <ReminderTable
      reminders={reminders}
      onEdit={(reminder) => console.log("Edit", reminder)}
      onDelete={(id) => console.log("Delete", id)}
    />
  );
}

// Enfant
interface ReminderTableProps {
  reminders: Reminder[];
  onEdit: (reminder: Reminder) => void;
  onDelete: (id: string) => void;
}

function ReminderTable({ reminders, onEdit, onDelete }: ReminderTableProps) {
  return (
    <table>
      {reminders.map((reminder) => (
        <tr key={reminder.uuid}>
          <td>{reminder.reminder_text}</td>
          <td>
            <button onClick={() => onEdit(reminder)}>Edit</button>
            <button onClick={() => onDelete(reminder.uuid)}>Delete</button>
          </td>
        </tr>
      ))}
    </table>
  );
}
```

**Pattern** : Props "down", Events "up" !

---

### 5. **State : Données Réactives**

Le **state** est une variable qui, quand elle change, **déclenche un re-render**.

```tsx
import { useState } from "react";

function Counter() {
  // useState retourne [valeur, fonction pour changer la valeur]
  const [count, setCount] = useState(0); // État initial = 0

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>+</button>
      <button onClick={() => setCount(count - 1)}>-</button>
    </div>
  );
}
```

**Règles importantes** :

1. **Immutable** : Ne jamais modifier le state directement
2. **Async** : `setState` est asynchrone
3. **Functional updates** : Pour updates basés sur l'état précédent

```tsx
// ❌ Mauvais
setCount(count + 1);
setCount(count + 1); // Ajoute seulement 1 (pas 2) !

// ✅ Bon
setCount((prev) => prev + 1);
setCount((prev) => prev + 1); // Ajoute bien 2 !
```

---

### 6. **Events : Gestion des Événements**

```tsx
function FormExample() {
  const [text, setText] = useState("");

  // Typage de l'event
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Empêche le rechargement de la page
    console.log("Submitted:", text);
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log("Clicked at", e.clientX, e.clientY);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={text} onChange={handleChange} />
      <button onClick={handleClick}>Submit</button>
    </form>
  );
}
```

**Events React courants** :

- `onClick` → Click sur un élément
- `onChange` → Changement d'input
- `onSubmit` → Soumission de formulaire
- `onKeyDown` → Touche clavier
- `onFocus` / `onBlur` → Focus/perte de focus

---

### 7. **Conditional Rendering**

```tsx
function ReminderStatus({ sent, error }: { sent: boolean; error?: string }) {
  // 1. If/else
  if (error) {
    return <div className="alert-error">{error}</div>;
  }

  // 2. Ternary
  return (
    <div>
      {sent ? (
        <span className="badge-success">Sent</span>
      ) : (
        <span className="badge-warning">Pending</span>
      )}
    </div>
  );

  // 3. Logical AND (pour affichage conditionnel)
  return (
    <div>
      {error && <div className="alert-error">{error}</div>}
      {sent && <CheckIcon />}
    </div>
  );
}
```

---

### 8. **Lists & Keys**

```tsx
function ReminderList({ reminders }: { reminders: Reminder[] }) {
  return (
    <ul>
      {reminders.map((reminder) => (
        <li key={reminder.uuid}>
          {" "}
          {/* KEY = IMPORTANT ! */}
          <h3>{reminder.reminder_text}</h3>
          <p>{reminder.scheduled_at}</p>
        </li>
      ))}
    </ul>
  );
}
```

**Pourquoi `key` ?**

- React utilise `key` pour identifier quel élément a changé
- **Performance** : Évite de re-render tous les éléments
- **État** : Préserve l'état des composants dans la liste

**Règles** :

- ✅ `key` doit être **unique** dans la liste
- ✅ `key` doit être **stable** (pas d'index si la liste change)
- ❌ Ne pas utiliser l'index comme key si la liste est triée/filtrée

---

## 🎣 React Hooks - En Détail {#react-hooks}

Les hooks permettent d'utiliser state et lifecycle dans les **composants fonctions**.

### 1. **useState - State Local**

```tsx
const [state, setState] = useState(initialValue);
```

#### Exemples tirés de ton app

```tsx
// components/ReminderFormModal.tsx (AVANT refactoring)
const [reminderText, setReminderText] = useState("");
const [targetUrl, setTargetUrl] = useState("");
const [scheduledAt, setScheduledAt] = useState("");

// Mise à jour
<input
  value={reminderText}
  onChange={(e) => setReminderText(e.target.value)}
/>;
```

#### État avec objet (immutable updates)

```tsx
const [form, setForm] = useState({
  name: "",
  email: "",
});

// ❌ Mauvais (mutation)
form.name = "Marius";

// ✅ Bon (nouveau objet)
setForm({ ...form, name: "Marius" });

// ✅ Encore mieux (functional update)
setForm((prev) => ({ ...prev, name: "Marius" }));
```

---

### 2. **useEffect - Side Effects**

`useEffect` = Exécuter du code lors du **lifecycle** du composant.

```tsx
useEffect(() => {
  // Code à exécuter
  return () => {
    // Cleanup (optionnel)
  };
}, [dependencies]);
```

#### Cas d'usage

```tsx
// 1. Exécuter au mount (une seule fois)
useEffect(() => {
  console.log("Component mounted!");
}, []); // ← Dependencies vide = exécute 1 fois

// 2. Exécuter quand une variable change
useEffect(() => {
  console.log("Count changed:", count);
}, [count]); // ← S'exécute quand count change

// 3. Cleanup (abonnements, timers)
useEffect(() => {
  const timer = setInterval(() => {
    console.log("Tick");
  }, 1000);

  return () => {
    clearInterval(timer); // Cleanup quand composant unmount
  };
}, []);

// 4. Fetch de données (dans ton app, avant React Query)
useEffect(() => {
  async function fetchReminders() {
    const response = await api.get("/reminders/");
    setReminders(response.data);
  }

  if (isOpen) {
    fetchReminders();
  }
}, [isOpen]);
```

#### Dans ton app (après refactoring)

```tsx
// hooks/useReminderForm.ts
useEffect(() => {
  if (mode === "edit" && reminder) {
    // Load existing reminder data
    setReminderText(reminder.reminder_text);
    setTargetUrl(reminder.target_url || "");
    setScheduledAt(isoToDateTimeLocal(reminder.scheduled_at));
  } else if (isOpen) {
    // Create mode: set defaults
    setScheduledAt(getDefaultScheduleTime());
  }
}, [mode, reminder, isOpen]); // ← Re-exécute si ces valeurs changent
```

---

### 3. **useRef - Références Persistantes**

`useRef` crée une référence **qui persiste entre les renders** sans déclencher de re-render.

```tsx
const ref = useRef(initialValue);
```

#### Cas d'usage

```tsx
// 1. Référencer un élément DOM
function TextInput() {
  const inputRef = useRef<HTMLInputElement>(null);

  const focusInput = () => {
    inputRef.current?.focus(); // Accès direct au DOM
  };

  return (
    <div>
      <input ref={inputRef} type="text" />
      <button onClick={focusInput}>Focus</button>
    </div>
  );
}

// 2. Stocker une valeur sans re-render
function Timer() {
  const countRef = useRef(0);

  const increment = () => {
    countRef.current += 1; // Pas de re-render !
    console.log(countRef.current);
  };

  return <button onClick={increment}>Increment (no re-render)</button>;
}

// 3. Conserver la valeur précédente
function usePrevious<T>(value: T) {
  const ref = useRef<T>();

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
}
```

---

### 4. **useCallback - Mémoriser des Fonctions**

`useCallback` mémorise une fonction pour **éviter de la recréer** à chaque render.

```tsx
const memoizedCallback = useCallback(() => {
  // Fonction
}, [dependencies]);
```

#### Exemple

```tsx
function Parent() {
  const [count, setCount] = useState(0);

  // ❌ Sans useCallback : nouvelle fonction à chaque render
  const handleClick = () => {
    console.log("Clicked");
  };

  // ✅ Avec useCallback : même fonction si dependencies inchangées
  const handleClick = useCallback(() => {
    console.log("Clicked", count);
  }, [count]); // ← Nouvelle fonction seulement si count change

  return <Child onClick={handleClick} />;
}

// Child ne re-render que si onClick change vraiment
const Child = React.memo(({ onClick }: { onClick: () => void }) => {
  console.log("Child rendered");
  return <button onClick={onClick}>Click</button>;
});
```

**Quand utiliser ?**

- Props passées à des composants mémorisés (`React.memo`)
- Dependencies d'autres hooks (`useEffect`, `useMemo`)
- Callbacks lourds

---

### 5. **useMemo - Mémoriser des Valeurs**

`useMemo` mémorise le **résultat** d'un calcul coûteux.

```tsx
const memoizedValue = useMemo(() => {
  // Calcul coûteux
  return result;
}, [dependencies]);
```

#### Exemple

```tsx
function ReminderList({ reminders }: { reminders: Reminder[] }) {
  // ❌ Sans useMemo : filtrage à chaque render
  const pendingReminders = reminders.filter((r) => !r.sent);

  // ✅ Avec useMemo : recalcule seulement si reminders change
  const pendingReminders = useMemo(() => {
    console.log("Filtering reminders...");
    return reminders.filter((r) => !r.sent);
  }, [reminders]);

  return <div>{pendingReminders.length} pending</div>;
}
```

**Quand utiliser ?**

- Calculs coûteux (filtrage/tri de grosses listes)
- Créer des objets/arrays sans les recréer

**Attention** : Ne pas sur-optimiser ! Profiler d'abord.

---

### 6. **Custom Hooks - Réutiliser de la Logique**

Un custom hook = **fonction qui utilise d'autres hooks**.

#### Pattern de base

```tsx
// Nom commence toujours par "use"
function useCounter(initialValue: number = 0) {
  const [count, setCount] = useState(initialValue);

  const increment = () => setCount((c) => c + 1);
  const decrement = () => setCount((c) => c - 1);
  const reset = () => setCount(initialValue);

  return { count, increment, decrement, reset };
}

// Utilisation
function Counter() {
  const { count, increment, decrement, reset } = useCounter(10);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
}
```

#### Dans ton app : `useReminderForm`

```tsx
// hooks/useReminderForm.ts
export const useReminderForm = ({
  mode,
  reminder,
  isOpen,
  onSuccess,
  onClose,
}: UseReminderFormProps) => {
  // États
  const [reminderText, setReminderText] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Logique
  const handleSubmit = async (e: React.FormEvent) => {
    // ...
  };

  // Retourne tout ce dont le composant a besoin
  return {
    reminderText,
    setReminderText,
    isLoading,
    handleSubmit,
  };
};

// Utilisation dans le composant
function ReminderFormModal(props) {
  const form = useReminderForm(props);

  return (
    <form onSubmit={form.handleSubmit}>
      <input
        value={form.reminderText}
        onChange={(e) => form.setReminderText(e.target.value)}
      />
    </form>
  );
}
```

**Avantages** :

- ✅ Logique réutilisable
- ✅ Testable indépendamment
- ✅ Composant plus simple (UI seulement)

---

## 🌐 React Query - Data Fetching {#react-query}

React Query = Library pour **fetching, caching et synchronisation** de données serveur.

### Pourquoi React Query ?

#### Sans React Query

```tsx
function Reminders() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    fetch("/api/reminders")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return <div>{data.map(/* ... */)}</div>;
}
```

**Problèmes** :

- Pas de cache
- Pas de refetch automatique
- Beaucoup de boilerplate
- Gestion manuelle des états

#### Avec React Query

```tsx
function Reminders() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["reminders"],
    queryFn: fetchReminders,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return <div>{data.map(/* ... */)}</div>;
}
```

**Avantages** :

- ✅ Cache automatique
- ✅ Refetch en arrière-plan
- ✅ Dedupe requests
- ✅ Pagination / Infinite scroll
- ✅ Optimistic updates

---

### 1. **useQuery - Fetch de Données**

```tsx
const { data, isLoading, error, refetch } = useQuery({
  queryKey: ["key"], // Unique identifier
  queryFn: fetchFunction, // Fonction qui retourne une Promise
  options, // Config optionnelle
});
```

#### Dans ton app

```tsx
// hooks/useReminders.ts
export const useReminders = () => {
  return useQuery({
    queryKey: ["reminders"],
    queryFn: async () => {
      const { data } = await api.get<Reminder[]>("/reminders/");
      return data;
    },
  });
};

// Utilisation
function Dashboard() {
  const { data: reminders = [], isLoading, error } = useReminders();

  if (isLoading) return <Loader />;
  if (error) return <Error message={error.message} />;

  return (
    <div>
      {reminders.map((r) => (
        <ReminderCard key={r.uuid} reminder={r} />
      ))}
    </div>
  );
}
```

#### QueryKey : Le Cache

```tsx
// Même queryKey = même cache
useQuery({ queryKey: ["reminders"], queryFn: fetchReminders });
useQuery({ queryKey: ["reminders"], queryFn: fetchReminders }); // Utilise le cache !

// QueryKey avec paramètres
useQuery({
  queryKey: ["reminder", reminderId], // Cache distinct par ID
  queryFn: () => fetchReminder(reminderId),
});

// QueryKey hiérarchique
useQuery({
  queryKey: ["reminders", { status: "pending", page: 1 }],
  queryFn: () => fetchReminders({ status: "pending", page: 1 }),
});
```

---

### 2. **useMutation - Modifier des Données**

```tsx
const mutation = useMutation({
  mutationFn: postFunction,
  onSuccess: (data) => {
    /* ... */
  },
  onError: (error) => {
    /* ... */
  },
});

// Déclencher la mutation
mutation.mutate(variables);
```

#### Dans ton app

```tsx
// hooks/useReminders.ts
export const useCreateReminder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: ReminderCreateRequest) => {
      const response = await api.post<ReminderResponse>("/reminders/", data);
      return response.data;
    },
    onSuccess: () => {
      // Invalider le cache → Re-fetch automatique
      queryClient.invalidateQueries({ queryKey: ["reminders"] });
      showToast("Reminder created!", "success");
    },
    onError: (error) => {
      showToast("Failed to create reminder", "error");
    },
  });
};

// Utilisation
function ReminderForm() {
  const createReminder = useCreateReminder();

  const handleSubmit = async (formData) => {
    try {
      await createReminder.mutateAsync(formData);
      console.log("Success!");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* ... */}
      <button disabled={createReminder.isLoading}>
        {createReminder.isLoading ? "Creating..." : "Create"}
      </button>
    </form>
  );
}
```

---

### 3. **Invalidation de Cache**

Quand invalider le cache ? **Après une mutation !**

```tsx
const queryClient = useQueryClient();

// 1. Invalider une query spécifique
queryClient.invalidateQueries({ queryKey: ["reminders"] });

// 2. Invalider plusieurs queries
queryClient.invalidateQueries({ queryKey: ["reminders"] });
queryClient.invalidateQueries({ queryKey: ["outputs"] });

// 3. Invalider avec filtre
queryClient.invalidateQueries({
  queryKey: ["reminders"],
  predicate: (query) => query.queryKey[1] === "pending",
});
```

**Pattern dans ton app** :

```tsx
export const useDeleteReminder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (uuid: string) => {
      await api.delete(`/reminders/${uuid}`);
    },
    onSuccess: () => {
      // Re-fetch la liste des reminders
      queryClient.invalidateQueries({ queryKey: ["reminders"] });
      showToast("Reminder deleted!", "success");
    },
  });
};
```

---

### 4. **Optimistic Updates**

Mettre à jour l'UI **avant** la réponse du serveur.

```tsx
const updateReminder = useMutation({
  mutationFn: api.update,
  onMutate: async (newData) => {
    // 1. Annuler les refetches en cours
    await queryClient.cancelQueries({ queryKey: ["reminders"] });

    // 2. Snapshot de l'état actuel (pour rollback)
    const previousReminders = queryClient.getQueryData(["reminders"]);

    // 3. Mettre à jour le cache de manière optimiste
    queryClient.setQueryData(["reminders"], (old) => {
      return old.map((r) => (r.uuid === newData.uuid ? newData : r));
    });

    // 4. Retourner le snapshot pour rollback
    return { previousReminders };
  },
  onError: (err, variables, context) => {
    // Rollback en cas d'erreur
    queryClient.setQueryData(["reminders"], context.previousReminders);
  },
  onSettled: () => {
    // Toujours refetch après mutation (succès ou erreur)
    queryClient.invalidateQueries({ queryKey: ["reminders"] });
  },
});
```

---

## 🏗️ Architecture de l'App {#architecture-app}

### Structure des Dossiers

```
src/
├── main.tsx                    ← Entry point
├── App.tsx                     ← Root component
├── index.css                   ← Global styles
│
├── components/                 ← UI Components
│   ├── Navbar.tsx
│   ├── Sidebar.tsx
│   ├── ReminderFormModal.tsx   ← Modal pour créer/éditer reminder
│   ├── ChannelModal.tsx        ← Modal pour ajouter un channel
│   ├── ReminderTable.tsx       ← Tableau de reminders
│   ├── ChannelsList.tsx        ← Liste de channels
│   ├── StatusBadge.tsx         ← Badge "Sent/Pending"
│   ├── StatsCard.tsx           ← Carte de stats
│   ├── OutputChannels.tsx      ← Affichage des channels
│   │
│   ├── reminder/               ← Sous-composants reminder
│   │   ├── QuickScheduleButtons.tsx
│   │   └── ChannelSelector.tsx
│   │
│   └── common/                 ← Composants réutilisables
│       ├── Modal.tsx
│       ├── FormField.tsx
│       └── index.ts
│
├── pages/                      ← Pages principales
│   ├── Landing.tsx             ← Page d'accueil (non authentifié)
│   ├── Dashboard.tsx           ← Dashboard principal
│   ├── Reminders.tsx           ← Page liste reminders
│   ├── Channels.tsx            ← Page gestion channels
│   └── Settings.tsx            ← Page paramètres
│
├── layouts/                    ← Layouts de page
│   └── MainLayout.tsx          ← Layout avec Navbar + Sidebar
│
├── hooks/                      ← Custom Hooks
│   ├── useReminders.ts         ← React Query hooks pour reminders
│   ├── useOutputs.ts           ← React Query hooks pour outputs
│   ├── useReminderForm.ts      ← Logique formulaire reminder
│   └── useChannelForm.ts       ← Logique formulaire channel
│
├── utils/                      ← Fonctions utilitaires
│   ├── dateHelpers.ts          ← Conversions de dates
│   ├── errorHandler.ts         ← Gestion d'erreurs
│   ├── reminder-helpers.ts     ← Helpers pour reminders
│   └── toast.tsx               ← Notifications toast
│
├── constants/                  ← Constantes
│   ├── time.ts                 ← Constantes de temps
│   ├── animations.ts           ← Animations Framer Motion
│   └── index.ts
│
├── types/                      ← Types TypeScript
│   └── reminder.types.ts       ← Interfaces Reminder, Output, etc.
│
└── lib/                        ← Configuration externe
    ├── api.ts                  ← Axios instance + interceptors
    └── queryClient.ts          ← React Query client config
```

---

### Flow de Données

```
1. USER ACTION
   ↓
2. EVENT HANDLER (onClick, onSubmit, etc.)
   ↓
3. CUSTOM HOOK (useReminderForm, useCreateReminder, etc.)
   ↓
4. REACT QUERY (useMutation / useQuery)
   ↓
5. API CALL (Axios)
   ↓
6. BACKEND (Django API)
   ↓
7. RESPONSE
   ↓
8. CACHE UPDATE (React Query)
   ↓
9. RE-RENDER (React)
   ↓
10. UI UPDATE
```

#### Exemple concret : Créer un Reminder

```tsx
// 1. USER clique "Create Reminder"
<button onClick={onNewReminder}>New Reminder</button>

// 2. Modal s'ouvre
<ReminderFormModal mode="create" isOpen={true} />

// 3. USER remplit le formulaire et submit
<form onSubmit={form.handleSubmit}>

// 4. Hook useReminderForm gère la soumission
const handleSubmit = async (e: React.FormEvent) => {
  const data = buildRequestPayload();
  await createMutation.mutateAsync(data); // ← React Query mutation
};

// 5. Hook useCreateReminder fait l'appel API
export const useCreateReminder = () => {
  return useMutation({
    mutationFn: async (data: ReminderCreateRequest) => {
      const response = await api.post<ReminderResponse>("/reminders/", data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reminders"] });
      showToast("Reminder created!", "success");
    },
  });
};

// 6. Axios envoie la requête avec le token
// lib/api.ts - Interceptor ajoute le header Authorization

// 7. Backend traite et retourne la réponse

// 8. React Query met à jour le cache

// 9. Composant Dashboard re-render avec les nouvelles données

// 10. UI affiche le nouveau reminder
```

---

## 🎨 Patterns Utilisés {#patterns-utilises}

### 1. **Composition de Composants**

Construire des composants complexes à partir de petits composants simples.

```tsx
// ❌ Monolithe (tout dans un composant)
function ReminderCard({ reminder }) {
  return (
    <div className="card">
      <h3>{reminder.reminder_text}</h3>
      <span className={reminder.sent ? "success" : "pending"}>
        {reminder.sent ? "Sent" : "Pending"}
      </span>
      <div>
        {reminder.outputs.map((o) => (
          <span key={o.uuid}>{o.output_type}</span>
        ))}
      </div>
      <button onClick={onEdit}>Edit</button>
      <button onClick={onDelete}>Delete</button>
    </div>
  );
}

// ✅ Composition (petits composants réutilisables)
function ReminderCard({ reminder, onEdit, onDelete }) {
  return (
    <div className="card">
      <h3>{reminder.reminder_text}</h3>
      <StatusBadge sent={reminder.sent} />
      <OutputChannels outputs={reminder.outputs} variant="compact" />
      <CardActions onEdit={onEdit} onDelete={onDelete} />
    </div>
  );
}
```

---

### 2. **Container / Presentational Pattern**

Séparer logique (container) et UI (presentational).

```tsx
// Container (logique)
function RemindersContainer() {
  const { data: reminders, isLoading } = useReminders();
  const deleteReminder = useDeleteReminder();

  const handleDelete = async (id: string) => {
    await deleteReminder.mutateAsync(id);
  };

  return (
    <ReminderList
      reminders={reminders}
      isLoading={isLoading}
      onDelete={handleDelete}
    />
  );
}

// Presentational (UI seulement)
function ReminderList({ reminders, isLoading, onDelete }) {
  if (isLoading) return <Loader />;

  return (
    <ul>
      {reminders.map((r) => (
        <li key={r.uuid}>
          {r.reminder_text}
          <button onClick={() => onDelete(r.uuid)}>Delete</button>
        </li>
      ))}
    </ul>
  );
}
```

---

### 3. **Render Props**

Passer une fonction comme prop pour customiser le rendu.

```tsx
function DataFetcher({ url, children }) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setIsLoading(false);
      });
  }, [url]);

  return children({ data, isLoading });
}

// Utilisation
<DataFetcher url="/api/reminders">
  {({ data, isLoading }) =>
    isLoading ? <Loader /> : <ReminderList reminders={data} />
  }
</DataFetcher>;
```

---

### 4. **Compound Components**

Composants qui travaillent ensemble (comme `<select>` et `<option>`).

```tsx
// Composant parent
function Modal({ children, isOpen, onClose }) {
  if (!isOpen) return null;

  return <div className="modal">{children}</div>;
}

// Sous-composants
Modal.Header = function ModalHeader({ children }) {
  return <div className="modal-header">{children}</div>;
};

Modal.Body = function ModalBody({ children }) {
  return <div className="modal-body">{children}</div>;
};

Modal.Footer = function ModalFooter({ children }) {
  return <div className="modal-footer">{children}</div>;
};

// Utilisation
<Modal isOpen={true}>
  <Modal.Header>
    <h2>Title</h2>
  </Modal.Header>
  <Modal.Body>
    <p>Content</p>
  </Modal.Body>
  <Modal.Footer>
    <button>Close</button>
  </Modal.Footer>
</Modal>;
```

---

### 5. **Custom Hook Pattern**

Extraire la logique réutilisable dans des hooks.

```tsx
// Hook pour fetch + cache + refetch
function useApi<T>(url: string) {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const refetch = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetch(url);
      const data = await response.json();
      setData(data);
    } catch (err) {
      setError(err as Error);
    } finally {
      setIsLoading(false);
    }
  }, [url]);

  useEffect(() => {
    refetch();
  }, [refetch]);

  return { data, isLoading, error, refetch };
}

// Utilisation
function Reminders() {
  const { data, isLoading, error, refetch } =
    useApi<Reminder[]>("/api/reminders");

  if (isLoading) return <Loader />;
  if (error) return <Error message={error.message} />;

  return (
    <div>
      <button onClick={refetch}>Refresh</button>
      <ReminderList reminders={data} />
    </div>
  );
}
```

---

## 📝 Cheatsheet Rapide {#cheatsheet}

### TypeScript

```typescript
// Types de base
let str: string = "hello";
let num: number = 42;
let bool: boolean = true;
let arr: number[] = [1, 2, 3];
let tuple: [string, number] = ["hello", 42];

// Interface
interface User {
  name: string;
  age: number;
  email?: string; // Optional
}

// Type alias
type ID = string | number;
type Status = "pending" | "sent" | "failed";

// Generic
function identity<T>(value: T): T {
  return value;
}

// Type assertion
const input = document.getElementById("input") as HTMLInputElement;

// Union
let value: string | number = "hello";

// Intersection
type A = { name: string };
type B = { age: number };
type C = A & B; // { name: string; age: number }
```

---

### React Hooks

```tsx
// useState
const [state, setState] = useState(initialValue);
setState(newValue);
setState((prev) => prev + 1); // Functional update

// useEffect
useEffect(() => {
  // Side effect
  return () => {
    // Cleanup
  };
}, [dependencies]);

// useRef
const ref = useRef(initialValue);
ref.current = newValue;

// useCallback
const memoizedFn = useCallback(() => {
  // Function
}, [dependencies]);

// useMemo
const memoizedValue = useMemo(() => {
  return expensiveCalculation();
}, [dependencies]);

// Custom hook
function useCustomHook() {
  const [state, setState] = useState();
  // Logic...
  return { state, setState };
}
```

---

### React Query

```tsx
// Query (GET)
const { data, isLoading, error, refetch } = useQuery({
  queryKey: ["key"],
  queryFn: fetchFunction,
});

// Mutation (POST/PUT/DELETE)
const mutation = useMutation({
  mutationFn: postFunction,
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ["key"] });
  },
});

mutation.mutate(variables);
await mutation.mutateAsync(variables);

// Invalidate cache
queryClient.invalidateQueries({ queryKey: ["key"] });
```

---

### JSX

```tsx
// Expressions
<div>{variable}</div>
<div>{1 + 2}</div>
<div>{fn()}</div>

// Conditions
{condition && <Component />}
{condition ? <A /> : <B />}

// Lists
{items.map((item) => (
  <div key={item.id}>{item.name}</div>
))}

// Events
<button onClick={handleClick}>Click</button>
<input onChange={(e) => setValue(e.target.value)} />
<form onSubmit={handleSubmit}>...</form>

// Props
<Component prop1="value" prop2={variable} onClick={fn} />

// Children
<Parent>
  <Child />
</Parent>
```

---

### Common Patterns

```tsx
// Conditional rendering
{isLoading && <Loader />}
{error && <Error message={error.message} />}
{data && <Content data={data} />}

// Default props
function Component({ name = "Default" }) {
  return <div>{name}</div>;
}

// Destructuring props
function Component({ name, age, ...rest }) {
  return <div {...rest}>{name}, {age}</div>;
}

// Spread props
const props = { name: "Marius", age: 25 };
<Component {...props} />

// Children as function
<Component>
  {(data) => <div>{data}</div>}
</Component>
```

---

## 🎓 Concepts Avancés

### 1. **React.memo - Optimisation**

Évite les re-renders inutiles.

```tsx
// Sans memo : re-render à chaque fois que Parent re-render
function Child({ name }) {
  console.log("Child rendered");
  return <div>{name}</div>;
}

// Avec memo : re-render seulement si props changent
const Child = React.memo(function Child({ name }) {
  console.log("Child rendered");
  return <div>{name}</div>;
});
```

---

### 2. **Error Boundaries**

Capturer les erreurs React.

```tsx
class ErrorBoundary extends React.Component {
  state = { hasError: false };

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children;
  }
}

// Utilisation
<ErrorBoundary>
  <App />
</ErrorBoundary>;
```

---

### 3. **Context API**

Partager des données sans props drilling.

```tsx
// Créer le context
const ThemeContext = React.createContext("light");

// Provider
function App() {
  const [theme, setTheme] = useState("light");

  return (
    <ThemeContext.Provider value={theme}>
      <Child />
    </ThemeContext.Provider>
  );
}

// Consumer
function Child() {
  const theme = useContext(ThemeContext);
  return <div>Theme: {theme}</div>;
}
```

---

## 🚀 Best Practices

### 1. **Nommage**

```tsx
// ✅ Composants : PascalCase
function UserProfile() {}

// ✅ Hooks : camelCase, commence par "use"
function useAuth() {}

// ✅ Fonctions : camelCase
function handleClick() {}

// ✅ Constantes : UPPER_SNAKE_CASE
const API_URL = "https://api.example.com";

// ✅ Props : camelCase
<Component userName="Marius" onUserClick={fn} />;

// ✅ Types : PascalCase
interface UserData {}
type Status = "pending" | "sent";
```

---

### 2. **Structure de Fichiers**

```tsx
// ✅ Un composant par fichier
// components/ReminderCard.tsx
export default function ReminderCard() {}

// ✅ Index.ts pour exports groupés
// components/index.ts
export { default as ReminderCard } from "./ReminderCard";
export { default as StatusBadge } from "./StatusBadge";
```

---

### 3. **Props Typing**

```tsx
// ✅ Interface pour props
interface ButtonProps {
  label: string;
  onClick: () => void;
  disabled?: boolean;
  variant?: "primary" | "secondary";
}

function Button({
  label,
  onClick,
  disabled = false,
  variant = "primary",
}: ButtonProps) {
  return (
    <button onClick={onClick} disabled={disabled} className={`btn-${variant}`}>
      {label}
    </button>
  );
}
```

---

### 4. **Gestion d'Erreurs**

```tsx
// ✅ Try/catch dans les async functions
const handleSubmit = async () => {
  try {
    await mutation.mutateAsync(data);
    showToast("Success!", "success");
  } catch (error) {
    const message = getErrorMessage(error);
    showToast(message, "error");
  }
};

// ✅ Error state
const [error, setError] = useState<string | null>(null);

// ✅ Affichage
{
  error && <div className="alert-error">{error}</div>;
}
```

---

### 5. **Performance**

```tsx
// ✅ Éviter les fonctions inline dans les listes
{
  items.map((item) => (
    <Item key={item.id} onClick={() => handleClick(item.id)} /> // ❌ Nouvelle fonction à chaque render
  ));
}

// ✅ Utiliser useCallback
const handleClick = useCallback((id: string) => {
  console.log(id);
}, []);

{
  items.map((item) => (
    <Item key={item.id} onClick={() => handleClick(item.id)} />
  ));
}

// ✅ React.memo pour composants lourds
const ExpensiveComponent = React.memo(function ExpensiveComponent({ data }) {
  // ...
});
```

---

## 📚 Ressources

- **TypeScript** : https://www.typescriptlang.org/docs/
- **React** : https://react.dev/
- **React Query** : https://tanstack.com/query/latest
- **Tailwind CSS** : https://tailwindcss.com/docs

---

**Créé avec ❤️ pour Marius**  
**Date** : 2025-10-05
