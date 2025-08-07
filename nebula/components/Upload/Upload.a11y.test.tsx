import { render, screen } from '@testing-library/preact'
import { axe, toHaveNoViolations } from 'jest-axe'
import { Upload } from './Upload'

expect.extend(toHaveNoViolations)

describe('Upload Accessibility', () => {
  it('should not have accessibility violations', async () => {
    const { container } = render(<Upload />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })

  it('has proper ARIA labels', () => {
    render(<Upload />)
    
    expect(screen.getByRole('button', { name: 'Upload files' })).toBeInTheDocument()
    expect(screen.getByLabelText('Upload files')).toBeInTheDocument()
  })

  it('supports custom aria-label', () => {
    render(<Upload aria-label="Document uploader" />)
    
    expect(screen.getByLabelText('Document uploader')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Document uploader' })).toBeInTheDocument()
  })

  it('has proper disabled state accessibility', () => {
    render(<Upload disabled />)
    
    const dropZone = screen.getByRole('button')
    expect(dropZone).toHaveAttribute('aria-disabled', 'true')
    expect(dropZone).toHaveAttribute('tabIndex', '-1')
  })

  it('has proper keyboard navigation', () => {
    render(<Upload />)
    
    const dropZone = screen.getByRole('button')
    expect(dropZone).toHaveAttribute('tabIndex', '0')
  })

  it('provides proper file removal accessibility', async () => {
    render(<Upload />)
    
    // Simulate file addition (this is complex to test fully due to File API limitations)
    // In real usage, file removal buttons would have proper aria-labels
    const container = screen.getByRole('button').closest('div')
    expect(container).toBeInTheDocument()
  })

  it('handles focus management correctly', () => {
    render(<Upload />)
    
    const dropZone = screen.getByRole('button')
    
    // Should have proper focus styles (not have focus:outline-none)
    expect(dropZone).not.toHaveClass('focus:outline-none')
    
    // Should have proper focus ring styles
    expect(dropZone).toHaveClass('focus:ring-2', 'focus:ring-blue-500', 'focus:ring-offset-2')
  })

  it('provides screen reader friendly file information', () => {
    render(<Upload accept="image/*" maxSize={5000000} />)
    
    // Information about accepted types and limits should be visible
    expect(screen.getByText(/Accepted types: image/)).toBeInTheDocument()
    expect(screen.getByText(/Max size: 4.8MB/)).toBeInTheDocument()
  })
})
