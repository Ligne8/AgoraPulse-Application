import { createClient } from '@supabase/supabase-js';
const supabaseUrl = 'https://app.ligne8.live';
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlzcyI6InN1cGFiYXNlLWRlbW8iLCJpYXQiOjE2NDE3NjkyMDAsImV4cCI6MTc5OTUzNTYwMH0.nw1CI_l_2GirWV0TVAjKyn8OC4TS8Bw2o3f9imIg_6M';
const supabase = createClient(supabaseUrl, supabaseKey);
export default supabase;

export const getUserData = async () => {
  const user: any = await supabase.from('UserApp').select('*');
  if (user.error) {
    console.error(user.error);
    throw new Error('Error fetching user data');
  } else if (user.data.length > 1) {
    throw new Error('No user found');
  } else {
    return user.data[0];
  }
};

export interface Tag {
  id: string;
  name: string;
}

export async function getAllStandalonTags(): Promise<any> {
  const { data, error } = await supabase.from('Tags').select('*');
  if (error) {
    console.error(error);
    throw new Error('Error fetching tags');
  } else {
    return data;
  }
}

export async function getAllTags() {
  const { data, error } = await supabase.rpc('getalltags');
  if (error) {
    console.error(error);
    throw new Error('Error fetching tags');
  } else {
    return data;
  }
}

async function deleteUserTags() {
  const { error } = await supabase
    .from('UsersTags')
    .delete()
    .eq('user_id', (await supabase.auth.getUser()).data.user?.id);
  if (error) {
    console.error(error);
    throw new Error('Error deleting tags');
  }
}

export async function saveUserTags(tags: Tag[]) {
  try {
    await deleteUserTags();
  } catch {
    console.error('Error deleting tags');
  }

  const payload = tags.map((tag) => ({ tags_id: tag.id }));
  const { data, error } = await supabase.from('UsersTags').upsert(payload);
  if (error) {
    console.log(error);
    throw new Error('Error saving tags');
  } else {
    return data;
  }
}

export interface Store {
  description: string;
  name: string;
  tag_id: string;
  web_url: string;
  address: string;
  city: string;
  zip_code: string;
}

export async function createStore(data: Store) {
  const { error } = await supabase.from('Store').insert(data);
  if (error) {
    console.error(error);
    throw new Error('Error creating store');
  }
}

export async function getStore() {
  const { data, error } = await supabase
    .from('Store')
    .select('*')
    .eq('user_id', await getUserId());
  if (error) {
    console.error(error);
    throw new Error('Error fetching store');
  } else {
    return data[0];
  }
}

export const getUserId = async () => {
  return (await supabase.auth.getUser()).data.user?.id;
};

export async function getStoreId() {
  const store = await getStore();
  return store.id;
}

export interface Picture {
  store_id: string;
  image_name: string;
  type: string;
}

export async function savePicture(Picture: Picture) {
  const { error } = await supabase.from('Picture').insert(Picture);
  if (error) {
    console.error(error);
    throw new Error('Error saving picture');
  }
}

export async function savePictureBucket(image_name: string, store_id: string, blob: any, type: string) {
  const { error } = await supabase.storage
    .from('StoreImages')
    .upload(`${store_id}/${image_name}`, blob, { cacheControl: '3600', upsert: true, contentType: type });
  if (error) {
    console.log('he');
    throw new Error('Error saving picture in bucket');
  }
}

export async function setUserCompleted() {
  const { error } = await supabase
    .from('UserApp')
    .update({ profil_completed: true })
    .eq('id', (await getUserData()).id)
    .select();

  if (error) {
    console.error(error);
    throw new Error('Error updating user');
  }
}
export async function getAds() {
  const { data, error } = await supabase
    .from('Ads')
    .select('*')
    .eq('store_id', await getStoreId());
  if (error) {
    console.error(error);
    throw new Error('Error fetching ads');
  } else {
    return data;
  }
}

export async function getAchievements() {
  const { data, error } = await supabase
    .from('Achievement')
    .select('*')
    .eq('store_id', await getStoreId());
  if (error) {
    console.error(error);
    throw new Error('Error fetching ads');
  } else {
    return data;
  }
}
