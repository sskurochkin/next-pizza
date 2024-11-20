"use client"
import React, {useEffect, useState} from 'react';
import {FilterCheckbox} from "@/components/shared/filter-checkbox";
import {Title} from "@/components/shared/title";
import {RangeSlider} from "@/components/ui/range-slider";
import {Input} from "@/components/ui";
import {CheckboxFiltersGroup} from "@/components/shared/checkbox-filters-group";
import {useFilterIngredients} from "@/hooks/useFilterIngredients";
import qs from "qs"
import {useSet} from "react-use";
import {useRouter, useSearchParams} from "next/navigation";


interface Props {
    className?: string;
}

interface PriceProps {
    priceFrom? : number
    priceTo? : number
}

interface QueryFilters extends PriceProps{
    pizzaTypes: string
    sizes: string
    ingredients : string
}

export const Filters: React.FC<Props> = ({className}) => {

    const searchParams = useSearchParams() as unknown as Map<keyof QueryFilters, string>
    const router = useRouter()
    const {ingredients, loading, onAddId, selectedIngredients} = useFilterIngredients(searchParams.get("ingredients")?.split(','))

    console.log(selectedIngredients)
    const items = ingredients.map(el => ({value: el.id, text: el.name}))
    const [price, setPrice] = useState<PriceProps>({
        priceFrom: Number(searchParams.get("priceFrom")),
        priceTo: Number(searchParams.get("priceTo")) || undefined,

    })
    const [sizes, { toggle: toggleSizes }] = useSet(new Set<string>(searchParams.has("sizes") ? searchParams.get("sizes")?.split(',') : []));
    const [pizzaTypes, { toggle: togglePizzaTypes }] = useSet(new Set<string>(searchParams.has("pizzaTypes") ? searchParams.get("pizzaTypes")?.split(',') : []));

    const updatePrice = (name: keyof PriceProps, value: number) =>{
        setPrice({
            ...price,
            [name] : value
        })
    }

    const filters = {
        ...price,
        pizzaTypes: Array.from(pizzaTypes),
        sizes: Array.from(sizes),
        ingredients : Array.from(selectedIngredients)
    }

    useEffect(()=>{

       const query = qs.stringify(filters, {
           arrayFormat: "comma",
       })

        router.push(`?${query}`, {
            scroll: false
        })
    },[filters])

    return <div
        className={className}>
        <Title text="Фильтрация" size="sm" className="mb-5 font-bold"/>

        {/* Верхние чекбоксы */}
        {/*<CheckboxFiltersGroup*/}
        {/*    title="Тип теста"*/}
        {/*    name="pizzaTypes"*/}
        {/*    className="mb-5"*/}
        {/*    onClickCheckbox={togglePizzaTypes}*/}
        {/*    selected={pizzaTypes}*/}
        {/*    items={[*/}
        {/*        { text: 'Тонкое', value: '1' },*/}
        {/*        { text: 'Традиционное', value: '2' },*/}
        {/*    ]}*/}
        {/*/>*/}


        {/*<CheckboxFiltersGroup*/}
        {/*    title="Размеры"*/}
        {/*    name="sizes"*/}
        {/*    className="mb-5"*/}
        {/*    onClickCheckbox={toggleSizes}*/}
        {/*    selected={sizes}*/}
        {/*    items={[*/}
        {/*        { text: '20 см', value: '20' },*/}
        {/*        { text: '30 см', value: '30' },*/}
        {/*        { text: '40 см', value: '40' },*/}
        {/*    ]}*/}
        {/*/>*/}



        <div className="mt-5 border-y border-y-neutral-100 py-6 pb-7">
            <p className="font-bold mb-3">Цена от и до:</p>
            <div className="flex gap-3 mb-5">
                <Input type="number" placeholder="0" min={0} max={1000} value={String(price.priceFrom)}
                    onChange={(e)=>updatePrice("priceFrom", Number(e.target.value))}
                />
                <Input type="number" min={100} max={1000} placeholder="1000" value={String(price.priceTo)}
                    onChange={(e)=>updatePrice("priceTo", Number(e.target.value))}
                />
            </div>
            <RangeSlider min={0} max={1000} step={10} value={[price.priceFrom || 0, price.priceTo || 1000]}
                onValueChange={([priceFrom, priceTo])=>setPrice({priceFrom, priceTo})}
            />
        </div>

        <CheckboxFiltersGroup className="mt-5"
                              title="Формат"
                              limit={6}
                              loading={loading}
                              onClickCheckbox={onAddId}
                              selected={selectedIngredients}
                              defaultItems={items.slice(0, 6)}
                              items={items}
                              name={"ингредиенты"}
        />

    </div>;
};
