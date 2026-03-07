'use client';

import type { LucideIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import { Brain, Cloud, Wrench, TrendingUp, Zap } from 'lucide-react';

const categoryConfig: Record<string, { icon: LucideIcon; gradient: string }> = {
  sales_gtm: { icon: TrendingUp, gradient: 'from-violet-500/20 to-purple-600/20 border-violet-500/30' },
  ai_ml: { icon: Brain, gradient: 'from-blue-500/20 to-cyan-600/20 border-blue-500/30' },
  cloud: { icon: Cloud, gradient: 'from-emerald-500/20 to-teal-600/20 border-emerald-500/30' },
  tools: { icon: Wrench, gradient: 'from-amber-500/20 to-orange-600/20 border-amber-500/30' },
  frameworks: { icon: Zap, gradient: 'from-rose-500/20 to-pink-600/20 border-rose-500/30' },
};

const categoryLabels: Record<string, string> = {
  sales_gtm: 'Sales & GTM',
  ai_ml: 'AI & Data',
  cloud: 'Cloud & Architecture',
  tools: 'Tools & Platforms',
  frameworks: 'Development',
};

interface SkillVisualizerProps {
  additionalSkills?: {
    sales_gtm?: string[];
    ai_ml?: string[];
    cloud?: string[];
    tools?: string[];
    frameworks?: string[];
  };
}

export function SkillVisualizer({ additionalSkills }: SkillVisualizerProps) {
  const categories = Object.entries(categoryConfig).filter(
    ([key]) => additionalSkills?.[key as keyof typeof additionalSkills]?.length
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {categories.map(([key, config], categoryIndex) => {
        const skills = additionalSkills?.[key as keyof typeof additionalSkills] || [];
        const Icon = config.icon;

        return (
          <motion.div
            key={key}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
            className={`rounded-xl border bg-gradient-to-br ${config.gradient} p-5 backdrop-blur-sm`}
          >
            <div className="flex items-center gap-2 mb-4">
              <Icon className="h-5 w-5 text-primary" />
              <h3 className="font-semibold text-sm uppercase tracking-wide">
                {categoryLabels[key] || key}
              </h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, skillIndex) => (
                <motion.span
                  key={skill}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: categoryIndex * 0.1 + skillIndex * 0.03 }}
                  whileHover={{ scale: 1.05 }}
                  className="px-3 py-1.5 bg-background/60 dark:bg-background/40 text-foreground text-xs rounded-lg border border-border/50 hover:border-primary/30 transition-colors cursor-default"
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
