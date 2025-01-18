import { Link } from "react-router-dom";
import { HousePlug, Sheet } from 'lucide-react';
import { Sheet as SheetComponent, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from 'lucide-react';
import { Button } from "../ui/button";
import { useSelector } from "react-redux";
import { shoppingViewHeaderMenuItems } from "@/config";

function MenuItems(){

    return (
        
        <nav className="flex flex-col mb-3 lg:mb-0 lg:items-center lg:justify-center gap-6 lg:flex-row">
            
        {
            shoppingViewHeaderMenuItems.map(menuItem=> <Link className="text-sm font-medium text-center" key={menuItem.id} to={menuItem.path}>{menuItem.label}</Link>)
        
        }
        </nav>
        

    )
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
                    </SheetContent>
                    
                </SheetComponent>
                <div className="hidden lg:block">
                    <MenuItems></MenuItems>
                    
                </div>

            </div>
        </header>
    )
}

export default ShoppingHeader