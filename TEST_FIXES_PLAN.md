# Analiza błędów testów - Plan naprawczy

## Podsumowanie: 21 błędnych testów w 5 plikach

### 1. **ConfigProvider.test.tsx** (1 błąd)

**Błąd:** Theme algorithm test - oczekuje "yes", otrzymuje "no"
**Przyczyna:** Algorithm nie jest przekazywany do kontekstu lub nie jest poprawnie obsługiwany
**Rozwiązanie:** Sprawdzić implementację ConfigProvider i poprawić przekazywanie algorithm

### 2. **Empty.test.tsx** (4 błędy)

#### Błąd 1: Brak renderowania domyślnego tekstu

**Problem:** Nie znajduje tekstu "No data"
**Przyczyna:** Komponent może nie renderować domyślnego tekstu
**Rozwiązanie:** Sprawdzić implementację Empty - czy renderuje defaultMessages

#### Błąd 2: Style nie są aplikowane

**Problem:** backgroundColor: red nie jest aplikowany
**Przyczyna:** Style prop może nie być przekazywany
**Rozwiązanie:** Sprawdzić czy Empty przekazuje style do głównego elementu

#### Błąd 3: imageStyle nie działa

**Problem:** width/height nie są aplikowane do .nebula-empty-image
**Przyczyna:** imageStyle może nie być przekazywany do kontenera obrazu
**Rozwiązanie:** Sprawdzić implementację imageStyle w Empty

#### Błąd 4: Semantic variants nie renderują tekstu

**Problem:** Nie znajduje tekstów jak "No search results"
**Przyczyna:** Warianty mogą nie używać defaultMessages lub mają inne teksty
**Rozwiązanie:** Sprawdzić jakie teksty rzeczywiście renderują poszczególne warianty

### 3. **Grid.test.tsx** (4 błędy)

#### Problem: Auto-fit/auto-fill nie generują oczekiwanych klas CSS

**Błędy:**

- Oczekuje: `grid-cols-[repeat(auto-fit,minmax(250px,1fr))]`
- Otrzymuje: `grid grid-cols-12 grid-flow-row`

**Przyczyna:** Grid może nie implementować auto-fit/auto-fill lub używa innych klas
**Rozwiązanie:** Sprawdzić implementację Grid i dostosować testy do rzeczywistych klas

#### Problem: Alignment classes

**Błąd:** Oczekuje `justify-between`, otrzymuje `justify-space-between`
**Rozwiązanie:** Dostosować testy do rzeczywistych nazw klas Tailwind

### 4. **Steps.test.tsx** (7 błędów)

#### Problem główny: Niepoprawne selektory DOM

**Błędy:** `querySelectorAll('[data-step]')` zwraca undefined elements
**Przyczyna:** Steps może nie używać atrybutu `data-step` lub ma inną strukturę
**Rozwiązanie:**

1. Sprawdzić rzeczywistą strukturę DOM Steps
2. Użyć poprawnych selektorów (prawdopodobnie `.step-item` lub podobne)

#### Problem: Size classes

**Błąd:** Oczekuje `text-sm` na głównym kontenerze, ale może być na dzieciach
**Rozwiązanie:** Sprawdzić gdzie są aplikowane klasy rozmiaru

### 5. **Tags.test.tsx** (5 błędów)

#### Błąd 1: Color classes

**Problem:** Oczekuje `bg-primary-100`, otrzymuje `bg-blue-100`
**Przyczyna:** Tags używa konkretnych kolorów zamiast zmiennych primary
**Rozwiązanie:** Dostosować testy do rzeczywistych klas kolorów

#### Błąd 2: MaxTags functionality

**Problem:** Nie znajduje elementu "+2"
**Przyczyna:** Tags może nie implementować ograniczenia maxTags lub używa innego formatu
**Rozwiązanie:** Sprawdzić czy Tags obsługuje maxTags i jaki format używa

#### Błąd 3: Sortable/drag-drop

**Problem:** onSort nie jest wywoływany
**Przyczyna:** Drag-drop może nie być zaimplementowany lub wymaga innych eventów
**Rozwiązanie:** Sprawdzić implementację sortable w Tags

#### Błąd 4: Editable tags

**Problem:** Nie znajduje input z wartością "JavaScript"
**Przyczyna:** Editable może działać inaczej - tag może nie przekształcać się w input
**Rozwiązanie:** Sprawdzić jak działa edycja tagów

## Plan naprawczy - kolejność działań

### Faza 1: Analiza implementacji (PRIORYTET)

1. Przeanalizować rzeczywiste implementacje komponentów
2. Sprawdzić DOM struktury generowane przez komponenty
3. Zidentyfikować rzeczywiste klasy CSS i selektory

### Faza 2: Naprawy podstawowe

1. **Empty** - poprawić selektory i oczekiwane teksty
2. **ConfigProvider** - poprawić test algorithm
3. **Grid** - dostosować do rzeczywistych klas CSS

### Faza 3: Naprawy zaawansowane  

1. **Steps** - przepisać testy używając poprawnych selektorów
2. **Tags** - dostosować do rzeczywistej funkcjonalności

### Faza 4: Weryfikacja

1. Uruchomić testy po każdej naprawie
2. Sprawdzić czy nie ma regresji w istniejących testach

## Estymacja czasowa

- Analiza implementacji: 1-2h
- Naprawy: 2-3h  
- Weryfikacja: 30min
- **RAZEM: 3.5-5.5h**

## Notatki techniczne

- Większość błędów wynika z niedopasowania testów do rzeczywistej implementacji
- Komponenty prawdopodobnie działają poprawnie, ale testy są napisane na podstawie założeń
- Potrzebne jest sprawdzenie dokumentacji/typów każdego komponentu
