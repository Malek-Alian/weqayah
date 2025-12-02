import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '../../../components/ui/card';

const ContactRequestsCard = ({ requests = [] }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className='text-lg font-semibold'>
          Contact Requests
        </CardTitle>
      </CardHeader>
      <CardContent className='space-y-3'>
        {requests.map((request, index) => (
          <div key={index} className='p-3 bg-gray-50 rounded-lg'>
            <p className='font-semibold text-sm text-gray-800'>
              {request.title}
            </p>
            <p className='text-xs text-gray-500 mt-1'>{request.date}</p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default ContactRequestsCard;
