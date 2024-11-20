'use client';

import React from 'react';
import {useSet} from 'react-use';

import {FilterCheckbox, FilterCheckboxProps} from './filter-checkbox';
import {Input} from '../ui/input';
import {Skeleton} from "@/components/ui";

type Item = FilterCheckboxProps;

interface Props {
    title: string;
    items: Item[];
    defaultItems?: Item[];
    limit?: number;
    loading?: boolean,
    searchInputPlaceholder?: string;
    className?: string;
    onClickCheckbox?: (id: string) => void;
    selected: Set<string>
    defaultValue?: string[];
    name?: string
}

export const CheckboxFiltersGroup: React.FC<Props> = ({
                                                          title,
                                                          items,
                                                          defaultItems,
                                                          limit = 5,
                                                          searchInputPlaceholder = 'Поиск...',
                                                          className,
                                                          loading,
                                                          onClickCheckbox,
                                                          defaultValue,
                                                          selected,
                                                          name
                                                      }) => {
    const [showAll, setShowAll] = React.useState(false);

    const [searchValue, setSearchValue] = React.useState('')

    const onChangeSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.target.value)
    }
    // const [selectedIds, {add, toggle}] = useSet<string>(new Set([]));

    const onCheckedChange = (value: string) => {
        // toggle(value);
    };

    React.useEffect(() => {
        if (defaultValue) {
            // defaultValue.forEach(add);
        }
    }, [defaultValue?.length]);

    // React.useEffect(() => {
    //     onChange?.(Array.from(selected));
    // }, [selected]);

    if (loading) {
        return (
            <div className={className}>
                <p className="font-bold mb-3">{title}</p>

                {Array(limit).fill(0).map((el, i) => (
                    <Skeleton key={i} className={"h-6 mb-4 rounded-[8px]"}/>
                ))}
                <Skeleton className={"h-6 mb-4 w-28 rounded-[8px]"}/>

            </div>
        )
    }

    return (
        <div className={className}>
            <p className="font-bold mb-3">{title}</p>

            {showAll && (
                <div className="mb-5">
                    <Input
                        onChange={onChangeSearchInput}
                        value={searchValue}
                        placeholder={searchInputPlaceholder} className="bg-gray-50 border-none"/>
                </div>
            )}

            <div className="flex flex-col gap-4 max-h-96 pr-2 overflow-auto scrollbar">
                {(showAll ? items.filter(i => i.text.toLowerCase().includes(searchValue.toLowerCase())) : defaultItems || items).map((item, index) => (
                    <FilterCheckbox
                        onCheckedChange={() => onClickCheckbox?.(item.value)}
                        checked={selected.has(item.value)}
                        key={index}
                        value={item.value}
                        text={item.text}
                        endAdornment={item.endAdornment}
                        name={name}
                    />
                ))}
            </div>

            {items.length > limit && (
                <div className={showAll ? 'border-t border-t-neutral-100 mt-4' : ''}>
                    <button onClick={() => setShowAll(!showAll)} className="text-primary mt-3">
                        {showAll ? 'Скрыть' : '+ Показать все'}
                    </button>
                </div>
            )}
        </div>
    );
};