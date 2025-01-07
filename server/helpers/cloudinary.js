const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const { handleImageUpload } = require('../controllers/admin/products-controller');

cloudinary.config({
    cloud_name: 'divuubyft',
    api_key: '964312817173256',
    api_secret: 'zx-z5-JuvK4Gw5qelxh8jjkZBSw'
});

const storage = new multer.memoryStorage();

async function ImageUploadUtil(file) {
    const result = await cloudinary.uploader.upload(file, {
        resource_type: 'auto'
    })
    return result;
}

const upload = multer({storage});

module.exports = { upload, ImageUploadUtil };