import supabase from '@/config/supabaseClient';

export const fetchListItems = async (medium) => {
  const { data: { user } } = await supabase.auth.getUser();
  const userId = user?.id;

  const { data, error } = await supabase
    .from("list_items")
    .select("*")
    .eq('user_id', userId)
    .eq("medium", medium)
  ;

  if (error) throw new Error(error.message);

  return data;
}