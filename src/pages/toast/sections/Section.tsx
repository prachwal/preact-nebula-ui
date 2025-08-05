export const Section = ({ title, description, children }: { title: string, description: string, children: any }) => (
  <section className="mb-12">
    <div className="mb-6">
      <h2 className="text-2xl font-bold mb-2">{title}</h2>
      <p className="text-gray-600 dark:text-gray-400">{description}</p>
    </div>
    {children}
  </section>
)
