import { ReactNode } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface CustomCardProps {
  title: string;
  description?: string;
  children?: ReactNode;
  className?: string;
}

export function CustomCard({ title, description, children, className }: CustomCardProps) {
  return (
    <Card className={cn('glass-card border-white/20 hover:border-primary/40 transition-all duration-300', className)}>
      <CardHeader>
        <CardTitle className="text-xl font-display font-bold">{title}</CardTitle>
        {description && (
          <CardDescription className="text-muted-foreground">
            {description}
          </CardDescription>
        )}
      </CardHeader>
      {children && (
        <CardContent>
          {children}
        </CardContent>
      )}
    </Card>
  );
}
