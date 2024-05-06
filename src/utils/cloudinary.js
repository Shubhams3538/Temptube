// importing cloudinary first we will upload any file to our
// server using multer and then from multer we will upload
// it to cloudinary
import { v2 } from 'cloudinary';
// fs is provided by the node.js , it is file system
import fs from 'fs';

// we will have to pass these values to cloudinary to let him the the user details
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// this is the the code to uplaod the file from our localsystem to cloudinary
const uploadOnCloudinary = async (localFilePath) => {
  try {
    // if there is no path
    if (!localFilePath) return null;

    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: 'auto',
    });
    // this is for us to know how the file upload works
    console.log('File uploaded on Cloudinary', response.url);
    return response;
  } catch (error) {
    fs.unlinkSync(localFilePath); // this will remove the locally saved temporary
    // file as the upload operation failed
    return null;
  }
};

export { uploadOnCloudinary };
