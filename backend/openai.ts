import supabase from '@/backend/client';
import { FormData } from '@/components/OfferForm';

// const payload = {
//   ad_type: 'reduction',
//   input: {
//     fields: {
//       reduction_value: '20',
//     },
//     store_information: {
//       store_name: 'La pizza de la MaMa',
//       store_id: 'store12345',
//       location: 'Paris, France',
//     },
//   },
// };

interface StoreInformation {
  store_name: string;
  store_id: string;
  location: string;
}

interface InputData {
  fields: {
    reduction?: string;
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
}

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
}

export async function constructRequest(type: string, formData: FormData): Promise<AIRequest> {
  const request: AIRequest = {
    ad_type: type as 'reduction' | 'special',
    input: {
      fields: {},
      store_information: {
        store_name: 'La pizza de la MaMa',
        store_id: 'store12345',
        location: 'Paris, France',
      },
    },
  };

  if (type === 'reduction') {
    request.ad_type = 'reduction';
    request.input.fields.reduction = formData.reduction.toString();
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
    const { data, error } = await supabase.functions.invoke('openai', {
      body: body,
    });

    if (error) {
      console.error('Error invoking function:', error);
      return null;
    }
    const aiInfo = data as AIInformation;
    printAIInfo(aiInfo);
    return aiInfo;
  } catch (err) {
    console.error('Error fetching AI information:', err);
    return null;
  }
}
