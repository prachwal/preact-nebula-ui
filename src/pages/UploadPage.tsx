import { BasicUsageSection } from './upload/sections/BasicUsageSection'
import { SizesSection } from './upload/sections/SizesSection'
import { DragDropSection } from './upload/sections/DragDropSection'
import { ValidationSection } from './upload/sections/ValidationSection'
import { ProgressSection } from './upload/sections/ProgressSection'
import { MultipleFilesSection } from './upload/sections/MultipleFilesSection'
import { PropsDocumentationSection } from './upload/sections/PropsDocumentationSection'

interface PageProps {
  path?: string
}

export function UploadPage(_props: PageProps) {
  return (
    <div className="max-w-6xl mx-auto p-6 space-y-12">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Upload</h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl">
          A comprehensive file upload component supporting drag and drop, multiple files, progress tracking, 
          validation, and customizable upload behavior for seamless file handling in web applications.
        </p>
      </div>

      <div className="space-y-16">
        <section id="basic-usage">
          <BasicUsageSection />
        </section>

        <section id="sizes">
          <SizesSection />
        </section>

        <section id="drag-drop">
          <DragDropSection />
        </section>

        <section id="validation">
          <ValidationSection />
        </section>

        <section id="progress">
          <ProgressSection />
        </section>

        <section id="multiple-files">
          <MultipleFilesSection />
        </section>

        <section id="props">
          <PropsDocumentationSection />
        </section>
      </div>
    </div>
  )
}
