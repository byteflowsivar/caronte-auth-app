export default async function fetchData<T>(url: string): Promise<T> {
  const endpoint =
    (typeof window === 'undefined' ? process.env.API_URL : process.env.NEXT_PUBLIC_API_URL) + url;

  console.log('fetchData', endpoint);
  const response = await fetch(endpoint);
  if (!response.ok) {
    throw new Error(`Network response was not ok: ${response.statusText}`);
  }
  return await response.json();
}
