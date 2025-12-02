import { cn } from '@/lib/utils';
import { t } from 'i18next';

const AdArea = ({
  className,
  size = 'medium',
  placeholder = 'advertisement.placeholder',
  children,
  ...props
}) => {
  const sizeClasses = {
    small: 'h-32',
    medium: 'h-48',
    large: 'h-64',
    banner: 'h-20',
    square: 'h-48 w-48',
    rectangle: 'h-32 w-full',
  };

  return (
    <div
      className={cn(
        'flex items-center justify-center border-2 border-solid border-gray-300 rounded-lg bg-gray-50 text-gray-500 font-medium transition-colors hover:border-gray-400 hover:bg-gray-100',
        sizeClasses[size],
        className
      )}
      {...props}
    >
      {children || (
        <div className='text-center'>
          <div className='text-2xl mb-2'>📢</div>
          <div className='text-sm'>{t(placeholder)}</div>
        </div>
      )}
    </div>
  );
};

export { AdArea };
