import { render, screen } from '@testing-library/preact'
import { describe, it, expect } from 'vitest'
import { Progress } from './Progress'

describe('Progress', () => {
  describe('Rendering', () => {
    it('renders correctly with default props', () => {
      render(<Progress />)
      
      const progressbar = screen.getByRole('progressbar')
      expect(progressbar).toBeInTheDocument()
    })

    it('renders with custom className', () => {
      render(<Progress className="custom-progress" data-testid="progress" />)
      
      const progress = screen.getByTestId('progress')
      expect(progress).toHaveClass('custom-progress')
    })

    it('accepts data-testid', () => {
      render(<Progress data-testid="test-progress" />)
      
      expect(screen.getByTestId('test-progress')).toBeInTheDocument()
    })
  })

  describe('Variants', () => {
    it('renders linear variant by default', () => {
      render(<Progress data-testid="progress" />)
      
      const progress = screen.getByTestId('progress')
      expect(progress).toHaveClass('w-full')
      expect(progress.querySelector('svg')).not.toBeInTheDocument()
    })

    it('renders circular variant correctly', () => {
      render(<Progress variant="circular" data-testid="progress" />)
      
      const progress = screen.getByTestId('progress')
      expect(progress).toHaveClass('relative', 'inline-flex', 'items-center', 'justify-center')
      expect(progress.querySelector('svg')).toBeInTheDocument()
    })
  })

  describe('Sizes', () => {
    describe('Linear variant', () => {
      it('renders medium size by default', () => {
        render(<Progress />)
        
        const progressBar = screen.getByRole('progressbar').closest('div')
        expect(progressBar).toHaveClass('h-2')
      })

      it('renders small size correctly', () => {
        render(<Progress size="sm" />)
        
        const progressBar = screen.getByRole('progressbar').closest('div')
        expect(progressBar).toHaveClass('h-1')
      })

      it('renders large size correctly', () => {
        render(<Progress size="lg" />)
        
        const progressBar = screen.getByRole('progressbar').closest('div')
        expect(progressBar).toHaveClass('h-3')
      })
    })

    describe('Circular variant', () => {
      it('renders medium size by default', () => {
        render(<Progress variant="circular" data-testid="progress" />)
        
        const progress = screen.getByTestId('progress')
        expect(progress).toHaveClass('w-12', 'h-12')
      })

      it('renders small size correctly', () => {
        render(<Progress variant="circular" size="sm" data-testid="progress" />)
        
        const progress = screen.getByTestId('progress')
        expect(progress).toHaveClass('w-8', 'h-8')
      })

      it('renders large size correctly', () => {
        render(<Progress variant="circular" size="lg" data-testid="progress" />)
        
        const progress = screen.getByTestId('progress')
        expect(progress).toHaveClass('w-16', 'h-16')
      })
    })
  })

  describe('Colors', () => {
    it('renders primary color by default', () => {
      render(<Progress />)
      
      const progressBar = screen.getByRole('progressbar')
      const progressFill = progressBar.querySelector('div')
      expect(progressFill).toHaveClass('bg-blue-600')
    })

    it('renders success color correctly', () => {
      render(<Progress color="success" />)
      
      const progressBar = screen.getByRole('progressbar')
      const progressFill = progressBar.querySelector('div')
      expect(progressFill).toHaveClass('bg-green-600')
    })

    it('renders error color correctly', () => {
      render(<Progress color="error" />)
      
      const progressBar = screen.getByRole('progressbar')
      const progressFill = progressBar.querySelector('div')
      expect(progressFill).toHaveClass('bg-red-600')
    })
  })

  describe('Value handling', () => {
    it('displays correct progress value', () => {
      render(<Progress value={50} />)
      
      const progressbar = screen.getByRole('progressbar')
      expect(progressbar).toHaveAttribute('aria-valuenow', '50')
    })

    it('clamps value to 0-100 range', () => {
      const { rerender } = render(<Progress value={-10} />)
      expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '0')

      rerender(<Progress value={150} />)
      expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '100')
    })

    it('defaults to 0 when no value provided', () => {
      render(<Progress />)
      
      const progressbar = screen.getByRole('progressbar')
      expect(progressbar).toHaveAttribute('aria-valuenow', '0')
    })

    it('handles decimal values correctly', () => {
      render(<Progress value={33.7} />)
      
      const progressbar = screen.getByRole('progressbar')
      expect(progressbar).toHaveAttribute('aria-valuenow', '33.7')
    })
  })

  describe('Indeterminate state', () => {
    it('does not show value when indeterminate', () => {
      render(<Progress indeterminate />)
      
      const progressbar = screen.getByRole('progressbar')
      expect(progressbar).not.toHaveAttribute('aria-valuenow')
    })

    it('shows loading label when indeterminate', () => {
      render(<Progress indeterminate />)
      
      const progressbar = screen.getByRole('progressbar')
      expect(progressbar).toHaveAttribute('aria-label', 'Loading')
    })

    it('applies animation classes when indeterminate', () => {
      render(<Progress indeterminate />)
      
      const progressBar = screen.getByRole('progressbar')
      const progressFill = progressBar.querySelector('div')
      expect(progressFill).toHaveClass('animate-pulse')
    })

    it('shows full width for indeterminate linear progress', () => {
      render(<Progress indeterminate />)
      
      const progressBar = screen.getByRole('progressbar')
      const progressFill = progressBar.querySelector('div')
      expect(progressFill).toHaveStyle({ width: '100%' })
    })
  })

  describe('Labels', () => {
    it('does not show label by default', () => {
      render(<Progress value={50} />)
      
      expect(screen.queryByText('50%')).not.toBeInTheDocument()
    })

    it('shows percentage label when showLabel=true', () => {
      render(<Progress value={75} showLabel />)
      
      expect(screen.getByText('75%')).toBeInTheDocument()
    })

    it('shows custom label when provided', () => {
      render(<Progress value={50} label="Loading data..." />)
      
      expect(screen.getByText('Loading data...')).toBeInTheDocument()
    })

    it('prioritizes custom label over percentage', () => {
      render(<Progress value={50} showLabel label="Custom label" />)
      
      expect(screen.getByText('Custom label')).toBeInTheDocument()
      expect(screen.queryByText('50%')).not.toBeInTheDocument()
    })

    it('does not show percentage label when indeterminate', () => {
      render(<Progress indeterminate showLabel />)
      
      expect(screen.queryByText(/\d+%/)).not.toBeInTheDocument()
    })

    it('rounds percentage values for display', () => {
      render(<Progress value={33.7} showLabel />)
      
      expect(screen.getByText('34%')).toBeInTheDocument()
    })
  })

  describe('Children content', () => {
    it('renders children content', () => {
      render(
        <Progress value={50}>
          <div>Additional info</div>
        </Progress>
      )
      
      expect(screen.getByText('Additional info')).toBeInTheDocument()
    })

    it('positions children correctly for linear variant', () => {
      render(
        <Progress value={50} data-testid="progress">
          <div>Additional info</div>
        </Progress>
      )
      
      const progress = screen.getByTestId('progress')
      const childrenContainer = progress.querySelector('.mt-2')
      expect(childrenContainer).toBeInTheDocument()
      expect(childrenContainer).toContainElement(screen.getByText('Additional info'))
    })
  })

  describe('Accessibility', () => {
    it('has proper ARIA attributes', () => {
      render(<Progress value={50} />)
      
      const progressbar = screen.getByRole('progressbar')
      expect(progressbar).toHaveAttribute('aria-valuenow', '50')
      expect(progressbar).toHaveAttribute('aria-valuemin', '0')
      expect(progressbar).toHaveAttribute('aria-valuemax', '100')
      expect(progressbar).toHaveAttribute('aria-label', 'Progress: 50%')
    })

    it('has correct aria-label for indeterminate state', () => {
      render(<Progress indeterminate />)
      
      const progressbar = screen.getByRole('progressbar')
      expect(progressbar).toHaveAttribute('aria-label', 'Loading')
    })

    it('updates aria-label when value changes', () => {
      const { rerender } = render(<Progress value={25} />)
      expect(screen.getByRole('progressbar')).toHaveAttribute('aria-label', 'Progress: 25%')

      rerender(<Progress value={75} />)
      expect(screen.getByRole('progressbar')).toHaveAttribute('aria-label', 'Progress: 75%')
    })
  })

  describe('Edge cases', () => {
    it('handles zero value correctly', () => {
      render(<Progress value={0} showLabel />)
      
      expect(screen.getByText('0%')).toBeInTheDocument()
      expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '0')
    })

    it('handles 100% value correctly', () => {
      render(<Progress value={100} showLabel />)
      
      expect(screen.getByText('100%')).toBeInTheDocument()
      expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '100')
    })

    it('renders correctly with all props', () => {
      render(
        <Progress
          variant="circular"
          size="lg"
          color="success"
          value={80}
          showLabel
          label="Almost done"
          className="custom-class"
          data-testid="full-progress"
        >
          <div>Extra content</div>
        </Progress>
      )
      
      const progress = screen.getByTestId('full-progress')
      expect(progress).toHaveClass('custom-class', 'w-16', 'h-16')
      expect(screen.getByText('Almost done')).toBeInTheDocument()
      expect(screen.getByText('Extra content')).toBeInTheDocument()
      expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '80')
    })

    it('handles HTML attributes', () => {
      render(<Progress title="Progress tooltip" />)
      
      const progress = screen.getByRole('progressbar').closest('div')
      expect(progress).toHaveAttribute('title', 'Progress tooltip')
    })
  })
})
