import { Alert, Button } from '@/components';
import { useState } from 'preact/hooks';

type AlertItem = {
  id: number;
  variant: 'info' | 'success' | 'warning' | 'error';
  title: string;
  message: string;
};

export function InteractiveSection() {
  const [alerts, setAlerts] = useState<AlertItem[]>([
    { id: 1, variant: 'info', title: 'Dismissible Info', message: 'This alert can be dismissed.' },
    { id: 2, variant: 'success', title: 'Success Alert', message: 'Operation completed successfully!' },
    { id: 3, variant: 'warning', title: 'Warning Alert', message: 'Please check this warning.' }
  ]);

  const removeAlert = (id: number) => {
    setAlerts(prev => prev.filter(alert => alert.id !== id));
  };

  const addAlert = () => {
    const variants: AlertItem['variant'][] = ['info', 'success', 'warning', 'error'];
    const randomVariant = variants[Math.floor(Math.random() * variants.length)];
    const newAlert: AlertItem = {
      id: Date.now(),
      variant: randomVariant,
      title: `New ${randomVariant} Alert`,
      message: `This is a new ${randomVariant} alert added dynamically.`
    };
    setAlerts(prev => [...prev, newAlert]);
  };

  return (
    <div class="space-y-8">
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 border border-gray-200 dark:border-gray-700">
        <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Interactive Alerts</h2>
        <p class="text-gray-600 dark:text-gray-300 mb-8">
          Dismissible alerts with action buttons and dynamic behavior.
        </p>

        <div class="space-y-6">
          <div class="space-y-4">
            <h3 class="text-lg font-medium text-gray-900 dark:text-white">Alert with Actions</h3>
            <Alert 
              variant="warning" 
              title="Update Available"
              actions={
                <div class="flex space-x-2">
                  <Button size="sm" variant="outline">Update Now</Button>
                  <Button size="sm" variant="ghost">Later</Button>
                </div>
              }
            >
              A new version of the application is available. Would you like to update now?
            </Alert>
          </div>

          <div class="space-y-4">
            <div class="flex items-center justify-between">
              <h3 class="text-lg font-medium text-gray-900 dark:text-white">Dismissible Alerts</h3>
              <Button onClick={addAlert} size="sm">Add Alert</Button>
            </div>
            
            <div class="space-y-3">
              {alerts.map(alert => (
                <Alert
                  key={alert.id}
                  variant={alert.variant}
                  title={alert.title}
                  dismissible
                  onDismiss={() => removeAlert(alert.id)}
                >
                  {alert.message}
                </Alert>
              ))}
              
              {alerts.length === 0 && (
                <div class="text-center py-8 text-gray-500 dark:text-gray-400">
                  No alerts to display. Click "Add Alert" to create one.
                </div>
              )}
            </div>
          </div>

          <div class="space-y-4">
            <h3 class="text-lg font-medium text-gray-900 dark:text-white">Custom Icon Alert</h3>
            <Alert 
              variant="info"
              title="Custom Icon"
              icon={
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              }
            >
              This alert uses a custom icon instead of the default variant icon.
            </Alert>
          </div>
        </div>
      </div>
    </div>
  );
}
