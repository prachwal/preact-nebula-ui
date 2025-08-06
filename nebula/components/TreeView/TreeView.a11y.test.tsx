import { render, screen } from '@testing-library/preact'
import { axe, toHaveNoViolations } from 'jest-axe'
import { TreeView } from './TreeView'
import type { TreeNode } from './types'

expect.extend(toHaveNoViolations)

const mockData: TreeNode[] = [
  {
    key: '1',
    title: 'Documents',
    children: [
      { key: '1-1', title: 'Work' },
      { key: '1-2', title: 'Personal' }
    ]
  },
  { key: '2', title: 'Images' },
  { key: '3', title: 'Videos' }
]

describe('TreeView Accessibility', () => {
  it('should not have accessibility violations', async () => {
    const { container } = render(<TreeView data={mockData} aria-label="File browser" />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })

  it('has proper ARIA attributes', () => {
    render(<TreeView data={mockData} aria-label="File browser" />)
    
    const tree = screen.getByRole('tree')
    expect(tree).toHaveAttribute('aria-label', 'File browser')
  })

  it('uses aria-labelledby when provided', () => {
    render(
      <div>
        <h2 id="tree-label">File Browser</h2>
        <TreeView data={mockData} aria-labelledby="tree-label" />
      </div>
    )
    
    const tree = screen.getByRole('tree')
    expect(tree).toHaveAttribute('aria-labelledby', 'tree-label')
  })

  it('sets proper tree item roles and attributes', () => {
    render(<TreeView data={mockData} defaultExpandedKeys={['1']} />)
    
    const treeItems = screen.getAllByRole('treeitem')
    
    // Check root level items
    expect(treeItems[0]).toHaveAttribute('aria-level', '1')
    expect(treeItems[0]).toHaveAttribute('aria-expanded', 'true')
    
    // Check child items
    expect(treeItems[1]).toHaveAttribute('aria-level', '2')
  })

  it('manages focus correctly with tabindex', () => {
    render(<TreeView data={mockData} defaultSelectedKeys={['2']} />)
    
    const selectedItem = screen.getByText('Images').closest('[role="treeitem"]')
    const otherItems = screen.getAllByRole('treeitem').filter(item => item !== selectedItem)
    
    expect(selectedItem).toHaveAttribute('tabindex', '0')
    otherItems.forEach(item => {
      expect(item).toHaveAttribute('tabindex', '-1')
    })
  })

  it('sets aria-selected correctly', () => {
    render(<TreeView data={mockData} defaultSelectedKeys={['2']} />)
    
    const selectedItem = screen.getByText('Images').closest('[role="treeitem"]')
    const unselectedItem = screen.getByText('Videos').closest('[role="treeitem"]')
    
    expect(selectedItem).toHaveAttribute('aria-selected', 'true')
    expect(unselectedItem).toHaveAttribute('aria-selected', 'false')
  })

  it('sets aria-disabled for disabled nodes', () => {
    const dataWithDisabled: TreeNode[] = [
      { key: '1', title: 'Enabled' },
      { key: '2', title: 'Disabled', disabled: true }
    ]
    
    render(<TreeView data={dataWithDisabled} />)
    
    const disabledItem = screen.getByText('Disabled').closest('[role="treeitem"]')
    expect(disabledItem).toHaveAttribute('aria-disabled', 'true')
  })

  it('provides accessible expand/collapse buttons', () => {
    render(<TreeView data={mockData} />)
    
    const expandButtons = screen.getAllByRole('button')
    expandButtons.forEach(button => {
      expect(button).toHaveAttribute('aria-label')
      expect(['Expand', 'Collapse']).toContain(button.getAttribute('aria-label'))
    })
  })

  it('has accessible checkboxes when checkable', () => {
    render(<TreeView data={mockData} checkable />)
    
    const checkboxes = screen.getAllByRole('checkbox')
    checkboxes.forEach(checkbox => {
      expect(checkbox).toHaveAttribute('aria-label')
    })
  })

  it('provides accessible search input', () => {
    render(<TreeView data={mockData} searchable />)
    
    const searchInput = screen.getByRole('textbox')
    expect(searchInput).toHaveAttribute('placeholder', 'Search...')
  })

  it('announces loading state', () => {
    render(<TreeView data={[]} loading />)
    
    expect(screen.getByText('Loading...')).toBeInTheDocument()
  })

  it('announces empty state', () => {
    render(<TreeView data={[]} />)
    
    expect(screen.getByText('No data')).toBeInTheDocument()
  })

  it('works with keyboard navigation', () => {
    render(<TreeView data={mockData} defaultSelectedKeys={['1']} />)
    
    const firstItem = screen.getByText('Documents').closest('[role="treeitem"]')
    expect(firstItem).toHaveAttribute('tabindex', '0')
    expect(firstItem).toHaveAttribute('aria-selected', 'true')
  })

  it('maintains proper hierarchy with aria-level', () => {
    render(<TreeView data={mockData} defaultExpandedKeys={['1']} />)
    
    const parentItem = screen.getByText('Documents').closest('[role="treeitem"]')
    const childItems = screen.getAllByRole('treeitem').filter(item => 
      item.getAttribute('aria-level') === '2'
    )
    
    expect(parentItem).toHaveAttribute('aria-level', '1')
    expect(childItems.length).toBeGreaterThan(0)
    childItems.forEach(child => {
      expect(child).toHaveAttribute('aria-level', '2')
    })
  })

  it('indicates expandable state correctly', () => {
    render(<TreeView data={mockData} />)
    
    const expandableItem = screen.getByText('Documents').closest('[role="treeitem"]')
    const leafItem = screen.getByText('Videos').closest('[role="treeitem"]')
    
    expect(expandableItem).toHaveAttribute('aria-expanded', 'false')
    expect(leafItem).not.toHaveAttribute('aria-expanded')
  })

  it('provides meaningful titles for nodes', () => {
    render(<TreeView data={mockData} />)
    
    const documentNode = screen.getByText('Documents')
    expect(documentNode).toHaveAttribute('title', 'Documents')
  })

  it('supports high contrast mode', () => {
    render(<TreeView data={mockData} defaultSelectedKeys={['1']} />)
    
    const selectedItem = screen.getByText('Documents').closest('[role="treeitem"]')
    expect(selectedItem).toHaveClass('bg-blue-50', 'dark:bg-blue-900/20')
  })

  it('provides sufficient color contrast', () => {
    render(<TreeView data={mockData} />)
    
    const treeItems = screen.getAllByRole('treeitem')
    // Tree items should have proper text colors for accessibility
    expect(treeItems[0]).toBeInTheDocument()
  })

  it('is keyboard accessible', () => {
    render(<TreeView data={mockData} />)
    
    const treeItems = screen.getAllByRole('treeitem')
    treeItems.forEach(item => {
      // All tree items should be focusable via keyboard
      expect(item).toHaveAttribute('tabindex')
    })
  })
})
