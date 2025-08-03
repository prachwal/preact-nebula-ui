import { render, screen } from '@testing-library/preact'
import { describe, it, expect } from 'vitest'
import { Container } from './Container'

describe('Container', () => {
  describe('Basic Rendering', () => {
    it('renders with default props', () => {
      render(<Container data-testid="container">Container content</Container>)
      
      const container = screen.getByTestId('container')
      expect(container).toBeInTheDocument()
      expect(container).toHaveTextContent('Container content')
    })

    it('renders with custom className', () => {
      render(<Container className="custom-class" data-testid="container">Content</Container>)
      
      const container = screen.getByTestId('container')
      expect(container).toHaveClass('custom-class')
    })

    it('forwards additional props to div element', () => {
      render(<Container id="test-container" data-testid="container">Content</Container>)
      
      const container = screen.getByTestId('container')
      expect(container).toHaveAttribute('id', 'test-container')
    })
  })

  describe('Size Variants', () => {
    it('renders small size correctly', () => {
      render(<Container size="sm" data-testid="container">Content</Container>)
      
      const container = screen.getByTestId('container')
      expect(container).toHaveClass('max-w-sm')
    })

    it('renders medium size correctly', () => {
      render(<Container size="md" data-testid="container">Content</Container>)

      const container = screen.getByTestId('container')
      expect(container).toHaveClass('max-w-md')
    })

    it('renders large size correctly (default)', () => {
      render(<Container size="lg" data-testid="container">Content</Container>)

      const container = screen.getByTestId('container')
      expect(container).toHaveClass('max-w-2xl')
    })

    it('renders extra large size correctly', () => {
      render(<Container size="xl" data-testid="container">Content</Container>)
      
      const container = screen.getByTestId('container')
      expect(container).toHaveClass('max-w-4xl')
    })

    it('renders 2xl size correctly', () => {
      render(<Container size="2xl" data-testid="container">Content</Container>)

      const container = screen.getByTestId('container')
      expect(container).toHaveClass('max-w-6xl')
    })

    it('renders full width correctly', () => {
      render(<Container size="full" data-testid="container">Content</Container>)
      
      const container = screen.getByTestId('container')
      expect(container).toHaveClass('max-w-full')
    })
  })

  describe('Padding Variants', () => {
    it('renders no padding correctly', () => {
      render(<Container padding="none" data-testid="container">Content</Container>)
      
      const container = screen.getByTestId('container')
      expect(container).toHaveClass('px-0')
    })

    it('renders small padding correctly', () => {
      render(<Container padding="sm" data-testid="container">Content</Container>)
      
      const container = screen.getByTestId('container')
      expect(container).toHaveClass('px-4')
    })

    it('renders medium padding correctly (default)', () => {
      render(<Container padding="md" data-testid="container">Content</Container>)
      
      const container = screen.getByTestId('container')
      expect(container).toHaveClass('px-6', 'sm:px-8')
    })

    it('renders large padding correctly', () => {
      render(<Container padding="lg" data-testid="container">Content</Container>)
      
      const container = screen.getByTestId('container')
      expect(container).toHaveClass('px-8', 'sm:px-12')
    })
  })

  describe('Centering', () => {
    it('centers container by default', () => {
      render(<Container data-testid="container">Content</Container>)
      
      const container = screen.getByTestId('container')
      expect(container).toHaveClass('mx-auto')
    })

    it('centers container when explicitly set to true', () => {
      render(<Container centered={true} data-testid="container">Content</Container>)
      
      const container = screen.getByTestId('container')
      expect(container).toHaveClass('mx-auto')
    })

    it('does not center container when set to false', () => {
      render(<Container centered={false} data-testid="container">Content</Container>)
      
      const container = screen.getByTestId('container')
      expect(container).not.toHaveClass('mx-auto')
    })
  })

  describe('Base Classes', () => {
    it('always includes base width class', () => {
      render(<Container data-testid="container">Content</Container>)
      
      const container = screen.getByTestId('container')
      expect(container).toHaveClass('w-full')
    })

    it('combines all default classes correctly', () => {
      render(<Container data-testid="container">Content</Container>)
      
      const container = screen.getByTestId('container')
      expect(container).toHaveClass('w-full', 'max-w-2xl', 'px-6', 'sm:px-8', 'mx-auto')
    })
  })

  describe('Custom Combinations', () => {
    it('renders with custom size and padding', () => {
      render(
        <Container size="xl" padding="lg" data-testid="container">
          Content
        </Container>
      )
      
      const container = screen.getByTestId('container')
      expect(container).toHaveClass('max-w-4xl', 'px-8', 'sm:px-12')
    })

    it('renders full width without centering', () => {
      render(
        <Container size="full" centered={false} data-testid="container">
          Content
        </Container>
      )
      
      const container = screen.getByTestId('container')
      expect(container).toHaveClass('max-w-full')
      expect(container).not.toHaveClass('mx-auto')
    })

    it('renders with all custom props', () => {
      render(
        <Container 
          size="md" 
          padding="sm" 
          centered={false}
          className="bg-gray-100"
          data-testid="container"
        >
          Content
        </Container>
      )
      
      const container = screen.getByTestId('container')
      expect(container).toHaveClass('max-w-md', 'px-4', 'bg-gray-100')
      expect(container).not.toHaveClass('mx-auto')
    })
  })

  describe('Display Name', () => {
    it('has correct display name', () => {
      expect(Container.displayName).toBe('Container')
    })
  })
})
