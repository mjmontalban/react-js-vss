'use client'

import { useState, useEffect } from "react";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { toast } from "sonner"

import ProductTable from "@/components/tables/product-table"
import ProductDialog from "@/components/dialogs/product"
import EditProductDialog from "@/components/dialogs/edit-product"


import axios_instance from '../../api/axios'
import { Button } from "@/components/ui/button"
interface IProducts {
    id: number,
    name: String,
    quantity: number
}

type ItemDetial = {
    id: number,
    name: String,
    quantity: number
}

interface IResponse {
    data: {
        data: IProducts[]
    }
}

export default function Products () {

    const limit = 10;
    const [offset, setOffset] = useState(0);
    const [products, setProducts] = useState<IProducts[]>([]);
 


    const [dialogOpen, setDialogOpen] = useState(false);

    const [editDialogOpen, setEditDialogOpen] = useState(false);

    const [itemDetails, setItemDetails] = useState<ItemDetial>();



    useEffect(() => {
        getProds();

    }, []);


    const getProds = () => {
        axios_instance.get('fetch_products', {
            params: {
                limit: limit,
                offset: offset
            }
        }).then((response: IResponse) => {
            setProducts(response.data.data)
           
        })
    }
    
    const onDelete = (id: number) => {
        axios_instance.delete('delete_product', {
            params: {
                id: id
            }
        }).then((response: IResponse) => {
            setProducts((prev) => prev.filter((item) => item.id !== id));
        })
    }

    const onShowEditDetails = (id: number) => {
        axios_instance.get('get_product', {
            params: {
                id: id
            }
        }).then((response) => {
            setItemDetails(response.data.data);
            setEditDialogOpen((prev) => !prev);
        })
    }

    const onSubmitCreateProduct = (name: String, quantity: number) => {

        axios_instance.post('create_product', {
            name: name,
            quantity: quantity
        }).then((response) => {
            toast.success(response.data.message);
            getProds();
        })
    }

    const onCloseDialog = (val: boolean) => {
        setDialogOpen(val);
    }

    const onCloseEditDialog = (val: boolean) => {
        setEditDialogOpen(val);
    }

    const onSubmitEditProduct = (name: String, quantity: number, id: number) => {
        axios_instance.post('edit', {
            name: name,
            quantity: quantity,
            id: id
        }).then((response) => {
            toast.success(response.data.message);
            getProds();
        })
    }

    return (
        <Card className="w-[350px]"> 
        <ProductDialog  isOpen={dialogOpen} onSave={onSubmitCreateProduct} onClose={onCloseDialog} />
        <EditProductDialog name={itemDetails?.name} quantity={itemDetails?.quantity} id={itemDetails?.id}  isOpen={editDialogOpen} onSaveEdit={onSubmitEditProduct} onClose={onCloseEditDialog} />
        <CardHeader>
            <CardTitle>Products <Button onClick={() => {setDialogOpen((prev) => !prev)}}>Add Product</Button> </CardTitle>
        </CardHeader>
        <CardContent>
            <ProductTable items={products} onDelete={onDelete} onShowEditDetails={onShowEditDetails} />
        </CardContent>
        <CardFooter className="flex justify-between">
        
        </CardFooter>
      
    </Card>
    )
}