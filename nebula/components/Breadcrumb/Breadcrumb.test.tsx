import { render, screen } from '@testing-library/preact'
import { describe, it, expect } from 'vitest'
import { Breadcrumb } from './Breadcrumb'
import type { BreadcrumbItem } from './Breadcrumb.types'

describe('Breadcrumb', () => {
  const basicItems: BreadcrumbItem[] = [
    { label: 'Home', href: '/' },
    { label: 'Products', href: '/products' },
    { label: 'Laptop', current: true }
  ]

  describe('Basic Rendering', () => {
    it('renders with basic items', () => {
      render(<Breadcrumb items={basicItems} />)
      
      expect(screen.getByRole('navigation', { name: 'Breadcrumb' })).toBeInTheDocument()
      expect(screen.getByText('Home')).toBeInTheDocument()
      expect(screen.getByText('Products')).toBeInTheDocument()
      expect(screen.getByText('Laptop')).toBeInTheDocument()
    })

    it('renders empty breadcrumb', () => {
      render(<Breadcrumb items={[]} />)
      
      expect(screen.getByRole('navigation', { name: 'Breadcrumb' })).toBeInTheDocument()
    })

    it('renders single item', () => {
      render(<Breadcrumb items={[{ label: 'Current Page', current: true }]} />)
      
      expect(screen.getByText('Current Page')).toBeInTheDocument()
      
      // Check using screen.getByLabelText or direct selector
      const currentElement = document.querySelector('[aria-current="page"]')
      expect(currentElement).toBeInTheDocument()
      expect(currentElement).toHaveTextContent('Current Page')
    })
  })

  describe('Links and Navigation', () => {
    it('renders clickable links for non-current items', () => {
      render(<Breadcrumb items={basicItems} />)
      
      const homeLink = screen.getByRole('link', { name: 'Home' })
      const productsLink = screen.getByRole('link', { name: 'Products' })
      
      expect(homeLink).toHaveAttribute('href', '/')
      expect(productsLink).toHaveAttribute('href', '/products')
    })

    it('renders current item as non-clickable', () => {
      render(<Breadcrumb items={basicItems} />)
      
      expect(screen.getByText('Laptop')).not.toHaveAttribute('href')
      
      // Check using document selector
      const currentElement = document.querySelector('[aria-current="page"]')
      expect(currentElement).toBeInTheDocument()
      expect(currentElement).toHaveTextContent('Laptop')
    })

    it('renders non-href items as non-clickable', () => {
      const items: BreadcrumbItem[] = [
        { label: 'Category' },
        { label: 'Current', current: true }
      ]
      
      render(<Breadcrumb items={items} />)
      
      expect(screen.getByText('Category')).not.toHaveAttribute('href')
      expect(screen.queryByRole('link', { name: 'Category' })).not.toBeInTheDocument()
    })
  })

  describe('Separators', () => {
    it('renders default arrow separator', () => {
      render(<Breadcrumb items={basicItems} />)
      
      const separators = screen.getAllByText('→')
      expect(separators).toHaveLength(2)
    })

    it('renders slash separator', () => {
      render(<Breadcrumb items={basicItems} separator="slash" />)
      
      const separators = screen.getAllByText('/')
      expect(separators).toHaveLength(2)
    })

    it('renders chevron separator', () => {
      render(<Breadcrumb items={basicItems} separator="chevron" />)
      
      const separators = screen.getAllByText('›')
      expect(separators).toHaveLength(2)
    })

    it('renders custom separator', () => {
      render(<Breadcrumb items={basicItems} separator={<span>|</span>} />)
      
      const separators = screen.getAllByText('|')
      expect(separators).toHaveLength(2)
    })

    it('sets aria-hidden on separators', () => {
      render(<Breadcrumb items={basicItems} />)
      
      const separators = screen.getAllByText('→')
      separators.forEach(separator => {
        expect(separator).toHaveAttribute('aria-hidden', 'true')
      })
    })
  })

  describe('Home Icon', () => {
    it('does not show home icon by default', () => {
      render(<Breadcrumb items={basicItems} />)
      
      expect(screen.queryByLabelText('Home')).not.toBeInTheDocument()
    })

    it('shows home icon when enabled', () => {
      render(<Breadcrumb items={basicItems} showHome />)
      
      const homeIcon = screen.getByLabelText('Home')
      expect(homeIcon).toBeInTheDocument()
      expect(homeIcon).toHaveAttribute('href', '/')
    })

    it('uses custom home href', () => {
      render(<Breadcrumb items={basicItems} showHome homeHref="/dashboard" />)
      
      const homeIcon = screen.getByLabelText('Home')
      expect(homeIcon).toHaveAttribute('href', '/dashboard')
    })

    it('includes separator after home icon', () => {
      render(<Breadcrumb items={basicItems} showHome />)
      
      const separators = screen.getAllByText('→')
      expect(separators).toHaveLength(3) // Home + 2 between items
    })
  })

  describe('Responsive Collapse', () => {
    const manyItems: BreadcrumbItem[] = [
      { label: 'Home', href: '/' },
      { label: 'Category', href: '/category' },
      { label: 'Subcategory', href: '/category/sub' },
      { label: 'Product Type', href: '/category/sub/type' },
      { label: 'Product', href: '/category/sub/type/product' },
      { label: 'Details', current: true }
    ]

    it('does not collapse when maxItems is 0', () => {
      render(<Breadcrumb items={manyItems} maxItems={0} />)
      
      expect(screen.getByText('Home')).toBeInTheDocument()
      expect(screen.getByText('Category')).toBeInTheDocument()
      expect(screen.getByText('Subcategory')).toBeInTheDocument()
      expect(screen.getByText('Product Type')).toBeInTheDocument()
      expect(screen.getByText('Product')).toBeInTheDocument()
      expect(screen.getByText('Details')).toBeInTheDocument()
    })

    it('collapses when items exceed maxItems', () => {
      render(<Breadcrumb items={manyItems} maxItems={4} />)
      
      expect(screen.getByText('Home')).toBeInTheDocument()
      expect(screen.getByText('...')).toBeInTheDocument()
      expect(screen.getByText('Product')).toBeInTheDocument()
      expect(screen.getByText('Details')).toBeInTheDocument()
      
      // Should hide middle items
      expect(screen.queryByText('Category')).not.toBeInTheDocument()
      expect(screen.queryByText('Subcategory')).not.toBeInTheDocument()
      expect(screen.queryByText('Product Type')).not.toBeInTheDocument()
    })

    it('ellipsis item is not clickable', () => {
      render(<Breadcrumb items={manyItems} maxItems={4} />)
      
      const ellipsis = screen.getByText('...')
      expect(ellipsis).not.toHaveAttribute('href')
      expect(ellipsis.closest('a')).toBeNull()
    })
  })

  describe('Icons', () => {
    it('renders icons for items', () => {
      const itemsWithIcons: BreadcrumbItem[] = [
        { 
          label: 'Home', 
          href: '/', 
          icon: <span data-testid="home-icon">🏠</span>
        },
        { 
          label: 'Current', 
          current: true, 
          icon: <span data-testid="current-icon">📄</span>
        }
      ]
      
      render(<Breadcrumb items={itemsWithIcons} />)
      
      expect(screen.getByTestId('home-icon')).toBeInTheDocument()
      expect(screen.getByTestId('current-icon')).toBeInTheDocument()
    })
  })

  describe('Accessibility', () => {
    it('has proper ARIA structure', () => {
      render(<Breadcrumb items={basicItems} />)
      
      const nav = screen.getByRole('navigation', { name: 'Breadcrumb' })
      expect(nav).toBeInTheDocument()
      
      const list = screen.getByRole('list')
      expect(list).toBeInTheDocument()
    })

    it('marks current page with aria-current', () => {
      render(<Breadcrumb items={basicItems} />)
      
      const currentElement = document.querySelector('[aria-current="page"]')
      expect(currentElement).toBeInTheDocument()
      expect(currentElement).toHaveTextContent('Laptop')
    })

    it('has proper focus indicators on links', () => {
      render(<Breadcrumb items={basicItems} />)
      
      const homeLink = screen.getByRole('link', { name: 'Home' })
      expect(homeLink).toHaveClass('focus:outline-none', 'focus:ring-2', 'focus:ring-blue-500')
    })
  })

  describe('Styling', () => {
    it('applies custom className', () => {
      render(<Breadcrumb items={basicItems} className="custom-class" />)
      
      const nav = screen.getByRole('navigation')
      expect(nav).toHaveClass('custom-class')
    })

    it('has responsive spacing classes', () => {
      render(<Breadcrumb items={basicItems} />)
      
      const nav = screen.getByRole('navigation')
      expect(nav).toHaveClass('space-x-2', 'lg:space-x-3')
    })

    it('has dark mode classes', () => {
      render(<Breadcrumb items={basicItems} />)
      
      const nav = screen.getByRole('navigation')
      expect(nav).toHaveClass('text-gray-600', 'dark:text-gray-300')
    })
  })

  describe('Edge Cases', () => {
    it('handles items without href as non-clickable', () => {
      const items: BreadcrumbItem[] = [
        { label: 'Non-clickable item' },
        { label: 'Another non-clickable', current: false }
      ]
      
      render(<Breadcrumb items={items} />)
      
      expect(screen.queryByRole('link')).not.toBeInTheDocument()
      expect(screen.getByText('Non-clickable item')).toBeInTheDocument()
      expect(screen.getByText('Another non-clickable')).toBeInTheDocument()
    })

    it('handles maxItems smaller than actual items', () => {
      render(<Breadcrumb items={basicItems} maxItems={2} />)
      
      expect(screen.getByText('Home')).toBeInTheDocument()
      expect(screen.getByText('...')).toBeInTheDocument()
      expect(screen.queryByText('Products')).not.toBeInTheDocument()
      expect(screen.queryByText('Laptop')).not.toBeInTheDocument()
    })

    it('handles maxItems equal to items length', () => {
      render(<Breadcrumb items={basicItems} maxItems={3} />)
      
      expect(screen.getByText('Home')).toBeInTheDocument()
      expect(screen.getByText('Products')).toBeInTheDocument()
      expect(screen.getByText('Laptop')).toBeInTheDocument()
      expect(screen.queryByText('...')).not.toBeInTheDocument()
    })

    it('handles maxItems greater than items length', () => {
      render(<Breadcrumb items={basicItems} maxItems={5} />)
      
      expect(screen.getByText('Home')).toBeInTheDocument()
      expect(screen.getByText('Products')).toBeInTheDocument()
      expect(screen.getByText('Laptop')).toBeInTheDocument()
      expect(screen.queryByText('...')).not.toBeInTheDocument()
    })
  })
})
