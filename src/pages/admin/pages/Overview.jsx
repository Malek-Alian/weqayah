import StatsCard from '../components/StatsCard';
import CustomLineChart from '../components/LineChart';
import EarningsCard from '../components/EarningsCard';
import ContactRequestsCard from '../components/ContactRequestsCard';

function Overview() {
  // Mock data for charts
  const medicalNewsData = [
    { month: 'Jul', posts: 120 },
    { month: 'Aug', posts: 180 },
    { month: 'Sep', posts: 250 },
    { month: 'Oct', posts: 780 },
    { month: 'Nov', posts: 320 },
    { month: 'Dec', posts: 280 },
    { month: 'Jan', posts: 650 },
  ];

  const blogPostsData = [
    { month: 'Jul', posts: 150 },
    { month: 'Aug', posts: 200 },
    { month: 'Sep', posts: 300 },
    { month: 'Oct', posts: 750 },
    { month: 'Nov', posts: 350 },
    { month: 'Dec', posts: 300 },
    { month: 'Jan', posts: 680 },
  ];

  // Mock data for earnings
  const earningsData = [
    {
      title: 'Homepage Ad',
      date: '28 January, 2025',
      amount: '200JD',
    },
    {
      title: 'Medical News Ads',
      date: '25 August 2025',
      amount: '300JD',
    },
    {
      title: 'Blogs Ads',
      date: '21 October 2025',
      amount: '400JD',
    },
  ];

  // Mock data for contact requests
  const contactRequestsData = [
    { title: 'CONTACT CONTACT', date: '21 October 2025' },
    { title: 'CONTACT CONTACT', date: '21 October 2025' },
    { title: 'CONTACT CONTACT', date: '21 October 2025' },
  ];

  return (
    <div className='space-y-6'>
      {/* Users Section */}
      <div>
        <h2 className='text-2xl font-bold text-gray-900 mb-4'>Users</h2>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
          <StatsCard
            title='Total Doctors (Non-Subs)'
            value='10,000'
            gradient='bg-gradient-to-r from-primary to-primary/80'
            onButtonClick={() => console.log('View all non-sub doctors')}
          />
          <StatsCard
            title='Total Doctors (Active Subs)'
            value='1,000'
            gradient='bg-gradient-to-r from-teal-600 to-teal-700'
            onButtonClick={() => console.log('View all active subscribers')}
          />
          <StatsCard
            title='Total Patients'
            value='100,000'
            gradient='bg-gradient-to-r from-green-600 to-green-700'
            onButtonClick={() => console.log('View all patients')}
          />
        </div>
      </div>

      {/* Charts and Cards Section */}
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
        {/* Medical News Chart */}
        <CustomLineChart
          title='Total Medical News Posts by Month'
          data={medicalNewsData}
          dataKey='posts'
          color='#3b82f6'
        />

        {/* Earnings Card */}
        <EarningsCard earnings={earningsData} />
      </div>

      {/* Bottom Row */}
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
        {/* Blog Posts Chart */}
        <CustomLineChart
          title='Total Blog Posts by Month'
          data={blogPostsData}
          dataKey='posts'
          color='#3b82f6'
        />

        {/* Contact Requests Card */}
        <ContactRequestsCard requests={contactRequestsData} />
      </div>
    </div>
  );
}

export default Overview;
