const { ImageUploadUtil } = require("../../helpers/cloudinary");

const handleImageUpload = async(req, res) => {
    try{
        const b64 = Buffer.from(req.file.buffer).toString('base64');
        const url = "data:" + req.file.mimetype + ";base64," + b64;
        const result = await ImageUploadUtil(url);

        res.json({
            succes: true,
            result
        });

    }catch(error){
        console.log(error);
        res.json({  
            success: false,
            message:"Error occurred"
        });
    }
};

module.exports = {handleImageUpload}