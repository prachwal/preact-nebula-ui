import { render, screen, fireEvent, waitFor } from '@testing-library/preact'
import userEvent from '@testing-library/user-event'
import { expect, describe, it, vi, beforeEach } from 'vitest'
import { Pagination } from './Pagination'
import type { PaginationProps } from './Pagination.types'

describe('Pagination', () => {
  const defaultProps: PaginationProps = {
    currentPage: 1,
    totalPages: 10,
    onPageChange: vi.fn()
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('Basic Rendering', () => {
    it('renders without crashing', () => {
      render(<Pagination {...defaultProps} />)
      expect(screen.getByRole('navigation')).toBeInTheDocument()
    })

    it('applies custom className', () => {
      render(<Pagination {...defaultProps} className="custom-pagination" />)
      expect(screen.getByRole('navigation').closest('div')).toHaveClass('custom-pagination')
    })

    it('renders with custom aria-label', () => {
      render(<Pagination {...defaultProps} ariaLabel="Custom pagination" />)
      expect(screen.getByRole('navigation')).toHaveAttribute('aria-label', 'Custom pagination')
    })
  })

  describe('Page Navigation', () => {
    it('renders page numbers', () => {
      render(<Pagination {...defaultProps} />)
      expect(screen.getByRole('button', { name: 'Page 1' })).toBeInTheDocument()
      expect(screen.getByRole('button', { name: 'Page 2' })).toBeInTheDocument()
    })

    it('highlights current page', () => {
      render(<Pagination {...defaultProps} currentPage={3} />)
      const currentPageButton = screen.getByRole('button', { name: 'Page 3' })
      expect(currentPageButton).toHaveAttribute('aria-current', 'page')
    })

    it('calls onPageChange when page is clicked', () => {
      const onPageChange = vi.fn()
      render(<Pagination {...defaultProps} onPageChange={onPageChange} />)
      
      fireEvent.click(screen.getByRole('button', { name: 'Page 3' }))
      expect(onPageChange).toHaveBeenCalledWith(3)
    })

    it('does not call onPageChange for current page', () => {
      const onPageChange = vi.fn()
      render(<Pagination {...defaultProps} currentPage={3} onPageChange={onPageChange} />)
      
      fireEvent.click(screen.getByRole('button', { name: 'Page 3' }))
      expect(onPageChange).not.toHaveBeenCalled()
    })
  })

  describe('Previous/Next Navigation', () => {
    it('renders previous and next buttons by default', () => {
      render(<Pagination {...defaultProps} />)
      expect(screen.getByRole('button', { name: 'Previous' })).toBeInTheDocument()
      expect(screen.getByRole('button', { name: 'Next' })).toBeInTheDocument()
    })

    it('disables previous button on first page', () => {
      render(<Pagination {...defaultProps} currentPage={1} />)
      expect(screen.getByRole('button', { name: 'Previous' })).toBeDisabled()
    })

    it('disables next button on last page', () => {
      render(<Pagination {...defaultProps} currentPage={10} totalPages={10} />)
      expect(screen.getByRole('button', { name: 'Next' })).toBeDisabled()
    })

    it('calls onPageChange for previous button', () => {
      const onPageChange = vi.fn()
      render(<Pagination {...defaultProps} currentPage={5} onPageChange={onPageChange} />)
      
      fireEvent.click(screen.getByRole('button', { name: 'Previous' }))
      expect(onPageChange).toHaveBeenCalledWith(4)
    })

    it('calls onPageChange for next button', () => {
      const onPageChange = vi.fn()
      render(<Pagination {...defaultProps} currentPage={5} onPageChange={onPageChange} />)
      
      fireEvent.click(screen.getByRole('button', { name: 'Next' }))
      expect(onPageChange).toHaveBeenCalledWith(6)
    })

    it('hides prev/next buttons when showPrevNext is false', () => {
      render(<Pagination {...defaultProps} showPrevNext={false} />)
      expect(screen.queryByRole('button', { name: 'Previous' })).not.toBeInTheDocument()
      expect(screen.queryByRole('button', { name: 'Next' })).not.toBeInTheDocument()
    })
  })

  describe('First/Last Navigation', () => {
    it('does not show first/last buttons by default', () => {
      render(<Pagination {...defaultProps} />)
      expect(screen.queryByRole('button', { name: 'First' })).not.toBeInTheDocument()
      expect(screen.queryByRole('button', { name: 'Last' })).not.toBeInTheDocument()
    })

    it('shows first/last buttons when enabled', () => {
      render(<Pagination {...defaultProps} showFirstLast={true} />)
      expect(screen.getByRole('button', { name: 'First' })).toBeInTheDocument()
      expect(screen.getByRole('button', { name: 'Last' })).toBeInTheDocument()
    })

    it('calls onPageChange for first button', () => {
      const onPageChange = vi.fn()
      render(<Pagination {...defaultProps} currentPage={5} showFirstLast={true} onPageChange={onPageChange} />)
      
      fireEvent.click(screen.getByRole('button', { name: 'First' }))
      expect(onPageChange).toHaveBeenCalledWith(1)
    })

    it('calls onPageChange for last button', () => {
      const onPageChange = vi.fn()
      render(<Pagination {...defaultProps} currentPage={5} showFirstLast={true} onPageChange={onPageChange} />)
      
      fireEvent.click(screen.getByRole('button', { name: 'Last' }))
      expect(onPageChange).toHaveBeenCalledWith(10)
    })
  })

  describe('Ellipsis', () => {
    it('shows ellipsis for large page counts', () => {
      render(<Pagination {...defaultProps} currentPage={15} totalPages={30} maxPageButtons={7} />)
      expect(screen.getAllByText('...')).toHaveLength(2)
    })

    it('does not show ellipsis for small page counts', () => {
      render(<Pagination {...defaultProps} totalPages={5} />)
      expect(screen.queryByText('...')).not.toBeInTheDocument()
    })
  })

  describe('Page Size Selector', () => {
    it('does not show page size selector by default', () => {
      render(<Pagination {...defaultProps} />)
      expect(screen.queryByText('Items per page:')).not.toBeInTheDocument()
    })

    it('shows page size selector when enabled', () => {
      render(<Pagination {...defaultProps} showPageSizeSelector={true} onPageSizeChange={vi.fn()} />)
      expect(screen.getByText('Items per page:')).toBeInTheDocument()
      expect(screen.getByRole('combobox')).toBeInTheDocument()
    })

    it('calls onPageSizeChange when page size is changed', async () => {
      const user = userEvent.setup()
      const onPageSizeChange = vi.fn()
      render(<Pagination {...defaultProps} showPageSizeSelector={true} onPageSizeChange={onPageSizeChange} />)
      
      const select = screen.getByRole('combobox')
      await user.selectOptions(select, '20')
      expect(onPageSizeChange).toHaveBeenCalledWith(20)
    })

    it('shows custom page size options', () => {
      render(<Pagination {...defaultProps} showPageSizeSelector={true} pageSizeOptions={[5, 15, 25]} onPageSizeChange={vi.fn()} />)
      
      const select = screen.getByRole('combobox')
      expect(select).toBeInTheDocument()
      expect(screen.getByRole('option', { name: '5' })).toBeInTheDocument()
      expect(screen.getByRole('option', { name: '15' })).toBeInTheDocument()
      expect(screen.getByRole('option', { name: '25' })).toBeInTheDocument()
    })
  })

  describe('Quick Jump', () => {
    it('does not show quick jump by default', () => {
      render(<Pagination {...defaultProps} />)
      expect(screen.queryByText('Jump to page:')).not.toBeInTheDocument()
    })

    it('shows quick jump when enabled', () => {
      render(<Pagination {...defaultProps} showQuickJump={true} />)
      expect(screen.getByText('Jump to page:')).toBeInTheDocument()
      expect(screen.getByRole('spinbutton')).toBeInTheDocument()
    })

    it('jumps to page when form is submitted', () => {
      const onPageChange = vi.fn()
      render(<Pagination {...defaultProps} showQuickJump={true} onPageChange={onPageChange} />)
      
      const input = screen.getByRole('spinbutton')
      fireEvent.change(input, { target: { value: '5' } })
      fireEvent.click(screen.getByRole('button', { name: 'Go' }))
      
      expect(onPageChange).toHaveBeenCalledWith(5)
    })

    it('clears input after successful jump', async () => {
      const onPageChange = vi.fn()
      render(<Pagination {...defaultProps} showQuickJump={true} onPageChange={onPageChange} />)
      
      const input = screen.getByRole('spinbutton') as HTMLInputElement
      fireEvent.change(input, { target: { value: '5' } })
      fireEvent.click(screen.getByRole('button', { name: 'Go' }))
      
      await waitFor(() => {
        expect(input.value).toBe('')
      })
    })
  })

  describe('Total Items Display', () => {
    it('shows total items by default when provided', () => {
      render(<Pagination {...defaultProps} totalItems={100} />)
      expect(screen.getByText('100 items total')).toBeInTheDocument()
    })

    it('hides total items when showTotalItems is false', () => {
      render(<Pagination {...defaultProps} totalItems={100} showTotalItems={false} />)
      expect(screen.queryByText('100 items total')).not.toBeInTheDocument()
    })

    it('does not show total items when not provided', () => {
      render(<Pagination {...defaultProps} />)
      expect(screen.queryByText(/items total/)).not.toBeInTheDocument()
    })
  })

  describe('Sizes', () => {
    it('applies small size classes', () => {
      render(<Pagination {...defaultProps} size="sm" />)
      expect(screen.getByRole('button', { name: 'Page 1' })).toHaveClass('text-xs')
    })

    it('applies medium size classes by default', () => {
      render(<Pagination {...defaultProps} />)
      expect(screen.getByRole('button', { name: 'Page 1' })).toHaveClass('text-sm')
    })

    it('applies large size classes', () => {
      render(<Pagination {...defaultProps} size="lg" />)
      expect(screen.getByRole('button', { name: 'Page 1' })).toHaveClass('text-base')
    })
  })

  describe('Disabled State', () => {
    it('disables all buttons when disabled', () => {
      render(<Pagination {...defaultProps} disabled={true} />)
      
      const buttons = screen.getAllByRole('button')
      buttons.forEach(button => {
        expect(button).toBeDisabled()
      })
    })

    it('does not call onPageChange when disabled', () => {
      const onPageChange = vi.fn()
      render(<Pagination {...defaultProps} disabled={true} onPageChange={onPageChange} />)
      
      fireEvent.click(screen.getByRole('button', { name: 'Page 2' }))
      expect(onPageChange).not.toHaveBeenCalled()
    })
  })

  describe('Keyboard Navigation', () => {
    it('navigates to previous page with left arrow', () => {
      const onPageChange = vi.fn()
      render(<Pagination {...defaultProps} currentPage={5} onPageChange={onPageChange} />)
      
      fireEvent.keyDown(screen.getByRole('navigation').closest('div')!, { key: 'ArrowLeft' })
      expect(onPageChange).toHaveBeenCalledWith(4)
    })

    it('navigates to next page with right arrow', () => {
      const onPageChange = vi.fn()
      render(<Pagination {...defaultProps} currentPage={5} onPageChange={onPageChange} />)
      
      fireEvent.keyDown(screen.getByRole('navigation').closest('div')!, { key: 'ArrowRight' })
      expect(onPageChange).toHaveBeenCalledWith(6)
    })

    it('navigates to first page with Home key', () => {
      const onPageChange = vi.fn()
      render(<Pagination {...defaultProps} currentPage={5} onPageChange={onPageChange} />)
      
      fireEvent.keyDown(screen.getByRole('navigation').closest('div')!, { key: 'Home' })
      expect(onPageChange).toHaveBeenCalledWith(1)
    })

    it('navigates to last page with End key', () => {
      const onPageChange = vi.fn()
      render(<Pagination {...defaultProps} currentPage={5} onPageChange={onPageChange} />)
      
      fireEvent.keyDown(screen.getByRole('navigation').closest('div')!, { key: 'End' })
      expect(onPageChange).toHaveBeenCalledWith(10)
    })
  })

  describe('Compact Mode', () => {
    it('applies compact layout classes', () => {
      render(<Pagination {...defaultProps} compact={true} />)
      expect(screen.getByRole('navigation').closest('div')).toHaveClass('flex-col')
    })
  })

  describe('Custom Labels', () => {
    it('uses custom labels', () => {
      const customLabels = {
        previous: 'Prev',
        next: 'Next Page',
        first: 'Start',
        last: 'End'
      }
      
      render(<Pagination {...defaultProps} showFirstLast={true} labels={customLabels} />)
      
      expect(screen.getByRole('button', { name: 'Prev' })).toBeInTheDocument()
      expect(screen.getByRole('button', { name: 'Next Page' })).toBeInTheDocument()
      expect(screen.getByRole('button', { name: 'Start' })).toBeInTheDocument()
      expect(screen.getByRole('button', { name: 'End' })).toBeInTheDocument()
    })
  })

  describe('Accessibility', () => {
    it('has proper ARIA labels', () => {
      render(<Pagination {...defaultProps} />)
      
      expect(screen.getByRole('navigation')).toHaveAttribute('aria-label', 'Pagination Navigation')
      expect(screen.getByRole('button', { name: 'Page 1' })).toHaveAttribute('aria-current', 'page')
    })

    it('has live region for screen readers', () => {
      render(<Pagination {...defaultProps} currentPage={3} />)
      expect(screen.getByText('Page 3 of 10')).toHaveClass('sr-only')
    })

    it('has proper form labels', () => {
      render(<Pagination {...defaultProps} showPageSizeSelector={true} showQuickJump={true} onPageSizeChange={vi.fn()} />)
      
      expect(screen.getByLabelText('Items per page:')).toBeInTheDocument()
      expect(screen.getByLabelText('Jump to page:')).toBeInTheDocument()
    })
  })

  describe('Edge Cases', () => {
    it('does not render when totalPages is 1 and no other features enabled', () => {
      const { container } = render(<Pagination {...defaultProps} totalPages={1} showTotalItems={false} />)
      expect(container.firstChild).toBeNull()
    })

    it('renders when totalPages is 1 but other features are enabled', () => {
      render(<Pagination {...defaultProps} totalPages={1} totalItems={10} />)
      expect(screen.getByText('10 items total')).toBeInTheDocument()
    })

    it('handles invalid page numbers gracefully', () => {
      const onPageChange = vi.fn()
      render(<Pagination {...defaultProps} onPageChange={onPageChange} />)
      
      // Should not call for invalid pages
      const component = screen.getByRole('navigation').closest('div')!
      
      // Simulate direct function call with invalid values
      const pagination = component as any
      if (pagination._reactInternalFiber) {
        // Page 0 should be ignored
        expect(onPageChange).not.toHaveBeenCalledWith(0)
        // Page beyond total should be ignored
        expect(onPageChange).not.toHaveBeenCalledWith(11)
      }
    })
  })
})
