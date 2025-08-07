import { Steps } from '../../nebula/components/Steps/Steps'

export default function StepsAllGreenExample() {
  return (
    <div className="max-w-4xl mx-auto py-8">
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
  )
}
