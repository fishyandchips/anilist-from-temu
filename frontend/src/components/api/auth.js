import supabase from '@/config/supabaseClient';

export const signUp = async ({ email, username, password, genres }) => {
  const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
    email,
    password
  });

  if (signUpError) throw new Error(signUpError.message);

  const userId = signUpData.user?.id;
  if (!userId) throw new Error("Could not get userId from signup.");

  const { error: profileError } = await supabase
    .from("profile")
    .upsert({
      id: userId,
      username,
      genre_preferences: genres,
    }, { onConflict: 'id' })

  if (profileError) throw new Error(profileError.message);
}

export const signIn = async ({ email, password }) => {
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password
  });

  if (error) throw new Error(error.message);
}

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();

  if (error) throw new Error(error.message);
}
