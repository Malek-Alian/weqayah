import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { FaStar } from 'react-icons/fa';
import {
  LuUser,
  LuClock4,
  LuDollarSign,
  LuMapPin,
  LuCalendarDays,
} from 'react-icons/lu';
import { useTranslation } from 'react-i18next';
import { Avatar } from './ui/avatar';
import { AvatarImage } from './ui/avatar';
import { AvatarFallback } from './ui/avatar';

const DoctorCard = ({ doctor, onBookAppointment }) => {
  const { t } = useTranslation();

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <FaStar
        key={index}
        className={`h-4 w-4 ${
          index < Math.floor(rating)
            ? 'fill-yellow-400 text-yellow-400'
            : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <Card className='p-0 w-full border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow'>
      <CardContent className='p-6'>
        <div className='flex items-start gap-4'>
          {/* Doctor Profile Image */}
          <div className='flex-shrink-0'>
            <div className='w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden'>
              {/* <img
                src={doctor.profileImage}
                alt={doctor.name}
                className='w-full h-full object-cover'
                onError={(e) => {
                  e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                    doctor.name
                  )}&background=3b82f6&color=fff&size=150`;
                }}
              /> */}
              <Avatar className='size-20 rounded-full'>
                <AvatarImage src={doctor.profileImage} alt={doctor.name} />
                <AvatarFallback className='text-4xl font-bold text-primary'>
                  {doctor.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
            </div>
          </div>

          {/* Doctor Information */}
          <div className='flex-1 min-w-0'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-0'>
              <div className='col-span-1'>
                <h3 className='text-lg font-semibold text-gray-900 mb-1'>
                  {doctor.name}
                </h3>
                <p className='text-sm text-gray-600 mb-2'>{doctor.major}</p>

                {/* Rating */}
                <div className='flex items-center gap-2 mb-2'>
                  <div className='flex items-center gap-1'>
                    {renderStars(doctor.rating)}
                  </div>
                  <span className='text-sm text-gray-600'>
                    {t('doctorCard.from')} {doctor.reviewCount}{' '}
                    {t('doctorCard.visitors')}
                  </span>
                </div>

                {/* Specialization */}
                <div className='flex items-center gap-2 mb-2'>
                  <LuUser className='h-4 w-4 text-gray-500' />
                  <span className='text-sm text-gray-600'>
                    {doctor.major} {t('doctorCard.specializedIn')}{' '}
                    {doctor.specialty}
                  </span>
                </div>

                {/* Consultation Time */}
                <div className='flex items-center gap-2 mb-2'>
                  <LuClock4 className='h-4 w-4 text-gray-500' />
                  <span className='text-sm text-gray-600'>
                    {doctor.consultationTime}
                  </span>
                </div>

                {/* Fees */}
                <div className='flex items-center gap-2 mb-3'>
                  <LuDollarSign className='h-3.8 w-3.8 text-gray-500' />
                  <span className='text-sm text-gray-600'>
                    {t('doctorCard.fees')}: {doctor.fees} {doctor.currency}
                  </span>
                  <span className='text-sm text-red-500'>
                    ({t('doctorCard.feesNote')})
                  </span>
                </div>

                {/* Location */}
                <div className='flex items-center gap-2 mb-3'>
                  <LuMapPin className='h-3.8 w-3.8 text-gray-500' />
                  <span className='text-sm text-gray-600'>
                    {doctor.location}
                  </span>
                </div>

                {/* Insurance Badges */}
                <div className='flex flex-wrap gap-1 mb-3'>
                  {doctor.insurance.map((ins, index) => (
                    <Badge
                      key={index}
                      variant='secondary'
                      className='text-xs bg-blue-100 text-blue-800'
                    >
                      {ins}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Booking Section */}
              <div className='col-span-1 flex justify-start md:justify-end'>
                <div className='flex flex-col items-start gap-3'>
                  <div className='text-start'>
                    <LuCalendarDays className='h-8 w-8 text-primary mb-1' />
                    <p className='text-sm text-gray-600'>
                      {t('doctorCard.nextAvailable')}
                    </p>
                    <p className='text-sm font-medium text-gray-900'>
                      {doctor.nextAvailable}
                    </p>
                  </div>

                  <Button
                    onClick={() => onBookAppointment(doctor)}
                    className='bg-secondary hover:bg-secondary/90 text-secondary-foreground px-6 py-2 rounded-lg font-medium'
                  >
                    {t('doctorCard.bookAppointment')}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DoctorCard;
