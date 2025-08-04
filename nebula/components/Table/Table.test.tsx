import { render, screen, fireEvent } from '@testing-library/preact'
import { describe, it, expect, vi } from 'vitest'
import Table, {
  TableContainer,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  TableHeaderCell,
  TableCaption,
  TableFooter,
} from './Table'

describe('Table', () => {
  // Basic rendering tests
  describe('Basic Rendering', () => {
    it('renders a basic table', () => {
      render(
        <Table data-testid="table">
          <TableBody>
            <TableRow>
              <TableCell>Cell content</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      )

      const table = screen.getByTestId('table')
      expect(table).toBeInTheDocument()
      expect(table).toHaveClass('w-full', 'border-collapse')
      expect(screen.getByText('Cell content')).toBeInTheDocument()
    })

    it('renders with compound components pattern', () => {
      const TableComponent = Table as any

      render(
        <TableComponent.Container>
          <TableComponent>
            <TableComponent.Header>
              <TableComponent.Row>
                <TableComponent.HeaderCell>Header</TableComponent.HeaderCell>
              </TableComponent.Row>
            </TableComponent.Header>
            <TableComponent.Body>
              <TableComponent.Row>
                <TableComponent.Cell>Body</TableComponent.Cell>
              </TableComponent.Row>
            </TableComponent.Body>
          </TableComponent>
        </TableComponent.Container>
      )

      expect(screen.getByText('Header')).toBeInTheDocument()
      expect(screen.getByText('Body')).toBeInTheDocument()
    })

    it('renders with all sections', () => {
      render(
        <Table>
          <TableCaption>Table Caption</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHeaderCell>Header</TableHeaderCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>Body</TableCell>
            </TableRow>
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell>Footer</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      )

      expect(screen.getByText('Table Caption')).toBeInTheDocument()
      expect(screen.getByText('Header')).toBeInTheDocument()
      expect(screen.getByText('Body')).toBeInTheDocument()
      expect(screen.getByText('Footer')).toBeInTheDocument()
    })
  })

  // Variant tests
  describe('Variants', () => {
    it('renders simple variant by default', () => {
      render(<Table data-testid="table" />)
      const table = screen.getByTestId('table')
      
      expect(table).not.toHaveClass('border-separate')
      expect(table).not.toHaveClass('[&_tr:nth-child(even)]:bg-muted/50')
    })

    it('renders striped variant', () => {
      render(<Table variant="striped" data-testid="table" />)
      const table = screen.getByTestId('table')
      
      expect(table).toHaveClass('[&_tr:nth-child(even)]:bg-muted/50')
    })

    it('renders outline variant', () => {
      render(<Table variant="outline" data-testid="table" />)
      const table = screen.getByTestId('table')
      
      expect(table).toHaveClass('border-separate', 'border-spacing-0')
    })
  })

  // Size tests
  describe('Sizes', () => {
    it('renders medium size by default', () => {
      render(<Table data-testid="table" />)
      const table = screen.getByTestId('table')
      
      expect(table).toHaveClass('text-sm')
    })

    it('renders small size', () => {
      render(<Table size="sm" data-testid="table" />)
      const table = screen.getByTestId('table')
      
      expect(table).toHaveClass('text-xs')
    })

    it('renders large size', () => {
      render(<Table size="lg" data-testid="table" />)
      const table = screen.getByTestId('table')
      
      expect(table).toHaveClass('text-base')
    })
  })

  // Color scheme tests
  describe('Color Schemes', () => {
    it('renders gray color scheme by default', () => {
      render(<Table data-testid="table" />)
      const table = screen.getByTestId('table')
      
      expect(table).toHaveClass('[--table-primary-color:theme(colors.gray.900)]')
    })

    it('renders primary color scheme', () => {
      render(<Table colorScheme="primary" data-testid="table" />)
      const table = screen.getByTestId('table')
      
      expect(table).toHaveClass('[--table-primary-color:theme(colors.blue.900)]')
    })

    it('renders secondary color scheme', () => {
      render(<Table colorScheme="secondary" data-testid="table" />)
      const table = screen.getByTestId('table')
      
      expect(table).toHaveClass('[--table-primary-color:theme(colors.purple.900)]')
    })
  })

  // Container component tests
  describe('TableContainer', () => {
    it('renders table container with proper styles', () => {
      render(
        <TableContainer data-testid="container">
          <Table />
        </TableContainer>
      )

      const container = screen.getByTestId('container')
      expect(container).toHaveClass(
        'relative',
        'w-full',
        'overflow-auto',
        'border',
        'border-border',
        'rounded-md'
      )
    })

    it('applies custom className', () => {
      render(
        <TableContainer className="custom-class" data-testid="container">
          <Table />
        </TableContainer>
      )

      const container = screen.getByTestId('container')
      expect(container).toHaveClass('custom-class')
    })
  })

  // Header component tests
  describe('TableHeader', () => {
    it('renders table header with proper styles', () => {
      render(
        <Table>
          <TableHeader data-testid="header">
            <TableRow>
              <TableHeaderCell>Header</TableHeaderCell>
            </TableRow>
          </TableHeader>
        </Table>
      )

      const header = screen.getByTestId('header')
      expect(header).toHaveClass('bg-muted/50', '[&_tr]:border-b')
    })
  })

  // Body component tests
  describe('TableBody', () => {
    it('renders table body with proper styles', () => {
      render(
        <Table>
          <TableBody data-testid="body">
            <TableRow>
              <TableCell>Body</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      )

      const body = screen.getByTestId('body')
      expect(body).toHaveClass('[&_tr:last-child]:border-0')
    })
  })

  // Row component tests
  describe('TableRow', () => {
    it('renders table row with proper styles', () => {
      render(
        <Table>
          <TableBody>
            <TableRow data-testid="row">
              <TableCell>Cell</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      )

      const row = screen.getByTestId('row')
      expect(row).toHaveClass(
        'border-b',
        'border-border',
        'transition-colors',
        'hover:bg-muted/50'
      )
    })

    it('renders selected state', () => {
      render(
        <Table>
          <TableBody>
            <TableRow isSelected data-testid="row">
              <TableCell>Cell</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      )

      const row = screen.getByTestId('row')
      expect(row).toHaveClass('bg-muted')
      expect(row).toHaveAttribute('data-state', 'selected')
    })

    it('renders hovered state without selection', () => {
      render(
        <Table>
          <TableBody>
            <TableRow isHovered data-testid="row">
              <TableCell>Cell</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      )

      const row = screen.getByTestId('row')
      expect(row).toHaveClass('bg-muted/50')
    })

    it('does not apply hover when selected', () => {
      render(
        <Table>
          <TableBody>
            <TableRow isSelected isHovered data-testid="row">
              <TableCell>Cell</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      )

      const row = screen.getByTestId('row')
      expect(row).toHaveClass('bg-muted')
      expect(row).not.toHaveClass('bg-muted/50')
    })
  })

  // Cell component tests
  describe('TableCell', () => {
    it('renders table cell with proper styles', () => {
      render(
        <Table>
          <TableBody>
            <TableRow>
              <TableCell data-testid="cell">Cell content</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      )

      const cell = screen.getByTestId('cell')
      expect(cell).toHaveClass('p-4', 'align-middle')
      expect(cell).not.toHaveClass('text-right')
    })

    it('renders numeric cell alignment', () => {
      render(
        <Table>
          <TableBody>
            <TableRow>
              <TableCell isNumeric data-testid="cell">123</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      )

      const cell = screen.getByTestId('cell')
      expect(cell).toHaveClass('text-right')
    })

    it('applies checkbox special styles', () => {
      render(
        <Table>
          <TableBody>
            <TableRow>
              <TableCell data-testid="cell">
                <input type="checkbox" role="checkbox" />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      )

      const cell = screen.getByTestId('cell')
      expect(cell).toHaveClass('[&:has([role=checkbox])]:pr-0')
    })
  })

  // Header Cell component tests
  describe('TableHeaderCell', () => {
    it('renders non-sortable header cell', () => {
      render(
        <Table>
          <TableHeader>
            <TableRow>
              <TableHeaderCell data-testid="header-cell">Header</TableHeaderCell>
            </TableRow>
          </TableHeader>
        </Table>
      )

      const headerCell = screen.getByTestId('header-cell')
      expect(headerCell).toHaveClass(
        'h-12',
        'px-4',
        'font-medium',
        'text-muted-foreground'
      )
      expect(headerCell).toHaveAttribute('role', 'columnheader')
      expect(headerCell).not.toHaveClass('cursor-pointer')
      expect(headerCell).not.toHaveAttribute('tabIndex')
      expect(headerCell).not.toHaveAttribute('aria-sort')
    })

    it('renders sortable header cell', () => {
      const onSort = vi.fn()
      render(
        <Table>
          <TableHeader>
            <TableRow>
              <TableHeaderCell 
                sortable 
                onSort={onSort} 
                data-testid="header-cell"
              >
                Sortable Header
              </TableHeaderCell>
            </TableRow>
          </TableHeader>
        </Table>
      )

      const headerCell = screen.getByTestId('header-cell')
      expect(headerCell).toHaveClass('cursor-pointer', 'select-none', 'hover:text-foreground')
      expect(headerCell).toHaveAttribute('tabIndex', '0')
      expect(headerCell).toHaveAttribute('aria-sort', 'none')

      // Check for sort icons
      const sortIcons = headerCell.querySelectorAll('svg')
      expect(sortIcons).toHaveLength(2) // up and down arrows
    })

    it('renders numeric header cell alignment', () => {
      render(
        <Table>
          <TableHeader>
            <TableRow>
              <TableHeaderCell isNumeric data-testid="header-cell">
                Number
              </TableHeaderCell>
            </TableRow>
          </TableHeader>
        </Table>
      )

      const headerCell = screen.getByTestId('header-cell')
      expect(headerCell).toHaveClass('text-right')
      
      const flexContainer = headerCell.querySelector('div')
      expect(flexContainer).toHaveClass('justify-end')
    })

    it('handles sort direction states', () => {
      const onSort = vi.fn()
      render(
        <Table>
          <TableHeader>
            <TableRow>
              <TableHeaderCell 
                sortable 
                sortDirection="asc"
                onSort={onSort} 
                data-testid="header-cell"
              >
                Header
              </TableHeaderCell>
            </TableRow>
          </TableHeader>
        </Table>
      )

      let headerCell = screen.getByTestId('header-cell')
      expect(headerCell).toHaveAttribute('aria-sort', 'ascending')

      // Re-render with desc direction
      render(
        <Table>
          <TableHeader>
            <TableRow>
              <TableHeaderCell 
                sortable 
                sortDirection="desc"
                onSort={onSort} 
                data-testid="header-cell-desc"
              >
                Header
              </TableHeaderCell>
            </TableRow>
          </TableHeader>
        </Table>
      )

      headerCell = screen.getByTestId('header-cell-desc')
      expect(headerCell).toHaveAttribute('aria-sort', 'descending')
    })

    it('handles click sorting', () => {
      const onSort = vi.fn()
      render(
        <Table>
          <TableHeader>
            <TableRow>
              <TableHeaderCell 
                sortable 
                sortDirection="none"
                onSort={onSort} 
                data-testid="header-cell"
              >
                Header
              </TableHeaderCell>
            </TableRow>
          </TableHeader>
        </Table>
      )

      const headerCell = screen.getByTestId('header-cell')
      
      // First click should sort ascending
      fireEvent.click(headerCell)
      expect(onSort).toHaveBeenCalledWith('asc')

      onSort.mockClear()
      
      // Create second render with asc, then click should sort descending
      render(
        <Table>
          <TableHeader>
            <TableRow>
              <TableHeaderCell 
                sortable 
                sortDirection="asc"
                onSort={onSort} 
                data-testid="header-cell-asc"
              >
                Header
              </TableHeaderCell>
            </TableRow>
          </TableHeader>
        </Table>
      )

      const updatedCell = screen.getByTestId('header-cell-asc')
      fireEvent.click(updatedCell)
      expect(onSort).toHaveBeenCalledWith('desc')
    })

    it('handles keyboard sorting', () => {
      const onSort = vi.fn()
      render(
        <Table>
          <TableHeader>
            <TableRow>
              <TableHeaderCell 
                sortable 
                onSort={onSort} 
                data-testid="header-cell"
              >
                Header
              </TableHeaderCell>
            </TableRow>
          </TableHeader>
        </Table>
      )

      const headerCell = screen.getByTestId('header-cell')
      
      // Enter key should trigger sort
      fireEvent.keyDown(headerCell, { key: 'Enter' })
      expect(onSort).toHaveBeenCalledWith('asc')

      onSort.mockClear()

      // Space key should trigger sort
      fireEvent.keyDown(headerCell, { key: ' ' })
      expect(onSort).toHaveBeenCalledWith('asc')

      onSort.mockClear()

      // Other keys should not trigger sort
      fireEvent.keyDown(headerCell, { key: 'Escape' })
      expect(onSort).not.toHaveBeenCalled()
    })

    it('does not handle events when not sortable', () => {
      const onSort = vi.fn()
      render(
        <Table>
          <TableHeader>
            <TableRow>
              <TableHeaderCell onSort={onSort} data-testid="header-cell">
                Header
              </TableHeaderCell>
            </TableRow>
          </TableHeader>
        </Table>
      )

      const headerCell = screen.getByTestId('header-cell')
      
      fireEvent.click(headerCell)
      fireEvent.keyDown(headerCell, { key: 'Enter' })
      
      expect(onSort).not.toHaveBeenCalled()
    })
  })

  // Caption component tests
  describe('TableCaption', () => {
    it('renders table caption with proper styles', () => {
      render(
        <Table>
          <TableCaption data-testid="caption">Table Caption</TableCaption>
        </Table>
      )

      const caption = screen.getByTestId('caption')
      expect(caption).toHaveClass('mt-4', 'text-sm', 'text-muted-foreground')
      expect(caption).toHaveTextContent('Table Caption')
    })
  })

  // Footer component tests
  describe('TableFooter', () => {
    it('renders table footer with proper styles', () => {
      render(
        <Table>
          <TableFooter data-testid="footer">
            <TableRow>
              <TableCell>Footer</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      )

      const footer = screen.getByTestId('footer')
      expect(footer).toHaveClass(
        'bg-muted/50',
        'font-medium',
        '[&>tr]:last:border-b-0'
      )
    })
  })

  // Accessibility tests
  describe('Accessibility', () => {
    it('has proper table semantics', () => {
      render(
        <Table role="table" aria-label="Data table">
          <TableHeader>
            <TableRow>
              <TableHeaderCell>Name</TableHeaderCell>
              <TableHeaderCell>Age</TableHeaderCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>John</TableCell>
              <TableCell isNumeric>25</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      )

      const table = screen.getByRole('table')
      expect(table).toHaveAttribute('aria-label', 'Data table')

      const headerCells = screen.getAllByRole('columnheader')
      expect(headerCells).toHaveLength(2)

      const cells = screen.getAllByRole('cell')
      expect(cells).toHaveLength(2)
    })

    it('maintains proper tab order for sortable headers', () => {
      render(
        <Table>
          <TableHeader>
            <TableRow>
              <TableHeaderCell sortable onSort={() => {}}>
                Sortable
              </TableHeaderCell>
              <TableHeaderCell>Not Sortable</TableHeaderCell>
              <TableHeaderCell sortable onSort={() => {}}>
                Also Sortable
              </TableHeaderCell>
            </TableRow>
          </TableHeader>
        </Table>
      )

      const sortableHeaders = screen.getAllByRole('columnheader')
      expect(sortableHeaders[0]).toHaveAttribute('tabIndex', '0')
      expect(sortableHeaders[1]).not.toHaveAttribute('tabIndex')
      expect(sortableHeaders[2]).toHaveAttribute('tabIndex', '0')
    })
  })

  // Custom className tests
  describe('Custom Styling', () => {
    it('applies custom className to all components', () => {
      render(
        <TableContainer className="container-custom">
          <Table className="table-custom">
            <TableCaption className="caption-custom">Caption</TableCaption>
            <TableHeader className="header-custom">
              <TableRow className="row-custom">
                <TableHeaderCell className="header-cell-custom">
                  Header
                </TableHeaderCell>
              </TableRow>
            </TableHeader>
            <TableBody className="body-custom">
              <TableRow className="body-row-custom">
                <TableCell className="cell-custom">Cell</TableCell>
              </TableRow>
            </TableBody>
            <TableFooter className="footer-custom">
              <TableRow>
                <TableCell>Footer</TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      )

      expect(screen.getByRole('table')).toHaveClass('table-custom')
      expect(screen.getByText('Caption')).toHaveClass('caption-custom')
      
      // For header cell, check the th element, not the inner div
      const headerCell = screen.getByRole('columnheader')
      expect(headerCell).toHaveClass('header-cell-custom')
      
      expect(screen.getByText('Cell')).toHaveClass('cell-custom')
    })
  })

  // Edge cases
  describe('Edge Cases', () => {
    it('renders empty table', () => {
      render(<Table data-testid="table" />)
      
      const table = screen.getByTestId('table')
      expect(table).toBeInTheDocument()
      expect(table).toBeEmptyDOMElement()
    })

    it('handles missing sort callback gracefully', () => {
      render(
        <Table>
          <TableHeader>
            <TableRow>
              <TableHeaderCell sortable data-testid="header-cell">
                Header
              </TableHeaderCell>
            </TableRow>
          </TableHeader>
        </Table>
      )

      const headerCell = screen.getByTestId('header-cell')
      
      // Should not throw error when clicking without onSort
      expect(() => {
        fireEvent.click(headerCell)
        fireEvent.keyDown(headerCell, { key: 'Enter' })
      }).not.toThrow()
    })

    it('handles large number of cells', () => {
      const rows = Array.from({ length: 100 }, (_, i) => (
        <TableRow key={i}>
          <TableCell>Cell {i}</TableCell>
          <TableCell isNumeric>{i}</TableCell>
        </TableRow>
      ))

      render(
        <Table>
          <TableBody>
            {rows}
          </TableBody>
        </Table>
      )

      expect(screen.getByText('Cell 0')).toBeInTheDocument()
      expect(screen.getByText('Cell 99')).toBeInTheDocument()
      expect(screen.getAllByRole('cell')).toHaveLength(200) // 100 rows × 2 cells
    })
  })
})
