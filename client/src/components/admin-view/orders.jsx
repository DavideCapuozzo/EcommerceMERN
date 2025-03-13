import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Table, TableHead, TableHeader, TableRow, TableBody, TableCell } from "../ui/table";
import { Button } from "../ui/button";
import { Dialog } from "../ui/dialog";
import { useEffect, useState } from "react";
import AdminOrderDetailsView from "./order-details";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrdersForAdmin } from "@/store/admin/order-slice";


function AdminOrdersView() {

    const [ openDetailsDialog, SetOpenDetailsDialog ] = useState(false)
    const { orderList, orderDetails } = useSelector(state => state.adminOrder)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllOrdersForAdmin())
    }, [dispatch])

    console.log(orderList, 'orderLis!!!!!!!!!!!!')

    return (
        <Card>
            <CardHeader>
                <CardTitle>All Order</CardTitle>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Order Id</TableHead>
                            <TableHead>Order Date</TableHead>
                            <TableHead>Order Status</TableHead>
                            <TableHead>Order Price</TableHead>
                            <TableHead><span className="sr-only">Details</span></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow>
                            <TableCell>INV001</TableCell>
                            <TableCell>27/09/2025</TableCell>
                            <TableCell>In Process</TableCell>
                            <TableCell>$250.00</TableCell>
                            <TableCell>
                                <Dialog open={openDetailsDialog} onOpenChange={SetOpenDetailsDialog}>
                                    <Button onClick={() => SetOpenDetailsDialog(true)}>View Details</Button>
                                    <AdminOrderDetailsView></AdminOrderDetailsView>
                                </Dialog>
                                
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    )
}

export default AdminOrdersView;