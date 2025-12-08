import { t } from 'i18next';
import { LuGlasses } from 'react-icons/lu';

function SearchBySpecialty() {
  return (
    <section className='bg-primary py-8 px-4'>
      <div className='max-w-6xl mx-auto'>
        <div className='flex items-center mb-6'>
          <LuGlasses className='w-6 h-6 text-primary-foreground mx-3' />

          <h2 className='text-xl font-semibold text-primary-foreground'>
            {t('searchBySpecialty.title')}
          </h2>
        </div>

        <div className='flex justify-center items-center space-x-8 overflow-x-auto'>
          {Array.from({ length: 12 }, (_, index) => (
            <div key={index} className='flex-shrink-0 cursor-pointer'>
              <LuGlasses className='w-12 h-12 text-primary-foreground' />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default SearchBySpecialty;
