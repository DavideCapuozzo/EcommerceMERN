import { useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Dialog } from "../ui/dialog";
import { Table, TableHead, TableHeader, TableRow, TableBody, TableCell } from "../ui/table";
import ShoppingOrderDetailsView from "./order-details";

function ShoppingOrders() {

    const [ openDetailsDialog, setOpenDetailsDialog ] = useState(false)

    return (
        <Card>
            <CardHeader>
                <CardTitle>Order History</CardTitle>
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
                                <Dialog open={openDetailsDialog} onOpenChange={setOpenDetailsDialog}>
                                    <Button onClick={()=>setOpenDetailsDialog(true)}>View Details</Button>
                                    <ShoppingOrderDetailsView></ShoppingOrderDetailsView>
                                </Dialog>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </CardContent>
        </Card>

    )
}

export default ShoppingOrders;