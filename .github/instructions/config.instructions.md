---
applyTo: '**'
---

# Project Context and Coding Guidelines

## Component Architecture Standards

### Modular Page Structure (Required Pattern)
All component documentation pages must follow this modular architecture:

```
src/pages/[component]/
├── ComponentPage.tsx          # Main page with PageHeader + DemoTabs
└── sections/
    ├── index.ts              # Export all sections
    ├── BasicUsageSection.tsx # Basic examples and uncontrolled/controlled states
    ├── SizesSection.tsx      # Size variants (sm, md, lg)
    ├── StatesSection.tsx     # Different component states (disabled, error, etc.)
    ├── AdvancedSection.tsx   # Advanced features (specific to component)
    └── PropsDocumentation.tsx # Props reference table
```

### Page Architecture Requirements:

1. **Main Page Structure:**
   - Import PageHeader and DemoTabs from layout components
   - Use useState for activeTab management
   - Switch statement for section rendering
   - Clean section imports from './sections'

2. **Section Components:**
   - Each section in separate file for maintainability
   - Consistent dark mode support (text-gray-900 dark:text-white for headings)
   - Proper spacing with space-y-6 and space-y-8 classes
   - Label components with proper dark mode colors

3. **Layout Components Integration:**
   - Use PageHeader for consistent page titles and descriptions
   - Use DemoTabs for tab navigation between sections
   - Ensure dark mode compatibility throughout

### Component Development Standards

1. **File Structure:**
   ```
   nebula/components/[Component]/
   ├── index.ts              # Public exports
   ├── Component.tsx         # Main component implementation
   ├── types.ts             # TypeScript definitions
   ├── Component.test.tsx   # Unit tests
   └── Component.a11y.test.tsx # Accessibility tests
   ```

2. **Implementation Requirements:**
   - forwardRef for all interactive components
   - Comprehensive TypeScript interfaces
   - Size variants: 'sm' | 'md' | 'lg'
   - Dark mode support with proper color classes
   - Error states and validation
   - Accessibility attributes (ARIA labels, keyboard navigation)

3. **Testing Standards:**
   - Unit tests for all functionality
   - Accessibility tests for screen readers and keyboard navigation
   - Error state testing
   - Props validation

### Established Patterns

Successfully implemented modular architectures:
- ✅ **Alert** - Complete modular structure
- ✅ **Slider** - 8 sections (Basic, Sizes, Range, Marks, Orientation, Advanced, Props)
- ✅ **Rating** - 7 sections (Basic, Sizes, Half Stars, Custom Icons, States, Value Display, Props)

### Coding Guidelines

1. **Dark Mode:** Always include dark: variants for colors
2. **Spacing:** Use Tailwind spacing classes consistently
3. **TypeScript:** Strict typing with proper interfaces
4. **Accessibility:** Include ARIA attributes and keyboard support
5. **Performance:** Use forwardRef and proper React patterns
6. **Consistency:** Follow established patterns across all components

This modular architecture ensures maintainability, reusability, and consistent user experience across all component documentation pages.