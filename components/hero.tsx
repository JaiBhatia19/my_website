'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Github, Linkedin, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { FallbackImage } from '@/components/fallback-image';
import { getProfileData } from '@/lib/content';
import { useEffect, useState } from 'react';

interface HeroProps {
  profile: Awaited<ReturnType<typeof getProfileData>>;
}

export function Hero({ profile }: HeroProps) {
  const [currentTagline, setCurrentTagline] = useState(0);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 300], [0, -30]);
  const opacity = useTransform(scrollY, [0, 200], [1, 0.3]);

  const taglines = [
    "Sales Engineer",
    "Solutions Architect", 
    "AI-Driven Builder"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTagline((prev) => (prev + 1) % taglines.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [taglines.length]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden noise-texture pt-20">
      {/* Enhanced background gradient */}
      <div className="absolute inset-0" style={{ background: 'var(--background-gradient)' }} />
      
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-primary/20 to-purple-500/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.4, 0.7, 0.4],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-br from-blue-500/20 to-primary/20 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.6, 0.3, 0.6],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-br from-purple-500/10 to-blue-500/10 rounded-full blur-2xl"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>

      <motion.div 
        className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
        style={{ y, opacity }}
      >
        <div className="max-w-5xl mx-auto text-center">
          {/* Profile Picture */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex justify-center mb-12"
          >
            <div className="relative w-40 h-40 rounded-full overflow-hidden ring-4 ring-primary/30 shadow-2xl">
              <FallbackImage
                src="/images/profile.jpg"
                alt={profile.name}
                width={160}
                height={160}
                className="object-cover w-full h-full"
                priority
                sizes="(max-width: 768px) 160px, 160px"
                quality={90}
              />
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-display font-bold tracking-tight mb-8 leading-tight">
              Hi, I&apos;m{' '}
              <span className="gradient-text-hero">{profile.name}</span>
            </h1>
          </motion.div>

          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          >
            <div className="text-2xl sm:text-3xl text-muted-foreground mb-4">
              {profile.headline}
            </div>
            <motion.div
              key={currentTagline}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5 }}
              className="text-xl sm:text-2xl font-medium gradient-text"
            >
              {taglines[currentTagline]}
            </motion.div>
          </motion.div>

          <motion.p
            className="text-xl text-muted-foreground mb-16 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
          >
            {profile.summary}
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button asChild size="lg" className="group glass-card border-primary/20 hover:border-primary/40">
                <a href="/resume" target="_blank" rel="noopener noreferrer">
                  📄 Download Resume
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </Button>
            </motion.div>
            
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button variant="outline" size="lg" asChild className="glass-card border-primary/20 hover:border-primary/40">
                <Link href="/contact">
                  Get in Touch
                </Link>
              </Button>
            </motion.div>
            
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button variant="outline" size="lg" asChild className="glass-card border-primary/20 hover:border-primary/40">
                <Link href="/projects">
                  View Projects
                </Link>
              </Button>
            </motion.div>
          </motion.div>

          {/* Social Links */}
          <motion.div
            className="flex justify-center space-x-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0, ease: "easeOut" }}
          >
            <motion.a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 rounded-full glass-card hover:border-primary/40 transition-all duration-300 relative z-10"
              aria-label="GitHub"
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Github className="h-6 w-6" />
            </motion.a>
            <motion.a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 rounded-full glass-card hover:border-primary/40 transition-all duration-300 relative z-10"
              aria-label="LinkedIn"
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Linkedin className="h-6 w-6" />
            </motion.a>
            <motion.a
              href={`mailto:${profile.email}`}
              className="p-4 rounded-full glass-card hover:border-primary/40 transition-all duration-300 relative z-10"
              aria-label="Email"
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Mail className="h-6 w-6" />
            </motion.a>
          </motion.div>

          {/* Enhanced Scroll indicator */}
          <motion.div
            className="absolute bottom-12 left-1/2 transform -translate-x-1/2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            <motion.div
              className="w-8 h-12 border-2 border-primary/30 rounded-full flex justify-center glass-card"
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <motion.div
                className="w-1 h-4 bg-gradient-to-b from-primary to-primary/50 rounded-full mt-2"
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              />
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
