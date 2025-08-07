import { render, screen, fireEvent, waitFor } from '@testing-library/preact'
import { vi } from 'vitest'
import { Upload } from './Upload'

// Mock file for testing
const createMockFile = (name: string, size: number, type: string): File => {
  const file = new File([''], name, { type })
  Object.defineProperty(file, 'size', { value: size })
  return file
}

describe('Upload', () => {
  beforeEach(() => {
    // Mock URL.createObjectURL
    global.URL.createObjectURL = vi.fn(() => 'mock-url')
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('renders upload drop zone', () => {
    render(<Upload />)
    
    expect(screen.getByText('Drop files here or click to browse')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Upload files' })).toBeInTheDocument()
  })

  it('supports size variants', () => {
    const { rerender } = render(<Upload size="sm" />)
    expect(screen.getByRole('button')).toHaveClass('min-h-24')

    rerender(<Upload size="md" />)
    expect(screen.getByRole('button')).toHaveClass('min-h-32')

    rerender(<Upload size="lg" />)
    expect(screen.getByRole('button')).toHaveClass('min-h-40')
  })

  it('handles file input change via drag and drop', async () => {
    const handleFilesSelect = vi.fn()
    const handleDrop = vi.fn()
    render(<Upload onFilesSelect={handleFilesSelect} onDrop={handleDrop} />)
    
    const dropZone = screen.getByRole('button')
    const file = createMockFile('test.txt', 1024, 'text/plain')
    
    // Create a proper DragEvent with DataTransfer
    const dropEvent = new Event('drop', { bubbles: true })
    Object.defineProperty(dropEvent, 'dataTransfer', {
      value: {
        files: [file]
      },
      writable: false
    })
    
    fireEvent(dropZone, dropEvent)
    
    await waitFor(() => {
      expect(handleDrop).toHaveBeenCalledWith([file])
      expect(handleFilesSelect).toHaveBeenCalledWith([file])
    })
  })

  it('shows file list when files are added via drag and drop', async () => {
    render(<Upload />)
    
    const dropZone = screen.getByRole('button')
    const file = createMockFile('test.txt', 1024, 'text/plain')
    
    // Create a proper DragEvent with DataTransfer
    const dropEvent = new Event('drop', { bubbles: true })
    Object.defineProperty(dropEvent, 'dataTransfer', {
      value: {
        files: [file]
      },
      writable: false
    })
    
    fireEvent(dropZone, dropEvent)
    
    await waitFor(() => {
      expect(screen.getByText('test.txt')).toBeInTheDocument()
      expect(screen.getByText('1 KB')).toBeInTheDocument()
    })
  })

  it('handles drag and drop events', async () => {
    const handleDrop = vi.fn()
    render(<Upload onDrop={handleDrop} />)
    
    const dropZone = screen.getByRole('button')
    const file = createMockFile('dropped.txt', 2048, 'text/plain')
    
    // Create a proper DragEvent
    const dropEvent = new Event('drop', { bubbles: true })
    Object.defineProperty(dropEvent, 'dataTransfer', {
      value: {
        files: [file]
      },
      writable: false
    })
    
    fireEvent(dropZone, dropEvent)
    
    await waitFor(() => {
      expect(handleDrop).toHaveBeenCalledWith([file])
    })
  })

  it('validates file size via drag and drop', async () => {
    render(<Upload maxSize={1500} />) // Use 1.5KB = 0.0015MB which should show as 0.0MB
    
    const dropZone = screen.getByRole('button')
    const file = createMockFile('large.txt', 2000, 'text/plain')
    
    // Verify maxSize is being displayed correctly
    expect(screen.getByText(/Max size: 0.0MB/)).toBeInTheDocument()
    
    // Create a proper DragEvent with DataTransfer
    const dropEvent = new Event('drop', { bubbles: true })
    Object.defineProperty(dropEvent, 'dataTransfer', {
      value: {
        files: [file]
      },
      writable: false
    })
    
    fireEvent(dropZone, dropEvent)
    
    await waitFor(() => {
      expect(screen.getAllByText(/File size exceeds/)).toHaveLength(2) // One in drop zone, one in file list
    })
  })

  it('validates file type via drag and drop', async () => {
    render(<Upload accept="image/*" />)
    
    const dropZone = screen.getByRole('button')
    const file = createMockFile('document.txt', 1000, 'text/plain')
    
    // Create a proper DragEvent with DataTransfer
    const dropEvent = new Event('drop', { bubbles: true })
    Object.defineProperty(dropEvent, 'dataTransfer', {
      value: {
        files: [file]
      },
      writable: false
    })
    
    fireEvent(dropZone, dropEvent)
    
    await waitFor(() => {
      expect(screen.getAllByText(/File type not accepted/)).toHaveLength(2) // One in drop zone, one in file list
    })
  })

  it('shows upload controls when autoUpload is false', async () => {
    render(<Upload autoUpload={false} />)
    
    const dropZone = screen.getByRole('button')
    const file = createMockFile('test.txt', 1024, 'text/plain')
    
    // Create a proper DragEvent with DataTransfer
    const dropEvent = new Event('drop', { bubbles: true })
    Object.defineProperty(dropEvent, 'dataTransfer', {
      value: {
        files: [file]
      },
      writable: false
    })
    
    fireEvent(dropZone, dropEvent)
    
    await waitFor(() => {
      expect(screen.getByText('Upload All')).toBeInTheDocument()
      expect(screen.getByText('Clear All')).toBeInTheDocument()
    })
  })

  it('handles file removal', async () => {
    render(<Upload />)
    
    const dropZone = screen.getByRole('button')
    const file = createMockFile('test.txt', 1024, 'text/plain')
    
    // Create a proper DragEvent with DataTransfer
    const dropEvent = new Event('drop', { bubbles: true })
    Object.defineProperty(dropEvent, 'dataTransfer', {
      value: {
        files: [file]
      },
      writable: false
    })
    
    fireEvent(dropZone, dropEvent)
    
    await waitFor(() => {
      expect(screen.getByText('test.txt')).toBeInTheDocument()
    })
    
    const removeButton = screen.getByLabelText('Remove test.txt')
    fireEvent.click(removeButton)
    
    await waitFor(() => {
      expect(screen.queryByText('test.txt')).not.toBeInTheDocument()
    })
  })

  it('supports disabled state', () => {
    render(<Upload disabled />)
    
    const dropZone = screen.getByRole('button')
    expect(dropZone).toHaveAttribute('aria-disabled', 'true')
    expect(dropZone).toHaveClass('opacity-50', 'cursor-not-allowed')
  })

  it('supports keyboard navigation', async () => {
    render(<Upload />)
    
    const dropZone = screen.getByRole('button')
    expect(dropZone).toHaveAttribute('tabIndex', '0')
    
    // Test Enter key
    fireEvent.keyDown(dropZone, { key: 'Enter' })
    
    // Test Space key
    fireEvent.keyDown(dropZone, { key: ' ' })
    
    // Should prevent default on keyboard activation
    const enterEvent = new KeyboardEvent('keydown', { key: 'Enter', bubbles: true })
    const preventDefaultSpy = vi.spyOn(enterEvent, 'preventDefault')
    fireEvent(dropZone, enterEvent)
    
    expect(preventDefaultSpy).toHaveBeenCalled()
  })

  it('applies custom className', () => {
    const { container } = render(<Upload className="custom-upload" />)
    
    const uploadContainer = container.querySelector('.custom-upload')
    expect(uploadContainer).toBeInTheDocument()
    expect(uploadContainer).toHaveClass('custom-upload')
  })

  it('forwards ref correctly', () => {
    const ref = vi.fn()
    render(<Upload ref={ref} />)
    
    expect(ref).toHaveBeenCalled()
  })
})
