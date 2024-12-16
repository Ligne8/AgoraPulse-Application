import { getUserId } from './client';
import supabase from './supabase';
import { router } from 'expo-router';

// interface Store {
//   description: string;
//   name: string;
//   tag_id: string;
//   web_url: string;
//   address: string;
//   city: string;
//   zip_code: string;
//   box_code: string;
//   id: string;
// }
export async function getAdsByStoreId(storeId: string) {
  const { data, error } = await supabase.from('Ads').select('id, notification').eq('store_id', storeId);
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

// interface UserAds {
//   client_id?: string;
//   ads_id: string;
//   code: string;
//   sended_at: Date;
// }

export async function scan(boxCode: string): Promise<{ notification: string }> {
  const userId: string | undefined = await getUserId();
  if (!userId || userId == null) {
    router.push('/WelcomePage');
    throw new Error('User not logged in');
  }

  // Récupération du magasin à partir du boxCode
  const store = await getStoreFromBoxCode(boxCode);
  if (!store) {
    throw new Error('Store not found');
  }

  const storeId: string = store.id;

  // Récupérer les publicités associées au magasin
  const ads = await getAdsByStoreId(storeId);

  // Vérifie si des publicités existent
  if (!ads || ads.length === 0) {
    throw new Error('No ads found for this store');
  }

  for (const ad of ads) {
    const code = generateUniqueCode();
    const userAds = {
      client_id: userId,
      ads_id: ad.id,
      code,
      sended_at: new Date(),
    };

    // Vérifie si la publicité a déjà été envoyée à cet utilisateur
    const res: any = await supabase.from('UsersAds').select('ads_id').eq('client_id', userId).eq('ads_id', ad.id);

    if (res.data.length > 0) {
      continue; // Passe à l'annonce suivante si elle a déjà été envoyée
    } else {
      const userAdsInsert = await supabase.from('UsersAds').insert(userAds).select('*');
      if (userAdsInsert.error) {
        console.error(userAdsInsert.error);
        throw new Error('Error saving user ads');
      }
    }
  }

  // Retourne la notification de la première publicité trouvée
  const firstAdNotification = ads[0]?.notification;
  if (!firstAdNotification) {
    throw new Error('Notification field not found in ads');
  }

  return { notification: firstAdNotification };
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
