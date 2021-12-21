export function cleanObject(obj: Record<string, any>) {
  return Object.fromEntries(
    Object.entries(obj).filter(
      ([_, v]) => v !== null && v !== undefined && v !== ''
    )
  );
}

export function getBaseUrl() {
  return process.env.NEXT_PUBLIC_VERCEL_URL
    ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
    : 'http://localhost:3000';
}
