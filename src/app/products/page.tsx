'use client'
import { useState, useEffect } from "react";


import axios_instance from '../../api/axios'

interface IProducts {
    name: String,
    quantity: number
}

interface IResponse {
    data: IProducts[]
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
            setProducts(response.data)
        })

    }, []);

    return (
        <div>Product list</div>
    )
}