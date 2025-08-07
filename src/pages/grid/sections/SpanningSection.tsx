import { Grid, GridItem } from '@/components'
import { Label } from '@/components'

export function SpanningSection() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
          Grid Item Spanning
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Control how grid items span across columns and rows, and their positioning within the grid.
        </p>

        <div className="space-y-8">
          <div>
            <Label>Column Spanning</Label>
            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
              <Grid cols={12} gap={4}>
                <GridItem colSpan={12}>
                  <div className="bg-red-100 dark:bg-red-900 p-4 rounded text-center">
                    Full Width (span 12)
                  </div>
                </GridItem>
                <GridItem colSpan={8}>
                  <div className="bg-blue-100 dark:bg-blue-900 p-4 rounded text-center">
                    Main Content (span 8)
                  </div>
                </GridItem>
                <GridItem colSpan={4}>
                  <div className="bg-green-100 dark:bg-green-900 p-4 rounded text-center">
                    Sidebar (span 4)
                  </div>
                </GridItem>
                <GridItem colSpan={3}>
                  <div className="bg-yellow-100 dark:bg-yellow-900 p-4 rounded text-center">
                    Quarter (span 3)
                  </div>
                </GridItem>
                <GridItem colSpan={3}>
                  <div className="bg-yellow-100 dark:bg-yellow-900 p-4 rounded text-center">
                    Quarter (span 3)
                  </div>
                </GridItem>
                <GridItem colSpan={6}>
                  <div className="bg-purple-100 dark:bg-purple-900 p-4 rounded text-center">
                    Half Width (span 6)
                  </div>
                </GridItem>
              </Grid>
            </div>
          </div>

          <div>
            <Label>Row Spanning</Label>
            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
              <Grid cols={4} gap={4}>
                <GridItem colSpan={1} rowSpan={2}>
                  <div className="bg-indigo-100 dark:bg-indigo-900 p-4 rounded text-center h-full flex items-center justify-center">
                    Tall Item<br/>(row span 2)
                  </div>
                </GridItem>
                <GridItem colSpan={1}>
                  <div className="bg-pink-100 dark:bg-pink-900 p-4 rounded text-center">
                    Normal 1
                  </div>
                </GridItem>
                <GridItem colSpan={1}>
                  <div className="bg-pink-100 dark:bg-pink-900 p-4 rounded text-center">
                    Normal 2
                  </div>
                </GridItem>
                <GridItem colSpan={1} rowSpan={3}>
                  <div className="bg-teal-100 dark:bg-teal-900 p-4 rounded text-center h-full flex items-center justify-center">
                    Very Tall<br/>(row span 3)
                  </div>
                </GridItem>
                <GridItem colSpan={2}>
                  <div className="bg-orange-100 dark:bg-orange-900 p-4 rounded text-center">
                    Wide Item (col span 2)
                  </div>
                </GridItem>
                <GridItem colSpan={1}>
                  <div className="bg-pink-100 dark:bg-pink-900 p-4 rounded text-center">
                    Normal 3
                  </div>
                </GridItem>
                <GridItem colSpan={1}>
                  <div className="bg-pink-100 dark:bg-pink-900 p-4 rounded text-center">
                    Normal 4
                  </div>
                </GridItem>
                <GridItem colSpan={1}>
                  <div className="bg-pink-100 dark:bg-pink-900 p-4 rounded text-center">
                    Normal 5
                  </div>
                </GridItem>
              </Grid>
            </div>
          </div>

          <div>
            <Label>Explicit Positioning</Label>
            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
              <Grid cols={5} gap={4} className="min-h-48">
                <GridItem colStart={1} colEnd={3} rowStart={1} rowEnd={2}>
                  <div className="bg-emerald-100 dark:bg-emerald-900 p-4 rounded text-center">
                    Positioned Item 1<br/>(col 1-3, row 1)
                  </div>
                </GridItem>
                <GridItem colStart={4} colEnd={6} rowStart={1} rowEnd={3}>
                  <div className="bg-violet-100 dark:bg-violet-900 p-4 rounded text-center h-full flex items-center justify-center">
                    Positioned Item 2<br/>(col 4-6, row 1-3)
                  </div>
                </GridItem>
                <GridItem colStart={1} colEnd={4} rowStart={2} rowEnd={3}>
                  <div className="bg-rose-100 dark:bg-rose-900 p-4 rounded text-center">
                    Positioned Item 3<br/>(col 1-4, row 2)
                  </div>
                </GridItem>
              </Grid>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
