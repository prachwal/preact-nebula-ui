import { getComponentStats } from '../../data/components'
import { Card, CardBody, Stack } from '../../../nebula/components'

export function StatsCards() {
  const stats = getComponentStats()

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8 w-full">
      <Card>
        <CardBody>
          <Stack spacing="sm">
            <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">{stats.total}</div>
            <div className="text-sm text-gray-600 dark:text-gray-300">Total Components</div>
          </Stack>
        </CardBody>
      </Card>
      
      <Card>
        <CardBody>
          <Stack spacing="sm">
            <div className="text-3xl font-bold text-green-600 dark:text-green-400">{stats.completed}</div>
            <div className="text-sm text-gray-600 dark:text-gray-300">Completed</div>
          </Stack>
        </CardBody>
      </Card>
      
      <Card>
        <CardBody>
          <Stack spacing="sm">
            <div className="text-3xl font-bold text-orange-600 dark:text-orange-400">{stats.inProgress + stats.planned}</div>
            <div className="text-sm text-gray-600 dark:text-gray-300">In Progress + Planned</div>
          </Stack>
        </CardBody>
      </Card>
      
      <Card>
        <CardBody>
          <Stack spacing="sm">
            <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">{stats.completionPercentage}%</div>
            <div className="text-sm text-gray-600 dark:text-gray-300">Progress</div>
          </Stack>
        </CardBody>
      </Card>
    </div>
  )
}
