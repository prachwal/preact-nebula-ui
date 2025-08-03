import { render, screen, fireEvent } from '@testing-library/preact'
import { describe, it, expect, vi } from 'vitest'
import { Card, CardHeader, CardBody, CardFooter } from './Card'

describe('Card', () => {

  describe('Basic Rendering', () => {
    it('renders with default props', () => {
      render(<Card data-testid="card">Card content</Card>)
      
      const card = screen.getByTestId('card')
      expect(card).toBeInTheDocument()
      expect(card).toHaveTextContent('Card content')
    })

    it('renders with custom className', () => {
      render(<Card className="custom-class" data-testid="card">Content</Card>)
      
      const card = screen.getByTestId('card')
      expect(card).toHaveClass('custom-class')
    })

    it('forwards additional props to div element', () => {
      render(<Card id="test-card" data-testid="card">Content</Card>)
      
      const card = screen.getByTestId('card')
      expect(card).toHaveAttribute('id', 'test-card')
    })
  })

  describe('Variants', () => {
    it('renders default variant correctly', () => {
      render(<Card variant="default" data-testid="card">Content</Card>)
      
      const card = screen.getByTestId('card')
      expect(card).toHaveClass('bg-white', 'border', 'border-gray-200', 'shadow-sm')
    })

    it('renders elevated variant correctly', () => {
      render(<Card variant="elevated" data-testid="card">Content</Card>)
      
      const card = screen.getByTestId('card')
      expect(card).toHaveClass('bg-white', 'shadow-md', 'border-0')
    })

    it('renders outlined variant correctly', () => {
      render(<Card variant="outlined" data-testid="card">Content</Card>)
      
      const card = screen.getByTestId('card')
      expect(card).toHaveClass('bg-white', 'border-2', 'border-gray-300', 'shadow-none')
    })
  })

  describe('Sizes', () => {
    it('renders small size correctly', () => {
      render(<Card size="sm" data-testid="card">Content</Card>)
      
      const card = screen.getByTestId('card')
      expect(card).toHaveClass('p-4')
    })

    it('renders medium size correctly (default)', () => {
      render(<Card size="md" data-testid="card">Content</Card>)
      
      const card = screen.getByTestId('card')
      expect(card).toHaveClass('p-6')
    })

    it('renders large size correctly', () => {
      render(<Card size="lg" data-testid="card">Content</Card>)
      
      const card = screen.getByTestId('card')
      expect(card).toHaveClass('p-8')
    })
  })

  describe('Interactive Card', () => {
    it('renders non-interactive card by default', () => {
      render(<Card data-testid="card">Content</Card>)
      
      const card = screen.getByTestId('card')
      expect(card).not.toHaveAttribute('tabIndex')
      expect(card).not.toHaveAttribute('role')
      expect(card).not.toHaveClass('cursor-pointer')
    })

    it('renders interactive card with proper attributes', () => {
      render(<Card interactive data-testid="card">Content</Card>)
      
      const card = screen.getByTestId('card')
      expect(card).toHaveAttribute('tabIndex', '0')
      expect(card).toHaveAttribute('role', 'button')
      expect(card).toHaveClass('cursor-pointer')
    })

    it('calls onClick when interactive card is clicked', () => {
      const handleClick = vi.fn()
      render(<Card interactive onClick={handleClick} data-testid="card">Content</Card>)
      
      const card = screen.getByTestId('card')
      fireEvent.click(card)
      
      expect(handleClick).toHaveBeenCalledTimes(1)
    })

    it('handles keyboard interaction on interactive card', () => {
      const handleKeyDown = vi.fn()
      render(<Card interactive onKeyDown={handleKeyDown} data-testid="card">Content</Card>)
      
      const card = screen.getByTestId('card')
      fireEvent.keyDown(card, { key: 'Enter' })
      
      expect(handleKeyDown).toHaveBeenCalledTimes(1)
    })
  })

  describe('Display Name', () => {
    it('has correct display name', () => {
      expect(Card.displayName).toBe('Card')
    })
  })
})

