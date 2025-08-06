import { render, screen, fireEvent } from '@testing-library/preact'
import { useState } from 'preact/hooks'
import { TreeView } from './TreeView'
import type { TreeNode } from './types'

const mockData: TreeNode[] = [
  {
    key: '1',
    title: 'Documents',
    children: [
      {
        key: '1-1',
        title: 'Work',
        children: [
          { key: '1-1-1', title: 'Projects.docx' },
          { key: '1-1-2', title: 'Reports.pdf' }
        ]
      },
      { key: '1-2', title: 'Personal' }
    ]
  },
  {
    key: '2',
    title: 'Images',
    children: [
      { key: '2-1', title: 'Vacation.jpg' },
      { key: '2-2', title: 'Family.png' }
    ]
  },
  { key: '3', title: 'Videos' }
]

describe('TreeView', () => {
  it('renders tree nodes correctly', () => {
    render(<TreeView data={mockData} />)
    
    expect(screen.getByText('Documents')).toBeInTheDocument()
    expect(screen.getByText('Images')).toBeInTheDocument()
    expect(screen.getByText('Videos')).toBeInTheDocument()
  })

  it('shows children when expanded', () => {
    render(<TreeView data={mockData} defaultExpandedKeys={['1']} />)
    
    expect(screen.getByText('Work')).toBeInTheDocument()
    expect(screen.getByText('Personal')).toBeInTheDocument()
  })

  it('handles node selection', () => {
    const onSelect = vi.fn()
    render(<TreeView data={mockData} onSelect={onSelect} />)
    
    fireEvent.click(screen.getByText('Videos'))
    
    expect(onSelect).toHaveBeenCalledWith(['3'], mockData[2], true)
  })

  it('handles node expansion', () => {
    const onExpand = vi.fn()
    render(<TreeView data={mockData} onExpand={onExpand} />)
    
    const expandButton = screen.getAllByRole('button')[0]
    fireEvent.click(expandButton)
    
    expect(onExpand).toHaveBeenCalledWith(['1'], mockData[0], true)
  })

  it('supports multiple selection', async () => {
    const onSelect = vi.fn()
    function Wrapper() {
      const [selectedKeys, setSelectedKeys] = useState<string[]>([])
      return (
        <TreeView
          data={mockData}
          selectable="multiple"
          selectedKeys={selectedKeys}
          onSelect={(keys, node, user) => {
            setSelectedKeys(keys)
            onSelect(keys, node, user)
          }}
        />
      )
    }
    render(<Wrapper />)
    // Kliknij Videos
    fireEvent.click(screen.getByText('Videos'))
    await new Promise((resolve) => setTimeout(resolve, 0))
    expect(onSelect).toHaveBeenLastCalledWith(['3'], mockData[2], true)
    // Kliknij Images
    fireEvent.click(screen.getByText('Images'))
    await new Promise((resolve) => setTimeout(resolve, 0))
    expect(onSelect).toHaveBeenLastCalledWith(['3', '2'], mockData[1], true)
  })

  it('shows checkboxes when checkable', () => {
    render(<TreeView data={mockData} checkable />)
    
    const checkboxes = screen.getAllByRole('checkbox')
    expect(checkboxes.length).toBeGreaterThan(0)
  })

  it('handles checkbox changes', () => {
    const onCheck = vi.fn()
    render(<TreeView data={mockData} checkable onCheck={onCheck} />)
    
    const checkbox = screen.getAllByRole('checkbox')[0]
    fireEvent.click(checkbox)
    
    expect(onCheck).toHaveBeenCalled()
  })

  it('shows search input when searchable', () => {
    render(<TreeView data={mockData} searchable />)
    
    expect(screen.getByPlaceholderText('Search...')).toBeInTheDocument()
  })

  it('filters nodes based on search', () => {
    render(<TreeView data={mockData} searchable />)
    
    const searchInput = screen.getByPlaceholderText('Search...')
    fireEvent.input(searchInput, { target: { value: 'Work' } })
    
    expect(screen.getByText('Work')).toBeInTheDocument()
    expect(screen.queryByText('Videos')).not.toBeInTheDocument()
  })

  it('calls onSearch when search value changes', () => {
    const onSearch = vi.fn()
    render(<TreeView data={mockData} searchable onSearch={onSearch} />)
    
    const searchInput = screen.getByPlaceholderText('Search...')
    fireEvent.input(searchInput, { target: { value: 'test' } })
    
    expect(onSearch).toHaveBeenCalledWith('test')
  })

  it('shows empty state when no data', () => {
    render(<TreeView data={[]} />)
    
    expect(screen.getByText('No data')).toBeInTheDocument()
  })

  it('shows custom empty text', () => {
    render(<TreeView data={[]} emptyText="No files found" />)
    
    expect(screen.getByText('No files found')).toBeInTheDocument()
  })

  it('shows loading state', () => {
    render(<TreeView data={[]} loading />)
    
    expect(screen.getByText('Loading...')).toBeInTheDocument()
  })

  it('renders with different sizes', () => {
    const { rerender } = render(<TreeView data={mockData} size="sm" />)
    expect(screen.getByRole('tree')).toBeInTheDocument()
    
    rerender(<TreeView data={mockData} size="lg" />)
    expect(screen.getByRole('tree')).toBeInTheDocument()
  })

  it('shows tree lines when enabled', () => {
    render(<TreeView data={mockData} showLine />)
    
    expect(screen.getByRole('tree')).toBeInTheDocument()
  })

  it('handles disabled nodes', () => {
    const dataWithDisabled: TreeNode[] = [
      { key: '1', title: 'Enabled', disabled: false },
      { key: '2', title: 'Disabled', disabled: true }
    ]
    
    const onSelect = vi.fn()
    render(<TreeView data={dataWithDisabled} onSelect={onSelect} />)
    
    fireEvent.click(screen.getByText('Disabled'))
    expect(onSelect).not.toHaveBeenCalled()
    
    fireEvent.click(screen.getByText('Enabled'))
    expect(onSelect).toHaveBeenCalled()
  })

  it('supports controlled selection', () => {
    const { rerender } = render(
      <TreeView data={mockData} selectedKeys={['1']} />
    )
    
    expect(screen.getByText('Documents').closest('[role="treeitem"]')).toHaveClass('bg-blue-50')
    
    rerender(<TreeView data={mockData} selectedKeys={['2']} />)
    
    expect(screen.getByText('Images').closest('[role="treeitem"]')).toHaveClass('bg-blue-50')
  })

  it('supports controlled expansion', () => {
    render(<TreeView data={mockData} expandedKeys={['1']} />)
    
    expect(screen.getByText('Work')).toBeInTheDocument()
    expect(screen.getByText('Personal')).toBeInTheDocument()
  })

  it('auto-expands parent nodes when searching', () => {
    render(
      <TreeView 
        data={mockData} 
        searchable 
        autoExpandParent
        searchValue="Projects"
      />
    )
    
    // When searching for "Projects", parent nodes should auto-expand
    expect(screen.getByText('Work')).toBeInTheDocument()
    expect(screen.getByText('Projects.docx')).toBeInTheDocument()
  })

  it('uses custom filter function', () => {
    const customFilter = (node: TreeNode, search: string) => {
      return node.key.includes(search)
    }
    
    render(
      <TreeView 
        data={mockData} 
        searchable 
        searchValue="1-1"
        filterTreeNode={customFilter}
      />
    )
    
    expect(screen.getByText('Work')).toBeInTheDocument()
  })
})
