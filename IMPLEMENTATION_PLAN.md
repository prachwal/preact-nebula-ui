# Nebula UI - Plan Implementacji Systemu Komponentów

## 📋 Checklist Implementacji

### 🏗️ Faza 1: Struktura Projektu
- [ ] Utworzenie folderu `nebula/` dla komponentów
- [ ] Konfiguracja TypeScript dla nowego folderu
- [ ] Aktualizacja `package.json` z metadanymi NPM
- [ ] Konfiguracja build systemu dla biblioteki
- [ ] Dodanie skryptów Windows PowerShell

### 🧩 Faza 2: Pierwszy Komponent - Button
- [ ] Utworzenie komponentu Button z TypeScript
- [ ] Definicja typów i props
- [ ] Style z Tailwind CSS
- [ ] Warianty (primary, secondary, outline, ghost)
- [ ] Rozmiary (sm, md, lg, xl)
- [ ] Stany (default, hover, active, disabled, loading)

### 🧪 Faza 3: Testy
- [ ] Konfiguracja Vitest
- [ ] Konfiguracja Testing Library dla Preact
- [ ] Testy jednostkowe dla Button
- [ ] Testy snapshot
- [ ] Testy accessibility (a11y)

### 📦 Faza 4: Build i Publikacja
- [ ] Konfiguracja Rollup/Vite dla biblioteki
- [ ] Generowanie typów TypeScript (.d.ts)
- [ ] Konfiguracja entry points (index.ts)
- [ ] Przygotowanie do NPM (README, LICENSE)
- [ ] Skrypty deploy na Windows PowerShell

### 🚀 Faza 5: Deploy i Testowanie
- [ ] Lokalny build test
- [ ] Próbny deploy do NPM (dry-run)
- [ ] Rzeczywisty deploy
- [ ] Test importu w zewnętrznym projekcie

### 📚 Faza 6: Dokumentacja
- [ ] README z przykładami użycia
- [ ] Dokumentacja API komponentów
- [ ] Storybook (opcjonalnie)
- [ ] Changelog

---

## 🎯 Cele Końcowe

1. **Gotowa biblioteka komponentów** - Nebula UI
2. **Opublikowana na NPM** - `@username/nebula-ui`
3. **Kompletne testy** - 100% coverage dla komponentów
4. **TypeScript support** - Pełne typy dla IntelliSense
5. **Tree-shaking** - Optymalizowane importy
6. **Tailwind CSS** - Wykorzystanie utility-first CSS

---

## 📖 Struktura Docelowa

```
nebula/
├── components/
│   ├── Button/
│   │   ├── Button.tsx
│   │   ├── Button.test.tsx
│   │   ├── Button.types.ts
│   │   └── index.ts
│   └── index.ts
├── types/
│   └── common.ts
├── utils/
│   └── cn.ts
└── index.ts
```

---

## 🔧 Technologie

- **Framework**: Preact
- **Styling**: Tailwind CSS
- **Build**: Vite
- **Testing**: Vitest + Testing Library
- **TypeScript**: Pełne wsparcie typów
- **NPM**: Publikacja jako scoped package
