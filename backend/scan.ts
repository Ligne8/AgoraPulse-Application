import { getUserId } from './client';
import supabase from './supabase';
import { router } from 'expo-router';

interface Store {
  description: string;
  name: string;
  tag_id: string;
  web_url: string;
  address: string;
  city: string;
  zip_code: string;
  box_code: string;
  id: string;
}
export async function getAdsByStoreId(storeId: string) {
  const { data, error } = await supabase.from('Ads').select('id').eq('store_id', storeId);
  if (error) {
    console.error(error);
    throw new Error('Error fetching ads');
  } else {
    return data;
  }
}

function generateUniqueCode(length: number = 8): string {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters[randomIndex];
  }

  return result;
}

interface UserAds {
  client_id?: string;
  ads_id: string;
  code: string;
  sended_at: Date;
}

export async function scan(boxCode: string) {
  const userId: string | undefined = await getUserId();
  if (!userId || userId == null) {
    router.push('/WelcomePage');
  }
  const store: Store = await getStoreFromBoxCode(boxCode);
  const storeId: string = store.id;
  const ads = await getAdsByStoreId(storeId);
  for (const ad of ads) {
    const code = generateUniqueCode();
    const userAds: UserAds = {
      client_id: userId,
      ads_id: ad.id,
      code,
      sended_at: new Date(),
    };
    const res: any = await supabase.from('UsersAds').select('ads_id').eq('client_id', userId).eq('ads_id', ad.id);
    if (res.data.length > 0) {
      continue;
    } else {
      const userAdsInsert = await supabase.from('UsersAds').insert(userAds).select('*');
      if (userAdsInsert.error) {
        console.error(userAdsInsert.error);
        throw new Error('Error saving user ads');
      }
    }
    //console.log(data);
    //console.log(error);
    // TODO Enregistrer l'offre pour le client
  }

  // TODO Appeler les notifications
}

export async function getStoreById(storeId: string) {
  const { data, error } = await supabase.from('Store').select('*').eq('id', storeId);
  if (error) {
    console.error(error);
    throw new Error('Error fetching store');
  } else {
    return data[0];
  }
}

export async function getStoreFromBoxCode(boxCode: string) {
  const { data, error } = await supabase.from('Store').select('*').eq('box_code', boxCode);
  if (error) {
    console.error(error);
    throw new Error('Error fetching store');
  } else {
    return data[0];
  }
}
