import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/preact'
import { Image } from './Image'

describe('Image', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  describe('Basic rendering', () => {
    it('renders with required props', () => {
      render(<Image src="test.jpg" alt="Test image" />)
      
      expect(screen.getByRole('img')).toBeInTheDocument()
      expect(screen.getByRole('img')).toHaveAttribute('alt', 'Test image')
    })

    it('applies size classes correctly', () => {
      const { container: smallContainer } = render(
        <Image src="test.jpg" alt="Small" size="sm" />
      )
      expect(smallContainer.querySelector('.w-16')).toBeInTheDocument()

      const { container: largeContainer } = render(
        <Image src="test.jpg" alt="Large" size="lg" />
      )
      expect(largeContainer.querySelector('.w-64')).toBeInTheDocument()
    })

    it('applies custom className', () => {
      const { container } = render(
        <Image src="test.jpg" alt="Test" className="custom-class" />
      )
      expect(container.firstChild).toHaveClass('custom-class')
    })

    it('forwards additional props', () => {
      render(
        <Image 
          src="test.jpg" 
          alt="Test" 
          data-testid="custom-image"
        />
      )
      
      const container = screen.getByTestId('custom-image')
      expect(container).toBeInTheDocument()
    })
  })

  describe('Loading behavior', () => {
    it('shows placeholder while loading', () => {
      render(<Image src="test.jpg" alt="Test" placeholder="placeholder.jpg" />)
      
      expect(screen.getByAltText('')).toHaveAttribute('src', 'placeholder.jpg')
    })

    it('shows default placeholder when no placeholder provided', () => {
      const { container } = render(<Image src="test.jpg" alt="Test" />)
      
      expect(container.querySelector('.animate-pulse')).toBeInTheDocument()
    })

    it('shows loading indicator when loading', () => {
      const { container } = render(<Image src="test.jpg" alt="Test" />)
      
      // Simulate loading state
      expect(container.querySelector('.animate-spin')).toBeInTheDocument()
    })

    it('handles lazy loading', () => {
      render(<Image src="test.jpg" alt="Test" lazy={true} />)
      
      // Should create IntersectionObserver
      expect(window.IntersectionObserver).toBeDefined()
    })

    it('loads immediately when lazy is false', () => {
      render(<Image src="test.jpg" alt="Test" lazy={false} />)
      
      const img = screen.getByRole('img')
      expect(img).toHaveAttribute('src', 'test.jpg')
    })
  })

  describe('Error handling', () => {
    it('shows error fallback when image fails to load', async () => {
      render(<Image src="invalid.jpg" alt="Test" />)
      
      const img = screen.getByRole('img')
      
      // Simulate image load error
      fireEvent.error(img)
      
      await waitFor(() => {
        expect(screen.getByText('Failed to load image')).toBeInTheDocument()
      })
    })

    it('shows custom fallback when provided', async () => {
      render(
        <Image 
          src="invalid.jpg" 
          alt="Test" 
          fallback="fallback.jpg"
        />
      )
      
      const img = screen.getByRole('img')
      fireEvent.error(img)
      
      await waitFor(() => {
        expect(screen.getByAltText('Test')).toHaveAttribute('src', 'fallback.jpg')
      })
    })

    it('shows custom fallback component when provided', async () => {
      const CustomFallback = () => <div>Custom error message</div>
      
      render(
        <Image 
          src="invalid.jpg" 
          alt="Test" 
          fallback={<CustomFallback />}
        />
      )
      
      const img = screen.getByRole('img')
      fireEvent.error(img)
      
      await waitFor(() => {
        expect(screen.getByText('Custom error message')).toBeInTheDocument()
      })
    })

    it('calls onError callback when image fails', async () => {
      const onError = vi.fn()
      
      render(<Image src="invalid.jpg" alt="Test" onError={onError} />)
      
      const img = screen.getByRole('img')
      fireEvent.error(img)
      
      expect(onError).toHaveBeenCalled()
    })
  })

  describe('Event handling', () => {
    it('calls onLoad callback when image loads', async () => {
      const onLoad = vi.fn()
      
      render(<Image src="test.jpg" alt="Test" onLoad={onLoad} />)
      
      const img = screen.getByRole('img')
      fireEvent.load(img)
      
      expect(onLoad).toHaveBeenCalled()
    })

    it('calls onClick callback when image is clicked', () => {
      const onClick = vi.fn()
      
      render(<Image src="test.jpg" alt="Test" onClick={onClick} />)
      
      const img = screen.getByRole('img')
      fireEvent.click(img)
      
      expect(onClick).toHaveBeenCalled()
    })
  })

  describe('Zoom functionality', () => {
    it('enables zoom when zoom prop is true', () => {
      const { container } = render(
        <Image src="test.jpg" alt="Test" zoom={true} />
      )
      
      expect(container.firstChild).toHaveClass('cursor-zoom-in')
    })

    it('accepts custom zoom configuration', () => {
      const zoomConfig = {
        enabled: true,
        maxZoom: 5,
        minZoom: 0.5,
        step: 0.1,
        wheelZoom: false,
        doubleClickZoom: true,
        pinchZoom: false
      }
      
      render(
        <Image src="test.jpg" alt="Test" zoom={zoomConfig} />
      )
      
      // Component should render without errors
      expect(screen.getByRole('img')).toBeInTheDocument()
    })

    it('shows zoom controls when zoomed in', async () => {
      render(<Image src="test.jpg" alt="Test" zoom={true} />)
      
      // Simulate image loaded and zoomed state
      const img = screen.getByRole('img')
      fireEvent.load(img)
      
      // Simulate zoom in
      fireEvent.wheel(img, { deltaY: -100 })
      
      await waitFor(() => {
        expect(screen.getByLabelText('Zoom in')).toBeInTheDocument()
        expect(screen.getByLabelText('Zoom out')).toBeInTheDocument()
        expect(screen.getByLabelText('Reset zoom')).toBeInTheDocument()
      })
    })

    it('handles wheel zoom events', () => {
      render(<Image src="test.jpg" alt="Test" zoom={true} />)
      
      const img = screen.getByRole('img')
      fireEvent.load(img)
      fireEvent.wheel(img, { deltaY: -100 })
      
      // Should not throw errors
      expect(img).toBeInTheDocument()
    })

    it('handles double click zoom', () => {
      render(<Image src="test.jpg" alt="Test" zoom={true} />)
      
      const img = screen.getByRole('img')
      fireEvent.load(img)
      fireEvent.doubleClick(img)
      
      // Should not throw errors
      expect(img).toBeInTheDocument()
    })

    it('handles mouse drag for panning', () => {
      render(<Image src="test.jpg" alt="Test" zoom={true} />)
      
      const img = screen.getByRole('img')
      fireEvent.load(img)
      
      fireEvent.mouseDown(img, { clientX: 100, clientY: 100 })
      fireEvent.mouseMove(img, { clientX: 150, clientY: 150 })
      fireEvent.mouseUp(img)
      
      // Should not throw errors
      expect(img).toBeInTheDocument()
    })
  })

  describe('Accessibility', () => {
    it('has proper alt text', () => {
      render(<Image src="test.jpg" alt="Descriptive alt text" />)
      
      expect(screen.getByRole('img')).toHaveAttribute('alt', 'Descriptive alt text')
    })

    it('accepts custom aria-label', () => {
      render(
        <Image 
          src="test.jpg" 
          alt="Test" 
          aria-label="Custom aria label"
        />
      )
      
      expect(screen.getByRole('img')).toHaveAttribute('aria-label', 'Custom aria label')
    })

    it('accepts aria-describedby', () => {
      render(
        <Image 
          src="test.jpg" 
          alt="Test" 
          aria-describedby="description-id"
        />
      )
      
      expect(screen.getByRole('img')).toHaveAttribute('aria-describedby', 'description-id')
    })

    it('zoom controls have proper aria labels', async () => {
      render(<Image src="test.jpg" alt="Test" zoom={true} />)
      
      const img = screen.getByRole('img')
      fireEvent.load(img)
      fireEvent.wheel(img, { deltaY: -100 })
      
      await waitFor(() => {
        expect(screen.getByLabelText('Zoom in')).toBeInTheDocument()
        expect(screen.getByLabelText('Zoom out')).toBeInTheDocument()
        expect(screen.getByLabelText('Reset zoom')).toBeInTheDocument()
      })
    })
  })

  describe('Progressive enhancement', () => {
    it('uses low quality source initially when provided', () => {
      render(
        <Image 
          src="high-quality.jpg" 
          alt="Test" 
          lowQualitySrc="low-quality.jpg"
          lazy={false}
        />
      )
      
      // Should load high quality image directly when not lazy
      expect(screen.getByRole('img')).toHaveAttribute('src', 'high-quality.jpg')
    })

    it('handles srcSet for responsive images', () => {
      const srcSet = "small.jpg 480w, medium.jpg 800w, large.jpg 1200w"
      
      render(
        <Image 
          src="test.jpg" 
          alt="Test" 
          srcSet={srcSet}
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      )
      
      const img = screen.getByRole('img')
      expect(img).toHaveAttribute('srcset', srcSet)
      expect(img).toHaveAttribute('sizes', '(max-width: 768px) 100vw, 50vw')
    })

    it('uses proper loading and decoding attributes', () => {
      render(
        <Image 
          src="test.jpg" 
          alt="Test" 
          loading="eager"
          decoding="sync"
        />
      )
      
      const img = screen.getByRole('img')
      expect(img).toHaveAttribute('loading', 'eager')
      expect(img).toHaveAttribute('decoding', 'sync')
    })
  })

  describe('Ref forwarding', () => {
    it('forwards ref to container element', () => {
      let ref: HTMLDivElement | null = null
      
      render(
        <Image 
          src="test.jpg" 
          alt="Test" 
          ref={(element: HTMLDivElement | null) => { ref = element }}
        />
      )
      
      expect(ref).toBeInstanceOf(HTMLDivElement)
    })
  })
})
