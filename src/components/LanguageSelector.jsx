import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { isRTL } from '@/i18n';
import { cn } from '@/lib/utils';
import { Globe } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const languages = [
  { code: 'en', name: 'English', flag: 'gb' },
  { code: 'ar', name: 'العربية', flag: 'sa' },
];

function LanguageSelector({ className }) {
  const { i18n } = useTranslation();

  const currentLanguage =
    languages.find((lang) => lang.code === i18n.language) || languages[0];

  const handleLanguageChange = (languageCode) => {
    i18n.changeLanguage(languageCode);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant='ghost'
          size='sm'
          className={cn('flex items-center space-x-2', className)}
        >
          <Globe className='h-4 w-4' />
          <span className='hidden sm:inline'>{currentLanguage.name}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end' className='w-48'>
        {languages.map((language) => (
          <DropdownMenuItem
            key={language.code}
            onClick={() => handleLanguageChange(language.code)}
            className={`flex items-center justify-between ${
              isRTL(i18n.language) ? 'flex-row-reverse' : ''
            } cursor-pointer ${
              i18n.language === language.code ? 'bg-accent' : ''
            }`}
          >
            <div
              className={`flex items-center space-x-2 ${
                isRTL(i18n.language) ? 'flex-row-reverse space-x-reverse' : ''
              }`}
            >
              <span className='text-lg'>
                <img
                  src={`https://flagcdn.com/w20/${language.flag}.png`}
                  srcset={`https://flagcdn.com/w40/${language.flag}.png 2x`}
                  width='20'
                  alt={language.name}
                />
              </span>
              <span>{language.name}</span>
            </div>
            {i18n.language === language.code && (
              <span className='text-xs text-muted-foreground'>✓</span>
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default LanguageSelector;
