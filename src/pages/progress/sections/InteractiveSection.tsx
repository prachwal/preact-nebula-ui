import { useState, useEffect } from 'preact/hooks';
import { Progress, Button, Stack } from '@/components';

export function InteractiveSection() {
  const [linearProgress, setLinearProgress] = useState(0);
  const [circularProgress, setCircularProgress] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [isDownloading, setIsDownloading] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isAnimating) {
      interval = setInterval(() => {
        setLinearProgress(prev => {
          if (prev >= 100) {
            setIsAnimating(false);
            return 100;
          }
          return prev + 2;
        });
        setCircularProgress(prev => {
          if (prev >= 100) return 100;
          return prev + 1.5;
        });
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isAnimating]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isDownloading) {
      interval = setInterval(() => {
        setDownloadProgress(prev => {
          if (prev >= 100) {
            setIsDownloading(false);
            return 100;
          }
          return prev + Math.random() * 8;
        });
      }, 200);
    }
    return () => clearInterval(interval);
  }, [isDownloading]);

  const handleStart = () => {
    setLinearProgress(0);
    setCircularProgress(0);
    setIsAnimating(true);
  };

  const handleReset = () => {
    setLinearProgress(0);
    setCircularProgress(0);
    setIsAnimating(false);
  };

  const handleDownload = () => {
    setDownloadProgress(0);
    setIsDownloading(true);
  };

  const handleDownloadReset = () => {
    setDownloadProgress(0);
    setIsDownloading(false);
  };

  return (
    <div class="space-y-8">
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 border border-gray-200 dark:border-gray-700">
        <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Interactive Progress</h2>
        <p class="text-gray-600 dark:text-gray-300 mb-8">
          Real-world examples of progress indicators with dynamic updates and user interactions.
        </p>

        <div class="space-y-8">
          {/* Animated Progress Demo */}
          <div class="space-y-4">
            <h3 class="text-lg font-medium text-gray-900 dark:text-white">Animated Progress</h3>
            <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
              <div class="space-y-6">
                <div class="space-y-3">
                  <label class="text-sm font-medium text-gray-900 dark:text-white">
                    Linear Progress: {Math.round(linearProgress)}%
                  </label>
                  <Progress variant="linear" value={linearProgress} showLabel />
                </div>
                
                <div class="space-y-3">
                  <label class="text-sm font-medium text-gray-900 dark:text-white">
                    Circular Progress: {Math.round(circularProgress)}%
                  </label>
                  <div class="flex justify-center">
                    <Progress variant="circular" value={circularProgress} showLabel />
                  </div>
                </div>

                <Stack direction="horizontal" spacing="md" justify="center">
                  <Button 
                    onClick={handleStart} 
                    disabled={isAnimating}
                    variant="primary"
                  >
                    {isAnimating ? 'Running...' : 'Start Animation'}
                  </Button>
                  <Button 
                    onClick={handleReset} 
                    variant="outline"
                    disabled={isAnimating}
                  >
                    Reset
                  </Button>
                </Stack>
              </div>
            </div>
          </div>

          {/* File Download Simulation */}
          <div class="space-y-4">
            <h3 class="text-lg font-medium text-gray-900 dark:text-white">File Download Simulation</h3>
            <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
              <div class="space-y-6">
                <div class="flex items-center gap-4">
                  <div class="flex-1 space-y-2">
                    <div class="flex justify-between items-center">
                      <span class="text-sm font-medium text-gray-900 dark:text-white">
                        nebula-ui-components.zip
                      </span>
                      <span class="text-sm text-gray-600 dark:text-gray-300">
                        {Math.round(downloadProgress)}% ({(downloadProgress * 25.6 / 100).toFixed(1)} MB / 25.6 MB)
                      </span>
                    </div>
                    <Progress 
                      variant="linear" 
                      color={downloadProgress >= 100 ? 'success' : 'primary'}
                      value={downloadProgress} 
                    />
                    {downloadProgress >= 100 && (
                      <p class="text-sm text-green-600 dark:text-green-400">
                        ✓ Download completed successfully!
                      </p>
                    )}
                  </div>
                </div>

                <Stack direction="horizontal" spacing="md" justify="center">
                  <Button 
                    onClick={handleDownload} 
                    disabled={isDownloading}
                    variant="primary"
                  >
                    {isDownloading ? 'Downloading...' : 'Start Download'}
                  </Button>
                  <Button 
                    onClick={handleDownloadReset} 
                    variant="outline"
                    disabled={isDownloading}
                  >
                    Reset
                  </Button>
                </Stack>
              </div>
            </div>
          </div>

          {/* Step Progress */}
          <div class="space-y-4">
            <h3 class="text-lg font-medium text-gray-900 dark:text-white">Step Progress</h3>
            <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
              <div class="space-y-6">
                {[
                  { step: 1, label: 'Account Setup', progress: 100, status: 'completed' },
                  { step: 2, label: 'Profile Information', progress: 100, status: 'completed' },
                  { step: 3, label: 'Preferences', progress: 75, status: 'current' },
                  { step: 4, label: 'Review & Submit', progress: 0, status: 'pending' }
                ].map(({ step, label, progress, status }) => (
                  <div key={step} class="flex items-center gap-4">
                    <div class={`
                      flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium
                      ${status === 'completed' ? 'bg-green-500 text-white' : 
                        status === 'current' ? 'bg-blue-500 text-white' : 
                        'bg-gray-300 dark:bg-gray-600 text-gray-600 dark:text-gray-300'}
                    `}>
                      {status === 'completed' ? '✓' : step}
                    </div>
                    <div class="flex-1 space-y-2">
                      <div class="flex justify-between items-center">
                        <span class="text-sm font-medium text-gray-900 dark:text-white">
                          {label}
                        </span>
                        <span class="text-sm text-gray-600 dark:text-gray-300">
                          {progress}%
                        </span>
                      </div>
                      <Progress 
                        variant="linear" 
                        color={status === 'completed' ? 'success' : status === 'current' ? 'primary' : 'secondary'}
                        value={progress}
                        size="sm"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
