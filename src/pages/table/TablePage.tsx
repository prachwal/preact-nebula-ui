import { useState } from 'preact/hooks'
import { Table } from '../../../nebula/components/Table'
import {
  TableContainer,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  TableHeaderCell,
  TableCaption,
  TableFooter,
} from '../../../nebula/components/Table'
import { PageHeader } from './PageHeader'
import { NavigationTabs } from './NavigationTabs'

const sections = [
  { id: 'basic-usage', label: 'Basic Usage' },
  { id: 'variants', label: 'Variants' },
  { id: 'interactive', label: 'Interactive' },
  { id: 'accessibility', label: 'Accessibility' },
]

// Sample data for demonstrations
interface User {
  id: number
  name: string
  email: string
  role: string
  status: 'Active' | 'Inactive'
  lastLogin: string
  orders: number
}

const sampleUsers: User[] = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active', lastLogin: '2025-01-15', orders: 42 },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User', status: 'Active', lastLogin: '2025-01-14', orders: 18 },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'Editor', status: 'Inactive', lastLogin: '2025-01-10', orders: 7 },
  { id: 4, name: 'Alice Brown', email: 'alice@example.com', role: 'User', status: 'Active', lastLogin: '2025-01-15', orders: 23 },
  { id: 5, name: 'Charlie Wilson', email: 'charlie@example.com', role: 'Admin', status: 'Active', lastLogin: '2025-01-13', orders: 65 },
]

interface PageProps {
  path?: string
}

function TablePage(_props: PageProps) {
  const [activeSection, setActiveSection] = useState('basic-usage')

  const renderContent = () => {
    switch (activeSection) {
      case 'basic-usage':
        return <BasicUsageSection />
      case 'variants':
        return <VariantsSection />
      case 'interactive':
        return <InteractiveSection />
      case 'accessibility':
        return <AccessibilitySection />
      default:
        return <BasicUsageSection />
    }
  }

  return (
    <div className="space-y-8">
      <PageHeader
        title="Table"
        description="Display and interact with tabular data"
        badgeText="Data Display"
        examples={[
          'Data tables with sorting',
          'Row selection and actions',
          'Responsive design',
          'Custom cell renderers'
        ]}
      />

      <NavigationTabs
        sections={sections}
        activeSection={activeSection}
        onSectionChange={setActiveSection}
      />

      {renderContent()}
    </div>
  )
}

function BasicUsageSection() {
  return (
    <div className="space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Simple Table</h2>
        <p className="text-muted-foreground">
          A basic table with header, body, and footer sections.
        </p>

        <div className="bg-card border rounded-lg p-6">
          <TableContainer>
            <Table>
              <TableCaption>A list of your recent invoices.</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHeaderCell>Invoice</TableHeaderCell>
                  <TableHeaderCell>Status</TableHeaderCell>
                  <TableHeaderCell>Method</TableHeaderCell>
                  <TableHeaderCell className="text-right">Amount</TableHeaderCell>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>INV001</TableCell>
                  <TableCell>Paid</TableCell>
                  <TableCell>Credit Card</TableCell>
                  <TableCell className="text-right">$250.00</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>INV002</TableCell>
                  <TableCell>Pending</TableCell>
                  <TableCell>PayPal</TableCell>
                  <TableCell className="text-right">$150.00</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>INV003</TableCell>
                  <TableCell>Unpaid</TableCell>
                  <TableCell>Bank Transfer</TableCell>
                  <TableCell className="text-right">$350.00</TableCell>
                </TableRow>
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TableCell colSpan={3}>Total</TableCell>
                  <TableCell className="text-right">$750.00</TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </TableContainer>
        </div>
      </section>
    </div>
  )
}

