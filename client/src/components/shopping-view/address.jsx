import { addressFormControls } from "@/config";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { useState } from "react";
import CommonForm from "../common/form";

const initialAddressFormData ={
    address : '',
    city : '',
    phone : '',
    pincode : '',
    notes : '',
}


function Address() {

    const [formData, setFormData] = useState(initialAddressFormData)

    function handleManageAddress(event){
        event.preventDefault();
    }

    function isFormValid(){
        return Object.keys(formData).map(key => formData[key].trim() !== '').every(item => item)
    }

    return(
        <Card>
            <div>
                Address List
            </div>
            <CardHeader>
                <CardTitle>Add new Address</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
                <CommonForm formControls={addressFormControls} formData={formData} setFormData={setFormData} buttontext={'Add'} onSubmit={handleManageAddress} isBtnDisabled={!isFormValid()}/>
            </CardContent>
        </Card>
    )
}

export default Address;