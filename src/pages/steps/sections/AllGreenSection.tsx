import { Steps } from '../../../../nebula/components/Steps'

export function AllGreenSection() {
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Wszystkie kroki zakończone (zielone)</h3>
      <p className="text-gray-600 dark:text-gray-300">Każdy krok ma status <code>finish</code> – także ostatni.</p>
      <div className="max-w-4xl mx-auto">
        <Steps
          direction="horizontal"
          steps={[
            { title: 'Login', description: 'Enter your credentials', status: 'finish' },
            { title: 'Verification', description: 'Verify your identity', status: 'finish' },
            { title: 'Payment', description: 'Complete payment', status: 'finish' },
            { title: 'Done', description: 'Account created', status: 'finish' },
          ]}
        />
      </div>
    </div>
  )
}
