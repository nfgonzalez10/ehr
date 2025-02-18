const API_URL = import.meta.env.VITE_API_URL;

export const testApi = async (
  token: string | null,
  tenant: string,
  data: { [key: string]: string }
) => {
  const response = await fetch(`${API_URL}/ehrs/tenants/${tenant}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ data }),
  });
  if (!response.ok) throw new Error("Failed to fetch tenants");
  return await response.json();
};
