import supabase from '@/backend/client';

const payload = {
  'ad_type': 'reduction',
  'input': {
    'fields': {
      'reduction_value': '20'
    },
    'tags': ['important', 'announcement', 'update'],
    'description': 'This is a randomly generated description for the announcement.',
    'title': 'Exciting New Update!',
    'store_information': {
      'store_name': 'La pizza de la MaMa',
      'store_id': 'store12345',
      'location': 'Paris, France'
    }
  }
};

export interface AIInformation {
  success: string;
  ad_type: string;
  data: string
  prompt: string;
}
function printAIInfo(aiInfo: AIInformation) {
  console.log('AI Information:');
  console.log('----------------');
  console.log('Success:', aiInfo.success);
  console.log('----------------');
  console.log('Ad Type:', aiInfo.ad_type);
  console.log('----------------');
  console.log('Data:', aiInfo.data);
  console.log('----------------');
  console.log('Prompt:', aiInfo.prompt);
  console.log('----------------');
}

export default async function fetchAiInformation(): Promise<AIInformation | null> {
  console.log('Calling AI function...');
  try {
    const { data, error } = await supabase.functions.invoke('openai', {
      body: payload
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
