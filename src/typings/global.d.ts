declare module '*.less' {
  const content: { [className: string]: string };
  export = content;
}

declare module '*.png' {
  const content: any
  export default content
}

declare module '*.svg' {
  const content: any
  export default content
}

declare var require: any
declare var process: {
  env: {
    NODE_ENV: String
  }
}
