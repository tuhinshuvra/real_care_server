import { v2 as cloudinary, UploadApiResponse } from "cloudinary"
import { envVars } from "./env"
import status from "http-status";
import AppError from "../errorHelpers/AppError";

cloudinary.config({
    cloud_name: envVars.CLOUDINARY.CLOUD_NAME,
    api_key: envVars.CLOUDINARY.API_KEY,
    api_secret: envVars.CLOUDINARY.API_SECRET
})

export const uploadFileToCloudinary = async (
    buffer: Buffer,
    filename: string
): Promise<UploadApiResponse> => {
    try {
        if (!buffer || !filename) {
            throw new Error("Buffer or filename is missing");
        }


        const extension = filename.split('.').pop()?.toLocaleLowerCase();

        const fileNameWithoutExtension = filename
            .split('.')
            .slice(0, -1)
            .join('.')
            .toLowerCase()
            .replace(/\s/g, '-')
            .replace(/[^a-z0-9-]/g, '');

        const uniqueName =
            Math.random().toString(36).substring(2) +
            '-' +
            Date.now() +
            '-' +
            fileNameWithoutExtension;

        const folder = extension === "pdf" ? "pdfs" : "images"

        return new Promise((resolve, reject) => {
            cloudinary.uploader.upload_stream(
                {
                    resource_type: "auto",
                    public_id: `real-healthcare/${folder}/${uniqueName}`,
                    folder: `real-healthcare/${folder}`,
                },
                (error, result) => {
                    if (error) {
                        return reject(new AppError(status.INTERNAL_SERVER_ERROR, "Failed to upload file to cloudinary"));
                    } else {
                        resolve(result as UploadApiResponse);
                    }
                }
            ).end(buffer);
        });


    } catch (error) {
        console.error("Error while uploading file to cloudinary:", error);
        throw new AppError(status.INTERNAL_SERVER_ERROR, "Failed to upload file to cloudinary");
    }
}

export const deleteFileFromCloudinary = async (url: string) => {
    try {
        // await cloudinary.uploader.destroy(url)
        const regex = /\/v\d+\/(.+?)(?:\.[a-zA-Z0-9]+)+$/;
        const match = url.match(regex);
        if (match && match[1]) {
            const publicId = match[1];
            await cloudinary.uploader.destroy(
                publicId, {
                resource_type: "image",
            });
            console.log(`File ${publicId} deleted from Cloudinary successfully`);
        }

    } catch (error) {
        console.error("Error while deleting file from cloudinary:", error);
        throw new AppError(status.INTERNAL_SERVER_ERROR, "Failed to delete file from cloudinary");
    }
}

export const cloudinaryUpload = cloudinary;