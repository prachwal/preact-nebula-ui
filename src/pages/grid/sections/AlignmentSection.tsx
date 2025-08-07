import { Grid, GridItem } from '@/components'
import { Label } from '@/components'

export function AlignmentSection() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibent text-gray-900 dark:text-white mb-4">
          Grid Alignment
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Control the alignment of grid items and the grid content itself.
        </p>

        <div className="space-y-8">
          <div>
            <Label>Items Alignment</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">Items Start</p>
                <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
                  <Grid cols={3} gap={4} alignItems="start" className="min-h-32">
                    <GridItem><div className="bg-blue-100 dark:bg-blue-900 p-2 rounded text-center text-sm">Start</div></GridItem>
                    <GridItem><div className="bg-blue-100 dark:bg-blue-900 p-4 rounded text-center text-sm">Start<br/>Taller</div></GridItem>
                    <GridItem><div className="bg-blue-100 dark:bg-blue-900 p-2 rounded text-center text-sm">Start</div></GridItem>
                  </Grid>
                </div>
              </div>
              
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">Items Center</p>
                <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
                  <Grid cols={3} gap={4} alignItems="center" className="min-h-32">
                    <GridItem><div className="bg-green-100 dark:bg-green-900 p-2 rounded text-center text-sm">Center</div></GridItem>
                    <GridItem><div className="bg-green-100 dark:bg-green-900 p-4 rounded text-center text-sm">Center<br/>Taller</div></GridItem>
                    <GridItem><div className="bg-green-100 dark:bg-green-900 p-2 rounded text-center text-sm">Center</div></GridItem>
                  </Grid>
                </div>
              </div>
            </div>
          </div>

          <div>
            <Label>Content Justification</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">Justify Start</p>
                <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
                  <Grid cols={3} gap={4} justifyItems="start">
                    <GridItem><div className="bg-purple-100 dark:bg-purple-900 px-3 py-2 rounded text-center text-sm">Start</div></GridItem>
                    <GridItem><div className="bg-purple-100 dark:bg-purple-900 px-3 py-2 rounded text-center text-sm">Start</div></GridItem>
                    <GridItem><div className="bg-purple-100 dark:bg-purple-900 px-3 py-2 rounded text-center text-sm">Start</div></GridItem>
                  </Grid>
                </div>
              </div>
              
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">Justify Center</p>
                <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
                  <Grid cols={3} gap={4} justifyItems="center">
                    <GridItem><div className="bg-orange-100 dark:bg-orange-900 px-3 py-2 rounded text-center text-sm">Center</div></GridItem>
                    <GridItem><div className="bg-orange-100 dark:bg-orange-900 px-3 py-2 rounded text-center text-sm">Center</div></GridItem>
                    <GridItem><div className="bg-orange-100 dark:bg-orange-900 px-3 py-2 rounded text-center text-sm">Center</div></GridItem>
                  </Grid>
                </div>
              </div>
            </div>
          </div>

          <div>
            <Label>Individual Item Alignment</Label>
            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
              <Grid cols={4} gap={4} className="min-h-32">
                <GridItem alignSelf="start">
                  <div className="bg-red-100 dark:bg-red-900 p-3 rounded text-center text-sm">
                    Self Start
                  </div>
                </GridItem>
                <GridItem alignSelf="center">
                  <div className="bg-yellow-100 dark:bg-yellow-900 p-3 rounded text-center text-sm">
                    Self Center
                  </div>
                </GridItem>
                <GridItem alignSelf="end">
                  <div className="bg-teal-100 dark:bg-teal-900 p-3 rounded text-center text-sm">
                    Self End
                  </div>
                </GridItem>
                <GridItem alignSelf="stretch">
                  <div className="bg-indigo-100 dark:bg-indigo-900 p-3 rounded text-center text-sm h-full flex items-center justify-center">
                    Self Stretch
                  </div>
                </GridItem>
              </Grid>
            </div>
          </div>

          <div>
            <Label>Auto Flow Direction</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">Row Flow (Default)</p>
                <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
                  <Grid cols={3} gap={3} autoFlow="row">
                    {Array.from({ length: 6 }, (_, i) => (
                      <GridItem key={i}>
                        <div className="bg-blue-100 dark:bg-blue-900 p-2 rounded text-center text-sm">
                          {i + 1}
                        </div>
                      </GridItem>
                    ))}
                  </Grid>
                </div>
              </div>
              
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">Column Flow</p>
                <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
                  <Grid cols={3} gap={3} autoFlow="column">
                    {Array.from({ length: 6 }, (_, i) => (
                      <GridItem key={i}>
                        <div className="bg-green-100 dark:bg-green-900 p-2 rounded text-center text-sm">
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
