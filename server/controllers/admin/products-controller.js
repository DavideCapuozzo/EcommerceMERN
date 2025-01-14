const { ImageUploadUtil } = require("../../helpers/cloudinary");
const Product = require("../../models/Product");

const handleImageUpload = async(req, res) => {
    try{
        const b64 = Buffer.from(req.file.buffer).toString('base64');
        const url = "data:" + req.file.mimetype + ";base64," + b64;
        const result = await ImageUploadUtil(url);

        res.json({
            success: true,
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

// add new product
const addProduct = async(req, res) => {
    try{

        const {image, title, description, category, brand, price, salePrice, totalStock} = req.body;
        const newlyCreatedProduct = new Product ({image, title, description, category, brand, price, salePrice, totalStock})

        await newlyCreatedProduct.save();
        res.status(201).json({
            success: true,
            data: newlyCreatedProduct
        }); 

    }catch(e){
        console.log(e)
        res.status(500).json({
            success:false,
            message: 'Error occurred',
        });
    }
}





// fatch all product

const fetchAllProducts = async(req, res) => {
    try{
        const listOfProducts = await Product.find({});
        console.log(listOfProducts, "productControllers")
        res.status(200).json({
            success: true,
            data: listOfProducts,
        }); 

    }catch(e){
        console.log(e)
        res.status(500).json({
            success:false,
            message: 'Error occurred',
        });
    }
}

// edit product

const editProduct = async(req, res) => {
    try{
        const {id} = require.params;
        const {image, title, description, category, brand, price, salePrice, totalStock} = req.body;
        const findProduct = await Product.findById(id);
        if(!findProduct) return res.status(404).json({
            success:false,
            message: 'Product not found',
        })

        findProduct.image = image || findProduct.image
        findProduct.title = title || findProduct.title
        findProduct.description = description || findProduct.description
        findProduct.category = category || findProduct.category
        findProduct.brand = brand || findProduct.brand
        findProduct.price = price || findProduct.price
        findProduct.salePrice = salePrice || findProduct.salePrice
        findProduct.totalStock = totalStock || findProduct.totalStock
        
        await findProduct.save();
        res.status(200).json({
            success: true,
            data: findProduct
        }); 


    }catch(e){
        console.log(e)
        res.status(500).json({
            success:false,
            message: 'Error occurred',
        });
    }
}

// delate product

const deleteProduct = async(req, res) => {
    try{

        const {id} = req.params
        const product = await Product.findByIdAndUpdate(id);

        if(!product) return res.status(404).json({
            success:false,
            message: 'Product not found',
        })

        res.status(200).json({
            success:True,
            message: 'Product deleted succesfully',
        });

    }catch(e){
        console.log(e)
        res.status(500).json({
            success:false,
            message: 'Error occurred',
        });
    }
}

module.exports = {handleImageUpload, addProduct, fetchAllProducts, editProduct, deleteProduct}