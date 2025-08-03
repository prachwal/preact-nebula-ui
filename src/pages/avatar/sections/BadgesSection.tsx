import { Avatar, AvatarBadge } from '@/components';

export function BadgesSection() {
  return (
    <div class="space-y-8">
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 border border-gray-200 dark:border-gray-700">
        <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Avatar Badges</h2>
        <p class="text-gray-600 dark:text-gray-300 mb-8">
          Add status indicators, notifications, or decorative badges to avatars.
        </p>
        
        <div class="space-y-8">
          <div class="space-y-4">
            <h3 class="text-lg font-medium text-gray-900 dark:text-white">Status Badges</h3>
            <div class="flex items-center gap-8">
              <div class="text-center">
                <div class="relative inline-block mb-2">
                  <Avatar 
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face" 
                    alt="Online User"
                    size="lg"
                  />
                  <AvatarBadge 
                    placement="bottom-end"
                    className="bg-green-500 border-2 border-white dark:border-gray-800"
                  />
                </div>
                <p class="text-sm text-gray-500 dark:text-gray-400">Online</p>
              </div>
              
              <div class="text-center">
                <div class="relative inline-block mb-2">
                  <Avatar 
                    src="https://images.unsplash.com/photo-1494790108755-2616b612b5bc?w=150&h=150&fit=crop&crop=face" 
                    alt="Away User"
                    size="lg"
                  />
                  <AvatarBadge 
                    placement="bottom-end"
                    className="bg-yellow-500 border-2 border-white dark:border-gray-800"
                  />
                </div>
                <p class="text-sm text-gray-500 dark:text-gray-400">Away</p>
              </div>
              
              <div class="text-center">
                <div class="relative inline-block mb-2">
                  <Avatar 
                    name="Offline User"
                    size="lg"
                  />
                  <AvatarBadge 
                    placement="bottom-end" 
                    className="bg-gray-400 border-2 border-white dark:border-gray-800"
                  />
                </div>
                <p class="text-sm text-gray-500 dark:text-gray-400">Offline</p>
              </div>
            </div>
          </div>

          <div class="space-y-4">
            <h3 class="text-lg font-medium text-gray-900 dark:text-white">Notification Badges</h3>
            <div class="flex items-center gap-8">
              <div class="text-center">
                <div class="relative inline-block mb-2">
                  <Avatar 
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face" 
                    alt="User with notifications"
                    size="lg"
                  />
                  <AvatarBadge 
                    placement="top-end"
                    className="bg-red-500 text-white border-2 border-white dark:border-gray-800 text-xs font-bold min-w-[1.25rem] h-5 flex items-center justify-center"
                  >
                    3
                  </AvatarBadge>
                </div>
                <p class="text-sm text-gray-500 dark:text-gray-400">3 Notifications</p>
              </div>
              
              <div class="text-center">
                <div class="relative inline-block mb-2">
                  <Avatar 
                    name="User"
                    size="lg"
                  />
                  <AvatarBadge 
                    placement="top-end"
                    className="bg-blue-500 text-white border-2 border-white dark:border-gray-800 text-xs font-bold min-w-[1.25rem] h-5 flex items-center justify-center"
                  >
                    9+
                  </AvatarBadge>
                </div>
                <p class="text-sm text-gray-500 dark:text-gray-400">9+ Messages</p>
              </div>
            </div>
          </div>

          <div class="space-y-4">
            <h3 class="text-lg font-medium text-gray-900 dark:text-white">Different Placements</h3>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { placement: 'top-start' as const, label: 'Top Start' },
                { placement: 'top-end' as const, label: 'Top End' },
                { placement: 'bottom-start' as const, label: 'Bottom Start' },
                { placement: 'bottom-end' as const, label: 'Bottom End' }
              ].map(({ placement, label }) => (
                <div key={placement} class="text-center">
                  <div class="relative inline-block mb-2">
                    <Avatar 
                      name="User"
                      size="lg"
                    />
                    <AvatarBadge 
                      placement={placement}
                      className="bg-purple-500 border-2 border-white dark:border-gray-800"
                    />
                  </div>
                  <p class="text-sm text-gray-500 dark:text-gray-400">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
