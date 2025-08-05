import { Input, Card, CardBody, Stack } from '../../../nebula/components'

interface SearchControlsProps {
  searchTerm: string
  onSearchChange: (term: string) => void
}

export function SearchControls({ searchTerm, onSearchChange }: SearchControlsProps) {
  return (
    <Card className="w-full">
      <CardBody>
        <Stack spacing="md">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Search Components:</h2>
          <Input
            placeholder="Search components by name, description, or category..."
            value={searchTerm}
            onChange={(e) => onSearchChange((e.target as HTMLInputElement)?.value || '')}
            leftIcon="🔍"
            size="lg"
            className="w-full"
          />
        </Stack>
      </CardBody>
    </Card>
  )
}
