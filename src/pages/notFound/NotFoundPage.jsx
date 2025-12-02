import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Home, Search, ArrowLeft, Stethoscope } from 'lucide-react';

function NotFoundPage() {
  const { t } = useTranslation();

  return (
    <div className='min-h-screen bg-background flex items-center justify-center px-4'>
      <div className='max-w-2xl w-full'>
        <Card className='shadow-lg'>
          <CardContent className='p-8 text-center'>
            {/* 404 Icon */}
            <div className='mb-8'>
              <div className='inline-flex items-center justify-center w-24 h-24 bg-primary/10 rounded-full mb-4'>
                <Stethoscope className='w-12 h-12 text-primary' />
              </div>
              <h1 className='text-6xl font-bold text-primary mb-2'>404</h1>
              <h2 className='text-2xl font-semibold text-foreground mb-4'>
                {t('notFound.title')}
              </h2>
              <p className='text-muted-foreground text-lg leading-relaxed'>
                {t('notFound.description')}
              </p>
            </div>

            {/* Action Buttons */}
            <div className='flex flex-col sm:flex-row gap-4 justify-center mb-8'>
              <Button asChild className='flex items-center gap-2'>
                <Link to='/'>
                  <Home className='w-4 h-4' />
                  {t('notFound.goHome')}
                </Link>
              </Button>
              <Button
                asChild
                variant='outline'
                className='flex items-center gap-2'
              >
                <Link to='/find-doctor'>
                  <Search className='w-4 h-4' />
                  {t('notFound.findDoctor')}
                </Link>
              </Button>
            </div>

            {/* Quick Links */}
            <div className='border-t pt-6'>
              <h3 className='text-lg font-medium text-foreground mb-4'>
                {t('notFound.quickLinks')}
              </h3>
              <div className='grid grid-cols-1 sm:grid-cols-2 gap-3'>
                <Link
                  to='/medical-news'
                  className='flex items-center gap-2 p-3 rounded-lg border hover:bg-accent transition-colors text-sm'
                >
                  <ArrowLeft className='w-4 h-4 text-muted-foreground' />
                  <span>{t('navigation.medicalNews')}</span>
                </Link>
                <Link
                  to='/blog'
                  className='flex items-center gap-2 p-3 rounded-lg border hover:bg-accent transition-colors text-sm'
                >
                  <ArrowLeft className='w-4 h-4 text-muted-foreground' />
                  <span>{t('navigation.ourBlogs')}</span>
                </Link>
                <Link
                  to='/about-us'
                  className='flex items-center gap-2 p-3 rounded-lg border hover:bg-accent transition-colors text-sm'
                >
                  <ArrowLeft className='w-4 h-4 text-muted-foreground' />
                  <span>{t('navigation.about')}</span>
                </Link>
                <Link
                  to='/help'
                  className='flex items-center gap-2 p-3 rounded-lg border hover:bg-accent transition-colors text-sm'
                >
                  <ArrowLeft className='w-4 h-4 text-muted-foreground' />
                  <span>{t('navigation.help')}</span>
                </Link>
              </div>
            </div>

            {/* Medical-themed decorative elements */}
            <div className='mt-8 flex justify-center'>
              <div className='flex space-x-2'>
                <div className='w-2 h-2 bg-primary rounded-full animate-pulse'></div>
                <div
                  className='w-2 h-2 bg-secondary rounded-full animate-pulse'
                  style={{ animationDelay: '0.2s' }}
                ></div>
                <div
                  className='w-2 h-2 bg-primary rounded-full animate-pulse'
                  style={{ animationDelay: '0.4s' }}
                ></div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default NotFoundPage;
