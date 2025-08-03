import { render, screen } from '@testing-library/preact'
import { describe, it, expect } from 'vitest'
import { Divider } from './Divider'

describe('Divider', () => {
  describe('Basic Rendering', () => {
    it('renders with default props', () => {
      render(<Divider data-testid="divider" />)
      
      const divider = screen.getByTestId('divider')
      expect(divider).toBeInTheDocument()
      expect(divider).toHaveAttribute('role', 'separator')
    })

    it('renders with custom className', () => {
      render(<Divider className="custom-class" data-testid="divider" />)
      
      const divider = screen.getByTestId('divider')
      expect(divider).toHaveClass('custom-class')
    })

    it('forwards additional props to div element', () => {
      render(<Divider id="test-divider" data-testid="divider" />)
      
      const divider = screen.getByTestId('divider')
      expect(divider).toHaveAttribute('id', 'test-divider')
    })

    it('has correct display name', () => {
      expect(Divider.displayName).toBe('Divider')
    })
  })

  describe('Variant Styles', () => {
    it('renders solid variant by default', () => {
      render(<Divider data-testid="divider" />)
      
      const divider = screen.getByTestId('divider')
      expect(divider).toHaveClass('border-solid')
    })

    it('renders solid variant correctly', () => {
      render(<Divider variant="solid" data-testid="divider" />)
      
      const divider = screen.getByTestId('divider')
      expect(divider).toHaveClass('border-solid')
    })

    it('renders dashed variant correctly', () => {
      render(<Divider variant="dashed" data-testid="divider" />)
      
      const divider = screen.getByTestId('divider')
      expect(divider).toHaveClass('border-dashed')
    })

    it('renders dotted variant correctly', () => {
      render(<Divider variant="dotted" data-testid="divider" />)
      
      const divider = screen.getByTestId('divider')
      expect(divider).toHaveClass('border-dotted')
    })
  })

  describe('Orientation Styles', () => {
    it('renders horizontal orientation by default', () => {
      render(<Divider data-testid="divider" />)
      
      const divider = screen.getByTestId('divider')
      expect(divider).toHaveClass('w-full', 'border-t-2')
    })

    it('renders horizontal orientation correctly', () => {
      render(<Divider orientation="horizontal" data-testid="divider" />)
      
      const divider = screen.getByTestId('divider')
      expect(divider).toHaveClass('w-full', 'border-t-2')
    })

    it('renders vertical orientation correctly', () => {
      render(<Divider orientation="vertical" data-testid="divider" />)
      
      const divider = screen.getByTestId('divider')
      expect(divider).toHaveClass('h-full', 'border-l-2')
    })
  })

  describe('Size Styles', () => {
    it('renders medium size by default', () => {
      render(<Divider data-testid="divider" />)
      
      const divider = screen.getByTestId('divider')
      expect(divider).toHaveClass('border-t-2')
    })

    it('renders small size correctly (horizontal)', () => {
      render(<Divider size="sm" data-testid="divider" />)
      
      const divider = screen.getByTestId('divider')
      expect(divider).toHaveClass('border-t')
    })

    it('renders medium size correctly (horizontal)', () => {
      render(<Divider size="md" data-testid="divider" />)
      
      const divider = screen.getByTestId('divider')
      expect(divider).toHaveClass('border-t-2')
    })

    it('renders large size correctly (horizontal)', () => {
      render(<Divider size="lg" data-testid="divider" />)
      
      const divider = screen.getByTestId('divider')
      expect(divider).toHaveClass('border-t-4')
    })

    it('renders small size correctly (vertical)', () => {
      render(<Divider orientation="vertical" size="sm" data-testid="divider" />)
      
      const divider = screen.getByTestId('divider')
      expect(divider).toHaveClass('border-l')
    })

    it('renders medium size correctly (vertical)', () => {
      render(<Divider orientation="vertical" size="md" data-testid="divider" />)
      
      const divider = screen.getByTestId('divider')
      expect(divider).toHaveClass('border-l-2')
    })

    it('renders large size correctly (vertical)', () => {
      render(<Divider orientation="vertical" size="lg" data-testid="divider" />)
      
      const divider = screen.getByTestId('divider')
      expect(divider).toHaveClass('border-l-4')
    })
  })

  describe('Text Dividers', () => {
    it('renders horizontal divider with text', () => {
      render(<Divider text="OR" data-testid="divider" />)
      
      const divider = screen.getByTestId('divider')
      expect(divider).toHaveClass('flex', 'items-center', 'w-full')
      expect(divider).toHaveTextContent('OR')
    })

    it('renders vertical divider with text', () => {
      render(<Divider orientation="vertical" text="OR" data-testid="divider" />)
      
      const divider = screen.getByTestId('divider')
      expect(divider).toHaveClass('flex', 'flex-col', 'items-center', 'h-full')
      expect(divider).toHaveTextContent('OR')
    })

    it('ignores empty text', () => {
      render(<Divider text="" data-testid="divider" />)
      
      const divider = screen.getByTestId('divider')
      expect(divider).toHaveClass('w-full', 'border-t-2')
      expect(divider).not.toHaveClass('flex')
    })

    it('ignores whitespace-only text', () => {
      render(<Divider text="   " data-testid="divider" />)
      
      const divider = screen.getByTestId('divider')
      expect(divider).toHaveClass('w-full', 'border-t-2')
      expect(divider).not.toHaveClass('flex')
    })

    it('renders text with proper styling (horizontal)', () => {
      render(<Divider text="OR" data-testid="divider" />)
      
      const divider = screen.getByTestId('divider')
      const textElement = divider.querySelector('span')
      expect(textElement).toHaveClass('text-sm', 'text-gray-500', 'bg-white', 'px-3')
    })

    it('renders text with proper styling (vertical)', () => {
      render(<Divider orientation="vertical" text="OR" data-testid="divider" />)
      
      const divider = screen.getByTestId('divider')
      const textElement = divider.querySelector('span')
      expect(textElement).toHaveClass('text-sm', 'text-gray-500', 'bg-white', 'py-3')
    })
  })

  describe('Combined Styles', () => {
    it('renders dashed vertical divider with large size', () => {
      render(
        <Divider 
          variant="dashed" 
          orientation="vertical" 
          size="lg" 
          data-testid="divider" 
        />
      )
      
      const divider = screen.getByTestId('divider')
      expect(divider).toHaveClass(
        'h-full',
        'border-dashed',
        'border-gray-300',
        'border-l-4'
      )
    })

    it('renders dotted horizontal divider with text and small size', () => {
      render(
        <Divider 
          variant="dotted" 
          orientation="horizontal" 
          size="sm" 
          text="DIVIDER"
          data-testid="divider" 
        />
      )
      
      const divider = screen.getByTestId('divider')
      expect(divider).toHaveClass('flex', 'items-center', 'w-full')
      expect(divider).toHaveTextContent('DIVIDER')
      
      const borderElements = divider.querySelectorAll('div')
      borderElements.forEach(element => {
        expect(element).toHaveClass('border-dotted', 'border-gray-300', 'border-t')
      })
    })
  })

  describe('Accessibility', () => {
    it('has proper ARIA attributes', () => {
      render(<Divider data-testid="divider" />)
      
      const divider = screen.getByTestId('divider')
      expect(divider).toHaveAttribute('role', 'separator')
    })

    it('maintains role separator with text', () => {
      render(<Divider text="OR" data-testid="divider" />)
      
      const divider = screen.getByTestId('divider')
      expect(divider).toHaveAttribute('role', 'separator')
    })
  })
})
