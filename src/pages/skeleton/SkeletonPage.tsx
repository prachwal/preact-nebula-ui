import { BasicUsageSection, AnimationSection, ShapesAndSizesSection, InteractiveSection } from './sections';

interface PageProps {
  path?: string;
}

export function SkeletonPage(_props: PageProps) {
  return (
    <div class="space-y-8">
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 border border-gray-200 dark:border-gray-700">
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-6">Skeleton</h1>
        <p class="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
          Skeleton loading placeholders provide visual feedback to users while content is being loaded. 
          They maintain the layout structure and give users an indication of what type of content to expect, 
          improving perceived performance and user experience during loading states.
        </p>
      </div>

      <BasicUsageSection />
      <AnimationSection />
      <ShapesAndSizesSection />
      <InteractiveSection />
    </div>
  );
}
