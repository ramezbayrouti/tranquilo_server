import axios from "axios";
import FormData from "form-data";
import fs from "fs";

const uploadToImageBB = async (filePath) => {

    const IMAGE_BB_API_KEY = process.env.IMAGE_BB_API_KEY;

    try {
        const form = new FormData();
        form.append("image", fs.createReadStream(filePath));

        const response = await axios.post(
            `https://api.imgbb.com/1/upload?key=${IMAGE_BB_API_KEY}`,
            form,
            {
                headers: form.getHeaders(),
            }
        );

        return response.data.data.url; // The URL of the uploaded image
    } catch (error) {
        console.error("Error uploading to ImageBB:", error.message);
        throw new Error("Image upload failed");
    }
};

export default uploadToImageBB;