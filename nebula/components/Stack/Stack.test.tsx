import { render, screen } from '@testing-library/preact'
import { describe, it, expect } from 'vitest'
import { Stack } from './Stack'

describe('Stack', () => {
  describe('Basic Rendering', () => {
    it('renders with default props', () => {
      render(<Stack data-testid="stack">Stack content</Stack>)
      
      const stack = screen.getByTestId('stack')
      expect(stack).toBeInTheDocument()
      expect(stack).toHaveTextContent('Stack content')
    })

    it('renders with custom className', () => {
      render(<Stack className="custom-class" data-testid="stack">Content</Stack>)
      
      const stack = screen.getByTestId('stack')
      expect(stack).toHaveClass('custom-class')
    })

    it('forwards additional props to div element', () => {
      render(<Stack id="test-stack" data-testid="stack">Content</Stack>)
      
      const stack = screen.getByTestId('stack')
      expect(stack).toHaveAttribute('id', 'test-stack')
    })
  })

  describe('Direction Variants', () => {
    it('renders vertical direction by default', () => {
      render(<Stack data-testid="stack">Content</Stack>)
      
      const stack = screen.getByTestId('stack')
      expect(stack).toHaveClass('flex-col')
    })

    it('renders vertical direction correctly', () => {
      render(<Stack direction="vertical" data-testid="stack">Content</Stack>)
      
      const stack = screen.getByTestId('stack')
      expect(stack).toHaveClass('flex-col')
    })

    it('renders horizontal direction correctly', () => {
      render(<Stack direction="horizontal" data-testid="stack">Content</Stack>)
      
      const stack = screen.getByTestId('stack')
      expect(stack).toHaveClass('flex-row')
    })
  })

  describe('Spacing Variants', () => {
    it('renders medium spacing by default', () => {
      render(<Stack data-testid="stack">Content</Stack>)
      
      const stack = screen.getByTestId('stack')
      expect(stack).toHaveClass('gap-4')
    })

    it('renders no spacing correctly', () => {
      render(<Stack spacing="none" data-testid="stack">Content</Stack>)
      
      const stack = screen.getByTestId('stack')
      expect(stack).toHaveClass('gap-0')
    })

    it('renders extra small spacing correctly', () => {
      render(<Stack spacing="xs" data-testid="stack">Content</Stack>)
      
      const stack = screen.getByTestId('stack')
      expect(stack).toHaveClass('gap-1')
    })

    it('renders small spacing correctly', () => {
      render(<Stack spacing="sm" data-testid="stack">Content</Stack>)
      
      const stack = screen.getByTestId('stack')
      expect(stack).toHaveClass('gap-2')
    })

    it('renders large spacing correctly', () => {
      render(<Stack spacing="lg" data-testid="stack">Content</Stack>)
      
      const stack = screen.getByTestId('stack')
      expect(stack).toHaveClass('gap-6')
    })

    it('renders extra large spacing correctly', () => {
      render(<Stack spacing="xl" data-testid="stack">Content</Stack>)
      
      const stack = screen.getByTestId('stack')
      expect(stack).toHaveClass('gap-8')
    })

    it('renders 2xl spacing correctly', () => {
      render(<Stack spacing="2xl" data-testid="stack">Content</Stack>)
      
      const stack = screen.getByTestId('stack')
      expect(stack).toHaveClass('gap-12')
    })
  })

  describe('Align Variants', () => {
    it('renders stretch alignment by default', () => {
      render(<Stack data-testid="stack">Content</Stack>)
      
      const stack = screen.getByTestId('stack')
      expect(stack).toHaveClass('items-stretch')
    })

    it('renders start alignment correctly', () => {
      render(<Stack align="start" data-testid="stack">Content</Stack>)
      
      const stack = screen.getByTestId('stack')
      expect(stack).toHaveClass('items-start')
    })

    it('renders center alignment correctly', () => {
      render(<Stack align="center" data-testid="stack">Content</Stack>)
      
      const stack = screen.getByTestId('stack')
      expect(stack).toHaveClass('items-center')
    })

    it('renders end alignment correctly', () => {
      render(<Stack align="end" data-testid="stack">Content</Stack>)
      
      const stack = screen.getByTestId('stack')
      expect(stack).toHaveClass('items-end')
    })
  })

  describe('Justify Variants', () => {
    it('renders start justification by default', () => {
      render(<Stack data-testid="stack">Content</Stack>)
      
      const stack = screen.getByTestId('stack')
      expect(stack).toHaveClass('justify-start')
    })

    it('renders center justification correctly', () => {
      render(<Stack justify="center" data-testid="stack">Content</Stack>)
      
      const stack = screen.getByTestId('stack')
      expect(stack).toHaveClass('justify-center')
    })

    it('renders end justification correctly', () => {
      render(<Stack justify="end" data-testid="stack">Content</Stack>)
      
      const stack = screen.getByTestId('stack')
      expect(stack).toHaveClass('justify-end')
    })

    it('renders between justification correctly', () => {
      render(<Stack justify="between" data-testid="stack">Content</Stack>)
      
      const stack = screen.getByTestId('stack')
      expect(stack).toHaveClass('justify-between')
    })

    it('renders around justification correctly', () => {
      render(<Stack justify="around" data-testid="stack">Content</Stack>)
      
      const stack = screen.getByTestId('stack')
      expect(stack).toHaveClass('justify-around')
    })

    it('renders evenly justification correctly', () => {
      render(<Stack justify="evenly" data-testid="stack">Content</Stack>)
      
      const stack = screen.getByTestId('stack')
      expect(stack).toHaveClass('justify-evenly')
    })
  })

  describe('Wrap Behavior', () => {
    it('does not wrap by default', () => {
      render(<Stack data-testid="stack">Content</Stack>)
      
      const stack = screen.getByTestId('stack')
      expect(stack).not.toHaveClass('flex-wrap')
    })

    it('wraps when wrap prop is true', () => {
      render(<Stack wrap={true} data-testid="stack">Content</Stack>)
      
      const stack = screen.getByTestId('stack')
      expect(stack).toHaveClass('flex-wrap')
    })

    it('does not wrap when wrap prop is false', () => {
      render(<Stack wrap={false} data-testid="stack">Content</Stack>)
      
      const stack = screen.getByTestId('stack')
      expect(stack).not.toHaveClass('flex-wrap')
    })
  })

  describe('Base Classes', () => {
    it('always includes base flex class', () => {
      render(<Stack data-testid="stack">Content</Stack>)
      
      const stack = screen.getByTestId('stack')
      expect(stack).toHaveClass('flex')
    })

    it('combines all default classes correctly', () => {
      render(<Stack data-testid="stack">Content</Stack>)
      
      const stack = screen.getByTestId('stack')
      expect(stack).toHaveClass('flex', 'flex-col', 'gap-4', 'items-stretch', 'justify-start')
    })
  })

  describe('Custom Combinations', () => {
    it('renders horizontal stack with custom spacing and alignment', () => {
      render(
        <Stack 
          direction="horizontal" 
          spacing="lg" 
          align="center" 
          justify="between"
          data-testid="stack"
        >
          Content
        </Stack>
      )
      
      const stack = screen.getByTestId('stack')
      expect(stack).toHaveClass('flex-row', 'gap-6', 'items-center', 'justify-between')
    })

    it('renders wrapping stack with all custom props', () => {
      render(
        <Stack 
          direction="horizontal" 
          spacing="xl" 
          align="end" 
          justify="evenly"
          wrap={true}
          className="bg-gray-100"
          data-testid="stack"
        >
          Content
        </Stack>
      )
      
      const stack = screen.getByTestId('stack')
      expect(stack).toHaveClass(
        'flex-row', 
        'gap-8', 
        'items-end', 
        'justify-evenly', 
        'flex-wrap',
        'bg-gray-100'
      )
    })

    it('renders vertical stack with center alignment', () => {
      render(
        <Stack 
          direction="vertical" 
          spacing="sm" 
          align="center" 
          justify="center"
          data-testid="stack"
        >
          Content
        </Stack>
      )
      
      const stack = screen.getByTestId('stack')
      expect(stack).toHaveClass('flex-col', 'gap-2', 'items-center', 'justify-center')
    })
  })

  describe('Children Rendering', () => {
    it('renders multiple children correctly', () => {
      render(
        <Stack data-testid="stack">
          <div>Child 1</div>
          <div>Child 2</div>
          <div>Child 3</div>
        </Stack>
      )
      
      const stack = screen.getByTestId('stack')
      expect(stack).toHaveTextContent('Child 1')
      expect(stack).toHaveTextContent('Child 2')
      expect(stack).toHaveTextContent('Child 3')
    })

    it('handles single child correctly', () => {
      render(
        <Stack data-testid="stack">
          <div>Single Child</div>
        </Stack>
      )
      
      const stack = screen.getByTestId('stack')
      expect(stack).toHaveTextContent('Single Child')
    })
  })

  describe('Display Name', () => {
    it('has correct display name', () => {
      expect(Stack.displayName).toBe('Stack')
    })
  })
})
