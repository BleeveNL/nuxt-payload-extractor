import path from 'path'

export const getFsFileName = ({
  root,
  route,
  extension,
  timestamp = '',
  subFolders,
}) => {
  // Index route
  if (route === '/') return path.join(root, `payload${timestamp}.${extension}`);
  // Not using subfolders
  if (subFolders === false || subFolders === 'false')
    return `${path.join(root, ...route.split('/'))}${timestamp}.${extension}`;
  // Using subfolders
  return path.join(
    root,
    ...route.split('/'),
    `payload${timestamp}.${extension}`
  );
};

export const getUrlFileName = ({
  base,
  route,
  extension,
  timestamp = '',
  subFolders,
}) => {
  base = base.startsWith('/') ? base : `/${base}`;
  // Index route
  if (route === '/') return `${base}/payload${timestamp}.${extension}`;
  // Not using subfolders
  if (subFolders === false || subFolders === 'false') return `${base}${route}${timestamp}.${extension}`;
  // Using subfolders
  return `${base}${route}/payload${timestamp}.${extension}`;
};

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Errors/Cyclic_object_value
export const getCircularReplacer = () => {
  const seen = new WeakSet();
  return (key, value) => {
    if (typeof value === "object" && value !== null) {
      if (seen.has(value)) {
        return;
      }
      seen.add(value);
    }
    return value;
  };
};