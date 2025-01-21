import ProductFilter from "@/components/shopping-view/filter"
import ShoppingProductTile from "@/components/shopping-view/product-tile"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { sortOptions } from "@/config"
import { fetchAllProducts } from "@/store/admin/products-slice"
import { fetchAllFilteredProducts } from "@/store/shop/products-slice"
import { DropdownMenuRadioGroup } from "@radix-ui/react-dropdown-menu"
import { ArrowUpDown } from "lucide-react"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

function ShoppingListing(){

    const dispatch = useDispatch()
    const {productList} = useSelector(state=> state.shopProducts)

    useEffect(()=>{
        dispatch(fetchAllFilteredProducts())
    }, [dispatch])

    console.log(productList, 'productList in LISTING.jsx')

    return(
        <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-6 p-4 md:p-6">
            <ProductFilter></ProductFilter>
            <div className="bg-background w-full rounded-lg shadow-sm">
                <div className="p-4 border-b flex items-center justify-between">
                    <h2 className="text-lg font-extrabold ">All Prooducts</h2>
                    <div className="flex items-center gap-3">
                        <span className="text-muted-foreground">10 Products</span>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" size="sm" className="flex items-center gap-1">
                                    <ArrowUpDown className="h-4 w-4"></ArrowUpDown>
                                    <span>Sort By</span>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-[200px]">
                                <DropdownMenuRadioGroup>
                                    {
                                        sortOptions.map(sortItem=> <DropdownMenuItem key={sortItem.id}>{sortItem.label}</DropdownMenuItem>)
                                    }
                                </DropdownMenuRadioGroup>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                    
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
                    {
                        productList && productList.length > 0 ?
                        productList.map(productItem => <ShoppingProductTile product={productItem}></ShoppingProductTile>) : null
                    }
                </div>
            </div>
        </div>
    )
}

export default ShoppingListing