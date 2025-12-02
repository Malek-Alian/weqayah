import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Button } from './ui/button';
import { t } from 'i18next';

const DoctorFilters = ({ filters, onFiltersChange }) => {
  const handleFilterChange = (filterType, value, checked) => {
    const newFilters = { ...filters };

    if (checked) {
      if (!newFilters[filterType]) {
        newFilters[filterType] = [];
      }
      newFilters[filterType] = [...newFilters[filterType], value];
    } else {
      newFilters[filterType] = newFilters[filterType].filter(
        (item) => item !== value
      );
    }

    onFiltersChange(newFilters);
  };

  const availabilityOptions = [
    { value: 'available', label: t('doctorFilters.availableNow') },
    { value: 'today', label: t('doctorFilters.availableToday') },
    { value: 'tomorrow', label: t('doctorFilters.availableTomorrow') },
    { value: 'this-week', label: t('doctorFilters.thisWeek') },
  ];

  const feeRanges = [
    { value: '0-10', label: t('doctorFilters.0-10') },
    { value: '10-20', label: t('doctorFilters.10-20') },
    { value: '20-30', label: t('doctorFilters.20-30') },
    { value: '30+', label: t('doctorFilters.30+') },
  ];

  const genderOptions = [
    { value: 'male', label: t('doctorFilters.male') },
    { value: 'female', label: t('doctorFilters.female') },
  ];

  return (
    <Card className='w-full py-0 overflow-hidden gap-0'>
      <CardHeader className='bg-primary text-primary-foreground'>
        <CardTitle className='flex items-center gap-2 pt-6 pb-4'>
          <span>▼</span>
          <span>{t('doctorFilters.filters')}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className='p-4 space-y-6'>
        {/* Availability Filter */}
        <div className='space-y-3'>
          <h4 className='font-medium text-gray-900'>
            {t('doctorFilters.availability')}
          </h4>
          <div className='space-y-2'>
            {availabilityOptions.map((option) => (
              <div key={option.value} className='flex items-center space-x-2'>
                <Checkbox
                  id={`availability-${option.value}`}
                  checked={
                    filters.availability?.includes(option.value) || false
                  }
                  onCheckedChange={(checked) =>
                    handleFilterChange('availability', option.value, checked)
                  }
                />
                <Label
                  htmlFor={`availability-${option.value}`}
                  className='text-sm text-gray-700 cursor-pointer'
                >
                  {option.label}
                </Label>
              </div>
            ))}
          </div>
        </div>

        {/* Fees Filter */}
        <div className='space-y-3'>
          <h4 className='font-medium text-gray-900'>
            {t('doctorFilters.fees')}
          </h4>
          <div className='space-y-2'>
            {feeRanges.map((range) => (
              <div key={range.value} className='flex items-center space-x-2'>
                <Checkbox
                  id={`fees-${range.value}`}
                  checked={filters.fees?.includes(range.value) || false}
                  onCheckedChange={(checked) =>
                    handleFilterChange('fees', range.value, checked)
                  }
                />
                <Label
                  htmlFor={`fees-${range.value}`}
                  className='text-sm text-gray-700 cursor-pointer'
                >
                  {range.label}
                </Label>
              </div>
            ))}
          </div>
        </div>

        {/* Gender Filter */}
        <div className='space-y-3'>
          <h4 className='font-medium text-gray-900'>
            {t('doctorFilters.gender')}
          </h4>
          <div className='space-y-2'>
            {genderOptions.map((option) => (
              <div key={option.value} className='flex items-center space-x-2'>
                <Checkbox
                  id={`gender-${option.value}`}
                  checked={filters.gender?.includes(option.value) || false}
                  onCheckedChange={(checked) =>
                    handleFilterChange('gender', option.value, checked)
                  }
                />
                <Label
                  htmlFor={`gender-${option.value}`}
                  className='text-sm text-gray-700 cursor-pointer'
                >
                  {option.label}
                </Label>
              </div>
            ))}
          </div>
        </div>

        {/* Clear Filters Button */}
        <Button
          variant='outline'
          onClick={() => onFiltersChange({})}
          className='w-full'
        >
          {t('doctorFilters.clearAllFilters')}
        </Button>
      </CardContent>
    </Card>
  );
};

export default DoctorFilters;
