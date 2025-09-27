// components/LeetCodeStats.tsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { stats_mock, profile_mock, languages_mock, countryCodes, calendar_mock, lastAcceptedProblems_mock } from "@/components/leetcode/utils";
import LeetCodeDropdown from '../leetcode/leetcodedropdown';

interface LeetCodeStatsProps {
  username?: string;
}

const LeetCodeSection: React.FC<LeetCodeStatsProps> = ({ username = 'Mickh_' }) => {
  // Data fetched from API
  const [profileStats, setProfileStats] = useState<any>(null)
  const [stats, setStats] = useState<any>(null);
  const [languageStats, setLanguageStats] = useState<any>(null);
  const [lastAcceptedProblems, setLastAcceptedProblems] = useState<any>(null);
  const [calendar, setCalendar] = useState<any>(null);

  // Fetching status & error
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => { 
    const fetchLeetCodeStats = async () => {
      try {
        setLoading(true); 
        const APIURL = `https://alfa-leetcode-api.onrender.com`
        
         const [
          profileRes,
          statsRes,
          languageRes,
          lastAcceptedRes,
          calendarRes,
        ] = await Promise.all([
          axios.get(`${APIURL}/${username}`),
          axios.get(`${APIURL}/userProfile/${username}`),
          axios.get(`${APIURL}/languageStats?username=${username}`),
          axios.get(`${APIURL}/${username}/acSubmission?limit=3`),
          axios.get(`${APIURL}/${username}/calendar`),
        ]);

        setProfileStats(profileRes.data);
        setStats(statsRes.data);
        setLanguageStats(languageRes.data);
        setLastAcceptedProblems(lastAcceptedRes.data);
        setCalendar(calendarRes.data);
        
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
        setProfileStats(profile_mock)
        setStats(stats_mock)
        setLanguageStats(languages_mock)
        setLastAcceptedProblems(lastAcceptedProblems_mock)
        setCalendar(calendar_mock)
      } finally {
        setLoading(false);
      }
    };

    fetchLeetCodeStats()

  }, [username]);

  if (loading) return <div className="text-center py-12 text-muted-foreground">Loading LeetCode stats...</div>;
  return (
    <section id="leetcode" className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              <span className="gradient-text-gold">LeetCode Statistics</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Always trying to improve my problem solving skills.
            </p>
          </div>

        <LeetCodeDropdown
          username={username}
          profileStats={profileStats}
          stats={stats}
          languageStats={languageStats}
          countryCodes={countryCodes}
          lastAccepted={lastAcceptedProblems}
          calendar={calendar}
        />
      </div>
    </section>
  );
};

export default LeetCodeSection;