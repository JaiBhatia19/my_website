import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface CustomCardProps {
  title: string;
  description?: string;
  children?: ReactNode;
  className?: string;
  hover?: boolean;
}

export function CustomCard({ 
  title, 
  description, 
  children, 
  className,
  hover = true 
}: CustomCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      whileHover={hover ? { y: -8, scale: 1.02 } : {}}
      className="h-full"
    >
      <Card className={cn(
        'glass-card transition-all duration-500 h-full',
        hover && 'hover:shadow-2xl hover:border-primary/30',
        className
      )}>
        <CardHeader>
          <CardTitle className="text-xl font-display font-semibold">{title}</CardTitle>
          {description && (
            <CardDescription className="text-base leading-relaxed">
              {description}
            </CardDescription>
          )}
        </CardHeader>
        {children && <CardContent>{children}</CardContent>}
      </Card>
    </motion.div>
  );
}

interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  className?: string;
}

export function FeatureCard({ icon, title, description, className }: FeatureCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="h-full"
    >
      <CustomCard
        title={title}
        description={description}
        className={cn('text-center', className)}
        hover={false}
      >
        <motion.div 
          className="flex justify-center mb-6"
          whileHover={{ scale: 1.1, rotate: 5 }}
          transition={{ duration: 0.3 }}
        >
          <div className="p-4 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 text-primary border border-primary/20">
            {icon}
          </div>
        </motion.div>
      </CustomCard>
    </motion.div>
  );
}
