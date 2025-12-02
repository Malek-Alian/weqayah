import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { t } from 'i18next';

function FAQ({ items }) {
  return (
    <Card className='py-0'>
      <CardHeader className='bg-primary text-white rounded-t-xl py-4'>
        <CardTitle className='text-3xl text-center'>
          {t('help.faq.title')}
        </CardTitle>
        <CardDescription className='text-primary-foreground text-center'>
          {t('help.faq.description')}
        </CardDescription>
      </CardHeader>
      <CardContent className='p-6 pt-0'>
        <Accordion type='single' collapsible className='w-full'>
          {items.map((item) => (
            <AccordionItem
              key={item.id}
              value={item.id}
              className='border-b border-gray-200 last:border-b-0'
            >
              <AccordionTrigger className='text-left hover:no-underline py-4 text-gray-800 font-medium'>
                {item.question}
              </AccordionTrigger>
              <AccordionContent className='text-gray-600 pb-4'>
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </CardContent>
    </Card>
  );
}

export default FAQ;
