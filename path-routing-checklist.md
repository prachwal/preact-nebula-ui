# Checklist aktualizacji path-based routing dla wszystkich komponentów
## Komponenty do aktualizacji:

## Kroki dla każdego komponentu:
1. Dodaj route z :tab w app.tsx
2. Zaktualizuj import z useTabPage na usePathTabPage
3. Zmień TabPageConfigs na PathTabPageConfigs
4. Dodaj basePath do konfiguracji
5. Dodaj tab? parameter do interface PageProps
