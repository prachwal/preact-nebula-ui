import { useState, useEffect } from 'preact/hooks';
import { Skeleton, Button, Stack } from '@/components';

export function InteractiveSection() {
  const [isLoading, setIsLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (isLoading) {
      timeout = setTimeout(() => {
        if (loadingStep < 3) {
          setLoadingStep(prev => prev + 1);
        } else {
          setIsLoading(false);
          setUserData({
            name: 'John Doe',
            role: 'Senior Developer',
            avatar: '👨‍💻',
            bio: 'Passionate about building great user experiences with modern web technologies.',
            stats: { posts: 42, followers: 1234, following: 567 }
          });
        }
      }, 800);
    }
    return () => clearTimeout(timeout);
  }, [isLoading, loadingStep]);

  const handleLoadData = () => {
    setIsLoading(true);
    setLoadingStep(0);
    setUserData(null);
  };

  const handleReset = () => {
    setIsLoading(false);
    setLoadingStep(0);
    setUserData(null);
  };

  return (
    <div class="space-y-8">
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 border border-gray-200 dark:border-gray-700">
        <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Interactive Examples</h2>
        <p class="text-gray-600 dark:text-gray-300 mb-8">
          See skeleton loading states in action with progressive content loading and real-world scenarios.
        </p>

        <div class="space-y-8">
          {/* Progressive Loading Demo */}
          <div class="space-y-4">
            <h3 class="text-lg font-medium text-gray-900 dark:text-white">Progressive Loading</h3>
            <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
              <div class="space-y-6">
                <div class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-600 p-6">
                  {!isLoading && !userData && (
                    <div class="text-center py-8">
                      <p class="text-gray-500 dark:text-gray-400 mb-4">Click "Load Profile" to see skeleton loading states</p>
                    </div>
                  )}

                  {isLoading && (
                    <div class="space-y-6">
                      {/* Header */}
                      <div class="flex items-center space-x-4">
                        <Skeleton width="4rem" height="4rem" variant="circular" animation={loadingStep >= 1 ? "none" : "pulse"} />
                        <div class="flex-1 space-y-2">
                          {loadingStep >= 1 ? (
                            <div>
                              <h3 class="text-lg font-semibold text-gray-900 dark:text-white">John Doe</h3>
                              <p class="text-gray-600 dark:text-gray-300">Senior Developer</p>
                            </div>
                          ) : (
                            <>
                              <Skeleton height="1.25rem" width="40%" />
                              <Skeleton height="1rem" width="30%" />
                            </>
                          )}
                        </div>
                      </div>

                      {/* Bio */}
                      <div class="space-y-2">
                        {loadingStep >= 2 ? (
                          <p class="text-gray-700 dark:text-gray-300">
                            Passionate about building great user experiences with modern web technologies.
                          </p>
                        ) : (
                          <>
                            <Skeleton height="1rem" />
                            <Skeleton height="1rem" width="85%" />
                          </>
                        )}
                      </div>

                      {/* Stats */}
                      <div class="flex space-x-8 pt-4 border-t border-gray-200 dark:border-gray-600">
                        {loadingStep >= 3 ? (
                          <>
                            <div class="text-center">
                              <div class="text-xl font-bold text-gray-900 dark:text-white">42</div>
                              <div class="text-sm text-gray-600 dark:text-gray-300">Posts</div>
                            </div>
                            <div class="text-center">
                              <div class="text-xl font-bold text-gray-900 dark:text-white">1,234</div>
                              <div class="text-sm text-gray-600 dark:text-gray-300">Followers</div>
                            </div>
                            <div class="text-center">
                              <div class="text-xl font-bold text-gray-900 dark:text-white">567</div>
                              <div class="text-sm text-gray-600 dark:text-gray-300">Following</div>
                            </div>
                          </>
                        ) : (
                          <>
                            <div class="text-center space-y-1">
                              <Skeleton height="1.5rem" width="2rem" />
                              <Skeleton height="0.875rem" width="3rem" />
                            </div>
                            <div class="text-center space-y-1">
                              <Skeleton height="1.5rem" width="2.5rem" />
                              <Skeleton height="0.875rem" width="4rem" />
                            </div>
                            <div class="text-center space-y-1">
                              <Skeleton height="1.5rem" width="2rem" />
                              <Skeleton height="0.875rem" width="4rem" />
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  )}

                  {userData && !isLoading && (
                    <div class="space-y-6">
                      <div class="flex items-center space-x-4">
                        <div class="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center text-2xl">
                          {userData.avatar}
                        </div>
                        <div class="flex-1">
                          <h3 class="text-lg font-semibold text-gray-900 dark:text-white">{userData.name}</h3>
                          <p class="text-gray-600 dark:text-gray-300">{userData.role}</p>
                        </div>
                      </div>
                      <p class="text-gray-700 dark:text-gray-300">{userData.bio}</p>
                      <div class="flex space-x-8 pt-4 border-t border-gray-200 dark:border-gray-600">
                        <div class="text-center">
                          <div class="text-xl font-bold text-gray-900 dark:text-white">{userData.stats.posts}</div>
                          <div class="text-sm text-gray-600 dark:text-gray-300">Posts</div>
                        </div>
                        <div class="text-center">
                          <div class="text-xl font-bold text-gray-900 dark:text-white">{userData.stats.followers.toLocaleString()}</div>
                          <div class="text-sm text-gray-600 dark:text-gray-300">Followers</div>
                        </div>
                        <div class="text-center">
                          <div class="text-xl font-bold text-gray-900 dark:text-white">{userData.stats.following}</div>
                          <div class="text-sm text-gray-600 dark:text-gray-300">Following</div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <Stack direction="horizontal" spacing="md" justify="center">
                  <Button 
                    onClick={handleLoadData} 
                    disabled={isLoading}
                    variant="primary"
                  >
                    {isLoading ? 'Loading...' : 'Load Profile'}
                  </Button>
                  <Button 
                    onClick={handleReset} 
                    variant="outline"
                    disabled={isLoading}
                  >
                    Reset
                  </Button>
                </Stack>
              </div>
            </div>
          </div>

          {/* Content Layout Examples */}
          <div class="space-y-4">
            <h3 class="text-lg font-medium text-gray-900 dark:text-white">Common Layout Patterns</h3>
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div class="space-y-3">
                <h4 class="text-md font-medium text-gray-900 dark:text-white">Blog Post List</h4>
                <div class="space-y-4">
                  {[1, 2, 3].map((item) => (
                    <div key={item} class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg p-4">
                      <div class="flex space-x-4">
                        <Skeleton width="5rem" height="4rem" variant="rectangular" />
                        <div class="flex-1 space-y-2">
                          <Skeleton height="1.25rem" />
                          <Skeleton height="1rem" width="80%" />
                          <div class="flex items-center space-x-2 pt-2">
                            <Skeleton width="1.5rem" height="1.5rem" variant="circular" />
                            <Skeleton height="0.75rem" width="6rem" />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div class="space-y-3">
                <h4 class="text-md font-medium text-gray-900 dark:text-white">Dashboard Cards</h4>
                <div class="grid grid-cols-2 gap-4">
                  {[1, 2, 3, 4].map((item) => (
                    <div key={item} class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg p-4">
                      <div class="space-y-3">
                        <div class="flex items-center justify-between">
                          <Skeleton height="1rem" width="60%" />
                          <Skeleton width="1.5rem" height="1.5rem" variant="circular" />
                        </div>
                        <Skeleton height="2rem" width="40%" />
                        <Skeleton height="0.75rem" width="80%" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
