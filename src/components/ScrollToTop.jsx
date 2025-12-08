import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';
import { LuChevronUp } from 'react-icons/lu';

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div className='fixed bottom-6 right-6 z-50'>
      <Button
        onClick={scrollToTop}
        size='icon-xl'
        className={cn(
          'rounded-full shadow-lg transition-all duration-300 ease-in-out',
          isVisible
            ? 'opacity-100 translate-y-0 scale-100'
            : 'opacity-0 translate-y-2 scale-95 pointer-events-none'
        )}
        aria-label='Scroll to top'
      >
        <LuChevronUp className='size-5' />
      </Button>
    </div>
  );
};

export default ScrollToTop;
