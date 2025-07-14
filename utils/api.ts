const BASE_URL = 'https://6873e6cac75558e2735597fd.mockapi.io/properties';

export async function getProperties() {
  const res = await fetch(BASE_URL);
  return res.json();
}
