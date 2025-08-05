import { Table, TableHeader, TableBody, TableRow, TableCell } from '../../../../nebula/components'

export function VariantsSection() {
  return (
    <section className="space-y-6">
      <h2 className="text-2xl font-semibold">Table Variants</h2>
      <p className="text-gray-600 dark:text-gray-400">
        Different table styles and visual variants.
      </p>
      
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium mb-3">Striped Table</h3>
          <Table variant="striped">
            <TableHeader>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>John Doe</TableCell>
                <TableCell>Active</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Jane Smith</TableCell>
                <TableCell>Inactive</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
        
        <div>
          <h3 className="text-lg font-medium mb-3">Outlined Table</h3>
          <Table variant="outline">
            <TableHeader>
              <TableRow>
                <TableCell>Product</TableCell>
                <TableCell>Price</TableCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>Widget A</TableCell>
                <TableCell>$19.99</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Widget B</TableCell>
                <TableCell>$29.99</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
    </section>
  )
}
