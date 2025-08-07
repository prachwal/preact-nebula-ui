import { Grid, GridItem } from '@/components'
import { Label } from '@/components'

export function ResponsiveSection() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
          Responsive Grid Layouts
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Create responsive layouts that adapt to different screen sizes using breakpoint-specific column configurations.
        </p>

        <div className="space-y-8">
          <div>
            <Label>Responsive Columns</Label>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
              1 column on mobile, 2 on tablet, 4 on desktop
            </p>
            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
              <Grid cols={{ xs: 1, md: 2, lg: 4 }} gap={4}>
                {Array.from({ length: 8 }, (_, i) => (
                  <GridItem key={i} colSpan={1}>
                    <div className="bg-blue-100 dark:bg-blue-900 p-4 rounded text-center">
                      Item {i + 1}
                    </div>
                  </GridItem>
                ))}
              </Grid>
            </div>
          </div>

          <div>
            <Label>Responsive Spanning</Label>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
              Items span different columns based on screen size
            </p>
            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
              <Grid cols={12} gap={4}>
                <GridItem colSpan={{ xs: 12, md: 6, lg: 4 }}>
                  <div className="bg-green-100 dark:bg-green-900 p-4 rounded text-center">
                    Responsive Item 1
                  </div>
                </GridItem>
                <GridItem colSpan={{ xs: 12, md: 6, lg: 4 }}>
                  <div className="bg-green-100 dark:bg-green-900 p-4 rounded text-center">
                    Responsive Item 2
                  </div>
                </GridItem>
                <GridItem colSpan={{ xs: 12, md: 12, lg: 4 }}>
                  <div className="bg-green-100 dark:bg-green-900 p-4 rounded text-center">
                    Responsive Item 3
                  </div>
                </GridItem>
              </Grid>
            </div>
          </div>

          <div>
            <Label>Responsive Gaps</Label>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
              Different gap sizes for different screen sizes
            </p>
            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
              <Grid cols={6} gap={{ xs: 2, md: 4, lg: 6 }}>
                {Array.from({ length: 12 }, (_, i) => (
                  <GridItem key={i} colSpan={1}>
                    <div className="bg-purple-100 dark:bg-purple-900 p-3 rounded text-center text-sm">
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
  )
}
