import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

function AboutCard({ card }) {
  return (
    <Card className={cn('border-s-primary', 'border-s-4')}>
      <CardHeader className='flex flex-row items-center space-x-4 space-y-0'>
        <Badge
          variant='default'
          className='w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold'
        >
          {card.id}
        </Badge>
        <CardTitle className='text-2xl font-bold text-gray-900'>
          {card.title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className='text-lg text-primary'>{card.description}</p>
      </CardContent>
    </Card>
  );
}

export default AboutCard;
