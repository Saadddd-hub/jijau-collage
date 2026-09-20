// CSV Formula Injection Defense Sanitizer

/**
 * Sanitizes a single cell value to prevent CSV Formula Injection attacks.
 * If a cell begins with '=', '+', '-', '@', '\t', or '\r', it is prefixed with a single quote (').
 * Double quotes within the value are escaped as `""` and the entire value is wrapped in double quotes.
 */
export function sanitizeCsvCell(value: any): string {
  if (value === null || value === undefined) {
    return '""';
  }

  let str = String(value);

  // Check if value starts with formula triggers: =, +, -, @, \t, \r
  const dangerousPrefixes = ["=", "+", "-", "@", "\t", "\r"];
  if (dangerousPrefixes.some(prefix => str.startsWith(prefix))) {
    str = `'${str}`;
  }

  // Escape any existing double quotes
  const escaped = str.replace(/"/g, '""');
  return `"${escaped}"`;
}

/**
 * Converts an array of objects into a sanitized CSV string with headers
 */
export function generateSanitizedCsv<T extends Record<string, any>>(
  data: T[],
  headers: { key: keyof T; label: string }[]
): string {
  // Header row
  const headerLine = headers.map(h => sanitizeCsvCell(h.label)).join(",") + "\n";

  // Data rows
  const dataLines = data.map(row => {
    return headers.map(h => sanitizeCsvCell(row[h.key])).join(",");
  }).join("\n");

  return headerLine + dataLines;
}
