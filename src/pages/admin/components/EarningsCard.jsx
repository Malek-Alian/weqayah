import { FileText } from 'lucide-react';
import { Link } from 'react-router-dom';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '../../../components/ui/card';

const EarningsCard = ({ earnings = [] }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className='text-lg font-semibold'>
          Total Earnings by Ad
        </CardTitle>
      </CardHeader>
      <CardContent className='space-y-4'>
        {earnings.map((earning, index) => (
          <div
            key={index}
            className='flex items-center justify-between p-3 bg-gray-50 rounded-lg'
          >
            <div className='flex items-center space-x-3'>
              <div className='p-2 bg-orange-100 rounded-lg'>
                <FileText className='h-4 w-4 text-orange-600' />
              </div>
              <div>
                <p className='font-medium text-sm'>{earning.title}</p>
                <p className='text-xs text-gray-500'>{earning.date}</p>
              </div>
            </div>
            <span className='text-green-600 font-semibold text-sm'>
              {earning.amount}
            </span>
          </div>
        ))}
        <div className='pt-2'>
          <Link to='/admin/advertisements' className='text-primary p-0 h-auto'>
            Manage Ads
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default EarningsCard;
