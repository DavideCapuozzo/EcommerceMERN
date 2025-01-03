import { Fragment } from "react"
import { ChartNoAxesCombined } from 'lucide-react';
import { useNavigate } from "react-router-dom";
import { LayoutDashboard } from 'lucide-react';
import { ShoppingBasket } from 'lucide-react';
import { BadgeCheck } from 'lucide-react';

const adminSidebarMenuItems = [
    {
        id: 'dashboard',
        label: 'Dashboard',
        path: '/admin/dashboard',
        icons: <LayoutDashboard></LayoutDashboard>
    },
    {
        id: 'products',
        label: 'Products',
        path: '/admin/products',
        icons: <ShoppingBasket></ShoppingBasket>,
    },
    {
        id: 'orders',
        label: 'Orders',
        path: '/admin/orders',
        icons: <BadgeCheck></BadgeCheck>,
    },
]



function MenuItems(){

    const navigate = useNavigate()

    return <nav className="mt-8 flex-col gap-2">
        {
            adminSidebarMenuItems.map(menuItem => <div key={menuItem.id} onClick={() => navigate(menuItem.path)} className="flex items-center gap-2 rounded-md px-3 py-2">
                {menuItem.icons}
                <span>{menuItem.label}</span>
            </div>)
        }
    </nav>
}

function AdminSideBar(){

    const navigate = useNavigate()

    return(
        <>
            <Fragment>
                <aside className="hidden w-64 flex-col border-r bg-background p-6 lg:flex">
                    <div onClick={() => navigate('/admin/dashboard')} className="flex cursor-pointer items-center gap-2">
                        <ChartNoAxesCombined size={30}/>
                        <h2 className="text-xl font-extrabold">Admin Panel</h2>

                    </div>
                    <MenuItems></MenuItems>
                </aside>
            </Fragment>
        </>
    )
}

export default AdminSideBar