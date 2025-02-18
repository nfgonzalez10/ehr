import { useState } from "react";
import { IConfigItem } from "../interfaces";
import { getEhrConfiguration } from "../services/api";
import { useAuth } from "../context/authContext";

export const useEhRConfig = () => {
  const { token } = useAuth();
  const [configs, setConfigs] = useState<IConfigItem[]>([]);

  async function getEhrConfig() {
    const response = await getEhrConfiguration(token);
    setConfigs(response);
  }
  return { configs, getEhrConfig };
};
