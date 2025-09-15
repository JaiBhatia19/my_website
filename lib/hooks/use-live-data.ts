'use client';

import { useState, useEffect } from 'react';

interface LinkedInData {
  name: string;
  headline: string;
  location: string;
  recentPosts: string[];
  lastUpdated: string;
}

export function useLiveData() {
  const [linkedinData, setLinkedinData] = useState<LinkedInData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLiveData = async () => {
      try {
        setLoading(true);
        
        // Fetch LinkedIn data only
        const linkedinResponse = await fetch('/api/linkedin?url=https://www.linkedin.com/in/jaibhatia19/');
        if (linkedinResponse.ok) {
          const linkedinData = await linkedinResponse.json();
          setLinkedinData(linkedinData);
        }

        setError(null);
      } catch (err) {
        console.error('Error fetching live data:', err);
        setError('Failed to fetch live data');
      } finally {
        setLoading(false);
      }
    };

    fetchLiveData();

    // Refresh data once daily (24 hours)
    const interval = setInterval(fetchLiveData, 24 * 60 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, []);

  return {
    linkedinData,
    loading,
    error,
    refreshData: async () => {
      try {
        const response = await fetch('/api/refresh-data', { method: 'POST' });
        if (response.ok) {
          // Refetch LinkedIn data after refresh
          const linkedinResponse = await fetch('/api/linkedin?url=https://www.linkedin.com/in/jaibhatia19/');
          
          if (linkedinResponse.ok) {
            const linkedinData = await linkedinResponse.json();
            setLinkedinData(linkedinData);
          }
        }
      } catch (err) {
        console.error('Error refreshing data:', err);
      }
    }
  };
}
