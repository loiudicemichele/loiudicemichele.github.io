export interface LeetCodeStats {
  data: {
    problemsSolvedBeatsStats: Array<{
      difficulty: string;
      percentage: number;
    }>;
    submitStatsGlobal: {
      acSubmissionNum: Array<{
        difficulty: string;
        count: number;
      }>;
    };
  };
}

export interface UserStats {
  totalSolved: number;
  acceptanceRate: number;
  ranking: number;
  reputation: number;
  country: string;
  advanced: number;
  intermediate: number;
  fundamental: number;
  languages: { [key: string]: number };
}