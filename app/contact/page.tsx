import { Section, SectionHeader } from '@/components/section';
import { ContactForm } from '@/components/contact-form';
import { getProfileData } from '@/lib/content';
import { Mail, Phone, MapPin, Linkedin, Github } from 'lucide-react';

export const metadata = {
  title: 'Contact',
  description: 'Get in touch to discuss opportunities, collaborations, or just say hello.',
};

export default async function ContactPage() {
  const profile = await getProfileData();

  return (
    <Section>
      <div className="max-w-4xl mx-auto">
        <SectionHeader
          title="Get In Touch"
          description="I'm always interested in new opportunities and interesting conversations"
        />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div>
            <h3 className="text-2xl font-semibold mb-6">Send a Message</h3>
            <ContactForm />
          </div>
          
          {/* Contact Info */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-semibold mb-6">Contact Information</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-primary" />
                  <a
                    href={`mailto:${profile.email}`}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {profile.email}
                  </a>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-primary" />
                  <a
                    href={`tel:${profile.phone}`}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {profile.phone}
                  </a>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="h-5 w-5 text-primary" />
                  <span className="text-muted-foreground">{profile.location}</span>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Connect With Me</h4>
              <div className="flex space-x-4">
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full bg-muted hover:bg-primary hover:text-primary-foreground transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full bg-muted hover:bg-primary hover:text-primary-foreground transition-colors"
                  aria-label="GitHub"
                >
                  <Github className="h-5 w-5" />
                </a>
              </div>
            </div>
            
            <div className="bg-muted/50 rounded-lg p-6">
              <h4 className="text-lg font-semibold mb-3">Response Time</h4>
              <p className="text-sm text-muted-foreground">
                I typically respond to messages within 24 hours. For urgent matters, 
                feel free to call or text me directly.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
