import {Ingredient} from "@prisma/client";
import {Api} from "@/services/api-clients";
import React from "react";
import {useSet} from "react-use";


interface ReturnProps {
    ingredients: Ingredient[];
    loading: boolean;
    selectedIngredients: Set<string>;
    onAddId: (id:string) => void
}


export const useFilterIngredients = (values: string[] = []):ReturnProps =>{

    const [ingredients, setIngredients] = React.useState<Ingredient[]>([]);
    const [loading, setLoading] = React.useState(true);

    const [selectedIngredients, { toggle }] = useSet(new Set<string>(values));


    React.useEffect(()=>{
        async function fetchIngredients() {
            try {
                setLoading(true);
                const ingredients = await Api.ingredients.getAll();
                setIngredients(ingredients);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        }

        fetchIngredients()

    }, [])


    return {  ingredients, loading, onAddId : toggle, selectedIngredients };

}