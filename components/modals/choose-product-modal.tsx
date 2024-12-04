'use client';
import { cn } from '@/lib/utils';
import React from 'react';
import { useRouter } from 'next/navigation';
// import { useCartStore } from '@/shared/store';
// import toast from 'react-hot-toast';
// import { ProductForm } from '../product-form';
import {Dialog, DialogContent} from "@/components/ui/dialog";
import {ChooseProductForm, Title} from "@/components/shared";
import {ProductWithRelations} from "@/@types/prisma";

interface Props {
    product: ProductWithRelations;
    className?: string;
}

export const ChooseProductModal: React.FC<Props> = ({ product, className }) => {
    const router = useRouter();

    const isPizzaForm = Boolean(product.items[0].pizzaType)

    return (
        <Dialog open={Boolean(product)} onOpenChange={() => router.back()}>
            <DialogContent
                className={cn(
                    'p-0 w-[1060px] max-w-[1060px] min-h-[500px] bg-white overflow-hidden',
                    className,
                )}>

                {isPizzaForm
                ? ''
                : <ChooseProductForm imageUrl={product.imageUrl} name={product.name} ingredients={[]} items={[]} onSubmit={()=>{}} price={product.price}/>
                }


                {/*<ProductForm product={product} onSubmit={() => router.back()} />*/}
            </DialogContent>
        </Dialog>
    );
};