import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Award, Calendar, ExternalLink } from "lucide-react";

const CertificatesSection = () => {
  const certificates = [
    {
      title: "IT Essentials",
      issuer: "Cisco Networking Academy",
      date: "May 2022",
      description: "Covers the fundamentals of computer hardware, software, networking, and security, providing practical skills for entry-level IT support and technical roles.",
      skills: ["Computer Hardware", "Operating Systems", "Networking Basics", "Cybersecurity Fundamentals", "Troubleshooting"],
      badgeColor: "bg-blue-500/10 text-blue-400"
    },
    {
      title: "Linux Essentials",
      issuer: "NDG",
      date: "Nov 2021",
      description: "Introduces the fundamentals of Linux operating systems and open-source concepts through hands-on labs. Covers command-line navigation, file management, basic scripting, user administration, and system security.",
      skills: ["Linux Command Line", "File System Management", "Shell Scripting", "User and Group Administration", "Open Source and Security Basics"],
      badgeColor: "bg-green-500/10 text-green-400"
    },
    {
      title: "Cybersecurity Essentials",
      issuer: "Cisco Networking Academy",
      date: "Mar 2021",
      description: "Provides foundational knowledge of cybersecurity principles, including threat detection, network defense, cryptography, and security best practices.",
      skills: ["Cybersecurity Fundamentals", "Threat Analysis", "Network Defense", "Cryptography Basics", "Security Policies"],
      badgeColor: "bg-red-500/10 text-red-400"
    },
    {
      title: "Introduction to Cybersecurity",
      issuer: "Cisco Networking Academy",
      date: "Nov 2020",
      description: "Explores the world of cybersecurity, covering online threats, cyber attacks, and the importance of protecting personal and organizational data.",
      skills: ["Cybersecurity Fundamentals", "Threat Awareness", "Online Safety", "Security Best Practices", "Cybersecurity Careers Awareness"],
      badgeColor: "bg-purple-500/10 text-purple-400"
    },
    {
      title: "Get Connected",
      issuer: "Cisco Networking Academy",
      date: "Feb 2021",
      description: "Introduces basic digital literacy skills, including how to use computers, connect to the internet, and apply online communication tools safely.",
      skills: ["Digital Literacy", "Internet Basics", "Email and Online Communication", "Cyber Safety", "Basic Computer Skills"],
      badgeColor: "bg-indigo-500/10 text-indigo-400"
    }
  ];

  return (
    <section id="certificates" className="min-h-screen py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            <span className="gradient-text-gold">Certificates</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Certifications and achievements that validate my technical expertise
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {certificates.map((cert, index) => (
            <Card 
              key={index}
              className="hover-lift border-border/50 hover:border-primary/30 transition-all duration-300 animate-slide-up group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardHeader>
                <div className="flex items-start justify-between mb-3">
                  <Award className="text-primary animate-float" size={24} />
                  <div className="flex items-center gap-1 text-muted-foreground text-sm">
                    <Calendar size={14} />
                    {cert.date}
                  </div>
                </div>
                <CardTitle className="text-gold group-hover:text-primary transition-colors">
                  {cert.title}
                </CardTitle>
                <CardDescription className="text-secondary font-medium">
                  {cert.issuer}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {cert.description}
                  </p>

                  {/* Skills */}
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium text-foreground">Key Skills:</h4>
                    <div className="flex flex-wrap gap-2 justify-center">
                      {cert.skills.map((skill) => (
                        <Badge 
                          key={skill} 
                          variant="secondary" 
                          className="bg-muted/30 text-muted-foreground hover:bg-primary/10 hover:text-primary transition-colors text-xs"
                        >
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12 animate-fade-in">
          <p className="text-muted-foreground mb-6">
            Continuously learning and expanding my technical expertise
          </p>
        </div>
      </div>
    </section>
  );
};

export default CertificatesSection;