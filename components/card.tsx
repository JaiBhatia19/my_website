import { ReactNode } from 'react';
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
    <Card className={cn(
      'transition-all duration-300',
      hover && 'hover:shadow-lg hover:-translate-y-1',
      className
    )}>
      <CardHeader>
        <CardTitle className="text-xl">{title}</CardTitle>
        {description && (
          <CardDescription className="text-base">
            {description}
          </CardDescription>
        )}
      </CardHeader>
      {children && <CardContent>{children}</CardContent>}
    </Card>
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
    <CustomCard
      title={title}
      description={description}
      className={cn('text-center', className)}
    >
      <div className="flex justify-center mb-4">
        <div className="p-3 rounded-full bg-primary/10 text-primary">
          {icon}
        </div>
      </div>
    </CustomCard>
  );
}
