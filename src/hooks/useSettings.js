import { useEffect, useState } from "react";
import { getSettings, updateSettings } from "../api/settings";

export default function useSettings() {
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  async function fetchSettings() {
    try {
      setLoading(true);

      const { data } = await getSettings();

      setSettings(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function saveSettings(values) {
    const { data } = await updateSettings(values);

    setSettings(data);

    return data;
  }

  useEffect(() => {
    fetchSettings();
  }, []);

  return {
    settings,
    loading,
    error,
    refresh: fetchSettings,
    saveSettings,
  };
}
