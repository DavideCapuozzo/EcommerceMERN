import { addressFormControls } from "@/config";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { useEffect, useState } from "react";
import CommonForm from "../common/form";
import { useDispatch, useSelector } from "react-redux";
import { addNewAddress, fetchAllAddresses } from "@/store/shop/address-slice";

const initialAddressFormData ={
    address : '',
    city : '',
    phone : '',
    pincode : '',
    notes : '',
}


function Address() {

    const [formData, setFormData] = useState(initialAddressFormData)
    const dispatch = useDispatch()
    const {user} = useSelector(state => state.auth)
    const {addressList} = useSelector(state => state.shopAddress)

    function handleManageAddress(event){
        event.preventDefault();

        dispatch(addNewAddress({
            ...formData,
            userId: user?.id
        })).then(data =>{
            if(data?.payload?.success){
                dispatch(fetchAllAddresses(user?.id))
                setFormData(initialAddressFormData)
            }
        })
    }

    function isFormValid(){
        return Object.keys(formData).map(key => formData[key].trim() !== '').every(item => item)
    }

    useEffect(() => {
        dispatch(fetchAllAddresses(user?.id))
    },[dispatch])

    console.log(addressList, "ADDRESS LIST")

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