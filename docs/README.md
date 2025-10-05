# 📚 Documentation Remindr Frontend

Bienvenue dans la documentation complète du frontend Remindr !

---

## 📖 Table des Matières

### 🎓 **Guides d'Apprentissage**

1. **[TECHNICAL_GUIDE.md](./TECHNICAL_GUIDE.md)** ⭐ **À LIRE EN PREMIER**

   - Guide technique complet (1000+ lignes)
   - TypeScript, React, React Query expliqués
   - Exemples tirés de l'app
   - Cheatsheet intégrée
   - **Pour** : Apprendre React/TypeScript de A à Z

2. **[CLEAN_CODE_SUMMARY.md](./CLEAN_CODE_SUMMARY.md)**
   - Principes Clean Code
   - Best practices
   - Patterns à suivre
   - **Pour** : Écrire du code propre

---

### 🏗️ **Architecture & Structure**

3. **[ARCHITECTURE.md](./ARCHITECTURE.md)**

   - Vue d'ensemble de l'architecture
   - Structure des dossiers
   - Flow de données
   - **Pour** : Comprendre l'organisation globale

4. **[CONNEXION_API.md](./CONNEXION_API.md)**
   - Connexion au backend
   - Authentication Clerk
   - Interceptors Axios
   - **Pour** : Comprendre les appels API

---

### 🔧 **Setup & Configuration**

5. **[SETUP.md](./SETUP.md)**
   - Installation du projet
   - Configuration de l'environnement
   - Lancement de l'app
   - **Pour** : Démarrer le projet

---

### ♻️ **Refactoring & Évolution**

6. **[REFACTORING.md](./REFACTORING.md)**

   - Premier refactoring (dates)
   - Élimination des magic numbers
   - Création de constantes
   - **Pour** : Comprendre le refactoring des dates

7. **[REFACTORING_COMPLETE.md](./REFACTORING_COMPLETE.md)** ⭐ **IMPORTANT**
   - Refactoring complet du frontend
   - Custom hooks créés
   - Composants extraits
   - Avant/Après comparaisons
   - **Pour** : Voir l'évolution du code

---

## 🎯 Parcours de Lecture Recommandé

### **Pour démarrer de zéro (Backend dev → Frontend)**

```
1. SETUP.md                     → Installer le projet
2. TECHNICAL_GUIDE.md           → Apprendre les bases
3. ARCHITECTURE.md              → Comprendre la structure
4. CONNEXION_API.md             → Voir comment ça communique
5. CLEAN_CODE_SUMMARY.md        → Bonnes pratiques
6. REFACTORING_COMPLETE.md      → Voir l'évolution
```

### **Pour comprendre un composant spécifique**

```
1. TECHNICAL_GUIDE.md           → Concepts React (useState, useEffect, etc.)
2. REFACTORING_COMPLETE.md      → Voir le pattern utilisé
3. Code source                  → Lire le code
```

### **Pour ajouter une feature**

```
1. ARCHITECTURE.md              → Où placer le nouveau code
2. CLEAN_CODE_SUMMARY.md        → Comment le structurer
3. TECHNICAL_GUIDE.md           → Syntaxe et patterns
```

---

## 📊 Structure de la Documentation

```
docs/
├── README.md                      ← Ce fichier (index)
│
├── 🎓 Apprentissage
│   ├── TECHNICAL_GUIDE.md         ← Bible technique (1000+ lignes)
│   └── CLEAN_CODE_SUMMARY.md      ← Principes Clean Code
│
├── 🏗️ Architecture
│   ├── ARCHITECTURE.md            ← Structure globale
│   └── CONNEXION_API.md           ← Communication API
│
├── 🔧 Setup
│   └── SETUP.md                   ← Installation & config
│
└── ♻️ Refactoring
    ├── REFACTORING.md             ← Premier refactoring
    └── REFACTORING_COMPLETE.md    ← Refactoring complet
```

---

## 🔍 Recherche Rapide

### **Je veux comprendre...**

