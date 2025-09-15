'use client';

import { useState, useEffect } from 'react';

interface LiveData {
  projects: any[];
  recentActivity: any[];
  lastUpdated: string;
}

interface LinkedInData {
  name: string;
  headline: string;
  location: string;
  recentPosts: string[];
  lastUpdated: string;
}

export function useLiveData() {
  const [githubData, setGithubData] = useState<LiveData | null>(null);
  const [linkedinData, setLinkedinData] = useState<LinkedInData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLiveData = async () => {
      try {
        setLoading(true);
        
        // Fetch GitHub data
        const githubResponse = await fetch('/api/github?username=JaiBhatia19');
        if (githubResponse.ok) {
          const githubData = await githubResponse.json();
          setGithubData(githubData);
        }

        // Fetch LinkedIn data
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

    // Refresh data every 12 hours (twice a day)
    // To change frequency: 
    // - Once daily: 24 * 60 * 60 * 1000
    // - Twice daily: 12 * 60 * 60 * 1000 (current)
    // - Every 6 hours: 6 * 60 * 60 * 1000
    const interval = setInterval(fetchLiveData, 12 * 60 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, []);

  return {
    githubData,
    linkedinData,
    loading,
    error,
    refreshData: async () => {
      try {
        const response = await fetch('/api/refresh-data', { method: 'POST' });
        if (response.ok) {
          // Refetch live data after refresh
          const githubResponse = await fetch('/api/github?username=JaiBhatia19');
          const linkedinResponse = await fetch('/api/linkedin?url=https://www.linkedin.com/in/jaibhatia19/');
          
          if (githubResponse.ok) {
            const githubData = await githubResponse.json();
            setGithubData(githubData);
          }
          
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
