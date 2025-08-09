# Nebula UI - Dokumentacja Komponentów

## Jak używać zakładek dokumentacji

Każdy komponent w Nebula UI ma dedykowaną zakładkę "Dokumentacja", która zawiera:

### 📖 Szczegółową dokumentację
- Pełny opis komponentu i jego funkcjonalności
- Przykłady użycia z kodem TypeScript
- Lista wszystkich dostępnych props z opisami

### 🎨 Przykłady stylizacji
- Różne warianty wizualne komponentu
- Przykłady kombinacji props
- Najlepsze praktyki projektowe

### ♿ Informacje o dostępności
- Wsparcie dla czytników ekranu
- Nawigacja klawiatury
- Standardy ARIA

### 🔧 Instalacja i konfiguracja
- Instrukcje instalacji
- Wymagane zależności
- Konfiguracja TypeScript

## Struktura dokumentacji

```
/public/docs/
├── BUTTON_DOCUMENTATION.md      # Dokumentacja Button
├── INPUT_DOCUMENTATION.md       # Dokumentacja Input
├── MODAL_DOCUMENTATION.md       # Dokumentacja Modal
└── ...                         # Inne komponenty
```

## Dodawanie nowej dokumentacji

1. Utwórz plik `.md` w folderze `/public/docs/`
2. Dodaj mapowanie w `DocumentationTab.tsx`:
   ```typescript
   const docPaths: Record<string, string> = {
     'NowyKomponent': '/docs/NOWY_KOMPONENT_DOCUMENTATION.md',
   }
   ```
3. Dodaj zakładkę "Dokumentacja" na stronie komponentu

## Formatowanie kodu

Dokumentacja obsługuje kolorowanie składni dla:
- **TypeScript/JavaScript**
- **JSX/TSX**  
- **CSS**
- **JSON**
- **Markdown**

Przykład:
\`\`\`typescript
import { Button } from '@nebula/components'

function MyApp() {
  return (
    <Button variant="primary" size="lg">
      Hello World!
    </Button>
  )
}
\`\`\`

## Funkcje

✅ **Automatyczne ładowanie**: Dokumentacja jest ładowana asynchronicznie  
✅ **Kolorowanie kodu**: Syntax highlighting dla wszystkich popularnych języków  
✅ **Responsive**: Dostosowuje się do różnych rozdzielczości  
✅ **Dark mode**: Automatyczne przełączanie motywów  
✅ **Accessibility**: Pełne wsparcie dla technologii wspomagających  

## Komponenty dokumentacji

### `MarkdownViewer`
Główny komponent do renderowania markdown z kolorowaniem składni.

### `DocumentationTab`  
Komponent zakładki z gotową strukturą dla dokumentacji komponentów.

### `useMarkdown`
Hook do asynchronicznego ładowania i parsowania plików markdown.

---

**Nebula UI** - Nowoczesna biblioteka komponentów dla Preact/React
