import { supabase } from "../../config/supabaseConfig.ts";
const uploadLectures = async (
  fileBuffer: Buffer,
  mimeType: string,
  lectureId: string,
  subject: string,
) => {
  const { data, error } = await supabase.storage
    .from("e3dadkhodam")
    .upload(
      `/lectures/${subject}/${mimeType.split("/")[0]}/${lectureId}.${mimeType.split("/")[1]}`,
      fileBuffer,
      {
        contentType: mimeType,
      },
    );
  if (error) {
    return error;
  }
  return { lecturePath: data.path, lectureUrl: await getLectureUrl(data.path) };
};
const getLectureUrl = async (path: string) => {
  const { data, error } = await supabase.storage
    .from("e3dadkhodam")
    .createSignedUrl(path, 4 * 60 * 60, { download: true });
  if (error) {
    return error;
  }
  return data.signedUrl;
};
const deleteLecture = async (
  mimeType: string,
  lectureId: string,
  subject: string,
) => {
  const { data, error } = await supabase.storage
    .from("e3dadkhodam")
    .remove([
      `/lectures/${subject}/${mimeType.split("/")[0]}/${lectureId}.${mimeType.split("/")[1]}`,
    ]);
  if (error) {
    return error;
  }
  return data;
};
export { uploadLectures, getLectureUrl, deleteLecture };
