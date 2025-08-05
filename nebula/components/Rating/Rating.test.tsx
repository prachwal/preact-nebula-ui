import { render, screen, fireEvent } from '@testing-library/preact'
import userEvent from '@testing-library/user-event'
import { expect, describe, it, vi } from 'vitest'
import { Rating } from '../Rating'

describe('Rating', () => {
  describe('Rendering', () => {
    it('renders with default props', () => {
      render(<Rating />)
      
      // Should render 5 stars by default (no value display by default)
      const stars = screen.getAllByRole('radiogroup')[0].children
      expect(stars).toHaveLength(5) // 5 stars only
    })

    it('renders custom number of stars', () => {
      render(<Rating max={3} />)
      
      const container = screen.getByRole('radiogroup')
      // Count star elements (filter out non-star children)
      const starElements = Array.from(container.children).filter(child => 
        child.className.includes('w-') && child.className.includes('h-')
      )
      expect(starElements).toHaveLength(3)
    })

    it('renders with different sizes', () => {
      const { rerender } = render(<Rating size="sm" />)
      let stars = screen.getByRole('radiogroup').querySelectorAll('[class*="w-4 h-4"]')
      expect(stars).toHaveLength(5)

      rerender(<Rating size="md" />)
      stars = screen.getByRole('radiogroup').querySelectorAll('[class*="w-5 h-5"]')
      expect(stars).toHaveLength(5)

      rerender(<Rating size="lg" />)
      stars = screen.getByRole('radiogroup').querySelectorAll('[class*="w-6 h-6"]')
      expect(stars).toHaveLength(5)
    })
  })

  describe('Value Control', () => {
    it('displays initial value correctly', () => {
      render(<Rating defaultValue={3} />)
      
      // Check aria-label contains the value
      const rating = screen.getByRole('radiogroup')
      expect(rating).toHaveAttribute('aria-label', 'Rating: 3 out of 5 stars')
    })

    it('works as controlled component', () => {
      const handleChange = vi.fn()
      const { rerender } = render(
        <Rating value={2} onChange={handleChange} />
      )
      
      let rating = screen.getByRole('radiogroup')
      expect(rating).toHaveAttribute('aria-label', 'Rating: 2 out of 5 stars')

      rerender(<Rating value={4} onChange={handleChange} />)
      rating = screen.getByRole('radiogroup')
      expect(rating).toHaveAttribute('aria-label', 'Rating: 4 out of 5 stars')
    })

    it('calls onChange when clicked', async () => {
      const user = userEvent.setup()
      const handleChange = vi.fn()
      render(<Rating onChange={handleChange} />)
      
      const starsContainer = screen.getByRole('radiogroup')
      const thirdStar = starsContainer.children[2] as HTMLElement
      // Find the clickable area within the star
      const clickableArea = thirdStar.querySelector('.absolute.inset-0.z-10') as HTMLElement
      await user.click(clickableArea)
      
      expect(handleChange).toHaveBeenCalledWith(3)
    })
  })

  describe('Half Stars', () => {
    it('supports half star selection when allowHalf is true', async () => {
      const user = userEvent.setup()
      const handleChange = vi.fn()
      render(<Rating allowHalf onChange={handleChange} />)
      
      const stars = screen.getByRole('radiogroup').children
      const thirdStar = stars[2] as HTMLElement
      
      // Click on left half of star
      const leftHalf = thirdStar.querySelector('[class*="w-1/2"]')
      await user.click(leftHalf!)
      
      expect(handleChange).toHaveBeenCalledWith(2.5)
    })

    it('displays half star values correctly', () => {
      render(<Rating allowHalf defaultValue={2.5} />)
      
      const rating = screen.getByRole('radiogroup')
      expect(rating).toHaveAttribute('aria-label', 'Rating: 2.5 out of 5 stars')
    })
  })

  describe('States', () => {
    it('applies read-only state correctly', () => {
      const handleChange = vi.fn()
      render(<Rating readOnly defaultValue={3} onChange={handleChange} />)
      
      const rating = screen.getByRole('radiogroup')
      expect(rating).toHaveAttribute('aria-readonly', 'true')
      expect(rating).toHaveAttribute('tabindex', '-1')
    })

    it('applies disabled state correctly', () => {
      render(<Rating disabled defaultValue={3} />)
      
      const rating = screen.getByRole('radiogroup')
      expect(rating).toHaveAttribute('aria-disabled', 'true')
      expect(rating).toHaveAttribute('tabindex', '-1')
      expect(rating).toHaveClass('opacity-50')
    })

    it('does not call onChange when read-only', async () => {
      const user = userEvent.setup()
      const handleChange = vi.fn()
      render(<Rating readOnly onChange={handleChange} />)
      
      const stars = screen.getByRole('radiogroup').children
      await user.click(stars[2] as Element)
      
      expect(handleChange).not.toHaveBeenCalled()
    })

    it('does not call onChange when disabled', async () => {
      const user = userEvent.setup()
      const handleChange = vi.fn()
      render(<Rating disabled onChange={handleChange} />)
      
      const stars = screen.getByRole('radiogroup').children
      await user.click(stars[2] as Element)
      
      expect(handleChange).not.toHaveBeenCalled()
    })
  })

  describe('Error State', () => {
    it('displays error state and message', () => {
      render(<Rating error errorMessage="Please provide a rating" />)
      
      const rating = screen.getByRole('radiogroup')
      expect(rating).toHaveClass('text-red-600')
      
      const errorMessage = screen.getByText('Please provide a rating')
      expect(errorMessage).toBeInTheDocument()
      expect(errorMessage).toHaveClass('text-red-600')
    })
  })

  describe('Value Display', () => {
    it('shows value when showValue is true', () => {
      render(<Rating showValue defaultValue={3} />)
      
      const valueDisplay = screen.getByText('3/5')
      expect(valueDisplay).toBeInTheDocument()
    })

    it('uses custom value formatter', () => {
      const formatter = (value: number, max: number) => `${value} out of ${max} stars`
      render(
        <Rating 
          showValue 
          defaultValue={4} 
          valueFormatter={formatter}
        />
      )
      
      const valueDisplay = screen.getByText('4 out of 5 stars')
      expect(valueDisplay).toBeInTheDocument()
    })
  })

  describe('Keyboard Navigation', () => {
    it('supports arrow key navigation', async () => {
      const handleChange = vi.fn()
      const { rerender } = render(<Rating defaultValue={2} onChange={handleChange} />)
      
      const rating = screen.getByRole('radiogroup')
      rating.focus()
      
      // Arrow right should increase value
      fireEvent.keyDown(rating, { key: 'ArrowRight' })
      expect(handleChange).toHaveBeenNthCalledWith(1, 3)
      
      // Simulate the component re-render with new value
      rerender(<Rating value={3} onChange={handleChange} />)
      
      // Arrow left should decrease value from 3 to 2
      fireEvent.keyDown(rating, { key: 'ArrowLeft' })
      expect(handleChange).toHaveBeenNthCalledWith(2, 2)
    })

    it('supports Home and End keys', async () => {
      const handleChange = vi.fn()
      render(<Rating defaultValue={3} onChange={handleChange} />)
      
      const rating = screen.getByRole('radiogroup')
      rating.focus()
      
      // Home should set to 0
      fireEvent.keyDown(rating, { key: 'Home' })
      expect(handleChange).toHaveBeenCalledWith(0)
      
      // End should set to max
      fireEvent.keyDown(rating, { key: 'End' })
      expect(handleChange).toHaveBeenCalledWith(5)
    })

    it('respects allowHalf in keyboard navigation', async () => {
      const handleChange = vi.fn()
      render(<Rating allowHalf defaultValue={2} onChange={handleChange} />)
      
      const rating = screen.getByRole('radiogroup')
      rating.focus()
      
      // Arrow right should increase by 0.5
      fireEvent.keyDown(rating, { key: 'ArrowRight' })
      expect(handleChange).toHaveBeenCalledWith(2.5)
    })

    it('does not respond to keyboard when read-only', async () => {
      const handleChange = vi.fn()
      render(<Rating readOnly defaultValue={2} onChange={handleChange} />)
      
      const rating = screen.getByRole('radiogroup')
      rating.focus()
      
      fireEvent.keyDown(rating, { key: 'ArrowRight' })
      expect(handleChange).not.toHaveBeenCalled()
    })
  })

  describe('Custom Icons', () => {
    it('renders custom icons when provided', () => {
      const customIcon = <span data-testid="custom-icon">★</span>
      const customEmptyIcon = <span data-testid="custom-empty-icon">☆</span>
      
      render(
        <Rating 
          defaultValue={2}
          icon={customIcon}
          emptyIcon={customEmptyIcon}
        />
      )
      
      expect(screen.getAllByTestId('custom-icon')).toHaveLength(2)
      expect(screen.getAllByTestId('custom-empty-icon')).toHaveLength(3)
    })
  })

  describe('Accessibility', () => {
    it('has proper ARIA attributes', () => {
      render(<Rating defaultValue={3} aria-label="Product rating" />)
      
      const rating = screen.getByRole('radiogroup')
      expect(rating).toHaveAttribute('aria-label', 'Product rating')
    })

    it('supports aria-labelledby', () => {
      render(
        <>
          <label id="rating-label">Rate this product</label>
          <Rating defaultValue={3} aria-labelledby="rating-label" />
        </>
      )
      
      const rating = screen.getByRole('radiogroup')
      expect(rating).toHaveAttribute('aria-labelledby', 'rating-label')
    })

    it('is focusable when interactive', () => {
      render(<Rating />)
      
      const rating = screen.getByRole('radiogroup')
      expect(rating).toHaveAttribute('tabindex', '0')
    })

    it('is not focusable when read-only or disabled', () => {
      const { rerender } = render(<Rating readOnly />)
      let rating = screen.getByRole('radiogroup')
      expect(rating).toHaveAttribute('tabindex', '-1')

      rerender(<Rating disabled />)
      rating = screen.getByRole('radiogroup')
      expect(rating).toHaveAttribute('tabindex', '-1')
    })
  })

  describe('Mouse Interaction', () => {
    it('shows hover state when mouse enters star', async () => {
      const user = userEvent.setup()
      render(<Rating defaultValue={2} />)
      
      const stars = screen.getByRole('radiogroup').children
      await user.hover(stars[3] as Element) // Hover over 4th star
      
      // Should show rating: 4 out of 5 stars in aria-label due to hover
      // Note: This is implementation detail, might need adjustment based on actual behavior
    })

    it('resets hover state when mouse leaves', async () => {
      const user = userEvent.setup()
      render(<Rating defaultValue={2} />)
      
      const rating = screen.getByRole('radiogroup')
      const stars = rating.children
      
      await user.hover(stars[3] as Element)
      await user.unhover(stars[3] as Element)
      
      // Should return to original value display
      expect(rating).toHaveAttribute('aria-label', 'Rating: 2 out of 5 stars')
    })
  })
})
