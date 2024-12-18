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
  try {
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
  } catch (err) {
    console.error('Error fetching AI information:', err);
    return null;
  }
}
