import { UploadApiResponse } from 'cloudinary';
import cloudinary from '../config/cloudinary.js';

export const uploadImage = async (
    fileBuffer: Buffer,
    folder: string
): Promise<string> => {
    return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
            {
                folder,
                resource_type: 'image',
                transformation: [
                    { width: 800, crop: 'limit' }, 
                    { quality: 'auto' },            
                    { fetch_format: 'auto' },       
                ],
            },
            (error, result: UploadApiResponse | undefined) => {
                if (error) reject(error);
                else resolve(result!.secure_url);
            }
        );
        stream.end(fileBuffer);
    });
};

export const deleteImage = async (imageUrl: string): Promise<void> => {
    // Get everything after /upload/
    const uploadIndex = imageUrl.indexOf("/upload/");

    if (uploadIndex === -1) {
        throw new Error("Invalid Cloudinary URL");
    }

    let publicId = imageUrl.substring(uploadIndex + "/upload/".length);

    // Remove version (v1234567890/)
    publicId = publicId.replace(/^v\d+\//, "");

    // Remove extension
    publicId = publicId.replace(/\.[^/.]+$/, "");

    console.log("Deleting Cloudinary publicId:", publicId);

    const result = await cloudinary.uploader.destroy(publicId);

    console.log(result);
};