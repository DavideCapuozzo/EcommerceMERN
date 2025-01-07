import { useEffect, useRef } from "react";
import { Input } from "../ui/input";

import { Label } from "../ui/label";
import { FileIcon, UploadCloudIcon, XIcon } from "lucide-react";
import { Button } from "../ui/button";
import axios from "axios";



function ProductImageUpload({imageFile, setImageFile, uploadedImageUrl, setUploadedImageUrl, setImageLoadingState}){

    const inputRef =useRef(null);

    function handleImageFileChange(event){
        console.log(event.target.files)
        const seletedFile = event.target.files?.[0];
        if (seletedFile) setImageFile(seletedFile)
    }

    function handleDragOver(event){
        
        event.preventDefault();
    }

    function handleDrop(event){

        console.log("Drag event:", event);
        console.log("DataTransfer:", event.dataTransfer);
        console.log("Files:", event.dataTransfer.files);
            
        event.preventDefault()
        console.log(event.dataTransfer.files)
        const droppedFile = event.dataTransfer.files?.[0]
        console.log(droppedFile)
        
        if(droppedFile){
            setImageFile(droppedFile);
        } 
    }

    function handleRemoveImage(){
        setImageFile(null);
        if(inputRef.current){
            inputRef.current.value =''
        }
    }

    async function uploadImageToCloudinary() {
        setImageLoadingState(true);
        const data = new FormData;
        data.append('my_file', imageFile)
        const response = await axios.post('http://localhost:5000/api/admin/products/upload-image', data)
        console.log(response, 'response')
        if(response?.data?.success){
            setUploadedImageUrl(response.data.result.url);
            setImageLoadingState(false)
        }  
    }

    useEffect(() => {
        if(imageFile !== null) uploadImageToCloudinary()
    }, [imageFile])

    return(
        <div className="w-full max-w-md mx-auto">
            <Label className='text-lg font-semibold mb-2 block mt-4'>Upload Image</Label>
            <div onDragOver={handleDragOver} onDrop={handleDrop} className="border-2 border-dashed rounded-lg p-4">
                <Input id='image-upload' type='file' className='hidden' ref={inputRef} onChange={handleImageFileChange}></Input>
                {
                    !imageFile?
                    <Label htmlFor="image-upload" className="flex flex-col justify-center text-center items-center h-32 cursor-pointer">
                        <UploadCloudIcon className="w-10 h-10 text-muted-foreground mb-2"></UploadCloudIcon>
                        <span>Drag & drop or click to upload image</span>
                    </Label> : (<div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <FileIcon className="w-8 h-8 text-primary mr-2"></FileIcon>
                        </div>
                        <p className="text-sm font-medium">{imageFile.name}</p>
                        <Button variant="ghost" sixe="icon" className="text-muted-foreground hover:text-foreground" onClick={handleRemoveImage}>
                            <XIcon className="w-4 h-4"></XIcon>
                            <span className="sr-only">Remove File</span>
                        </Button>
                    </div>)
                }
            </div>
        </div>
    )
}

export default ProductImageUpload;