import { getStoreFromBoxCode } from './scan';
import supabase from './supabase';

export async function getNbAdsByStoreId(boxCode: string): Promise<number | null> {
  try {
    const store = await getStoreFromBoxCode(boxCode);
    if (!store || !store.id) {
      console.error(`Store introuvable pour le boxCode: ${boxCode}`);
      return null;
    }

    const storeId = store.id;

    const { count, error } = await supabase.from('Ads').select('store_id', { count: 'exact' }).eq('store_id', storeId);

    if (error) {
      console.error("Erreur lors de la récupération du nombre d'annonces:", error);
      return null;
    }

    return count || 0;
  } catch (error) {
    console.error('Erreur dans getNbAdsByStoreId:', error);
    return null;
  }
}

export async function getNbNotificationSendByStoreId(boxCode: string) {
  const store = await getStoreFromBoxCode(boxCode);
  const storeId = store.id;
  return supabase.from('Store').select('id, nb_notifications').eq('store_id', storeId);
}

export async function incrementNbNotificationSendByStoreId(boxCode: string) {
  const store = await getStoreFromBoxCode(boxCode);
  const storeId = store.id;
  const { data, error } = await supabase.from('Store').select('nb_notifications').eq('id', storeId).single();

  if (error) {
    console.error('Erreur lors de la récupération de nb_notifications:', error);
    return;
  }

  const currentNbNotifications = data.nb_notifications ?? 0;

  const newNbNotifications = currentNbNotifications + 1;

  const { error: updateError } = await supabase
    .from('Store')
    .update({ nb_notifications: newNbNotifications })
    .eq('id', storeId);

  if (updateError) {
    console.error('Erreur lors de la mise à jour de nb_notifications:', updateError);
  } else {
    console.log('nb_notifications mis à jour avec succès');
  }
}
