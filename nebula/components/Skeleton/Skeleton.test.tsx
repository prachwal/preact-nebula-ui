import { render, screen } from '@testing-library/preact'
import { describe, it, expect } from 'vitest'
import { Skeleton } from './Skeleton'

describe('Skeleton', () => {
  describe('Rendering', () => {
    it('renders correctly with default props', () => {
      render(<Skeleton data-testid="skeleton" />)
      
      const skeleton = screen.getByTestId('skeleton')
      expect(skeleton).toBeInTheDocument()
      expect(skeleton).toHaveAttribute('aria-hidden', 'true')
    })

    it('renders with custom className', () => {
      render(<Skeleton className="custom-skeleton" data-testid="skeleton" />)
      
      const skeleton = screen.getByTestId('skeleton')
      expect(skeleton).toHaveClass('custom-skeleton')
    })

    it('accepts data-testid', () => {
      render(<Skeleton data-testid="test-skeleton" />)
      
      expect(screen.getByTestId('test-skeleton')).toBeInTheDocument()
    })
  })

  describe('Variants', () => {
    it('renders text variant by default', () => {
      render(<Skeleton data-testid="skeleton" />)
      
      const skeleton = screen.getByTestId('skeleton')
      expect(skeleton).toHaveClass('rounded')
    })

    it('renders avatar variant correctly', () => {
      render(<Skeleton variant="avatar" data-testid="skeleton" />)
      
      const skeleton = screen.getByTestId('skeleton')
      expect(skeleton).toHaveClass('rounded-full')
    })

    it('renders rectangular variant correctly', () => {
      render(<Skeleton variant="rectangular" data-testid="skeleton" />)
      
      const skeleton = screen.getByTestId('skeleton')
      expect(skeleton).toHaveClass('rounded-md')
    })

    it('renders circular variant correctly', () => {
      render(<Skeleton variant="circular" data-testid="skeleton" />)
      
      const skeleton = screen.getByTestId('skeleton')
      expect(skeleton).toHaveClass('rounded-full')
    })
  })

  describe('Animations', () => {
    it('renders pulse animation by default', () => {
      render(<Skeleton data-testid="skeleton" />)
      
      const skeleton = screen.getByTestId('skeleton')
      expect(skeleton).toHaveClass('animate-pulse')
    })

    it('renders wave animation correctly', () => {
      render(<Skeleton animation="wave" data-testid="skeleton" />)
      
      const skeleton = screen.getByTestId('skeleton')
      expect(skeleton).toHaveClass('animate-pulse') // Currently maps to pulse
    })

    it('renders no animation correctly', () => {
      render(<Skeleton animation="none" data-testid="skeleton" />)
      
      const skeleton = screen.getByTestId('skeleton')
      expect(skeleton).not.toHaveClass('animate-pulse')
    })
  })

  describe('Dimensions', () => {
    it('applies default dimensions for text variant', () => {
      render(<Skeleton variant="text" data-testid="skeleton" />)
      
      const skeleton = screen.getByTestId('skeleton')
      expect(skeleton).toHaveStyle({
        width: '100%',
        height: '1rem'
      })
    })

    it('applies default dimensions for avatar variant', () => {
      render(<Skeleton variant="avatar" data-testid="skeleton" />)
      
      const skeleton = screen.getByTestId('skeleton')
      expect(skeleton).toHaveStyle({
        width: '2.5rem',
        height: '2.5rem'
      })
    })

    it('applies default dimensions for rectangular variant', () => {
      render(<Skeleton variant="rectangular" data-testid="skeleton" />)
      
      const skeleton = screen.getByTestId('skeleton')
      expect(skeleton).toHaveStyle({
        width: '100%',
        height: '8rem'
      })
    })

    it('applies default dimensions for circular variant', () => {
      render(<Skeleton variant="circular" data-testid="skeleton" />)
      
      const skeleton = screen.getByTestId('skeleton')
      expect(skeleton).toHaveStyle({
        width: '2.5rem',
        height: '2.5rem'
      })
    })

    it('applies custom width and height as strings', () => {
      render(<Skeleton width="200px" height="50px" data-testid="skeleton" />)
      
      const skeleton = screen.getByTestId('skeleton')
      expect(skeleton).toHaveStyle({
        width: '200px',
        height: '50px'
      })
    })

    it('applies custom width and height as numbers', () => {
      render(<Skeleton width={150} height={40} data-testid="skeleton" />)
      
      const skeleton = screen.getByTestId('skeleton')
      expect(skeleton).toHaveStyle({
        width: '150px',
        height: '40px'
      })
    })

    it('applies custom width and height with units', () => {
      render(<Skeleton width="10rem" height="2em" data-testid="skeleton" />)
      
      const skeleton = screen.getByTestId('skeleton')
      expect(skeleton).toHaveStyle({
        width: '10rem',
        height: '2em'
      })
    })
  })

  describe('Multiple lines', () => {
    it('renders single line by default', () => {
      render(<Skeleton variant="text" data-testid="skeleton" />)
      
      const skeleton = screen.getByTestId('skeleton')
      // Should not have space-y class (which indicates multiple lines)
      expect(skeleton).not.toHaveClass('space-y-2')
    })

    it('renders multiple lines when lines > 1', () => {
      render(<Skeleton variant="text" lines={3} data-testid="skeleton" />)
      
      const skeleton = screen.getByTestId('skeleton')
      expect(skeleton).toHaveClass('space-y-2')
      
      // Should have 3 child divs
      const lines = skeleton.querySelectorAll('div')
      expect(lines).toHaveLength(3)
    })

    it('makes last line shorter for realistic appearance', () => {
      render(<Skeleton variant="text" lines={2} data-testid="skeleton" />)
      
      const skeleton = screen.getByTestId('skeleton')
      const lines = skeleton.querySelectorAll('div')
      
      expect(lines[0]).toHaveStyle({ width: '100%' })
      expect(lines[1]).toHaveStyle({ width: '75%' })
    })

    it('does not make last line shorter when custom width is provided', () => {
      render(<Skeleton variant="text" lines={2} width="200px" data-testid="skeleton" />)
      
      const skeleton = screen.getByTestId('skeleton')
      const lines = skeleton.querySelectorAll('div')
      
      expect(lines[0]).toHaveStyle({ width: '200px' })
      expect(lines[1]).toHaveStyle({ width: '200px' })
    })

    it('applies same height to all lines', () => {
      render(<Skeleton variant="text" lines={3} height="20px" data-testid="skeleton" />)
      
      const skeleton = screen.getByTestId('skeleton')
      const lines = skeleton.querySelectorAll('div')
      
      lines.forEach(line => {
        expect(line).toHaveStyle({ height: '20px' })
      })
    })

    it('ignores lines prop for non-text variants', () => {
      render(<Skeleton variant="avatar" lines={3} data-testid="skeleton" />)
      
      const skeleton = screen.getByTestId('skeleton')
      expect(skeleton).not.toHaveClass('space-y-2')
      
      // Should be a single element, not multiple lines
      const children = skeleton.querySelectorAll('div')
      expect(children).toHaveLength(0) // No child divs, just the main skeleton
    })
  })

  describe('Children content', () => {
    it('renders children invisibly for spacing', () => {
      render(
        <Skeleton data-testid="skeleton">
          <div>Content for spacing</div>
        </Skeleton>
      )
      
      const skeleton = screen.getByTestId('skeleton')
      const invisibleContainer = skeleton.querySelector('.invisible')
      expect(invisibleContainer).toBeInTheDocument()
      expect(invisibleContainer).toContainElement(screen.getByText('Content for spacing'))
    })

    it('does not render invisible container without children', () => {
      render(<Skeleton data-testid="skeleton" />)
      
      const skeleton = screen.getByTestId('skeleton')
      const invisibleContainer = skeleton.querySelector('.invisible')
      expect(invisibleContainer).not.toBeInTheDocument()
    })
  })

  describe('Accessibility', () => {
    it('has aria-hidden attribute', () => {
      render(<Skeleton data-testid="skeleton" />)
      
      const skeleton = screen.getByTestId('skeleton')
      expect(skeleton).toHaveAttribute('aria-hidden', 'true')
    })

    it('maintains aria-hidden for multiple lines', () => {
      render(<Skeleton variant="text" lines={3} data-testid="skeleton" />)
      
      const skeleton = screen.getByTestId('skeleton')
      expect(skeleton).toHaveAttribute('aria-hidden', 'true')
    })
  })

  describe('Edge cases', () => {
    it('handles zero lines', () => {
      render(<Skeleton variant="text" lines={0} data-testid="skeleton" />)
      
      const skeleton = screen.getByTestId('skeleton')
      expect(skeleton).toHaveClass('space-y-2')
      
      // Should have no child divs
      const lines = skeleton.querySelectorAll('div')
      expect(lines).toHaveLength(0)
    })

    it('handles single line explicitly', () => {
      render(<Skeleton variant="text" lines={1} data-testid="skeleton" />)
      
      const skeleton = screen.getByTestId('skeleton')
      // With lines=1, should render as single element, not container with space-y
      expect(skeleton).not.toHaveClass('space-y-2')
    })

    it('handles all props together', () => {
      render(
        <Skeleton
          variant="rectangular"
          width="300px"
          height="200px"
          animation="none"
          className="custom-class"
          data-testid="full-skeleton"
        >
          <div>Spacing content</div>
        </Skeleton>
      )
      
      const skeleton = screen.getByTestId('full-skeleton')
      expect(skeleton).toHaveClass('custom-class', 'rounded-md')
      expect(skeleton).not.toHaveClass('animate-pulse')
      expect(skeleton).toHaveStyle({
        width: '300px',
        height: '200px'
      })
      expect(skeleton.querySelector('.invisible')).toBeInTheDocument()
    })

    it('handles HTML attributes', () => {
      render(<Skeleton title="Loading content" data-testid="skeleton" />)
      
      const skeleton = screen.getByTestId('skeleton')
      expect(skeleton).toHaveAttribute('title', 'Loading content')
    })
  })
})
