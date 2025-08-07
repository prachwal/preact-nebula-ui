import { Grid, GridItem } from '@/components'
import { Label } from '@/components'

export function BasicUsageSection() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
          Basic Grid Layout
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Create responsive grid layouts with the Grid component. Use GridItem to control individual item positioning.
        </p>

        <div className="space-y-8">
          <div>
            <Label>12-Column Grid (Default)</Label>
            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
              <Grid cols={12} gap={4}>
                <GridItem colSpan={12}>
                  <div className="bg-blue-100 dark:bg-blue-900 p-4 rounded text-center">
                    Full Width (12/12)
                  </div>
                </GridItem>
                <GridItem colSpan={6}>
                  <div className="bg-green-100 dark:bg-green-900 p-4 rounded text-center">
                    Half Width (6/12)
                  </div>
                </GridItem>
                <GridItem colSpan={6}>
                  <div className="bg-green-100 dark:bg-green-900 p-4 rounded text-center">
                    Half Width (6/12)
                  </div>
                </GridItem>
                <GridItem colSpan={4}>
                  <div className="bg-purple-100 dark:bg-purple-900 p-4 rounded text-center">
                    Third (4/12)
                  </div>
                </GridItem>
                <GridItem colSpan={4}>
                  <div className="bg-purple-100 dark:bg-purple-900 p-4 rounded text-center">
                    Third (4/12)
                  </div>
                </GridItem>
                <GridItem colSpan={4}>
                  <div className="bg-purple-100 dark:bg-purple-900 p-4 rounded text-center">
                    Third (4/12)
                  </div>
                </GridItem>
              </Grid>
            </div>
          </div>

          <div>
            <Label>6-Column Grid</Label>
            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
              <Grid cols={6} gap={3}>
                <GridItem colSpan={6}>
                  <div className="bg-red-100 dark:bg-red-900 p-4 rounded text-center">
                    Full Width (6/6)
                  </div>
                </GridItem>
                <GridItem colSpan={3}>
                  <div className="bg-yellow-100 dark:bg-yellow-900 p-4 rounded text-center">
                    Half (3/6)
                  </div>
                </GridItem>
                <GridItem colSpan={3}>
                  <div className="bg-yellow-100 dark:bg-yellow-900 p-4 rounded text-center">
                    Half (3/6)
                  </div>
                </GridItem>
                <GridItem colSpan={2}>
                  <div className="bg-indigo-100 dark:bg-indigo-900 p-4 rounded text-center">
                    Third (2/6)
                  </div>
                </GridItem>
                <GridItem colSpan={2}>
                  <div className="bg-indigo-100 dark:bg-indigo-900 p-4 rounded text-center">
                    Third (2/6)
                  </div>
                </GridItem>
                <GridItem colSpan={2}>
                  <div className="bg-indigo-100 dark:bg-indigo-900 p-4 rounded text-center">
                    Third (2/6)
                  </div>
                </GridItem>
              </Grid>
            </div>
          </div>

          <div>
            <Label>Different Gap Sizes</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">Small Gap (2)</p>
                <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
                  <Grid cols={4} gap={2}>
                    {Array.from({ length: 8 }, (_, i) => (
                      <GridItem key={i} colSpan={1}>
                        <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded text-center text-xs">
                          {i + 1}
                        </div>
                      </GridItem>
                    ))}
                  </Grid>
                </div>
              </div>
              
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">Large Gap (8)</p>
                <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
                  <Grid cols={4} gap={8}>
                    {Array.from({ length: 8 }, (_, i) => (
                      <GridItem key={i} colSpan={1}>
                        <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded text-center text-xs">
                          {i + 1}
                        </div>
                      </GridItem>
                    ))}
                  </Grid>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
