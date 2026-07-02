export function formatPeriod(start: string, end: string | null): string {
  const startDate = new Date(start);
  const startStr = startDate.toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });
  if (!end) return `${startStr} – Present`;
  const endDate = new Date(end);
  const endStr = endDate.toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });
  return `${startStr} – ${endStr}`;
}

export function formatShortPeriod(start: string, end: string | null): string {
  const startYear = new Date(start).getFullYear();
  if (!end) return `${startYear} – Present`;
  const endYear = new Date(end).getFullYear();
  return `${startYear} – ${endYear}`;
}
