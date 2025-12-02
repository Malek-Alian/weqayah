import { t } from 'i18next';
import FAQ from './components/FAQ';
import HelpForm from './components/HelpForm';

function HelpPage() {
  const faqData = [
    {
      id: 'item-1',
      question: 'How do I book an appointment with a doctor?',
      answer:
        'You can book an appointment by searching for doctors using our search feature, filtering by specialty, location, or availability. Once you find a suitable doctor, click on their profile and select your preferred time slot.',
    },
    {
      id: 'item-2',
      question: 'What payment methods do you accept?',
      answer:
        'We accept all major credit cards, debit cards, and digital payment methods including PayPal, Apple Pay, and Google Pay. All transactions are secure and encrypted.',
    },
    {
      id: 'item-3',
      question: 'Can I cancel or reschedule my appointment?',
      answer:
        'Yes, you can cancel or reschedule your appointment up to 24 hours before the scheduled time. You can do this through your dashboard or by contacting our support team.',
    },
    {
      id: 'item-4',
      question: 'How do I access my medical records?',
      answer:
        "Your medical records are securely stored in your patient dashboard. You can access them anytime by logging into your account and navigating to the 'Medical Records' section.",
    },
    {
      id: 'item-5',
      question: 'Is my personal information secure?',
      answer:
        'Absolutely. We use industry-standard encryption and security measures to protect your personal and medical information. All data is stored securely and complies with healthcare privacy regulations.',
    },
    {
      id: 'item-6',
      question: 'What if I need emergency medical care?',
      answer:
        "If you're experiencing a medical emergency, please call your local emergency services immediately (911 in the US). Our platform is designed for non-emergency consultations and appointments.",
    },
    {
      id: 'item-7',
      question: 'How do I contact customer support?',
      answer:
        "You can contact our customer support team through this help form, email us at support@weqayah.com, or call our toll-free number at 1-800-WEQAYAH. We're available 24/7 to assist you.",
    },
  ];

  return (
    <div className='min-h-screen bg-gray-50 py-8'>
      <div className='container mx-auto px-4 max-w-6xl'>
        {/* Header */}
        <div className='text-center mb-12'>
          <h1 className='text-4xl font-bold text-gray-900 mb-4'>
            {t('help.title')}
          </h1>
          <p className='text-xl text-gray-600'>{t('help.description')}</p>
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12'>
          {/* Image Placeholder */}
          <div className='hidden lg:block'>
            <div className='h-full bg-gradient-to-br from-primary/30 to-secondary/20 rounded-xl flex items-center justify-center'>
              <div className='text-center p-8'>
                <div className='w-32 h-32 bg-primary/20 rounded-full mx-auto mb-4 flex items-center justify-center'>
                  <svg
                    className='w-16 h-16 text-primary'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z'
                    />
                  </svg>
                </div>
                <h3 className='text-xl font-semibold text-gray-800 mb-2'>
                  {t('help.placeholder.title')}
                </h3>
                <p className='text-gray-600'>
                  {t('help.placeholder.description')}
                </p>
              </div>
            </div>
          </div>

          {/* Help Form */}
          <HelpForm />
        </div>

        {/* FAQ Section */}
        <FAQ items={faqData} />
      </div>
    </div>
  );
}

export default HelpPage;
