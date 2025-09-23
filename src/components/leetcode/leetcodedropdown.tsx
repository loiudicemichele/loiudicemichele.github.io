// components/LeetCodeDropdown.tsx
import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import DoubleDonut from "@/components/ui/donutchart";
import { Progress } from "@/components/ui/progress";
import ReactCountryFlag from "react-country-flag";
import { ChevronDown, ChevronUp, Calendar, ExternalLink} from "lucide-react";
import { cn } from "@/lib/utils";
import { languageIcons, formatDate, getStatusBadge } from "@/components/leetcode/utils";
import AvatarWithText from '@/components/ui/avatar-text';

interface LeetCodeDropdownProps {
  username?: string;
  profileStats: any;
  stats: any;
  languageStats: any;
  countryCodes: { [key: string]: string };
  lastAccepted: any;
}

const LeetCodeDropdown: React.FC<LeetCodeDropdownProps> = ({
  username = 'Mickh_',
  profileStats,
  stats,
  languageStats,
  countryCodes,
  lastAccepted
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState('0px');

  // Profile general info and statistics
  const profile = {
    username: profileStats.username,
    avatarLink: profileStats.avatar,
    reputation: profileStats.reputation,
    ranking: profileStats.ranking,
    country: profileStats.country || 'Not Found'
  }

  // Problem solved for each mode
  const problems = {
    easyProblems: [stats.easySolved || 51, stats.totalEasy || 1000],
    mediumProblems: [stats.mediumSolved || 5, stats.totalMedium || 2000],
    hardProblems: [stats.hardSolved || 0, stats.totalHard || 691]
  }

  // Other user statistics
  const userStats = { 
    totalSolved: stats.totalSolved || 56,
    acceptanceRate: 
        stats.matchedUser?.acSubmissionNum?.count / stats.matchedUser?.acSubmissionNum?.totalSubmissionNum?.count * 100 || 58.6, 
    problemsSolved: problems,
    languages: {}
  }

  // Mapping each language to the count of problems solved
  languageStats.matchedUser?.languageProblemCount?.forEach((data: any) => {
    userStats.languages[data.languageName] = data.problemsSolved;
  });

  // Problem solved percentage
  const solvedPercentage = ((userStats.totalSolved / 3691) * 100).toFixed(1);

  // Calculating the height of the dropdown leetcode content
  useEffect(() => {
    if (contentRef.current) {
      if (isOpen) {
        const height = contentRef.current.scrollHeight + 32;
        setContentHeight(`${height}px`);
      } else {
        setContentHeight('0px');
      }
    }
  }, [isOpen]);

  return (
    <div className="max-w-4xl mx-auto">
      <Card className={cn( 
        "bg-card border-border/50 backdrop-blur-sm transition-all duration-300",
        isOpen ? "rounded-2xl" : "rounded-2x1"
      )}>
        {/* Dropdown Trigger */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            "w-full p-4 flex items-center justify-between transition-all duration-300",
            isOpen ? "pb-2 border-b border-border/30" : "p-6"
          )}
        >
          <AvatarWithText
            src={profile.avatarLink}
            alt={profile.username}
            name={profile.username}
            description={`View my profile`}
            profileUrl="https://leetcode.com/u/Mickh_"
            size="xl"
          />
          
          <div className="flex items-center gap-2">
            <span className="text-sm text-primary">
              {isOpen ? 'Hide stats' : 'Show stats'}
            </span>
            {isOpen ? (
              <ChevronUp className="w-4 h-4 text-primary" />
            ) : (
              <ChevronDown className="w-4 h-4 text-primary" />
            )}
          </div>
        </button>

        {/* Dropdown Content */}
        <div 
          className={cn(
          "transition-all duration-300 overflow-hidden",
            isOpen ? "opacity-100" : "opacity-0"
          )}
          style={{ maxHeight: isOpen ? contentHeight : '0px' }}
        >
          <CardContent ref={contentRef} className="p-8 pt-4">
            {/* Solved Problems Summary */}
            <div className="border-b border-border/30 pb-6 mb-6">
              <div className="text-center mb-6 pb-6 ">
                <h3 className="text-2xl font-semibold text-primary mb-8">Solved Problems</h3>
                <div className="flex items-center justify-center gap-12">
                  <div className="text-4xl font-bold gradient-text-gold">
                    {userStats.totalSolved}
                  </div>
                  <DoubleDonut
                    solvedPercentage={parseFloat(solvedPercentage)}
                    acceptanceRate = {userStats.acceptanceRate}
                    size="xl"
                    />
                </div>
              </div>

              {/* Difficulty Breakdown */}
              <div className="flex flex-col gap-8 md:flex-row md:gap-12">
                {[
                  { label: 'Easy', solved: problems.easyProblems[0], total: problems.easyProblems[1], value: (problems.easyProblems[0] / problems.easyProblems[1]) * 100, color: 'text-green-400' },
                  { label: 'Medium', solved: problems.mediumProblems[0], total: problems.mediumProblems[1], value: (problems.mediumProblems[0] / problems.mediumProblems[1]) * 100, color: 'text-yellow-400' },
                  { label: 'Hard', solved: problems.hardProblems[0], total: problems.hardProblems[1], value: (problems.hardProblems[0] / problems.hardProblems[1]) * 100, color: 'text-red-400' }
                ].map((item, index) => (
                  <div key={item.label} className="flex-1 flex flex-col items-center gap-2">
                    <div className="flex flex-row items-center gap-4">
                      <div className="text-xl text-muted-foreground">{item.label}</div>
                      <div className={`text-lg font-semibold ${item.color}`}>
                        {item.solved}
                      </div>
                    </div>
                    
                    <div className="flex w-full items-center gap-2">
                      <Progress value={item.value} className="flex-1 h-2 bg-border/50" />
                      <span className="text-xs text-muted-foreground w-12 text-right">{item.value.toFixed(1)}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Detailed Stats */}
            <div className="grid md:grid-cols-2 gap-8 border-b border-border/30">
              {/* Left Column - Stats */}
              <div>
                <h3 className="text-xl font-semibold text-primary mb-4">Stats</h3>
                <div className="space-y-3">
                  {[
                    { label: 'Ranking', value: profile.ranking.toLocaleString() },
                    { label: 'Reputation', value: profile.reputation },
                  ].map((stat, index) => (
                    <div key={stat.label} className="flex justify-between items-center py-2 border-b border-border/20">
                      <span className="text-muted-foreground text-sm">{stat.label}</span>
                      <span className="text-primary font-medium">{stat.value}</span>
                    </div>
                  ))}
                  <div className="flex justify-between items-center py-2 border-b border-border/20">
                    <span className="text-muted-foreground text-sm">Country</span>
                    <span className="text-primary font-medium flex items-center gap-2">
                      <ReactCountryFlag countryCode={countryCodes[profile.country]} svg />
                      {profile.country}
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-primary mb-4">Languages Solved</h3>
                <div className="space-y-3">
                    {Object.entries(userStats.languages).map(([lang, count], index) => {
                    const IconComponent = languageIcons[lang] || languageIcons["Unknown"];
                    return (
                        <div key={lang} className="flex justify-between items-center py-2 border-b border-border/20">
                        <div className="flex items-center gap-2">
                            <IconComponent className="w-4 h-4 text-gold hover-lift:hover flex-shrink-0" />
                            <span className="text-muted-foreground text-sm">{lang}</span>
                        </div>
                        <span className="text-primary font-medium">{String(count)}</span>
                        </div>
                    );
                    })}
                </div>
              </div> 
            </div>

            {/* Last aaccepted problems */}
            <div className="mt-8">
              <h3 className="text-xl font-semibold text-primary mb-8">Last Submitted Problems</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {lastAccepted.submission.map((submission, index) => {
                  const lang = submission.lang.capitalize();
                  const IconComponent = languageIcons[lang] || languageIcons["Unknown"];
                  const statusBadge = getStatusBadge(submission.statusDisplay);

                  return (
                    <a
                      key={submission.titleSlug} 
                      href={`https://leetcode.com/problems/${submission.titleSlug}/`}
                      target="_blank"
                      rel="noopener noreferrer">
                      <Card
                        className="hover-lift border-border/50 hover:border-primary/30 transition-all duration-300 animate-slide-up group"
                        style={{ animationDelay: `${index * 0.1}s` }}
                      > 
                        <CardHeader>
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center gap-1 text-muted-foreground text-sm">
                              <Calendar size={14} />
                              {formatDate(submission.timestamp)}
                            </div>
                          </div>
                          
                          <CardTitle className="text-gold group-hover:text-primary transition-colors">
                            <div className="flex items-center justify-center gap-1 glow_gold text-primary transition-colors group hover:underline text-xl">
                              {submission.title}
                              <ExternalLink className={cn('opacity-80 group-hover:opacity-100 transition-opacity', "w-5 h-8")} />
                            </div>
                          </CardTitle>
                        </CardHeader> 
                        
                        <CardContent>
                          <div className="space-y-4">

                            <div className="flex justify-center">
                              {statusBadge}
                            </div>

                            <div className="flex items-center justify-center gap-2">
                                <IconComponent className="w-4 h-4 text-gold hover-lift:hover flex-shrink-0" />
                                <p className="text-muted-foreground text-sm font-medium text-sm capitalize">{lang}</p>
                            </div>

                          </div>
                        </CardContent>
                      </Card>
                    </a>
                  );
                })}
              </div>
            </div>

          </CardContent>
        </div>
      </Card>
    </div>
  );
};

export default LeetCodeDropdown;