function VariantsSection() {
  return (
    <div className="space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Visual Variants</h2>
        <p className="text-muted-foreground">
          Different visual styles for various design needs.
        </p>

        <div className="grid grid-cols-1 gap-6">
          {/* Simple Variant */}
          <div className="space-y-2">
            <h3 className="text-lg font-medium">Simple (Default)</h3>
            <div className="bg-card border rounded-lg p-4">
              <TableContainer>
                <Table variant="simple">
                  <TableHeader>
                    <TableRow>
                      <TableHeaderCell>Name</TableHeaderCell>
                      <TableHeaderCell>Role</TableHeaderCell>
                      <TableHeaderCell>Status</TableHeaderCell>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>John Doe</TableCell>
                      <TableCell>Admin</TableCell>
                      <TableCell>Active</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Jane Smith</TableCell>
                      <TableCell>User</TableCell>
                      <TableCell>Active</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          </div>

          {/* Striped Variant */}
          <div className="space-y-2">
            <h3 className="text-lg font-medium">Striped</h3>
            <div className="bg-card border rounded-lg p-4">
              <TableContainer>
                <Table variant="striped">
                  <TableHeader>
                    <TableRow>
                      <TableHeaderCell>Name</TableHeaderCell>
                      <TableHeaderCell>Role</TableHeaderCell>
                      <TableHeaderCell>Status</TableHeaderCell>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>John Doe</TableCell>
                      <TableCell>Admin</TableCell>
                      <TableCell>Active</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Jane Smith</TableCell>
                      <TableCell>User</TableCell>
                      <TableCell>Active</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

function InteractiveSection() {
  type SortDirection = 'asc' | 'desc' | 'none'
  const [sortField, setSortField] = useState<keyof User | null>(null)
  const [sortDirection, setSortDirection] = useState<SortDirection>('none')
  const [selectedRows, setSelectedRows] = useState<number[]>([])

  const handleSort = (field: keyof User) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : sortDirection === 'desc' ? 'none' : 'asc')
    } else {
      setSortField(field)
      setSortDirection('asc')
    }
  }

  const sortedUsers = [...sampleUsers].sort((a, b) => {
    if (!sortField || sortDirection === 'none') return 0

    const aValue = a[sortField]
    const bValue = b[sortField]

    if (typeof aValue === 'string' && typeof bValue === 'string') {
      return sortDirection === 'asc' 
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue)
    }

    if (typeof aValue === 'number' && typeof bValue === 'number') {
      return sortDirection === 'asc' ? aValue - bValue : bValue - aValue
    }

    return 0
  })

  const handleRowSelect = (userId: number) => {
    setSelectedRows(prev => 
      prev.includes(userId) 
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
    )
  }

  const handleSelectAll = () => {
    setSelectedRows(
      selectedRows.length === sampleUsers.length 
        ? [] 
        : sampleUsers.map(user => user.id)
    )
  }

  return (
    <div className="space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Sortable Table</h2>
        <p className="text-muted-foreground">
          Click on column headers to sort data. Features multi-selection and keyboard navigation.
        </p>

        <div className="bg-card border rounded-lg p-6">
          <TableContainer>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHeaderCell>
                    <input
                      type="checkbox"
                      checked={selectedRows.length === sampleUsers.length}
                      onChange={handleSelectAll}
                      aria-label="Select all users"
                    />
                  </TableHeaderCell>
                  <TableHeaderCell 
                    sortable 
                    sortDirection={sortField === 'name' ? sortDirection : 'none'}
                    onSort={() => handleSort('name')}
                  >
                    Name
                  </TableHeaderCell>
                  <TableHeaderCell 
                    sortable 
                    sortDirection={sortField === 'email' ? sortDirection : 'none'}
                    onSort={() => handleSort('email')}
                  >
                    Email
                  </TableHeaderCell>
                  <TableHeaderCell 
                    sortable 
                    sortDirection={sortField === 'role' ? sortDirection : 'none'}
                    onSort={() => handleSort('role')}
                  >
                    Role
                  </TableHeaderCell>
                  <TableHeaderCell 
                    sortable 
                    sortDirection={sortField === 'status' ? sortDirection : 'none'}
                    onSort={() => handleSort('status')}
                  >
                    Status
                  </TableHeaderCell>
                  <TableHeaderCell 
                    sortable 
                    sortDirection={sortField === 'orders' ? sortDirection : 'none'}
                    onSort={() => handleSort('orders')}
                    isNumeric
                  >
                    Orders
                  </TableHeaderCell>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedUsers.map((user) => (
                  <TableRow 
                    key={user.id} 
                    isSelected={selectedRows.includes(user.id)}
                  >
                    <TableCell>
                      <input
                        type="checkbox"
                        checked={selectedRows.includes(user.id)}
                        onChange={() => handleRowSelect(user.id)}
                        aria-label={`Select ${user.name}`}
                      />
                    </TableCell>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.role}</TableCell>
                    <TableCell>{user.status}</TableCell>
                    <TableCell isNumeric>{user.orders}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </section>
    </div>
  )
}

function AccessibilitySection() {
  return (
    <div className="space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Accessibility Features</h2>
        <p className="text-muted-foreground">
          Built-in accessibility features following WCAG guidelines.
        </p>

        <div className="bg-card border rounded-lg p-6">
          <TableContainer>
            <Table role="table" aria-label="Accessible user data table">
              <TableCaption>
                User information with sortable columns and keyboard navigation support
              </TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHeaderCell 
                    sortable 
                    onSort={() => {}}
                    aria-label="Sort by name"
                  >
                    Name
                  </TableHeaderCell>
                  <TableHeaderCell 
                    sortable 
                    onSort={() => {}}
                    aria-label="Sort by email"
                  >
                    Email
                  </TableHeaderCell>
                  <TableHeaderCell 
                    sortable 
                    onSort={() => {}}
                    isNumeric
                    aria-label="Sort by order count"
                  >
                    Orders
                  </TableHeaderCell>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sampleUsers.slice(0, 3).map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell isNumeric>{user.orders}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </section>
    </div>
  )
}

export { TablePage }
