export interface PageHeaderProps {
  title: string
  description: string
  badgeText: string
  examples: string[]
}

export function PageHeader({ title, description, badgeText, examples }: PageHeaderProps) {
  return (
    <div className="space-y-4">
      <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100">
        {title}
      </h1>
      <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
        {description}
      </p>
      
      <div className="flex flex-wrap gap-2 text-sm">
        <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full font-medium">
          {badgeText}
        </span>
        {examples.map((example, index) => (
          <span 
            key={index}
            className="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-full font-medium"
          >
            {example}
          </span>
        ))}
      </div>
    </div>
  )
}