| Sujet            | Document                | Section                  |
| ---------------- | ----------------------- | ------------------------ |
| TypeScript types | TECHNICAL_GUIDE.md      | TypeScript Fondamentaux  |
| React Hooks      | TECHNICAL_GUIDE.md      | React Hooks              |
| React Query      | TECHNICAL_GUIDE.md      | React Query              |
| Custom Hooks     | TECHNICAL_GUIDE.md      | Custom Hooks             |
| useReminderForm  | REFACTORING_COMPLETE.md | hooks/useReminderForm.ts |
| Authentication   | CONNEXION_API.md        | Clerk Integration        |
| API Calls        | CONNEXION_API.md        | Axios Setup              |
| Clean Code       | CLEAN_CODE_SUMMARY.md   | Toutes les sections      |
| Folder Structure | ARCHITECTURE.md         | Structure des Dossiers   |

---

## 💡 Tips d'Utilisation

### **En développement**

1. Garde **TECHNICAL_GUIDE.md** ouvert dans un onglet
2. Utilise la fonction "recherche" (Cmd/Ctrl+F) pour trouver rapidement
3. Consulte **REFACTORING_COMPLETE.md** pour voir des exemples réels

### **En code review**

1. Vérifie contre **CLEAN_CODE_SUMMARY.md**
2. Compare avec les patterns dans **TECHNICAL_GUIDE.md**
3. S'assure que l'architecture suit **ARCHITECTURE.md**

### **En debug**

1. **TECHNICAL_GUIDE.md** → Comprendre le concept
2. **CONNEXION_API.md** → Si c'est lié aux API calls
3. Code source → Avec la compréhension théorique

---

## 🎓 Mémos Techniques Rapides

### **TypeScript**

```typescript
// Interface vs Type
interface = Objets, React props
type = Union, Intersection, Primitives

// Generic
<T> = Type paramétré, réutilisable

// Optional
prop?: string = peut être undefined
prop: string | null = peut être null
```

### **React**

```tsx
// State
const [state, setState] = useState(initial);

// Effect
useEffect(() => {
  // Side effect
  return () => cleanup;
}, [deps]);

// Custom Hook
function useCustom() {
  // Logic...
  return { data, actions };
}
```

### **React Query**

```typescript
// Query (GET)
useQuery({ queryKey: ["key"], queryFn: fetch });

// Mutation (POST/PUT/DELETE)
useMutation({ mutationFn: post, onSuccess: invalidate });

// Invalidate
queryClient.invalidateQueries({ queryKey: ["key"] });
```

---

## 📝 Conventions de Nommage

```typescript
// Composants
function UserProfile() {} // PascalCase

// Hooks
function useAuth() {} // camelCase, "use" prefix

// Types
interface UserData {} // PascalCase
type Status = "pending" | "sent";

// Constantes
const API_URL = "..."; // UPPER_SNAKE_CASE

// Props
<Component userName="..." />; // camelCase
```

---

## 🚀 Next Steps

### **Après avoir lu la doc**

1. ✅ Lance le projet (`npm run dev`)
2. ✅ Ouvre `src/App.tsx` et lis le code
3. ✅ Modifie un composant simple
4. ✅ Crée un nouveau composant
5. ✅ Ajoute un custom hook

### **Pour aller plus loin**

1. 📚 Ajoute des tests (voir TODO dans REFACTORING_COMPLETE.md)
2. 🎨 Crée plus de sous-composants
3. 🔍 Ajoute schema validation (Zod)
4. ⚡ Optimise les performances (React.memo, useMemo)

---

## 🤝 Contribution

Si tu ajoutes du code :

1. Suis les patterns de **TECHNICAL_GUIDE.md**
2. Applique **CLEAN_CODE_SUMMARY.md**
3. Mets à jour cette doc si nécessaire

---

## 📞 Support

- **Bloqué ?** → Consulte **TECHNICAL_GUIDE.md**
- **Erreur API ?** → Consulte **CONNEXION_API.md**
- **Besoin d'exemple ?** → Consulte **REFACTORING_COMPLETE.md**

---

**Documentation créée avec ❤️**  
**Dernière mise à jour** : 2025-10-05

**Stack** : React + TypeScript + Vite + React Query + Tailwind + DaisyUI
