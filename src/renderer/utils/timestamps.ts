export function makeCurrentDate(): string {
  return new Date().toISOString().split('T')[0];
}
