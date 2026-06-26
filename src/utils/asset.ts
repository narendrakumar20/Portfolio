// Resolves a path in the public/ directory against Vite's configured base URL
// so that assets work both locally and when deployed under a subpath
// (e.g. GitHub Pages at /Portfolio/).
export const asset = (path: string): string =>
  `${import.meta.env.BASE_URL}${path.replace(/^\//, "")}`;
