import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Briefcase, GraduationCap, Calendar } from "lucide-react";

const ExperienceSection = () => {
  const workExperience = [
    {
      title: "Technical Support",
      company: "K Computer srl",
      period: "Feb 2023 - Dec 2024",
      description: "Provided technical support for hardware and software issues, including troubleshooting, diagnostics, and system maintenance. Assisted with networking installations and resolved connectivity problems to ensure smooth operations for clients.",
      technologies: ["Problem Solving", "Computer's hardware", "Networking", "Maintenence", "ERP Softwares"]
    }
  ];

  const education = [
    {
      institution: "University of Bari",
      degree: "Bachelor Degree in Computer Science",
      period: "2023 - 2026 (Expected)",
      relevantCourseworks: ["Data Structures", "Data Algorithms", "Software Engineering", "Database Systems", "Networking"] 
    },
    {
      institution: "I.I.S. G.B. Pentasuglia",
      degree: "High School Diploma",
      period: "2018 - 2023",
      relevantCourseworks: ["Foundation in programming", "mathematics", "computer systems"]
    }
  ];

  return (
    <section id="experience" className="min-h-screen py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            <span className="gradient-text-gold">Experience</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            My professional journey and educational background
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Work Experience */}
          <div className="space-y-8 animate-slide-up">
            <div className="flex items-center gap-3 mb-8">
              <Briefcase className="text-primary" size={24} />
              <h3 className="text-2xl font-semibold text-gold">Work Experience</h3>
            </div>
            
            <div className="space-y-6">
              {workExperience.map((job, index) => (
                <Card key={index} className="hover-lift border-border/50 hover:border-primary/30 transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-gold">{job.title}</CardTitle>
                        <CardDescription className="text-lg font-medium text-secondary">
                          {job.company}
                        </CardDescription>
                      </div>
                      <div className="flex items-center gap-1 text-muted-foreground text-sm">
                        <Calendar size={14} />
                        {job.period}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">{job.description}</p>
                    <h4 className="text-sm font-medium text-foreground">Key Skills:</h4>
                    <div className="flex flex-wrap gap-2 justify-center">
                      {job.technologies.map((tech) => (
                        <Badge key={tech} variant="secondary" className="bg-muted/30 text-muted-foreground hover:bg-primary/10 hover:text-primary transition-colors text-xs">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Education */}
          <div className="space-y-8 animate-slide-up" style={{ animationDelay: "0.2s" }}>
            <div className="flex items-center gap-3 mb-8">
              <GraduationCap className="text-primary" size={24} />
              <h3 className="text-2xl font-semibold text-gold">Education</h3>
            </div>
            
            <div className="space-y-6">
              {education.map((edu, index) => (
                <Card key={index} className="hover-lift border-border/50 hover:border-primary/30 transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-gold">{edu.degree}</CardTitle>
                        <CardDescription className="text-lg font-medium text-secondary">
                          {edu.institution}
                        </CardDescription>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-1 text-muted-foreground text-sm mb-1">
                          <Calendar size={14} />
                          {edu.period}
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium text-foreground">Most relevant courseworks:</h4>
                      <div className="flex justify-center flex-wrap gap-2">
                        {edu.relevantCourseworks.map( coursework =>
                          <Badge 
                          key={coursework} 
                          variant="secondary" 
                          className="bg-muted/30 text-muted-foreground hover:bg-primary/10 hover:text-primary transition-colors text-xs"
                          >
                            {coursework}
                            </Badge>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;