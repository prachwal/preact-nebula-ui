import { render, screen } from '@testing-library/preact'
import { describe, it, expect } from 'vitest'
import { Badge } from './Badge'

describe('Badge', () => {
  describe('Rendering', () => {
    it('renders correctly with default props', () => {
      render(<Badge>Badge text</Badge>)
      
      expect(screen.getByText('Badge text')).toBeInTheDocument()
    })

    it('renders with custom className', () => {
      render(<Badge className="custom-badge">Test badge</Badge>)
      
      const badge = screen.getByText('Test badge')
      expect(badge).toHaveClass('custom-badge')
    })

    it('accepts data-testid', () => {
      render(<Badge data-testid="test-badge">Test badge</Badge>)
      
      expect(screen.getByTestId('test-badge')).toBeInTheDocument()
    })

    it('renders without children', () => {
      render(<Badge data-testid="empty-badge" />)
      
      const badge = screen.getByTestId('empty-badge')
      expect(badge).toBeInTheDocument()
      expect(badge).toBeEmptyDOMElement()
    })
  })

  describe('Variants', () => {
    it('renders default variant by default', () => {
      render(<Badge>Default badge</Badge>)
      
      const badge = screen.getByText('Default badge')
      expect(badge).toHaveClass('bg-gray-100', 'text-gray-800')
    })

    it('renders primary variant correctly', () => {
      render(<Badge variant="primary">Primary badge</Badge>)
      
      const badge = screen.getByText('Primary badge')
      expect(badge).toHaveClass('bg-blue-100', 'text-blue-800')
    })

    it('renders secondary variant correctly', () => {
      render(<Badge variant="secondary">Secondary badge</Badge>)
      
      const badge = screen.getByText('Secondary badge')
      expect(badge).toHaveClass('bg-gray-100', 'text-gray-600')
    })

    it('renders success variant correctly', () => {
      render(<Badge variant="success">Success badge</Badge>)
      
      const badge = screen.getByText('Success badge')
      expect(badge).toHaveClass('bg-green-100', 'text-green-800')
    })

    it('renders warning variant correctly', () => {
      render(<Badge variant="warning">Warning badge</Badge>)
      
      const badge = screen.getByText('Warning badge')
      expect(badge).toHaveClass('bg-yellow-100', 'text-yellow-800')
    })

    it('renders error variant correctly', () => {
      render(<Badge variant="error">Error badge</Badge>)
      
      const badge = screen.getByText('Error badge')
      expect(badge).toHaveClass('bg-red-100', 'text-red-800')
    })
  })

  describe('Sizes', () => {
    it('renders medium size by default', () => {
      render(<Badge>Medium badge</Badge>)
      
      const badge = screen.getByText('Medium badge')
      expect(badge).toHaveClass('px-2.5', 'py-1', 'text-sm', 'font-medium')
    })

    it('renders small size correctly', () => {
      render(<Badge size="sm">Small badge</Badge>)
      
      const badge = screen.getByText('Small badge')
      expect(badge).toHaveClass('px-2', 'py-0.5', 'text-xs', 'font-medium')
    })

    it('renders large size correctly', () => {
      render(<Badge size="lg">Large badge</Badge>)
      
      const badge = screen.getByText('Large badge')
      expect(badge).toHaveClass('px-3', 'py-1.5', 'text-base', 'font-medium')
    })
  })

  describe('Shapes', () => {
    it('renders rounded shape by default', () => {
      render(<Badge>Rounded badge</Badge>)
      
      const badge = screen.getByText('Rounded badge')
      expect(badge).toHaveClass('rounded-md')
    })

    it('renders pill shape correctly', () => {
      render(<Badge shape="pill">Pill badge</Badge>)
      
      const badge = screen.getByText('Pill badge')
      expect(badge).toHaveClass('rounded-full')
    })

    it('renders square shape correctly', () => {
      render(<Badge shape="square">Square badge</Badge>)
      
      const badge = screen.getByText('Square badge')
      expect(badge).toHaveClass('rounded-none')
    })
  })

  describe('Dot mode', () => {
    it('renders as dot when dot=true', () => {
      render(<Badge dot data-testid="dot-badge" />)
      
      const badge = screen.getByTestId('dot-badge')
      expect(badge).toHaveClass('w-2.5', 'h-2.5', 'rounded-full')
      expect(badge).toBeEmptyDOMElement()
    })

    it('ignores children in dot mode', () => {
      render(<Badge dot data-testid="dot-badge">Ignored text</Badge>)
      
      const badge = screen.getByTestId('dot-badge')
      expect(badge).toBeEmptyDOMElement()
      expect(screen.queryByText('Ignored text')).not.toBeInTheDocument()
    })

    it('applies correct size classes in dot mode', () => {
      const { rerender } = render(<Badge dot size="sm" data-testid="dot-badge" />)
      expect(screen.getByTestId('dot-badge')).toHaveClass('w-2', 'h-2')

      rerender(<Badge dot size="md" data-testid="dot-badge" />)
      expect(screen.getByTestId('dot-badge')).toHaveClass('w-2.5', 'h-2.5')

      rerender(<Badge dot size="lg" data-testid="dot-badge" />)
      expect(screen.getByTestId('dot-badge')).toHaveClass('w-3', 'h-3')
    })

    it('applies variant colors in dot mode', () => {
      render(<Badge dot variant="success" data-testid="dot-badge" />)
      
      const badge = screen.getByTestId('dot-badge')
      expect(badge).toHaveClass('bg-green-100', 'text-green-800')
    })
  })

  describe('Number formatting', () => {
    it('displays numbers correctly', () => {
      render(<Badge>{5}</Badge>)
      
      expect(screen.getByText('5')).toBeInTheDocument()
    })

    it('displays numbers up to max limit', () => {
      render(<Badge max={99}>{99}</Badge>)
      
      expect(screen.getByText('99')).toBeInTheDocument()
    })

    it('displays "max+" when number exceeds max', () => {
      render(<Badge max={99}>{150}</Badge>)
      
      expect(screen.getByText('99+')).toBeInTheDocument()
    })

    it('uses custom max value', () => {
      render(<Badge max={9}>{15}</Badge>)
      
      expect(screen.getByText('9+')).toBeInTheDocument()
    })

    it('handles zero correctly', () => {
      render(<Badge>{0}</Badge>)
      
      expect(screen.getByText('0')).toBeInTheDocument()
    })

    it('handles negative numbers correctly', () => {
      render(<Badge>{-5}</Badge>)
      
      expect(screen.getByText('-5')).toBeInTheDocument()
    })
  })

  describe('Content types', () => {
    it('renders string content', () => {
      render(<Badge>String content</Badge>)
      
      expect(screen.getByText('String content')).toBeInTheDocument()
    })

    it('renders JSX content', () => {
      render(
        <Badge>
          <span>JSX content</span>
        </Badge>
      )
      
      expect(screen.getByText('JSX content')).toBeInTheDocument()
    })

    it('renders multiple children', () => {
      render(
        <Badge>
          <span>Part 1</span>
          <span>Part 2</span>
        </Badge>
      )
      
      expect(screen.getByText('Part 1')).toBeInTheDocument()
      expect(screen.getByText('Part 2')).toBeInTheDocument()
    })
  })

  describe('Edge cases', () => {
    it('handles all props together', () => {
      render(
        <Badge
          variant="success"
          size="lg"
          shape="pill"
          max={50}
          className="custom-class"
          data-testid="full-badge"
        >
          {75}
        </Badge>
      )
      
      const badge = screen.getByTestId('full-badge')
      expect(badge).toHaveClass('bg-green-100', 'text-green-800') // variant
      expect(badge).toHaveClass('px-3', 'py-1.5', 'text-base', 'font-medium') // size
      expect(badge).toHaveClass('rounded-full') // shape
      expect(badge).toHaveClass('custom-class') // custom class
      expect(screen.getByText('50+')).toBeInTheDocument() // max formatting
    })

    it('handles HTML attributes', () => {
      render(<Badge title="Badge tooltip">Tooltip badge</Badge>)
      
      const badge = screen.getByText('Tooltip badge')
      expect(badge).toHaveAttribute('title', 'Badge tooltip')
    })

    it('handles click events', () => {
      const handleClick = vi.fn()
      render(<Badge onClick={handleClick}>Clickable badge</Badge>)
      
      const badge = screen.getByText('Clickable badge')
      badge.click()
      
      expect(handleClick).toHaveBeenCalledTimes(1)
    })
  })
})
