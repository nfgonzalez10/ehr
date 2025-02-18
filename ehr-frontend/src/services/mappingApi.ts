const API_URL = import.meta.env.VITE_API_URL;

export const getMappingVariables = async (
  hospitalId: string | undefined,
  token: string | null
) => {
  const response = await fetch(`${API_URL}/tenants/${hospitalId}/mappings`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    throw new Error("Failed to fetch mapping variables");
  }
  return response.json();
};

export const createMappingVariable = async (
  hospitalId: string | undefined,
  token: string | null,
  variable: { [key: string]: string }
) => {
  const response = await fetch(`${API_URL}/tenants/${hospitalId}/mappings`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(variable),
  });
  if (!response.ok) {
    throw new Error("Failed to create mapping variable");
  }
  return response.json();
};

export const deleteMappingVariable = async (
  hospitalId: string,
  token: string,
  variableId: string
) => {
  const response = await fetch(
    `${API_URL}/${variableId}/tenants/${hospitalId}/mappings`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  if (!response.ok) {
    throw new Error("Failed to delete mapping variable");
  }
  return response.json();
};
