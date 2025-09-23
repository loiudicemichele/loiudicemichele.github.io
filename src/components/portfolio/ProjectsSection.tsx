import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Github, ExternalLink, Code2 } from "lucide-react";

const ProjectsSection = () => {
  const projects = [
    {
      title: "Data Clustering Application",
      description: "Android client-server application for performing data clustering and storage. The Android app communicates with a backend server that provides clustering algorithms and persistent data services, enabling efficient data analysis on mobile devices.",
      technologies: ["Java", "Android SDK", "Socket Programming", "Server-side Java", "Data mining", "SQL", "OO Design", "Test writing"],
      githubUrl: "https://github.com/loiudicemichele/data-clustering",
      featured: true
    },
    {
      title: "Chess",
      description: " Fully featured chess game that runs in the terminal and supports all official rules: piece movement, check, checkmate, stalemate, castling, en passant, and pawn promotion.",
      technologies: ["Python", "Docker", "Workflows", "CLI Interfaces", "Chess", "OO Design", "Test writing"],
      githubUrl: "https://github.com/loiudicemichele/chess",
    },
    {
      title: "Algorithms and Data Structures",
      description: "C++ project focused on classic algorithms and custom data structures, with an emphasis on manual memory management. Implemented arrays, linked lists, stacks, queues, trees, and graphs while tackling challenges like pointer safety, dynamic allocation, and resource cleanup. Gained strong foundations in low-level programming and algorithmic problem-solving techniques.",
      technologies: ["C++", "Memory Management", "Data Structures", "Algorithms", "Data Abstraction", "OOP"],
      githubUrl: "https://github.com/loiudicemichele/algorithms-data_structures",
    },
    {
      title: "3D Museum Tour",
      description: "I developed a 3D virtual tour experience that simulates a museum visit. Due to restrictions on using real museum content, we recreated the exhibition in our school hallway. The project includes a landing page with access to an interactive artwork catalog and a virtual 3D environment where users can explore exhibits, listen to audio guides in Italian and English, and read detailed descriptions.",
      technologies: ["SQL", "Database", "HTML", "CSS", "Java Script", "PHP"],
      githubUrl: "https://github.com/loiudicemichele/3D_Museum_Tour"
    },
    {
      title: "Encrypted Communication",
      description: "Client-server system simulating encrypted communication with custom algorithms. Features Diffie-Hellman key exchange, symmetric encryption via permutation techniques, and database-backed user authentication. Built primarily for educational purposes, highlighting challenges in secure protocol design and implementation.",
      technologies: ["Java", "Socket Programming", "Diffie-Hellman", "Encryption Algorithms", "RSA", "Cybersecurity"],
      githubUrl: "https://github.com/loiudicemichele/encrypted-communication"
    },
    {
      title: "Library Management System App",
      description: "I developed a desktop-based library management system that allows users to browse a digital catalog and manage book rentals. The application features a graphical interface built with Java Swing.",
      technologies: ["MySQL ", "Java", "Swing", "Database"],
      githubUrl: "https://github.com/loiudicemichele/libraryAPP"
    }
  ];

  return (
    <section id="projects" className="min-h-screen py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            <span className="gradient-text-gold">Projects</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            A showcase of my development work and technical skills
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <Card
              key={index}
              className={`flex flex-col hover-lift border-border/50 hover:border-primary/30 transition-all duration-300 animate-slide-up ${
                project.featured ? 'md:col-span-2 lg:col-span-1 glow-gold' : ''
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardHeader>
                <div className="flex items-start justify-between mb-2">
                  <Code2 className="text-primary animate-float" size={24} />
                  {project.featured && (
                    <Badge variant="default" className="bg-primary text-primary-foreground">
                      Featured
                    </Badge>
                  )}
                </div>
                <CardTitle className="text-gold group-hover:text-primary transition-colors">
                  {project.title}
                </CardTitle>
                <CardDescription className="text-foreground/70 leading-relaxed">
                  {project.description}
                </CardDescription>
              </CardHeader>

              <CardContent className="flex flex-col flex-1 justify-between">
                <div className="space-y-4">
                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2 justify-center">
                    {project.technologies.map((tech) => (
                      <Badge
                        key={tech}
                        variant="secondary"
                        className="bg-muted/50 text-muted-foreground hover:bg-primary/10 hover:text-primary transition-colors"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-2 mt-auto">
                  <Button
                    variant="default"
                    size="sm"
                    className="flex-1 hover-lift"
                    onClick={() => window.open(project.githubUrl, '_blank')}
                  >
                    <Github size={16} className="mr-2" />
                    Code
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12 animate-fade-in">
          <Button 
            variant="outline" 
            size="lg" 
            className="hover-lift glow-silver"
            onClick={() => window.open('https://github.com/loiudicemichele', '_blank')}
          >
            <Github className="mr-2" size={20} />
            View All Projects on GitHub
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;