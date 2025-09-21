import supabase from '@/config/supabaseClient';

export const fetchSettings = async () => {
  const { data: { user } } = await supabase.auth.getUser();
  const userId = user?.id;

  const { data, error } = await supabase
    .from("profile")
    .select("profile_color, site_theme, about, avatar, banner, username")
    .eq('id', userId)
    .single();

  if (error) throw new Error(error.message);

  return { data: data, email: user?.email };
}

export const updateSettings = async (newSettings) => {
  const { data: { user } } = await supabase.auth.getUser();
  const userId = user?.id;

  const { error } = await supabase
    .from("profile")
    .update(newSettings)
    .eq('id', userId);

  if (error) throw new Error(error.message);
}

export const uploadImage = async ({ e, bucket, maxMBSize }) => {
  const file = e.target.files[0];
  if (!file) {
    return;
  }

  if (!['image/jpeg', 'image/png'].includes(file.type)) {
    throw new Error("Only JPEG or PNG files are allowed.");
  }

  if (file.size > maxMBSize * 1024 * 1024) {
    throw new Error(`File exceeds ${maxMBSize} MB limit.`);
  }

  const { data: { user } } = await supabase.auth.getUser();
  const userId = user?.id;

  const { error } = await supabase.storage
    .from(bucket)
    .upload(`${userId}_${file.name}`, file, { upsert: true });

  if (error) throw new Error(error.message);

  const { data } = supabase.storage
    .from(bucket)
    .getPublicUrl(`${userId}_${file.name}`);

  return data.publicUrl;
}

export const resetImage = async ({ bucket, url }) => {
  if (!url) return;

  const fileName = url.split('/').pop();

  const { error } = await supabase.storage
    .from(bucket)
    .remove([fileName]);

  if (error) throw new Error(error.message);
}

export const updateEmail = async (data) => {
  const { error } = await supabase.auth.updateUser({ 
    email: data.email 
  });
  
  if (error) throw new Error(error.message);
}

export const updatePassword = async (data) => {
  const { error } = await supabase.auth.updateUser({ 
    password: data.password 
  });
  
  if (error) throw new Error(error.message);
}

export const deleteScores = async (medium) => {
  const { data: { user } } = await supabase.auth.getUser();
  const userId = user?.id;

  const { error } = await supabase
    .from("list_items")
    .update({ rating: null })
    .eq('user_id', userId)
    .eq('medium', medium);

  if (error) throw new Error(error.message);
}

export const deleteList = async (medium) => {
  const { data: { user } } = await supabase.auth.getUser();
  const userId = user?.id;

  const { error } = await supabase
    .from("list_items")
    .delete()
    .eq('user_id', userId)
    .eq('medium', medium);

  if (error) throw new Error(error.message);
}
