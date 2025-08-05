import { Table, TableHeader, TableBody, TableRow, TableCell } from '../../../../nebula/components'

export function BasicUsageSection() {
  const data = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'Editor' }
  ]

  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-semibold">Simple Table</h2>
      <p className="text-gray-600 dark:text-gray-400">
        A basic table with header, body, and footer sections.
      </p>
      
      <Table>
        <TableHeader>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Role</TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map(item => (
            <TableRow key={item.id}>
              <TableCell>{item.id}</TableCell>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.email}</TableCell>
              <TableCell>{item.role}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      
      <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
        <h4 className="font-medium mb-2">Usage:</h4>
        <pre className="text-sm overflow-x-auto">
          <code>{`<Table>
  <TableHeader>
    <TableRow>
      <TableCell>Name</TableCell>
      <TableCell>Email</TableCell>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell>John Doe</TableCell>
      <TableCell>john@example.com</TableCell>
    </TableRow>
  </TableBody>
</Table>`}</code>
        </pre>
      </div>
    </section>
  )
}
