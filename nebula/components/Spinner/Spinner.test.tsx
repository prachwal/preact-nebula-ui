import { render, screen } from '@testing-library/preact'
import { describe, it, expect } from 'vitest'
import { Spinner } from './Spinner'

describe('Spinner', () => {
  describe('Basic Rendering', () => {
    it('renders with default props', () => {
      render(<Spinner data-testid="spinner" />)
      
      const spinner = screen.getByTestId('spinner')
      expect(spinner).toBeInTheDocument()
      expect(spinner).toHaveAttribute('role', 'status')
      expect(spinner).toHaveAttribute('aria-label', 'Loading...')
    })

    it('renders with custom aria-label', () => {
      render(<Spinner aria-label="Processing..." data-testid="spinner" />)
      
      const spinner = screen.getByTestId('spinner')
      expect(spinner).toHaveAttribute('aria-label', 'Processing...')
    })

    it('renders with custom className', () => {
      render(<Spinner className="custom-class" data-testid="spinner" />)
      
      const spinner = screen.getByTestId('spinner')
      expect(spinner).toHaveClass('custom-class')
    })
  })

  describe('Size Variants', () => {
    it('renders extra small size correctly', () => {
      render(<Spinner size="xs" data-testid="spinner" />)
      
      const spinner = screen.getByTestId('spinner')
      expect(spinner).toHaveClass('w-2', 'h-2')
    })

    it('renders small size correctly', () => {
      render(<Spinner size="sm" data-testid="spinner" />)
      
      const spinner = screen.getByTestId('spinner')
      expect(spinner).toHaveClass('w-4', 'h-4')
    })

    it('renders medium size correctly (default)', () => {
      render(<Spinner size="md" data-testid="spinner" />)
      
      const spinner = screen.getByTestId('spinner')
      expect(spinner).toHaveClass('w-6', 'h-6')
    })

    it('renders large size correctly', () => {
      render(<Spinner size="lg" data-testid="spinner" />)
      
      const spinner = screen.getByTestId('spinner')
      expect(spinner).toHaveClass('w-8', 'h-8')
    })

    it('renders extra large size correctly', () => {
      render(<Spinner size="xl" data-testid="spinner" />)
      
      const spinner = screen.getByTestId('spinner')
      expect(spinner).toHaveClass('w-10', 'h-10')
    })

    it('renders 2xl size correctly', () => {
      render(<Spinner size="2xl" data-testid="spinner" />)
      
      const spinner = screen.getByTestId('spinner')
      expect(spinner).toHaveClass('w-12', 'h-12')
    })
  })

  describe('Color Variants', () => {
    it('renders with current color (default)', () => {
      render(<Spinner color="current" data-testid="spinner" />)
      
      const spinner = screen.getByTestId('spinner')
      expect(spinner).toHaveClass('text-current')
    })

    it('renders with blue color', () => {
      render(<Spinner color="blue" data-testid="spinner" />)
      
      const spinner = screen.getByTestId('spinner')
      expect(spinner).toHaveClass('text-blue-600')
    })

    it('renders with gray color', () => {
      render(<Spinner color="gray" data-testid="spinner" />)
      
      const spinner = screen.getByTestId('spinner')
      expect(spinner).toHaveClass('text-gray-600')
    })

    it('renders with white color', () => {
      render(<Spinner color="white" data-testid="spinner" />)
      
      const spinner = screen.getByTestId('spinner')
      expect(spinner).toHaveClass('text-white')
    })

    it('renders with red color', () => {
      render(<Spinner color="red" data-testid="spinner" />)
      
      const spinner = screen.getByTestId('spinner')
      expect(spinner).toHaveClass('text-red-600')
    })

    it('renders with green color', () => {
      render(<Spinner color="green" data-testid="spinner" />)
      
      const spinner = screen.getByTestId('spinner')
      expect(spinner).toHaveClass('text-green-600')
    })

    it('renders with yellow color', () => {
      render(<Spinner color="yellow" data-testid="spinner" />)
      
      const spinner = screen.getByTestId('spinner')
      expect(spinner).toHaveClass('text-yellow-600')
    })
  })

  describe('Animation', () => {
    it('includes animation class', () => {
      render(<Spinner data-testid="spinner" />)
      
      const spinner = screen.getByTestId('spinner')
      expect(spinner).toHaveClass('animate-spin')
    })
  })

  describe('Accessibility', () => {
    it('has correct ARIA attributes', () => {
      render(<Spinner data-testid="spinner" />)
      
      const spinner = screen.getByTestId('spinner')
      expect(spinner).toHaveAttribute('role', 'status')
      expect(spinner).toHaveAttribute('aria-label', 'Loading...')
    })

    it('accepts custom aria-label', () => {
      render(<Spinner aria-label="Custom loading message" data-testid="spinner" />)
      
      const spinner = screen.getByTestId('spinner')
      expect(spinner).toHaveAttribute('aria-label', 'Custom loading message')
    })
  })

  describe('SVG Structure', () => {
    it('renders as SVG element', () => {
      render(<Spinner data-testid="spinner" />)
      
      const spinner = screen.getByTestId('spinner')
      expect(spinner.tagName).toBe('svg')
      expect(spinner).toHaveAttribute('fill', 'none')
      expect(spinner).toHaveAttribute('viewBox', '0 0 24 24')
    })

    it('contains circle and path elements', () => {
      render(<Spinner data-testid="spinner" />)
      
      const spinner = screen.getByTestId('spinner')
      const circle = spinner.querySelector('circle')
      const path = spinner.querySelector('path')
      
      expect(circle).toBeInTheDocument()
      expect(path).toBeInTheDocument()
    })
  })

  describe('Display Name', () => {
    it('has correct display name', () => {
      expect(Spinner.displayName).toBe('Spinner')
    })
  })
})
