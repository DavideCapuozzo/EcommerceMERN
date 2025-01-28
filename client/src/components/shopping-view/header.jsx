import { Link, useNavigate } from "react-router-dom";
import { HousePlug, Sheet } from 'lucide-react';
import { Sheet as SheetComponent, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from 'lucide-react';
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { shoppingViewHeaderMenuItems } from "@/config";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator } from "../ui/dropdown-menu";
import { ShoppingCart } from 'lucide-react';
import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { UserCog } from 'lucide-react';
import { LogOut } from 'lucide-react';
import { logoutUser } from "@/store/auth-slice";

function MenuItems(){

    return (
        
        <nav className="flex flex-col mb-3 lg:mb-0 lg:items-center lg:justify-center gap-6 lg:flex-row">
            
        {
            shoppingViewHeaderMenuItems.map(menuItem=> <Link className="text-sm font-medium text-center" key={menuItem.id} to={menuItem.path}>{menuItem.label}</Link>)
        
        }
        </nav>
        

    )
}


function HeaderRightContent(){
    const {user} = useSelector(state => state.auth)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    function handleLogout(){
        dispatch(logoutUser())
    }

    return <div className="flex lg:items-center lg:flex-row flex-col gap-4">
        <Sheet>
            <Button variant='outline' size='icon'>
                <ShoppingCart className="h-6 w-6" />
                <span className="sr-only">User Cart</span>
            </Button>
        </Sheet>
        
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Avatar className='bg-black '>
                    <AvatarFallback className='bg-black text-white font-extrabold'>
                        {user?.userName[0].toUpperCase()}
                    </AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent side='right' className='w-56'>
                <DropdownMenuLabel>Logged In as some Value {user?.userName}</DropdownMenuLabel>
                <DropdownMenuSeparator></DropdownMenuSeparator>
                <DropdownMenuItem onClick={() => navigate('/shop/account')}>
                    <UserCog className="mr-2 h-4 w-4"/>Account
                </DropdownMenuItem>
                <DropdownMenuSeparator></DropdownMenuSeparator>
                <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4"/>Logout
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    </div>
}
    

function ShoppingHeader(){

    const {isAuthenticated} = useSelector(state => state.auth)
    

    return(
        <header className="sticky top-0 z-40 w-full border-b bg-background">
            <div className="flex h-16 items-center justify-between px-4 md:px-6">
                <Link to='/shop/home'>
                    <HousePlug className="h-6 w-6"/>
                    <span className="font-bold">Ecommerce</span>
                </Link>
                <SheetComponent>
                    <SheetTitle></SheetTitle>
                    <SheetDescription></SheetDescription>
                    <SheetTrigger asChild>
                        <Button variant="outline" size="icon" className="lg:hidden">
                            <Menu className="h-6 w-6"/>    
                            <span className="sr-only">Toggle Header Menu</span>
                        </Button>
                    </SheetTrigger>
                    
                    <SheetContent side="left" className="w-full max-w-xs">
                        <MenuItems></MenuItems>
                        <HeaderRightContent></HeaderRightContent>
                    </SheetContent>
                    
                </SheetComponent>
                <div className="hidden lg:flex lg:justify-center lg:flex-1">
                    <MenuItems></MenuItems>
                    
                </div>

                <div className="hidden lg:block"><HeaderRightContent></HeaderRightContent></div>

            </div>
        </header>
    )
}

export default ShoppingHeader