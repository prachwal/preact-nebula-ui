# Components Index

This is the main index of all available UI components in the Nebula UI library.

## Component Categories

### Form Controls
- **Button** - Interactive buttons with multiple variants
- **Input** - Text input fields with validation
- **Textarea** - Multi-line text input
- **Select** - Dropdown selection component
- **Checkbox** - Multi-selection checkboxes
- **Radio** - Single selection radio buttons
- **Switch** - Toggle switch component
- **Label** - Accessible form labels
- **FieldError** - Form validation error display

### Data Display
- **Table** - Data tables with sorting and filtering
- **Card** - Content containers
- **Avatar** - User profile pictures
- **Badge** - Status indicators and counters
- **Tag** - Categorization and labels
- **Empty** - Empty state illustrations
- **Image** - Responsive image component

### Navigation
- **Breadcrumb** - Navigation breadcrumbs
- **Tabs** - Tab navigation
- **Pagination** - Page navigation
- **Anchor** - In-page navigation
- **Steps** - Step-by-step processes

### Layout
- **Container** - Content containers with responsive widths
- **Grid** - Flexible grid system
- **Stack** - Vertical and horizontal layouts
- **Divider** - Content separators

### Feedback
- **Alert** - Contextual feedback messages
- **Toast** - Temporary notifications
- **Progress** - Progress indicators
- **Skeleton** - Loading placeholders
- **Spinner** - Loading indicators

### Overlays
- **Modal** - Dialog windows
- **Drawer** - Side panel overlays
- **Tooltip** - Contextual help text
- **Popover** - Floating content containers

### Advanced Components
- **Rating** - Star rating input
- **Slider** - Range input slider
- **Upload** - File upload component
- **DatePicker** - Date selection
- **TimePicker** - Time selection
- **TreeView** - Hierarchical data display
- **Transfer** - Data transfer between lists
- **Carousel** - Image and content carousel
- **Collapse** - Collapsible content panels

## Getting Started

Each component includes:
- ✅ Complete TypeScript definitions
- ✅ Accessibility support
- ✅ Dark mode compatibility
- ✅ Responsive design
- ✅ Comprehensive testing
- ✅ Interactive documentation

## Usage

Import components individually for optimal bundle size:

```tsx
import { Button, Input, Card } from '@nebula-ui/components'

function MyApp() {
  return (
    <Card>
      <Input placeholder="Enter text..." />
      <Button>Submit</Button>
    </Card>
  )
}
```
