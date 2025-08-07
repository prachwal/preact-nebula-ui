/// <reference types="vite/client" />

declare module '*.css';

declare module '*.scss' {
  const content: Record<string, string>
  export default content
}

declare module '*.sass' {
  const content: Record<string, string>
  export default content
}

declare module '*.less' {
  const content: Record<string, string>
  export default content
}

declare module '*.styl' {
  const content: Record<string, string>
  export default content
}
