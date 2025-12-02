import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Search } from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const DoctorSearch = ({ onSearch }) => {
  const { t } = useTranslation();
  const [searchData, setSearchData] = useState({
    country: '',
    specialty: '',
    insurance: '',
    location: '',
    doctorName: '',
  });

  const handleSearch = () => {
    console.log('Searching with:', searchData);
    if (onSearch) {
      onSearch(searchData);
    }
  };

  return (
    <div className='bg-primary py-16 px-4'>
      <div className='container mx-auto'>
        <div className='text-center mb-8'>
          <h1 className='text-4xl font-bold text-primary-foreground mb-4'>
            {t('doctorSearch.title')}
          </h1>
          <div className='flex items-center justify-center gap-2 mb-8'>
            <span className='text-primary-foreground/70 text-lg'>
              {t('doctorSearch.subtitle')}
            </span>
            <Badge variant='secondary' className='px-4 py-2 text-lg'>
              {t('doctorSearch.badge')}
            </Badge>
          </div>
        </div>

        {/* Search Container */}
        <div className='bg-card rounded-2xl p-8 max-w-6xl mx-auto shadow-lg'>
          <div className='grid grid-cols-12 gap-4'>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 col-span-12 lg:col-span-11'>
              {/* Country Selector */}
              <div className='space-y-2 '>
                <Select
                  value={searchData.country}
                  onValueChange={(value) =>
                    setSearchData({ ...searchData, country: value })
                  }
                >
                  <SelectTrigger className='w-full'>
                    <SelectValue
                      placeholder={t('doctorSearch.countryPlaceholder')}
                    />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='jordan'>
                      <div className='flex items-center gap-2'>
                        <span>🇯🇴</span>
                        <span>Jordan</span>
                      </div>
                    </SelectItem>
                    <SelectItem value='uae'>
                      <div className='flex items-center gap-2'>
                        <span>🇦🇪</span>
                        <span>UAE</span>
                      </div>
                    </SelectItem>
                    <SelectItem value='saudi'>
                      <div className='flex items-center gap-2'>
                        <span>🇸🇦</span>
                        <span>Saudi Arabia</span>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Specialty Search */}
              <div className='space-y-2'>
                <Select
                  value={searchData.specialty}
                  onValueChange={(value) =>
                    setSearchData({ ...searchData, specialty: value })
                  }
                >
                  <SelectTrigger className='w-full'>
                    <SelectValue
                      placeholder={t('doctorSearch.specialtyPlaceholder')}
                    />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='cardiology'>Cardiology</SelectItem>
                    <SelectItem value='dermatology'>Dermatology</SelectItem>
                    <SelectItem value='neurology'>Neurology</SelectItem>
                    <SelectItem value='orthopedics'>Orthopedics</SelectItem>
                    <SelectItem value='pediatrics'>Pediatrics</SelectItem>
                    <SelectItem value='psychiatry'>Psychiatry</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Insurance Search */}
              <div className='space-y-2'>
                <Select
                  value={searchData.insurance}
                  onValueChange={(value) =>
                    setSearchData({ ...searchData, insurance: value })
                  }
                >
                  <SelectTrigger className='w-full'>
                    <SelectValue
                      placeholder={t('doctorSearch.insurancePlaceholder')}
                    />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='nhif'>NHIF</SelectItem>
                    <SelectItem value='private'>Private Insurance</SelectItem>
                    <SelectItem value='government'>Government</SelectItem>
                    <SelectItem value='self-pay'>Self Pay</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Location Search */}
              <div className='space-y-2'>
                <Input
                  placeholder={t('doctorSearch.locationPlaceholder')}
                  value={searchData.location}
                  onChange={(e) =>
                    setSearchData({ ...searchData, location: e.target.value })
                  }
                  className='w-full'
                />
              </div>

              {/* Doctor Name Search */}
              <div className='space-y-2'>
                <Input
                  placeholder={t('doctorSearch.doctorNamePlaceholder')}
                  value={searchData.doctorName}
                  onChange={(e) =>
                    setSearchData({ ...searchData, doctorName: e.target.value })
                  }
                  className='w-full'
                />
              </div>
            </div>

            {/* Search Button */}
            <div className='flex justify-center lg:justify-end col-span-12 lg:col-span-1'>
              <Button
                onClick={handleSearch}
                className='bg-secondary hover:bg-secondary/90 text-secondary-foreground px-6 py-2 rounded-lg w-full'
              >
                <Search className='h-5 w-5' />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorSearch;
