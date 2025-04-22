'use client'

import { useState, useEffect } from "react";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import ProductTable from "@/components/tables/product-table"
import axios_instance from '../../api/axios'

interface IProducts {
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


    useEffect(() => {
        axios_instance.get('fetch_products', {
            params: {
                limit: limit,
                offset: offset
            }
        }).then((response: IResponse) => {
            setProducts(response.data.data)
        })

    }, []);


    const onDelete = (id: number) => {

    }

    const onShowEditDetails = (id: number) => {

    }

    return (
        <Card className="w-[350px]"> 
        <CardHeader>
            <CardTitle>Products</CardTitle>
        </CardHeader>
        <CardContent>
            <ProductTable items={products} onDelete={onDelete} onShowEditDetails={onShowEditDetails} />
        </CardContent>
        <CardFooter className="flex justify-between">
        
        </CardFooter>
      
    </Card>
    )
}