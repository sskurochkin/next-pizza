'use client';

import {Search} from 'lucide-react';
import React, {useEffect, useRef, useState} from 'react';
import {cn} from "@/lib/utils";
import {useClickAway, useDebounce} from "react-use";
import Link from "next/link";
import {Api} from "@/services/api-clients";
import {Product} from "@prisma/client";


interface Props {
    className?: string
}

export const SearchInput: React.FC<Props> = ({className}) => {

    const [focused, setFocused] = useState(false)
    const ref = useRef(null)
    const [query, setQuery] = useState('')
    const [products, setProducts] = useState<[Product]>([])


    useClickAway(ref, () => {
        setFocused(false)
    })

    const onClickItem = ()=>{
        setQuery('')
        setProducts([])
        setFocused(false)
    }

    useDebounce(
        async () => {
            try {
                const response = await Api.products.search(query);
                setProducts(response);
            } catch (error) {
                console.log(error);
            }
        },
        250,
        [query],
    );

    return (
        <>
            {focused && <div className={"fixed top-0 left-0 right-0 bottom-0 bg-black/50 z-30"}></div>}

            <div ref={ref} className={cn("flex rounded-2xl flex-1 justify-between relative h-11 z-30", className)}>
                <Search className="absolute top-1/2 translate-y-[-50%] left-3 h-5 text-gray-400"/>
                <input
                    className="rounded-2xl outline-none w-full bg-gray-50 pl-11"
                    type="text"
                    placeholder="Найти пиццу..."
                    onFocus={() => setFocused(true)}
                    value={query}
                    onChange={(e) => {
                        setQuery(e.target.value)
                    }}
                />

                <div
                    className={cn(
                        'absolute w-full bg-white rounded-xl py-2 top-14 shadow-md transition-all duration-200 invisible opacity-0 z-30',
                        focused && 'visible opacity-100 top-12',
                    )}>

                    {products.length  && products.map(product =>
                        <Link
                            key={product.id}
                            onClick={onClickItem}
                            href={`/product/${product.id}`}
                            className="flex items-center gap-3 w-full px-3 py-2 hover:bg-primary/10">
                            <img className="rounded-sm h-8 w-8"
                                 src={product.imageUrl}
                                 alt={product.name}/>
                            {product.name}

                        </Link>
                    )}
                </div>

            </div>


        </>
    );
};