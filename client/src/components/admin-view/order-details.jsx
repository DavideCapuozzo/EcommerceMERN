import { useState } from "react";
import CommonForm from "../common/form";
import { DialogContent } from "../ui/dialog";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";
import { useSelector } from "react-redux";
import { updateOrderStatus } from "@/store/admin/order-slice";


const initialFormData = {
    status: ""
}

function AdminOrderDetailsView({ orderDetails }) {

    const [formData, setFormData] = useState(initialFormData)
    const {user} = useSelector((state) => state.auth)

    function handleUpdateStatus(event) {
        event.preventDefault()
        console.log(formData);
        const {status} = formData;
        dispatchEvent(updateOrderStatus({id , orderStatus}))
    }

    return (
        <DialogContent className="sm:max-w-[600px]">
            <div className="grid gap-6 ">
                <div className="grid gap-2">
                    <div className="flex mt-10 items-center justify-between">
                        <p className="font-medium">Order Id</p>
                        <Label>123456</Label>
                    </div>
                    <div className="flex mt-2 items-center justify-between">
                        <p className="font-medium">Order Date</p>
                        <Label>12/34/56</Label>
                    </div>
                    <div className="flex mt-2 items-center justify-between">
                        <p className="font-medium">Order Status</p>
                        <Label>Processing</Label>
                    </div>
                    <div className="flex mt-2 items-center justify-between">
                        <p className="font-medium">Price</p>
                        <Label>$500</Label>
                    </div>
                </div>
                <Separator></Separator>
                <div className="grid gap-4">
                    <div className="grid gap-2">
                        <div className="font-medium">Order Details</div>
                        <ul className="grid gap-3">
                            {orderDetails?.cartItems && orderDetails?.cartItems.length > 0
                                ? orderDetails?.cartItems.map((item) => (
                                    <li className="flex items-center justify-between">
                                        <span>Title: {item.title}</span>
                                        <span>Quantity: {item.quantity}</span>
                                        <span>Price: ${item.price}</span>
                                    </li>
                                ))
                                : null}
                        </ul>
                    </div>
                </div>
                <div className="grid gap-4 ">
                    <div className="grid gap-2">
                        <div className="font-medium">Shipping Info</div>
                        <div className="flex flex-col text-muted-foreground">
                            <span>{user.userName}</span>
                            <span>{orderDetails?.addressInfo?.address}</span>
                            <span>{orderDetails?.addressInfo?.city}</span>
                            <span>{orderDetails?.addressInfo?.pincode}</span>
                            <span>{orderDetails?.addressInfo?.phone}</span>
                            <span>{orderDetails?.addressInfo?.notes}</span>
                        </div>
                    </div>
                </div>
                <div>
                    <CommonForm formControls={[
                        {
                            label: "Order Status",
                            name: "status",
                            componentType: "select",
                            options: [
                                { id: "pending", label: "pending" },
                                { id: "inProcess", label: "In Process" },
                                { id: "inShipping", label: "In Shipping" },
                                { id: "delivered", label: "Delivered" },
                                { id: "rejected", label: "Rejected" }
                            ]
                        },
                    ]}
                        formData={formData}
                        setFormData={setFormData}
                        buttonText={'Update order Status'}
                        onSubmit={handleUpdateStatus}
                    ></CommonForm>
                </div>
            </div>
        </DialogContent>
    )
}

export default AdminOrderDetailsView;