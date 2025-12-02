import { ArrowUpRight } from 'lucide-react';
import { Button } from '../../../components/ui/button';
import { Card, CardContent } from '../../../components/ui/card';

const StatsCard = ({
  title,
  value,
  gradient,
  buttonText = 'All',
  onButtonClick,
}) => {
  return (
    <Card
      className={`relative overflow-hidden ${gradient} text-white border-0`}
    >
      <CardContent className='p-6'>
        <div className='flex justify-between items-center'>
          <div className='space-y-2'>
            <h3 className='text-2xl font-bold'>{value}</h3>
            <p className='text-white/90 text-sm'>{title}</p>
          </div>
          <Button
            variant='ghost'
            size='sm'
            className='text-white hover:bg-white/90 h-8 px-3'
            onClick={onButtonClick}
          >
            {buttonText}
            <ArrowUpRight className='ml-1 h-3 w-3' />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default StatsCard;
