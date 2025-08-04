import type { BreadcrumbItem } from '../../../nebula/components'

export interface ExampleData {
  basicItems: BreadcrumbItem[]
  longItems: BreadcrumbItem[]
  itemsWithIcons: BreadcrumbItem[]
}

export function getExampleData(): ExampleData {
  const basicItems: BreadcrumbItem[] = [
    { label: 'Home', href: '/' },
    { label: 'Products', href: '/products' },
    { label: 'Electronics', href: '/products/electronics' },
    { label: 'Laptops', current: true }
  ]

  const longItems: BreadcrumbItem[] = [
    { label: 'Home', href: '/' },
    { label: 'Category', href: '/category' },
    { label: 'Subcategory', href: '/category/sub' },
    { label: 'Product Type', href: '/category/sub/type' },
    { label: 'Brand', href: '/category/sub/type/brand' },
    { label: 'Model', href: '/category/sub/type/brand/model' },
    { label: 'Current Product', current: true }
  ]

  const itemsWithIcons: BreadcrumbItem[] = [
    { 
      label: 'Dashboard', 
      href: '/dashboard',
      icon: <span className="text-blue-500">📊</span>
    },
    { 
      label: 'Projects', 
      href: '/projects',
      icon: <span className="text-green-500">📁</span>
    },
    { 
      label: 'Current Project', 
      current: true,
      icon: <span className="text-purple-500">🚀</span>
    }
  ]

  return { basicItems, longItems, itemsWithIcons }
}
