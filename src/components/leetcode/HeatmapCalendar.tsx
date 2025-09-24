// components/leetcode/HeatmapCalendar.tsx
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface HeatmapCalendarProps {
  submissionCalendar: string;
  className?: string;
}

interface CalendarDay {
  date: Date;
  count: number;
  timestamp: number;
}

interface MonthData {
  name: string;
  year: number;
  days: CalendarDay[];
}

export const HeatmapCalendar: React.FC<HeatmapCalendarProps> = ({ 
  submissionCalendar, 
  className 
}) => {
  const parseSubmissionCalendar = (): CalendarDay[] => {
    try {
      const data = JSON.parse(submissionCalendar);
      const days: CalendarDay[] = [];
      
      for (const [timestamp, count] of Object.entries(data)) {
        days.push({
          date: new Date(parseInt(timestamp) * 1000),
          count: count as number,
          timestamp: parseInt(timestamp)
        });
      }
      
      return days.sort((a, b) => a.timestamp - b.timestamp);
    } catch (error) {
      console.error('Error parsing submission calendar:', error);
      return [];
    }
  };

  // Generate last 12 months data
  const generateMonthsData = (): MonthData[] => {
    const today = new Date();
    const months: MonthData[] = [];
    const submissionDays = parseSubmissionCalendar();
    const submissionMap = new Map(submissionDays.map(day => 
      [day.date.toDateString(), day]
    ));

    for (let i = 11; i >= 0; i--) {
      const monthDate = new Date(today);
      monthDate.setMonth(today.getMonth() - i);
      
      const year = monthDate.getFullYear();
      const month = monthDate.getMonth();
      const monthName = monthDate.toLocaleString('en', { month: 'long' });
      
      // Get first and last day of the month
      const firstDay = new Date(year, month, 1);
      const lastDay = new Date(year, month + 1, 0);
      
      const daysInMonth: CalendarDay[] = [];
      const currentDate = new Date(firstDay);
      
      // Generate all days of the month
      while (currentDate <= lastDay) {
        const dateStr = currentDate.toDateString();
        const existingDay = submissionMap.get(dateStr);
        
        daysInMonth.push({
          date: new Date(currentDate),
          count: existingDay ? existingDay.count : 0,
          timestamp: Math.floor(currentDate.getTime() / 1000)
        });
        
        currentDate.setDate(currentDate.getDate() + 1);
      }
      
      months.push({
        name: monthName,
        year: year,
        days: daysInMonth
      });
    }
    
    return months.reverse();
  };

  const getColorIntensity = (count: number): string => {
    if (count === 0) return 'bg-gray-100 dark:bg-gray-800';
    if (count <= 2) return 'bg-green-300';
    if (count <= 5) return 'bg-green-500';
    if (count <= 8) return 'bg-green-700';
    return 'bg-green-900';
  };

  // Group days by weeks for a month
  const groupDaysByWeeks = (days: CalendarDay[]) => {
    const weeks: CalendarDay[][] = [];
    let currentWeek: CalendarDay[] = [];
    
    // Add empty days for the first week if needed
    const firstDayOfWeek = days[0]?.date.getDay() || 0; // 0 = Sunday, 1 = Monday, etc.
    for (let i = 0; i < firstDayOfWeek; i++) {
      currentWeek.push({
        date: new Date(0),
        count: 0,
        timestamp: 0
      });
    }
    
    days.forEach((day) => {
      if (currentWeek.length === 7) {
        weeks.push([...currentWeek]);
        currentWeek = [];
      }
      currentWeek.push(day);
    });
    
    // Add remaining empty days to complete the last week
    while (currentWeek.length < 7 && currentWeek.length > 0) {
      currentWeek.push({
        date: new Date(0),
        count: 0,
        timestamp: 0
      });
    }
    
    if (currentWeek.length > 0) {
      weeks.push(currentWeek);
    }
    
    return weeks;
  };

  const monthsData = generateMonthsData();
  const allDays = monthsData.flatMap(month => month.days);

  if (allDays.length === 0) {
    return (
      <Card className={cn("border-border/50", className)}>
        <CardContent className="p-6">
          <div className="text-center text-muted-foreground">
            No activity data available
          </div>
        </CardContent>
      </Card>
    );
  }

  const totalSubmissions = allDays.reduce((total, day) => total + day.count, 0);
  const activeDays = allDays.filter(day => day.count > 0).length;
  const averagePerDay = activeDays > 0 ? Math.round(totalSubmissions / activeDays) : 0;

  return (
    <Card className={cn("border-border/50 w-full mx-auto", className)}>
      <CardHeader className="pb-4">
        <CardTitle className="text-xl font-semibold text-primary text-center">
          Activity Heatmap
        </CardTitle>
      </CardHeader>
      <CardContent className="px-4 sm:px-6">
        <div className="space-y-8">
          
          {/* Months Grid */}
          <div className="flex overflow-x-auto pb-4">
            <div className="flex gap-6 min-w-max">
              {monthsData.map((month, monthIndex) => {
                const weeks = groupDaysByWeeks(month.days);
                const monthSubmissions = month.days.reduce((sum, day) => sum + day.count, 0);
                
                return (
                  <div key={`${month.name}-${month.year}-${monthIndex}`} className="px-2">
                    {/* Month Header */}
                    <div className="grid justify-between items-center mb-3">
                      <h3 className="font-semibold text-primary">
                        {month.name} {month.year}
                      </h3>
                      <p className="text-xs text-muted-foreground bg-background/50 px-2 py-1 rounded">
                        {monthSubmissions} submission{monthSubmissions !== 1 ? 's' : ''}
                      </p>
                    </div>
                    
                    {/* Days of Week Labels */}
                    <div className="flex gap-1 mb-2 justify-center">
                      {['SU', 'M', 'TU', 'W', 'TH', 'F', 'SA'].map((day, index) => (
                        <div key={`${month.name}-${month.year}|${day}`} className="w-4 h-4 flex items-center justify-center">
                          <span className="text-[10px] text-muted-foreground opacity-70">
                            {day}
                          </span>
                        </div>
                      ))}
                    </div>
                    
                    {/* Month Heatmap */}
                    <div className="flex flex-col gap-1">
                      {weeks.map((week, weekIndex) => (
                        <div key={weekIndex} className="flex gap-1 justify-center">
                          {week.map((day, dayIndex) => (
                            <div
                              key={`${weekIndex}-${dayIndex}`}
                              className={cn(
                                "w-4 h-4 rounded-sm border border-border/20",
                                day.timestamp > 0 ? getColorIntensity(day.count) : 'bg-transparent',
                                "hover:scale-110 transition-transform cursor-help"
                              )}
                              title={day.timestamp > 0 ? 
                                `${day.date.toLocaleDateString()}: ${day.count} submission${day.count !== 1 ? 's' : ''}` : 
                                'No activity'
                              }
                            />
                          ))}
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Legend & Stats */}
          <div className="flex flex-col items-center gap-6 pt-4 border-t border-border/30">
            
            {/* Legend */}
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground">Less</span>
              <div className="flex gap-1">
                <div className="w-4 h-4 rounded-sm bg-gray-100 dark:bg-gray-800 border border-border/20 flex items-center justify-center">
                  <span className="text-[10px] text-muted-foreground">0</span>
                </div>
                <div className="w-4 h-4 rounded-sm bg-green-300 border border-border/20" />
                <div className="w-4 h-4 rounded-sm bg-green-500 border border-border/20" />
                <div className="w-4 h-4 rounded-sm bg-green-700 border border-border/20" />
                <div className="w-4 h-4 rounded-sm bg-green-900 border border-border/20 flex items-center justify-center">
                  <span className="text-[10px] text-white">9+</span>
                </div>
              </div>
              <span className="text-sm text-muted-foreground">More</span>
            </div>
            
            {/* Stats Summary */}
            <div className="grid grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-xl font-bold text-primary">{activeDays}</div>
                <div className="text-sm text-muted-foreground">Active days</div>
              </div>
              <div>
                <div className="text-xl font-bold text-primary">{totalSubmissions}</div>
                <div className="text-sm text-muted-foreground">Total submissions</div>
              </div>
              <div>
                <div className="text-xl font-bold text-primary">{averagePerDay}</div>
                <div className="text-sm text-muted-foreground">Avg per active day</div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};