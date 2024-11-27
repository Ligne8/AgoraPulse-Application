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

export const getLoyaltyOffersByClientId = async () => {
  try {
    const { data: userAchievements, error: userAchievementsError } = await supabase
      .from('UsersAchievement')
      .select('*')
      .eq('client_id', (await supabase.auth.getUser()).data.user?.id);

    if (userAchievementsError) {
      console.error(userAchievementsError);
      throw new Error('Error fetching user achievements');
    }

    const achievementsWithFidelityPoints = [];

    for (const userAchievement of userAchievements) {
      const { data: achievements, error: achievementsError } = await supabase
        .from('Achievement')
        .select('*')
        .eq('id', userAchievement.achievement_id);

      if (achievementsError) {
        console.error(achievementsError);
        throw new Error('Error fetching achievements');
      }

      for (const achievement of achievements) {
        const { data: userStore, error: userStoreError } = await supabase
          .from('UsersStores')
          .select('fidelity_points')
          .eq('store_id', achievement.store_id);

        if (userStoreError) {
          console.error(userStoreError);
          throw new Error('Error fetching fidelity points');
        }

        achievementsWithFidelityPoints.push({
          ...achievement,
          fidelity_points: userStore?.[0]?.fidelity_points || 0,
        });
      }
    }

    return achievementsWithFidelityPoints;
  } catch (error) {
    console.error(error);
    throw new Error('Error fetching loyalty offers');
  }
};
