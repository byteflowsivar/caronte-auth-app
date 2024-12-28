export default async function fetchData<T>(url: string, seftService: boolean = true): Promise<T> {
  let endpoint: string = '';

  if (seftService) {
    endpoint = process.env.API_URL + url;
  } else {
    endpoint = url;
  }
  const response = await fetch(endpoint);
  if (!response.ok) {
    throw new Error(`Network response was not ok: ${response.statusText}`);
  }
  return (await response.json()) as T;
}
