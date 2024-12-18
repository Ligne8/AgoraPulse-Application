import { Store } from '@/backend/client';
import supabase from '@/backend/supabase';
import { FormData } from '@/components/OfferForm';

interface StoreInformation {
  store_name: string;
  store_id: string;
  location: string;
}

interface InputData {
  fields: {
    reduction?: string;
    product?: string;
    event_name?: string;
    date?: string;
  };
  store_information: StoreInformation;
}

type AIRequest = {
  ad_type: 'reduction' | 'special';
  input: InputData;
};

export interface AIInformation {
  success: string;
  ad_type: string;
  response: string;
  title: string;
  description: string;
  notification: string;
  prompt: string;
  image_url: string | null;
}

// eslint-disable-next-line no-unused-vars,@typescript-eslint/no-unused-vars
function printAIInfo(aiInfo: AIInformation) {
  console.log('AI Information:');
  console.log('----------------');
  console.log('Success:', aiInfo.success);
  console.log('----------------');
  console.log('Ad Type:', aiInfo.ad_type);
  console.log('----------------');
  console.log('Data:', aiInfo.title);
  console.log('----------------');
  console.log('Data:', aiInfo.description);
  console.log('----------------');
  console.log('Data:', aiInfo.notification);
  console.log('----------------');
  console.log('Prompt:', aiInfo.prompt);
  console.log('----------------');
  if (aiInfo.image_url === null) {
    return;
  }
  console.log('Image URL:', aiInfo.image_url);
}

export async function constructRequest(type: string, formData: FormData, store: Store): Promise<AIRequest> {
  const request: AIRequest = {
    ad_type: type as 'reduction' | 'special',
    input: {
      fields: {},
      store_information: {
        store_name: store.name,
        store_id: store.tag_id,
        location: store.city,
      },
    },
  };

  if (type === 'reduction') {
    request.ad_type = 'reduction';
    request.input.fields.reduction = formData.reduction.toString();
    request.input.fields.product = formData.product.toString();
  } else if (type === 'special') {
    request.ad_type = 'special';
    request.input.fields.event_name = formData.description.toString();
    request.input.fields.date = formData.eventDate.toString();
  }
  return request;
}

export default async function fetchAiInformation(body: AIRequest): Promise<AIInformation | null> {
  console.log('Calling AI function...');

  const fakeData: AIInformation = {
    success: 'true',
    ad_type: 'reduction',
    response: 'This is a test',
    title: 'QR Code pour 15% de réduction sur la Margherita chez "La pizza de la mama".',
    description:
      'Profitez d\'une réduction exceptionnelle de 15% sur la Margherita chez "La pizza de la mama". Comment en bénéficier ? C\'est simple et rapide ! Présentez ce QR code lors de votre commande en restaurant pour obtenir instantanément votre réduction. Mais ne tardez pas, l\'offre est limitée dans le temps ! Alors, n\'attendez plus et venez savourer la délicieuse pizza Margherita chez "La pizza de la mama", avant que cette offre incroyable ne se termine.',
    notification:
      'Un QR code pour une Margherita à 15% de moins chez "La pizza de la mama" ! Vite, l\'offre est temporaire !',
    prompt: 'Prompt Test',
    image_url:
      'https://app.ligne8.live/storage/v1/object/sign/StoreImages/pizza-de-la-mama-min.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJTdG9yZUltYWdlcy9waXp6YS1kZS1sYS1tYW1hLW1pbi5wbmciLCJpYXQiOjE3MzQ1Mzc5MTAsImV4cCI6MTc2NjA3MzkxMH0.aHhgb6TuJ4NVjevKqlvIh9tlQO5YRqylCXTHLZ4L4nw&t=2024-12-18T16%3A05%3A10.965Z',
  };

  const timeout = (ms: number) =>
    new Promise<AIInformation>((resolve) => {
      setTimeout(() => {
        console.warn('Request timed out, returning fake data.');
        resolve(fakeData);
      }, ms);
    });

  try {
    const response = await Promise.race([
      (async () => {
        const { data: firstCall, error: firstError } = await supabase.functions.invoke('openai', {
          body: body,
        });

        if (firstError) {
          console.error('Error invoking function:', firstError);
          return null;
        }

        const aiInfo = firstCall as AIInformation;

        const { data: secondCall, error: secondError } = await supabase.functions.invoke('openai-image', {
          body: body,
        });

        if (secondError) {
          console.error('Error invoking function:', secondError);
          return null;
        }

        aiInfo.image_url = encodeURI(secondCall.url);
        return aiInfo;
      })(),
      timeout(50000),
    ]);

    return response;
  } catch (err) {
    console.error('Error fetching AI information:', err);
    return null;
  }
}
