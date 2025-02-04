import { Button } from '@/components/ui/button'
import bannerOne from '../../assets/banner-1.webp'
import bannerTwo from '../../assets/banner-2.webp'
import bannerThree from '../../assets/banner-3.webp'
import { BabyIcon, Blend, ChevronLeftIcon, ChevronRightIcon, CloudLightning, MountainSnow, Radiation, RadiationIcon, ShirtIcon, Toilet, UmbrellaIcon, WashingMachine, WatchIcon } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllFilteredProducts, fetchProductDetails } from '@/store/shop/products-slice'
import ShoppingListing from './listing'
import ShoppingProductTile from '@/components/shopping-view/product-tile'
import { stringify } from 'postcss'
import { useNavigate } from 'react-router-dom'
import { useToast } from "@/hooks/use-toast";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice"
import ProductDetailsDialog from '@/components/shopping-view/product-detail'

const categoriesWithIcon = [
    { id: "men", label: "Men", icon : ShirtIcon },
    { id: "women", label: "Women", icon : CloudLightning },
    { id: "kids", label: "Kids", icon : BabyIcon },
    { id: "accessories", label: "Accessories", icon : WatchIcon  },
    { id: "footwear", label: "Footwear", icon : UmbrellaIcon  },
]

const brandWithIcon = [
    { id: "nike", label: "Nike", icon : ShirtIcon },
    { id: "adidas", label: "Adidas", icon : WashingMachine },
    { id: "puma", label: "Puma", icon : Radiation },
    { id: "levi", label: "Levi's", icon : Toilet},
    { id: "zara", label: "Zara", icon : MountainSnow },
    { id: "h&m", label: "H&M", icon : Blend },
]

function ShoppingHome(){

    const [currentSlide, setCurrentSlide] = useState(0)
    const {productList, productDetails} = useSelector(state => state.shopProducts)
    const {user} = useSelector(state => state.auth)
    const [ openDetailsDialog, setOpenDetailsDialog ] = useState(false);
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {toast} = useToast()

    const slides = [bannerOne, bannerTwo, bannerThree]

    function handleNavigateToListingPage(getCurrentItem, section){
        sessionStorage.removeItem('filters');
        const currentFilter = {
            [section] : [getCurrentItem.id]
        }

        sessionStorage.setItem('filters', JSON.stringify(currentFilter))
        navigate(`/shop/listing`)
    }

    function handleGetProductDetails(getCurrentProductId){
        dispatch(fetchProductDetails(getCurrentProductId))
    }

    function handleAddToCart(getCurrentProductId){
        console.log(getCurrentProductId, "getCurrentProductId")
        dispatch(addToCart({userId : user?.id, productId: getCurrentProductId, quantity: 1})).then(data=> {
            if(data?.payload?.success){
                dispatch(fetchCartItems(user?.id))
                toast({
                    title: "Product is added to Cart",
                })
            }
        })
        
    }

    useEffect(() => {
        if(productDetails !== null) setOpenDetailsDialog(true)
    },[productDetails])

    useEffect(() => {
        const timer =setInterval(() => {
            setCurrentSlide(prevSlide => (prevSlide + 1) % slides.length)
        }, 5000)

        return () => clearInterval(timer)

    }, [])

    useEffect(()=>{
        dispatch(fetchAllFilteredProducts({filterParams : {}, sortParams: 'price-lowtohigh'}))
    }, dispatch)
    
    console.log(productList, 'HOME PAGE')

    return(
        <div className="flex flex-col min-h-screen">
            <div className="relative w-full h-[600px] overflow-hidden">
                {
                    slides.map((slide, index) => (
                        <img
                            src={slide}
                            key={index}
                            className={`${index === currentSlide ? 'opacity-100' : 'opacity-0'} absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000`}
                        >
                        </img>
                    ))
                }
                <Button onClick={()=>setCurrentSlide(prevSlide => (prevSlide -1 + slides.length) % slides.length)} variant='outline' size='icon' className='absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/80'>
                    <ChevronLeftIcon className='w-4 h-4'></ChevronLeftIcon>
                </Button>
                <Button onClick={()=>setCurrentSlide(prevSlide => (prevSlide + 1) % slides.length)} variant='outline' size='icon' className='absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/80'>
                    <ChevronRightIcon className='w-4 h-4'></ChevronRightIcon>
                </Button>
            </div>
            <section className='py-12 bg-gray-50'>
                <div className='container mx-auto px-4'>
                    <h2 className='text-3xl font-bold text-center mb-8'>Shop by category</h2>
                    <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4'>
                        {
                            categoriesWithIcon.map(categoryItem => <Card onClick={() => handleNavigateToListingPage(categoryItem, 'category')} className="cursor-pointer hover:shadow-lg transition-shadow">
                                <CardContent className="flex flex-col items-center justify-center p-6">
                                    <categoryItem.icon className='w-12 h-12 mb-4 text-primary'></categoryItem.icon>
                                    <span className='font-bold'>{categoryItem.label}</span>
                                </CardContent>

                            </Card>)
                        }
                    </div>
                </div>
            </section>

            <section className='py-12 bg-gray-50'>
                <div className='container mx-auto px-4'>
                    <h2 className='text-3xl font-bold text-center mb-8'>Shop by Brand</h2>
                    <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4'>
                        {
                            brandWithIcon.map(brandItem => <Card onClick={() => handleNavigateToListingPage(brandItem, 'brand')} className="cursor-pointer hover:shadow-lg transition-shadow">
                                <CardContent className="flex flex-col items-center justify-center p-6">
                                    <brandItem.icon className='w-12 h-12 mb-4 text-primary'></brandItem.icon>
                                    <span className='font-bold'>{brandItem.label}</span>
                                </CardContent>

                            </Card>)
                        }
                    </div>
                </div>
            </section>

            <section className='py-12'>
                <div className='container mx-auto px-4'>
                    <h2 className='text-3xl font-bold text-center mb-8'>Feature Products</h2>
                    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
                        {
                            productList && productList.length > 0 ? 
                            productList.map(productItem => <ShoppingProductTile handleGetProductDetails={handleGetProductDetails} handleAddToCart={handleAddToCart} product={productItem}></ShoppingProductTile>)
                            : null
                        }
                    </div>
                </div>
            </section>
            <ProductDetailsDialog open={openDetailsDialog} setOpen={setOpenDetailsDialog} productDetails={productDetails}></ProductDetailsDialog>
        </div>
    )
}

export default ShoppingHome