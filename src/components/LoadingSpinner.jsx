import { t } from 'i18next';
import { Button } from './ui/button';
import { Spinner } from './ui/spinner';

const LoadingSpinner = () => (
  <div className='flex h-screen items-center justify-center'>
    <Button size='sm' variant='outline' className='cursor-default'>
      <Spinner />
      {t('common.pleaseWait')}
    </Button>
  </div>
);

export default LoadingSpinner;
