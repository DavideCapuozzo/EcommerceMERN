import ProductImageUpload from "@/components/admin-view/image-upload"
import AdminProductTile from "@/components/admin-view/product-tile"
import CommonForm from "@/components/common/form"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { addProductFormElements } from "@/config"
import { useToast } from "@/hooks/use-toast"
import { addNewProduct, fetchAllProducts } from "@/store/admin/products-slice"
import { Fragment, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"

const initialFormData ={
    image:null,
    title:'',
    description:'',
    category:'',
    brand:'',
    price:'',
    salePrice:'',
    totalStock:''
}

function AdminProducts(){

    const [openCreateProductsDialog, setOpenCreateProductsDialog] = useState(false);
    const [formData, setFormData] = useState(initialFormData);
    const [imageFile, setImageFile] = useState(null);
    const [ uploadedImageUrl, setUploadedImageUrl] = useState('')
    const [ imageLoadingState, setImageLoadingState] = useState(false)
    const { productList } = useSelector(state => state.adminProducts)
    const dispatch = useDispatch()
    const {toast} = useToast()

    function onSubmit(event){
        event.preventDefault();
        dispatch(addNewProduct({
            ...formData,
            image : uploadedImageUrl
        })).then((data) => {
            console.log(data)
            if (data?.payload?.success){
                dispatch(fetchAllProducts());
                setOpenCreateProductsDialog(false);
                setImageFile(null);
                setFormData(initialFormData);
                toast({
                    title: 'Product add successfully'
                })
            }
        });
    }

    useEffect(()=>{
        console.log('Dispatching fetchAllProducts...');
        dispatch(fetchAllProducts())
    }, [dispatch]);

    console.log(productList, "PRODUCT LIST")

    return(
        <Fragment>
            <div className="mb-5 w-full flex justify-end">
                <Button onClick={()=> setOpenCreateProductsDialog(true)}>Add new product</Button>
            </div>
            <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
                {
                    productList && productList.length > 0 ?
                    productList.map(productItem => <AdminProductTile product={productItem} ></AdminProductTile>) : null
                }
            </div>
            <Sheet 
                open={openCreateProductsDialog} 
                onOpenChange={()=>{
                    setOpenCreateProductsDialog(false);
                }}
            >
                <SheetContent side="right" className="overflow-auto">
                    <SheetHeader>
                        <SheetTitle>Add new Product</SheetTitle>
                        <SheetDescription></SheetDescription>
                    </SheetHeader>
                    <ProductImageUpload imageFile={imageFile} setImageFile={setImageFile} uploadedImageUrl={uploadedImageUrl} setUploadedImageUrl={setUploadedImageUrl} setImageLoadingState={setImageLoadingState} imageLoadingState={imageLoadingState} ></ProductImageUpload>
                    <div className="py-6">
                        <CommonForm
                            onSubmit={onSubmit}
                            formData={formData}
                            setFormData={setFormData}
                            buttonText='Add'
                            formControls={addProductFormElements}
                        >

                        </CommonForm>
                    </div>
                </SheetContent>
            </Sheet>
        </Fragment>
    )
}

export default AdminProducts