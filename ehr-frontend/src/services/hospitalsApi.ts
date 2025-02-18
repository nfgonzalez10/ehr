import { IHospital } from "../interfaces";

const API_URL = import.meta.env.VITE_API_URL;

// Function to fetch all tenants
export const getAllTenants = async (
  token: string | null
): Promise<IHospital[]> => {
  const response = await fetch(`${API_URL}/tenants`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) throw new Error("Failed to fetch tenants");
  return await response.json();
};

// Function to fetch a single tenant by ID
export const getTenantById = async (
  id: string,
  token: string
): Promise<IHospital> => {
  const response = await fetch(`${API_URL}/tenants/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) throw new Error("Failed to fetch tenant");
  return await response.json();
};

// Function to create a new tenant
export const createTenant = async (
  tenantData: IHospital,
  token: string | null
): Promise<IHospital> => {
  const response = await fetch(`${API_URL}/tenants`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(tenantData),
  });
  if (!response.ok) throw new Error("Failed to create tenant");
  return await response.json();
};

// Function to update an existing tenant
export const updateTenant = async (
  id: string,
  tenantData: IHospital,
  token: string
): Promise<IHospital> => {
  const response = await fetch(`${API_URL}/tenants/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(tenantData),
  });
  if (!response.ok) throw new Error("Failed to update tenant");
  return await response.json();
};

// Function to delete a tenant
export const deleteTenant = async (
  id: string,
  token: string
): Promise<void> => {
  const response = await fetch(`${API_URL}/tenants/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) throw new Error("Failed to delete tenant");
};
