import { useState } from 'preact/hooks'
import { Table, Button, Checkbox } from '../../../../nebula/components'

interface TableData {
  id: number
  name: string
  email: string
  role: string
  status: 'active' | 'inactive'
}

const mockData: TableData[] = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'active' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User', status: 'active' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'Editor', status: 'inactive' },
  { id: 4, name: 'Alice Brown', email: 'alice@example.com', role: 'User', status: 'active' },
]

export function InteractiveSection() {
  const [data, setData] = useState<TableData[]>(mockData)
  const [selectedRows, setSelectedRows] = useState<number[]>([])
  const [sortConfig, setSortConfig] = useState<{ key: keyof TableData; direction: 'asc' | 'desc' } | null>(null)

  const handleSort = (key: keyof TableData) => {
    let direction: 'asc' | 'desc' = 'asc'
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc'
    }
    setSortConfig({ key, direction })

    const sortedData = [...data].sort((a, b) => {
      if (a[key] < b[key]) return direction === 'asc' ? -1 : 1
      if (a[key] > b[key]) return direction === 'asc' ? 1 : -1
      return 0
    })
    setData(sortedData)
  }

  const handleSelectRow = (id: number) => {
    setSelectedRows(prev => 
      prev.includes(id) 
        ? prev.filter(rowId => rowId !== id)
        : [...prev, id]
    )
  }

  const handleSelectAll = () => {
    if (selectedRows.length === data.length) {
      setSelectedRows([])
    } else {
      setSelectedRows(data.map(row => row.id))
    }
  }

  const handleDeleteSelected = () => {
    setData(prev => prev.filter(row => !selectedRows.includes(row.id)))
    setSelectedRows([])
  }

  const getSortIcon = (key: keyof TableData) => {
    if (!sortConfig || sortConfig.key !== key) {
      return <span className="text-gray-400">↕</span>
    }
    return sortConfig.direction === 'asc' ? <span>↑</span> : <span>↓</span>
  }

  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-semibold">Interactive Features</h2>
      <p className="text-gray-600 dark:text-gray-400">
        Interactive table features like sorting, selection, and actions.
      </p>

      {selectedRows.length > 0 && (
        <div className="flex items-center gap-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <span className="text-sm text-blue-700 dark:text-blue-300">
            {selectedRows.length} row(s) selected
          </span>
          <Button 
            size="sm" 
            variant="destructive"
            onClick={handleDeleteSelected}
          >
            Delete Selected
          </Button>
        </div>
      )}
      
      <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
        <Table>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell className="w-12">
                <Checkbox
                  checked={selectedRows.length === data.length && data.length > 0}
                  indeterminate={selectedRows.length > 0 && selectedRows.length < data.length}
                  onChange={handleSelectAll}
                />
              </Table.HeaderCell>
              <Table.HeaderCell 
                className="cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700"
                onClick={() => handleSort('name')}
              >
                <div className="flex items-center gap-2">
                  Name {getSortIcon('name')}
                </div>
              </Table.HeaderCell>
              <Table.HeaderCell 
                className="cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700"
                onClick={() => handleSort('email')}
              >
                <div className="flex items-center gap-2">
                  Email {getSortIcon('email')}
                </div>
              </Table.HeaderCell>
              <Table.HeaderCell 
                className="cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700"
                onClick={() => handleSort('role')}
              >
                <div className="flex items-center gap-2">
                  Role {getSortIcon('role')}
                </div>
              </Table.HeaderCell>
              <Table.HeaderCell 
                className="cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700"
                onClick={() => handleSort('status')}
              >
                <div className="flex items-center gap-2">
                  Status {getSortIcon('status')}
                </div>
              </Table.HeaderCell>
              <Table.HeaderCell>Actions</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {data.map((row) => (
              <Table.Row 
                key={row.id}
                className={selectedRows.includes(row.id) ? 'bg-blue-50 dark:bg-blue-900/20' : ''}
              >
                <Table.Cell>
                  <Checkbox
                    checked={selectedRows.includes(row.id)}
                    onChange={() => handleSelectRow(row.id)}
                  />
                </Table.Cell>
                <Table.Cell className="font-medium">{row.name}</Table.Cell>
                <Table.Cell>{row.email}</Table.Cell>
                <Table.Cell>{row.role}</Table.Cell>
                <Table.Cell>
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                    row.status === 'active' 
                      ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300'
                      : 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300'
                  }`}>
                    {row.status}
                  </span>
                </Table.Cell>
                <Table.Cell>
                  <div className="flex gap-2">
                    <Button size="sm" variant="ghost">Edit</Button>
                    <Button 
                      size="sm" 
                      variant="ghost"
                      onClick={() => setData(prev => prev.filter(item => item.id !== row.id))}
                    >
                      Delete
                    </Button>
                  </div>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>

      <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
        <h3 className="text-lg font-medium mb-2">Features Demonstrated:</h3>
        <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
          <li>✅ <strong>Sortable columns:</strong> Click on column headers to sort</li>
          <li>✅ <strong>Row selection:</strong> Select individual rows or all rows</li>
          <li>✅ <strong>Bulk actions:</strong> Delete multiple selected rows</li>
          <li>✅ <strong>Action buttons:</strong> Edit and delete individual rows</li>
          <li>✅ <strong>Visual feedback:</strong> Selected rows are highlighted</li>
        </ul>
      </div>
    </section>
  )
}
