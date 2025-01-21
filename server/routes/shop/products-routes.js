const express = require('express');
const {getFilterProducts} = require('../../controllers/shop/products-controller');
const { upload } = require('../../helpers/cloudinary')

const router = express.Router();

router.get("/get", getFilterProducts);

module.exports = router;
