# Analiza problemów z checkboxami w Transfer i TreeView

## Dodane debugowanie

Dodałem kompleksowe logowanie debugowania podobne do tego z Tooltip.tsx do następujących komponentów:

### 1. Transfer Components

- **TransferList.tsx**: Debugowanie filtrowania, stanu selekcji, funkcji obsługi zdarzeń
- **Checkbox.tsx**: Debugowanie inicjalizacji, zdarzeń onChange/onClick, stanu indeterminate

### 2. TreeView Components

- **TreeView.tsx**: Debugowanie inicjalizacji, stanu drzewa
- **TreeNode.tsx**: Debugowanie renderowania node'ów, obsługi checkboxów
- **useTreeView.ts**: Debugowanie logiki handleCheck z kaskadowymi zmianami

## Potencjalne przyczyny problemów z zaznaczaniem checkboxów

### 1. **Event Propagation Issues**

```typescript
// W TreeNode.tsx - stopPropagation może blokować zdarzenia
const handleCheckboxChange = (e: Event) => {
  e.stopPropagation() // ⚠️ Może blokować propagację do parent elementów
  // ...
}
```

### 2. **Disabled State Conflicts**

```typescript
// Możliwe konflikty stanu disabled na różnych poziomach
<Checkbox
  disabled={disabled || item.disabled}  // Transfer
  disabled={disabled}                   // TreeNode
/>
```

### 3. **State Management Issues**

- **Transfer**: Używa kontrolowanego stanu przez `onSelect` callback
- **TreeView**: Używa `useTreeView` hook z wewnętrznym stanem
- Możliwy konflikt między controlled/uncontrolled componentami

### 4. **CSS/Styling Issues**

```css
/* Checkbox może być ukryty przez CSS */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  /* ... */
}
```

### 5. **Event Handler Chain**

```
Native Input onClick -> Checkbox onChange -> Component handler -> Parent callback
```

Każdy krok może być przerwany lub zablokowany.

### 6. **Preact/React Compatibility**

- Używanie `preact/compat` może powodować problemy z event handling
- Różnice w SyntheticEvent między Preact a React

## Jak debugować

1. **Włącz debugging** (już zrobione):
   - `DEBUG_TRANSFER = true`
   - `DEBUG_CHECKBOX = true`
   - `DEBUG_TREEVIEW = true`
   - `DEBUG_TREENODE = true`
   - `DEBUG_USETREEVIEW = true`

2. **Uruchom aplikację** i sprawdź console.log podczas próby zaznaczenia checkbox'a

3. **Sprawdź czy**:
   - Zdarzenia są wywoływane
   - Stan jest aktualizowany
   - Callback funkcje są wywoływane
   - Nie ma błędów JavaScript

## Potencjalne rozwiązania

### 1. Event Propagation Fix

```typescript
// Zamiast e.stopPropagation(), spróbuj:
const handleCheckboxChange = (e: Event) => {
  e.preventDefault() // Tylko prevent default, nie stop propagation
  // lub usuń całkowicie
}
```

### 2. Simplify Event Chain

```typescript
// Direct event handling bez pośredników
<input
  type="checkbox"
  onChange={onCheck} // Bezpośrednio
  onClick={onCheck}  // Fallback
/>
```

### 3. State Debugging

```typescript
// Dodaj więcej logowania stanu
useEffect(() => {
  console.log('Checked state changed:', checked)
}, [checked])
```

### 4. CSS Inspection

```typescript
// Sprawdź czy element jest faktycznie klikable
const rect = element.getBoundingClientRect()
console.log('Element bounds:', rect)
```

## Następne kroki

1. Uruchom aplikację z włączonym debugowaniem
2. Spróbuj zaznaczyć checkboxy w Transfer i TreeView
3. Przeanalizuj logi w console
4. Zidentyfikuj dokładne miejsce gdzie proces się zatrzymuje
5. Zastosuj odpowiednie poprawki na podstawie znalezionej przyczyny

## Oczekiwane logi

Po włączeniu debugowania powinieneś zobaczyć w konsoli:

- `[TRANSFER DEBUG]` - logi z komponentu Transfer
- `[CHECKBOX DEBUG]` - logi z komponentu Checkbox  
- `[TREEVIEW DEBUG]` - logi z komponentu TreeView
- `[TREENODE DEBUG]` - logi z TreeNode
- `[USETREEVIEW DEBUG]` - logi z hook'a useTreeView

Jeśli nie ma żadnych logów przy próbie kliknięcia, oznacza to że zdarzenia w ogóle nie docierają do komponentów.
