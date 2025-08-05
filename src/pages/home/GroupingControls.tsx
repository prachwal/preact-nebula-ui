import { Button, Card, CardBody, Stack } from '../../../nebula/components'

export type GroupBy = 'milestone' | 'category' | 'alphabetical'

interface GroupingControlsProps {
  groupBy: GroupBy
  onGroupByChange: (groupBy: GroupBy) => void
}

export function GroupingControls({ groupBy, onGroupByChange }: GroupingControlsProps) {
  return (
    <Card className="w-full">
      <CardBody>
        <Stack spacing="md">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">View Components By:</h2>
          <div className="flex flex-wrap gap-2">
            <Button
              onClick={() => onGroupByChange('milestone')}
              variant={groupBy === 'milestone' ? 'primary' : 'secondary'}
              size="md"
            >
              📅 Milestone
            </Button>
            <Button
              onClick={() => onGroupByChange('category')}
              variant={groupBy === 'category' ? 'primary' : 'secondary'}
              size="md"
            >
              🗂️ Category
            </Button>
            <Button
              onClick={() => onGroupByChange('alphabetical')}
              variant={groupBy === 'alphabetical' ? 'primary' : 'secondary'}
              size="md"
            >
              🔤 Alphabetical
            </Button>
          </div>
        </Stack>
      </CardBody>
    </Card>
  )
}
