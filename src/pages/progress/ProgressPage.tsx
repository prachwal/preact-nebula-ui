import { BasicUsageSection, VariantsSection, SizesSection, InteractiveSection } from './sections';

interface PageProps {
  path?: string;
}

export function ProgressPage(_props: PageProps) {
  return (
    <div class="space-y-8">
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 border border-gray-200 dark:border-gray-700">
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-6">Progress</h1>
        <p class="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
          Progress indicators show the completion status of ongoing processes, giving users 
          feedback about the current state and expected duration of operations. The Progress 
          component supports both linear and circular variants with customizable colors, sizes, 
          and label display options.
        </p>
      </div>

      <BasicUsageSection />
      <VariantsSection />
      <SizesSection />
      <InteractiveSection />
    </div>
  );
}
