import { Skeleton } from '@/components';

export function ShapesAndSizesSection() {
  return (
    <div class="space-y-8">
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 border border-gray-200 dark:border-gray-700">
        <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Shapes and Sizes</h2>
        <p class="text-gray-600 dark:text-gray-300 mb-8">
          Various shapes and sizing options to match different content types and layouts.
        </p>

        <div class="space-y-8">
          <div class="space-y-4">
            <h3 class="text-lg font-medium text-gray-900 dark:text-white">Shape Variants</h3>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div class="space-y-4">
                <div class="space-y-2">
                  <h4 class="text-md font-medium text-gray-900 dark:text-white">Rectangle</h4>
                  <p class="text-sm text-gray-600 dark:text-gray-300">Default rectangular shape</p>
                </div>
                <div class="space-y-3">
                  <Skeleton height="3rem" variant="rectangular" />
                  <Skeleton height="2rem" width="80%" variant="rectangular" />
                  <Skeleton height="1rem" width="60%" variant="rectangular" />
                </div>
              </div>

              <div class="space-y-4">
                <div class="space-y-2">
                  <h4 class="text-md font-medium text-gray-900 dark:text-white">Rounded</h4>
                  <p class="text-sm text-gray-600 dark:text-gray-300">Rounded corners for modern look</p>
                </div>
                <div class="space-y-3">
                  <Skeleton height="3rem" variant="rectangular" />
                  <Skeleton height="2rem" width="80%" variant="rectangular" />
                  <Skeleton height="1rem" width="60%" variant="rectangular" />
                </div>
              </div>

              <div class="space-y-4">
                <div class="space-y-2">
                  <h4 class="text-md font-medium text-gray-900 dark:text-white">Circle</h4>
                  <p class="text-sm text-gray-600 dark:text-gray-300">Perfect for avatars and icons</p>
                </div>
                <div class="flex flex-col items-center space-y-3">
                  <Skeleton width="3rem" height="3rem" variant="circular" />
                  <Skeleton width="2.5rem" height="2.5rem" variant="circular" />
                  <Skeleton width="2rem" height="2rem" variant="circular" />
                </div>
              </div>
            </div>
          </div>

          <div class="space-y-4">
            <h3 class="text-lg font-medium text-gray-900 dark:text-white">Size Examples</h3>
            <div class="space-y-6">
              <div class="space-y-3">
                <h4 class="text-md font-medium text-gray-900 dark:text-white">Text Sizes</h4>
                <div class="space-y-2">
                  <div class="flex items-center space-x-4">
                    <span class="w-20 text-sm text-gray-600 dark:text-gray-300">Heading</span>
                    <Skeleton height="2rem" width="12rem" />
                  </div>
                  <div class="flex items-center space-x-4">
                    <span class="w-20 text-sm text-gray-600 dark:text-gray-300">Subtitle</span>
                    <Skeleton height="1.5rem" width="10rem" />
                  </div>
                  <div class="flex items-center space-x-4">
                    <span class="w-20 text-sm text-gray-600 dark:text-gray-300">Body</span>
                    <Skeleton height="1rem" width="20rem" />
                  </div>
                  <div class="flex items-center space-x-4">
                    <span class="w-20 text-sm text-gray-600 dark:text-gray-300">Caption</span>
                    <Skeleton height="0.75rem" width="8rem" />
                  </div>
                </div>
              </div>

              <div class="space-y-3">
                <h4 class="text-md font-medium text-gray-900 dark:text-white">Avatar Sizes</h4>
                <div class="flex items-center space-x-4">
                  <div class="text-center space-y-1">
                    <Skeleton width="4rem" height="4rem" variant="circular" />
                    <span class="text-xs text-gray-600 dark:text-gray-300">Large</span>
                  </div>
                  <div class="text-center space-y-1">
                    <Skeleton width="3rem" height="3rem" variant="circular" />
                    <span class="text-xs text-gray-600 dark:text-gray-300">Medium</span>
                  </div>
                  <div class="text-center space-y-1">
                    <Skeleton width="2rem" height="2rem" variant="circular" />
                    <span class="text-xs text-gray-600 dark:text-gray-300">Small</span>
                  </div>
                  <div class="text-center space-y-1">
                    <Skeleton width="1.5rem" height="1.5rem" variant="circular" />
                    <span class="text-xs text-gray-600 dark:text-gray-300">Tiny</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="space-y-4">
            <h3 class="text-lg font-medium text-gray-900 dark:text-white">Custom Dimensions</h3>
            <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="space-y-4">
                  <h4 class="text-md font-medium text-gray-900 dark:text-white">Image Placeholders</h4>
                  <div class="space-y-3">
                    <div class="space-y-1">
                      <span class="text-sm text-gray-600 dark:text-gray-300">Banner (16:9)</span>
                      <Skeleton height="6rem" variant="rectangular" />
                    </div>
                    <div class="space-y-1">
                      <span class="text-sm text-gray-600 dark:text-gray-300">Square</span>
                      <Skeleton width="6rem" height="6rem" variant="rectangular" />
                    </div>
                    <div class="space-y-1">
                      <span class="text-sm text-gray-600 dark:text-gray-300">Portrait (4:5)</span>
                      <Skeleton width="5rem" height="6.25rem" variant="rectangular" />
                    </div>
                  </div>
                </div>

                <div class="space-y-4">
                  <h4 class="text-md font-medium text-gray-900 dark:text-white">UI Elements</h4>
                  <div class="space-y-3">
                    <div class="space-y-1">
                      <span class="text-sm text-gray-600 dark:text-gray-300">Button</span>
                      <Skeleton height="2.5rem" width="6rem" variant="rectangular" />
                    </div>
                    <div class="space-y-1">
                      <span class="text-sm text-gray-600 dark:text-gray-300">Input Field</span>
                      <Skeleton height="2.5rem" variant="rectangular" />
                    </div>
                    <div class="space-y-1">
                      <span class="text-sm text-gray-600 dark:text-gray-300">Card</span>
                      <Skeleton height="8rem" variant="rectangular" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
