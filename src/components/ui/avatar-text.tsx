// components/ui/avatar-with-text.tsx
import React from 'react';
import { cn } from '@/lib/utils';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { ExternalLink } from 'lucide-react';

export interface AvatarWithTextProps {
  src?: string;
  alt?: string;
  name?: string;
  description?: string;
  profileUrl?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

const AvatarWithText: React.FC<AvatarWithTextProps> = ({
  src,
  alt = 'Avatar',
  name,
  description,
  profileUrl,
  size = 'md',
  className,
}) => {
  const sizeClasses = {
    sm: {
      avatar: 'h-8 w-8',
      name: 'text-sm',
      description: 'text-xs',
      icon: 'w-3 h-3'
    },
    md: {
      avatar: 'h-10 w-10',
      name: 'text-base',
      description: 'text-sm',
      icon: 'w-3 h-3'
    },
    lg: {
      avatar: 'h-12 w-12',
      name: 'text-lg',
      description: 'text-sm',
      icon: 'w-4 h-4'
    },
    xl: {
      avatar: 'h-20 w-20',
      name: 'text-xl',
      description: 'text-sm',
      icon: 'w-5 h-8'
    }
  };

  const DescriptionWithLink = () => {
    if (!description) return null;

    if (profileUrl) {
      return (
        <a
          href={profileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            'flex items-center gap-1 glow_gold text-primary transition-colors group',
            sizeClasses[size].description
          )}
        >
          {description}
          <ExternalLink className={cn('opacity-80 group-hover:opacity-100 transition-opacity', sizeClasses[size].icon)} />
        </a>
      );
    }

    return (
      <div className={cn('text-muted-foreground', sizeClasses[size].description)}>
        {description}
      </div>
    );
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className={cn('flex items-center gap-4 ', className)}>
      <Avatar className={cn('border-2 border-primary/30 animate-glow', sizeClasses[size].avatar)}>
        <AvatarImage src={src} alt={alt} />
        <AvatarFallback className="bg-primary/10 text-primary">
          {name ? getInitials(name) : 'US'}
        </AvatarFallback>
      </Avatar>
      
      {(name || description) && (
        <div className="font-medium">
          {name && (
            <div className={cn(
              'text-foreground font-semibold',
              sizeClasses[size].name
            )}>
              {name}
            </div>
          )}
          <DescriptionWithLink />
        </div>
      )}
    </div>
  );
};

export default AvatarWithText;