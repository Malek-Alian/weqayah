import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { t } from 'i18next';
import AboutCard from './components/AboutCard';

function AboutUsPage() {
  const cards = [
    {
      id: 1,
      title: t('aboutUs.whoWeAre'),
      description: t('aboutUs.whoWeAreDescription'),
    },
    {
      id: 2,
      title: t('aboutUs.whoWeServe'),
      description: t('aboutUs.whoWeServeDescription'),
    },
    {
      id: 3,
      title: t('aboutUs.ourMission'),
      description: t('aboutUs.ourMissionDescription'),
    },
    {
      id: 4,
      title: t('aboutUs.ourStory'),
      description: t('aboutUs.ourStoryDescription'),
    },
  ];

  return (
    <div className='min-h-screen bg-white'>
      <div className='bg-primary text-primary-foreground py-16 px-4 sm:px-6 lg:px-8'>
        <div className='max-w-7xl mx-auto'>
          <div className='flex flex-col lg:flex-row lg:items-center lg:justify-between'>
            <div className='lg:w-2/3'>
              <h1 className='text-4xl sm:text-5xl lg:text-6xl font-bold mb-6'>
                {t('aboutUs.title')}
              </h1>
              <p className='text-lg sm:text-xl lg:text-2xl mb-8 max-w-3xl'>
                {t('aboutUs.description')}
              </p>
            </div>
            <div className='lg:w-1/3 flex justify-end'>
              <Button variant='secondary' size='lg' className='text-lg'>
                {t('aboutUs.explore')}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className='py-16 px-4 sm:px-6 lg:px-8'>
        <div className='max-w-7xl mx-auto'>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-12'>
            <div className='space-y-6'>
              {cards.map((card) => (
                <AboutCard key={card.id} card={card} />
              ))}
            </div>

            <Card className='bg-gray-50 border-dashed flex items-center justify-center'>
              <CardContent className='py-16'>
                <div className='text-center text-gray-500'>
                  <div className='w-22 h-22 bg-gray-300 rounded-full mx-auto'></div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className='mt-8'>
            <Card className='bg-gray-50 border-dashed flex items-center justify-center'>
              <CardContent className='py-32'>
                <div className='text-center text-gray-500'>
                  <div className='w-20 h-20 bg-gray-300 rounded-lg mx-auto transform rotate-12'></div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutUsPage;
