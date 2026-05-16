import { supabase } from "../../config/supabaseConfig.js";
const uploadPfp = async (
  fileBuffer: Buffer,
  userId: string,
) => {
  const { data, error } = await supabase.storage
    .from("e3dadkhodam")
    .upload(`/pfp/${userId}/profile.jpg`, fileBuffer,{
    contentType: "image/jpeg",
    upsert: true,
  });
  if (error) {
    return error;
  }
  return { pfpUrl: await getPfpUrl(userId) };
};
const getPfpUrl = async (userId: string) => {
  const { data, error } = await supabase.storage
    .from("e3dadkhodam")
    .createSignedUrl(`/pfp/${userId}/profile.jpg`, 60);
  if (error) {
    return error;
  }
  return data.signedUrl;
};
const deletePfp = async (userId: string) => {
  const { data, error } = await supabase.storage
    .from("e3dadkhodam")
    .remove([`/pfp/${userId}/profile.jpg`]);
  if (error) {
    return error;
  }
  return data;
};
export { uploadPfp, getPfpUrl, deletePfp };
