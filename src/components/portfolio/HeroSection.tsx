import { Button } from "@/components/ui/button";
import { Github, Instagram, Linkedin, Mail, MapPin } from "lucide-react";
import profileImage from "@/assets/profile-picture.jpg";

const HeroSection = () => {
  return (
    <section id="about" className="min-h-screen flex items-center justify-center px-6 py-20">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Profile Image */}
          <div className="flex justify-center lg:justify-end animate-fade-in">
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-full blur-2xl animate-glow"></div>
              <img
                src={profileImage}
                alt="Profile"
                className="relative w-80 h-80 rounded-full object-cover border-4 border-primary/30 shadow-2xl hover-lift"
              />
            </div>
          </div>

          {/* Hero Content */}
          <div className="space-y-8 animate-slide-up">
            <div>
              <h1 className="text-5xl lg:text-7xl font-bold mb-4">
                <span className="gradient-text-gold">Michele</span>{" "}
                <span className="gradient-text-silver">Loiudice</span>
              </h1>
              <p className="text-2xl lg:text-3xl text-secondary mb-6">
                Software Engineer
              </p>
              <div className="flex items-center gap-2 text-muted-foreground mb-6">
                <MapPin size={16} />
                <span>Altamura, BA - Italy</span>
              </div>
            </div>

            <p className="text-lg text-muted-foreground leading-relaxed max-w-xl">
              AI enthusiast and software engineer passionate about exploring new technologies. Currently pursuing my Bachelor's in Computer Science.
            </p>

            {/* Quick Links */}
            <div className="flex flex-wrap gap-4 justify-center">
              <a
                  href="https://github.com/loiudicemichele"
                  target="_blank"
                  rel="noopener noreferrer">
              <Button variant="outline" size="lg" className="hover-lift">
                <Github className="mr-2" size={20} />
                GitHub
              </Button> </a>
              <a
                  href="https://www.linkedin.com/in/michele-loiudice-415042201/"
                  target="_blank"
                  rel="noopener noreferrer">
              <Button variant="outline" size="lg" className="hover-lift">
                <Linkedin className="mr-2" size={20} />
                LinkedIn
              </Button> </a>
              <a
                  href="mailto:mloiudice20@gmail.com"
                  target="_blank"
                  rel="noopener noreferrer">
              <Button variant="outline" size="lg" className="hover-lift">
                <Mail className="mr-2" size={20} />
                Contact
              </Button> </a>
              <a
                  href="https://www.instagram.com/michele_loiudice/"
                  target="_blank"
                  rel="noopener noreferrer">
              <Button variant="outline" size="lg" className="hover-lift">
                <Instagram className="mr-2" size={20} />
                Instagram
              </Button> </a>
            </div>

            {/* Interests */}
            <div className="pt-8">
              <h3 className="text-lg font-semibold text-gold mb-4">Interests</h3>
              <div className="flex flex-wrap gap-3 justify-center">
                {["Web Development", "AI/ML", "Algorithms", "Mobile Apps", "Data Structures", "Problem Solving"].map((interest) => (
                  <span
                    key={interest}
                    className="px-4 py-2 bg-card rounded-full text-sm border border-border hover:border-primary/50 transition-colors"
                  >
                    {interest}
                  </span>
                ))}
              </div>
            </div>

            {/* Education Recap */}
            <div className="pt-4">
            <h3 className="text-lg font-semibold text-gold mb-4">Education</h3>
            
            <div className="space-y-4">
              <div>
                <p className="text-foreground font-medium">Bachelor's Degree in Computer Science</p>
                <p className="text-muted-foreground text-sm">University of Bari • 2023 – 2026</p>
              </div>
              
              <div>
                <p className="text-foreground font-medium">Master's Degree in Computer Science</p>
                <p className="text-muted-foreground text-sm">University of Bari • Expected 2028</p>
              </div>
            </div>
          </div>
  
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;