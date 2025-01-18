import { supabase } from "./supabase";

const BUCKETNAME = "QT-PUBLIC";

export const uploadImage = async (file: File, bucketName: string = BUCKETNAME): Promise<string> => {
    const fileName = `${Date.now()}-${file.name}`;
    const { data, error } = await supabase.storage
        .from(bucketName)
        .upload(fileName, file, {
            cacheControl: '3600',
            upsert: false,
        });

    if (error) {
        throw new Error('Failed to upload file');
    }

    console.log('File uploaded to:', data);

    return fileName;
};

export const getPublicUrl = (fileName: string, bucketName: string = BUCKETNAME): string => {
    const { data } = supabase.storage.from(bucketName).getPublicUrl(fileName);
    return data?.publicUrl || '';
};