import { useState, useEffect } from "react";
import { api } from "@/lib/api";

export function useDriverStats(driverId: string, defaultWins: string, defaultTitles: string) {
  const [wins, setWins] = useState<string>("-");
  const [titles, setTitles] = useState<string>("-");

  useEffect(() => {
    let isMounted = true;

    async function fetchStats() {
      try {
        const winsRes = await api.get(`drivers/${driverId}/results/1.json?limit=1`);
        if (isMounted) {
          setWins(winsRes.data.MRData.total);
          setTitles(defaultTitles);
        }
      } catch (e) {
        if (isMounted) {
          setWins(defaultWins);
          setTitles(defaultTitles);
        }
      }
    }

    fetchStats();
    return () => { isMounted = false; };
  }, [driverId, defaultWins, defaultTitles]);

  return { wins, titles };
}