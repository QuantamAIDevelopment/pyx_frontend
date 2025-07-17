import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../common/ui/card'
import { Badge } from '../common/ui/badge'
import { Button } from '../common/ui/button'
import { Star, Zap, ShoppingCart } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import type { LucideProps } from 'lucide-react';

interface AgentCardProps {
  agent: any
  onClick?: () => void
  showFooter?: boolean
  showBadges?: boolean
  children?: React.ReactNode
}

export function AgentCard({ agent, onClick, showFooter = true, showBadges = true, children }: AgentCardProps) {
  let IconComponent = ShoppingCart;
  const iconMap = LucideIcons as unknown as Record<string, React.ForwardRefExoticComponent<LucideProps>>;

  // Emoji to Lucide icon name mapping
  const emojiToLucide: Record<string, string> = {
    '🤖': 'Bot',
    '📅': 'Calendar',
    '📄': 'FileText',
    '👤': 'User',
    // Add more mappings as needed
  };

  // Helper to convert snake_case or lowercase to PascalCase
  function toPascalCase(str: string) {
    return str
      .replace(/(^|_|-)(\w)/g, (_: string, __: string, c: string) => c ? c.toUpperCase() : '')
      .replace(/\s+/g, '');
  }

  let iconKey = agent.icon;
  if (typeof iconKey === 'string' && emojiToLucide[iconKey]) {
    iconKey = emojiToLucide[iconKey];
  }

  if (typeof agent.icon === 'function') {
    IconComponent = agent.icon;
  } else if (typeof iconKey === 'string') {
    // Try direct match
    if (iconMap[iconKey]) {
      IconComponent = iconMap[iconKey];
    } else {
      // Try PascalCase (handles snake_case, kebab-case, lowercase)
      const pascalIcon = toPascalCase(iconKey);
      if (iconMap[pascalIcon]) {
        IconComponent = iconMap[pascalIcon];
      }
    }
  }
  // Debug log for troubleshooting icon mapping
  // Remove or comment out in production
  console.log('Agent icon:', agent.icon, 'Mapped:', IconComponent.displayName || IconComponent.name);
  return (
    <Card
     className="group hover:shadow-lg transition-all duration-300 cursor-pointer border-border hover:border-primary/20 bg-card relative flex flex-col justify-between h-[360px]"
      onClick={onClick}
    >
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#FF620A] group-hover:scale-110 transition-transform duration-300">
            <IconComponent className="h-6 w-6 text-white" />
          </div>
          {showBadges && agent.isPopular && (
            <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white border-0">
              Popular
            </Badge>
          )}
        </div>
        <CardTitle className="group-hover:text-primary transition-colors">
          {agent.name}
        </CardTitle>
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <div className="flex items-center">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
            <span>{agent.rating}</span>
          </div>
          <span>•</span>
          <span>{agent.reviews} reviews</span>
        </div>
      </CardHeader>
      <CardContent className="pb-4">
        <CardDescription className="mb-4 line-clamp-3">
          {agent.description}
        </CardDescription>
        {agent.category && (
          <Badge className="mb-2 bg-white border border-gray-200" variant="secondary">
            {agent.category}
          </Badge>
        )}
        {/* Show tags as badges */}
        {/* {agent.tags && agent.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-2">
            {agent.tags.map((tag: string, idx: number) => (
              <Badge key={idx} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        )} */}
        {children}
      </CardContent>
      {showFooter && (
        <CardFooter className="pt-0">
          <Button className="w-full group-hover:bg-primary group-hover:text-primary-foreground hover:!bg-gray hover:!text-black transition-colors" variant="outline">
            <Zap className="h-4 w-4 mr-2" />
            View Details
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}
