import { Avatar, AvatarGroup } from '@/components';

export function GroupsSection() {
  return (
    <div class="space-y-8">
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 border border-gray-200 dark:border-gray-700">
        <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Avatar Groups</h2>
        <p class="text-gray-600 dark:text-gray-300 mb-8">
          Grouped avatars for showing multiple users, teams, or collaborators.
        </p>
        
        <div class="space-y-8">
          <div class="space-y-4">
            <h3 class="text-lg font-medium text-gray-900 dark:text-white">Basic Avatar Group</h3>
            <AvatarGroup>
              <Avatar src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face" alt="User 1" />
              <Avatar src="https://images.unsplash.com/photo-1494790108755-2616b612b5bc?w=150&h=150&fit=crop&crop=face" alt="User 2" />
              <Avatar name="Alex Johnson" />
              <Avatar name="Sarah Wilson" />
            </AvatarGroup>
          </div>

          <div class="space-y-4">
            <h3 class="text-lg font-medium text-gray-900 dark:text-white">Group with Limit</h3>
            <p class="text-sm text-gray-500 dark:text-gray-400 mb-4">
              Shows only the first few avatars with a count of remaining members
            </p>
            <AvatarGroup max={3}>
              <Avatar src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face" alt="User 1" />
              <Avatar src="https://images.unsplash.com/photo-1494790108755-2616b612b5bc?w=150&h=150&fit=crop&crop=face" alt="User 2" />
              <Avatar name="Alex Johnson" />
              <Avatar name="Sarah Wilson" />
              <Avatar name="Mike Brown" />
              <Avatar name="Emma Davis" />
            </AvatarGroup>
          </div>

          <div class="space-y-4">
            <h3 class="text-lg font-medium text-gray-900 dark:text-white">Different Sizes</h3>
            <div class="space-y-4">
              <div>
                <p class="text-sm text-gray-500 dark:text-gray-400 mb-2">Small Group</p>
                <AvatarGroup size="sm">
                  <Avatar src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face" alt="User 1" />
                  <Avatar src="https://images.unsplash.com/photo-1494790108755-2616b612b5bc?w=150&h=150&fit=crop&crop=face" alt="User 2" />
                  <Avatar name="Alex Johnson" />
                </AvatarGroup>
              </div>
              
              <div>
                <p class="text-sm text-gray-500 dark:text-gray-400 mb-2">Large Group</p>
                <AvatarGroup size="lg">
                  <Avatar src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face" alt="User 1" />
                  <Avatar src="https://images.unsplash.com/photo-1494790108755-2616b612b5bc?w=150&h=150&fit=crop&crop=face" alt="User 2" />
                  <Avatar name="Alex Johnson" />
                </AvatarGroup>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