describe('CardHeader', () => {
  it('renders with default props', () => {
    render(<CardHeader data-testid="card-header">Header content</CardHeader>)
    
    const header = screen.getByTestId('card-header')
    expect(header).toBeInTheDocument()
    expect(header).toHaveTextContent('Header content')
  })

  it('applies correct default classes', () => {
    render(<CardHeader data-testid="card-header">Header</CardHeader>)
    
    const header = screen.getByTestId('card-header')
    expect(header).toHaveClass('flex', 'flex-col', 'space-y-1.5', 'pb-6')
  })

  it('accepts custom className', () => {
    render(<CardHeader className="custom-header" data-testid="card-header">Header</CardHeader>)
    
    const header = screen.getByTestId('card-header')
    expect(header).toHaveClass('custom-header')
  })

  it('forwards additional props', () => {
    render(<CardHeader id="test-header" data-testid="card-header">Header</CardHeader>)
    
    const header = screen.getByTestId('card-header')
    expect(header).toHaveAttribute('id', 'test-header')
  })

  it('has correct display name', () => {
    expect(CardHeader.displayName).toBe('CardHeader')
  })
})

describe('CardBody', () => {
  it('renders with default props', () => {
    render(<CardBody data-testid="card-body">Body content</CardBody>)
    
    const body = screen.getByTestId('card-body')
    expect(body).toBeInTheDocument()
    expect(body).toHaveTextContent('Body content')
  })

  it('applies correct default classes', () => {
    render(<CardBody data-testid="card-body">Body</CardBody>)
    
    const body = screen.getByTestId('card-body')
    expect(body).toHaveClass('pt-0')
  })

  it('accepts custom className', () => {
    render(<CardBody className="custom-body" data-testid="card-body">Body</CardBody>)
    
    const body = screen.getByTestId('card-body')
    expect(body).toHaveClass('custom-body')
  })

  it('forwards additional props', () => {
    render(<CardBody id="test-body" data-testid="card-body">Body</CardBody>)
    
    const body = screen.getByTestId('card-body')
    expect(body).toHaveAttribute('id', 'test-body')
  })

  it('has correct display name', () => {
    expect(CardBody.displayName).toBe('CardBody')
  })
})

describe('CardFooter', () => {
  it('renders with default props', () => {
    render(<CardFooter data-testid="card-footer">Footer content</CardFooter>)
    
    const footer = screen.getByTestId('card-footer')
    expect(footer).toBeInTheDocument()
    expect(footer).toHaveTextContent('Footer content')
  })

  it('applies correct default classes', () => {
    render(<CardFooter data-testid="card-footer">Footer</CardFooter>)
    
    const footer = screen.getByTestId('card-footer')
    expect(footer).toHaveClass('flex', 'items-center', 'pt-6')
  })

  it('accepts custom className', () => {
    render(<CardFooter className="custom-footer" data-testid="card-footer">Footer</CardFooter>)
    
    const footer = screen.getByTestId('card-footer')
    expect(footer).toHaveClass('custom-footer')
  })

  it('forwards additional props', () => {
    render(<CardFooter id="test-footer" data-testid="card-footer">Footer</CardFooter>)
    
    const footer = screen.getByTestId('card-footer')
    expect(footer).toHaveAttribute('id', 'test-footer')
  })

  it('has correct display name', () => {
    expect(CardFooter.displayName).toBe('CardFooter')
  })
})

describe('Card Composition', () => {
  it('renders complete card with all parts', () => {
    render(
      <Card data-testid="card">
        <CardHeader data-testid="card-header">
          <h3>Card Title</h3>
          <p>Card subtitle</p>
        </CardHeader>
        <CardBody data-testid="card-body">
          <p>This is the card body with some content.</p>
        </CardBody>
        <CardFooter data-testid="card-footer">
          <button>Action</button>
        </CardFooter>
      </Card>
    )
    
    const card = screen.getByTestId('card')
    const header = screen.getByTestId('card-header')
    const body = screen.getByTestId('card-body')
    const footer = screen.getByTestId('card-footer')
    
    expect(card).toBeInTheDocument()
    expect(header).toBeInTheDocument()
    expect(body).toBeInTheDocument()
    expect(footer).toBeInTheDocument()
    
    expect(header).toHaveTextContent('Card Title')
    expect(header).toHaveTextContent('Card subtitle')
    expect(body).toHaveTextContent('This is the card body with some content.')
    expect(footer).toHaveTextContent('Action')
  })
})
