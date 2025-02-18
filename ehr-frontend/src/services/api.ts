import { FormikValues } from "formik";

const API_URL = import.meta.env.VITE_API_URL;

export const loginUser = async (email: string): Promise<string> => {
  try {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: email,
      }),
    });

    if (!response.ok) {
      throw new Error("Login failed");
    }

    const data = await response.json();

    return data.access_token;
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};

export const loadEhrConfigurations = async (token: string | null) => {
  try {
    const response = await fetch(`${API_URL}/key-reference/bulk`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to load EHR configurations");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error loading EHR configurations:", error);
    throw error;
  }
};

export const postEhrConfiguration = async (
  token: string | null,
  key: FormikValues
) => {
  console.log("postEhrConfiguration", key);
  try {
    const response = await fetch(`${API_URL}/key-reference`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(key),
    });

    if (!response.ok) {
      throw new Error("Failed to post EHR configuration");
    }
  } catch (error) {
    console.error("Error posting EHR configuration:", error);
    throw error;
  }
};

export const getEhrConfiguration = async (token: string | null) => {
  try {
    const response = await fetch(`${API_URL}/key-reference`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to get EHR configuration");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error getting EHR configuration:", error);
    throw error;
  }
};

export const deleteEhrConfiguration = async (
  token: string | null,
  id: string
) => {
  try {
    const response = await fetch(`${API_URL}/key-reference/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to delete EHR configuration");
    }
  } catch (error) {
    console.error("Error deleting EHR configuration:", error);
    throw error;
  }
};
