"use client"
import React from 'react';
import {FilterCheckbox} from "@/components/shared/filter-checkbox";
import {Title} from "@/components/shared/title";
import {RangeSlider} from "@/components/ui/range-slider";
import {Input} from "@/components/ui";
import {CheckboxFiltersGroup} from "@/components/shared/checkbox-filters-group";
import {useFilterIngredients} from "@/hooks/useFilterIngredients";
import {log} from "node:util";


interface Props {
    className?: string;
}


export const Filters: React.FC<Props> = ({className}) => {

    const {ingredients, loading, onAddId, selectedIds} = useFilterIngredients()


    const items = ingredients.map(el => ({value: el.id, text: el.name}))

    return <div
        className={className}>
        <Title text="Фильтрация" size="sm" className="mb-5 font-bold"/>
        <div className="flex flex-col gap-4">
            <FilterCheckbox name={"qw"} text="Можно собирать" value="1"/>
            <FilterCheckbox name={"as"} text="Новинки" value="2"/>
        </div>

        <div className="mt-5 border-y border-y-neutral-100 py-6 pb-7">
            <p className="font-bold mb-3">Цена от и до:</p>
            <div className="flex gap-3 mb-5">
                <Input type="number" placeholder="0" min={0} max={30000} defaultValue={0}/>
                <Input type="number" min={100} max={30000} placeholder="30000"/>
            </div>
            <RangeSlider min={0} max={5000} step={10} value={[0, 5000]}/>
        </div>

        <CheckboxFiltersGroup className="mt-5"
                              title="Формат"
                              limit={6}
                              loading={loading}
                              onClickCheckbox={onAddId}
                              selectedIds={selectedIds}
                              defaultItems={items.slice(0, 6)}
                              items={items}
                              name={"ингредиенты"}
        />

    </div>;
};
