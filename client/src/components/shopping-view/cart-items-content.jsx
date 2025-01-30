import { Minus, Plus, Trash } from "lucide-react"
import { Button } from "../ui/button"
import { useDispatch, useSelector } from "react-redux"
import { deleteCartItem } from "@/store/shop/cart-slice"

function UserCartItemsContent({cartItems}) {
    const {user} = useSelector(state=>state.auth)
    const dispatch = useDispatch()

    function handleCartItemDelete(getCartItem){
        dispatch(deleteCartItem({userId : user?.id, productId: getCartItem.productId}))
    }
    return(
        <div className="flex items-center space-x-4">
            <img src={cartItems?.image} alt={cartItems?.title} className="w-20 h-20 rounded object-cover"/>
            <div className="flex-1">
                <h3 className="font-extrabold">{cartItems?.title}</h3>
                <div className="flex items-center mt-1 gap-2">
                    <Button className="h-8 w-8 rounded-full" variant="outline" size="icon">
                        <Minus className="w-4 h-4"></Minus>
                        <span className="sr-only">Decrease</span>
                    </Button>
                    <span className="font-semibold">{cartItems?.quantity}</span>
                    <Button className="h-8 w-8 rounded-full" variant="outline" size="icon">
                        <Plus className="w-4 h-4"></Plus>
                        <span className="sr-only">Increment</span>
                    </Button>
                </div>
            </div>
            <div className="flex flex-col items-end ">
                <p className="font-semibold">${((cartItems?.salePrice > 0 ? cartItems?.salePrice : cartItems?.price) * cartItems?.quantity).toFixed(2)}</p>
                <Trash onClick={()=> handleCartItemDelete(cartItems)} className="cursor-pointer mt-1" size={20}></Trash>
            </div>
        </div>
        
    )
}

export default UserCartItemsContent