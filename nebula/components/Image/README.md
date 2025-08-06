# Image Component

An advanced image component for Preact applications with built-in lazy loading, zoom functionality, progressive enhancement, and comprehensive error handling.

## Features

- **Lazy Loading**: Intersection Observer-based lazy loading with viewport detection
- **Progressive Enhancement**: Low-quality placeholder → High-quality image loading
- **Zoom Functionality**: Interactive zoom with mouse/wheel controls and touch support
- **Error Handling**: Graceful fallbacks for broken images
- **Responsive Images**: Support for srcSet and sizes attributes
- **Accessibility**: Full ARIA support and keyboard navigation
- **Performance**: Optimized loading and memory management

## Installation

```bash
npm install @preact-nebula-ui/image
```

## Basic Usage

```tsx
import { Image } from '@preact-nebula-ui/image'

function App() {
  return (
    <Image
      src="https://example.com/image.jpg"
      alt="A beautiful landscape"
      size="md"
    />
  )
}
```

## Props

### Core Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `src` | `string` | - | **Required.** Image source URL |
| `alt` | `string` | - | **Required.** Alternative text for accessibility |
| `size` | `'sm' \| 'md' \| 'lg' \| 'xl' \| 'full'` | `'md'` | Predefined size variants |

### Loading & Performance

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `lazy` | `boolean` | `true` | Enable lazy loading with Intersection Observer |
| `placeholder` | `string` | - | Placeholder image URL to show while loading |
| `lowQualitySrc` | `string` | - | Low-quality image for progressive loading |
| `loading` | `'lazy' \| 'eager'` | `'lazy'` | Native loading attribute |
| `decoding` | `'async' \| 'sync' \| 'auto'` | `'async'` | Image decoding strategy |

### Responsive Images

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `srcSet` | `string` | - | Responsive image sources |
| `sizes` | `string` | - | Size hints for responsive images |

### Zoom Functionality

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `zoom` | `boolean \| ZoomConfig` | `false` | Enable zoom functionality |

```typescript
interface ZoomConfig {
  enabled: boolean
  maxZoom?: number        // Default: 3
  minZoom?: number        // Default: 1
  step?: number           // Default: 0.2
  wheelZoom?: boolean     // Default: true
  doubleClickZoom?: boolean // Default: true
  pinchZoom?: boolean     // Default: false
}
```

### Error Handling

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `fallback` | `string \| ComponentChild` | - | Fallback image URL or custom component |
| `onError` | `(event: Event) => void` | - | Error callback |

### Events

| Prop | Type | Description |
|------|------|-------------|
| `onLoad` | `(event: Event) => void` | Image load callback |
| `onClick` | `(event: MouseEvent) => void` | Click handler |

### Accessibility

| Prop | Type | Description |
|------|------|-------------|
| `aria-label` | `string` | Custom aria label |
| `aria-describedby` | `string` | Reference to description element |

## Examples

### Lazy Loading with Placeholder

```tsx
<Image
  src="https://example.com/high-res.jpg"
  alt="High resolution image"
  placeholder="data:image/svg+xml;base64,..."
  lowQualitySrc="https://example.com/low-res.jpg"
  lazy={true}
/>
```

### Zoom Functionality

```tsx
<Image
  src="https://example.com/zoomable.jpg"
  alt="Zoomable image"
  zoom={{
    enabled: true,
    maxZoom: 5,
    wheelZoom: true,
    doubleClickZoom: true
  }}
/>
```

### Responsive Images

```tsx
<Image
  src="https://example.com/image-800.jpg"
  srcSet="
    https://example.com/image-400.jpg 400w,
    https://example.com/image-800.jpg 800w,
    https://example.com/image-1200.jpg 1200w
  "
  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
  alt="Responsive image"
/>
```

### Error Handling

```tsx
<Image
  src="https://example.com/might-fail.jpg"
  alt="Image with fallback"
  fallback="https://example.com/fallback.jpg"
  onError={(event) => console.log('Image failed to load')}
/>
```

### Custom Fallback Component

```tsx
<Image
  src="https://example.com/broken.jpg"
  alt="Image with custom fallback"
  fallback={
    <div className="flex items-center justify-center h-full bg-gray-100">
      <span>🖼️ Image not available</span>
    </div>
  }
/>
```

## Zoom Controls

When zoom is enabled and the image is zoomed in, interactive controls appear:

- **Zoom In** (+): Increase zoom level
- **Zoom Out** (-): Decrease zoom level  
- **Reset** (↻): Return to original size

### Zoom Interactions

- **Mouse Wheel**: Zoom in/out (when `wheelZoom: true`)
- **Double Click**: Toggle zoom (when `doubleClickZoom: true`)
- **Click & Drag**: Pan around zoomed image
- **Touch/Pinch**: Zoom on touch devices (when `pinchZoom: true`)

## Size Variants

| Size | Dimensions | Use Case |
|------|------------|----------|
| `sm` | 64×64px | Thumbnails, avatars |
| `md` | 128×128px | Small images, previews |
| `lg` | 256×256px | Medium images, gallery items |
| `xl` | 384×384px | Large images, featured content |
| `full` | 100%×100% | Full container width/height |

## Performance Considerations

### Lazy Loading
- Uses Intersection Observer API for efficient viewport detection
- Configurable root margin and threshold for preloading
- Fallback for browsers without Intersection Observer support

### Progressive Enhancement
- Loads low-quality image first, then replaces with high-quality
- Smooth transitions between loading states
- Optimizes perceived performance

### Memory Management
- Automatic cleanup of observers and event listeners
- Efficient state management with minimal re-renders
- Optimized for large image galleries

## Accessibility

The Image component follows WAI-ARIA guidelines:

- **Alt Text**: Always provide meaningful alt text
- **ARIA Labels**: Support for custom aria-label and aria-describedby
- **Keyboard Navigation**: Zoom controls are keyboard accessible
- **Screen Readers**: Proper semantic markup and ARIA attributes
- **Focus Management**: Logical tab order and focus indicators

## Browser Support

- **Modern Browsers**: Chrome 51+, Firefox 55+, Safari 12.1+, Edge 79+
- **Intersection Observer**: Polyfill available for older browsers
- **Fallback Behavior**: Graceful degradation for unsupported features

## TypeScript Support

Full TypeScript support with comprehensive type definitions:

```typescript
import { Image, ImageProps, ZoomConfig } from '@preact-nebula-ui/image'

const MyImage: Component<ImageProps> = (props) => {
  return <Image {...props} />
}
```

## Testing

The component includes comprehensive tests covering:

- Basic rendering and props
- Lazy loading behavior
- Zoom functionality  
- Error handling
- Accessibility
- Progressive enhancement
- Event handling

Run tests with:

```bash
npm test Image.test.tsx
```

## Contributing

See the main project [CONTRIBUTING.md](../../../CONTRIBUTING.md) for guidelines.

## License

MIT License - see [LICENSE](../../../LICENSE) for details.
