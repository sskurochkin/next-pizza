import {prisma} from "@/prisma/prisma-client";
import {notFound} from "next/navigation";
import {Container, ProductImage, Title} from "@/components/shared";



export default async function ProductPage({params: {id}}){

    const product = await prisma.product.findFirst({
        where : {
            id: Number(id)
        }
    })

    if(!product){
        return notFound()
    }


    return(

        <Container className="flex flex-col my-10">
            <div className={"flex flex-1"}>
                <ProductImage imageUrl={product.imageUrl} size={20}/>
                <div className={"w-[490px] bg-[#f7f6f5] p-7"}>
                    <Title text={product.name} className={"font-extrabold mb-1"}/>
                    <p className={"text-gray-400"}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad alias aperiam cumque fuga maiores mollitia quas quo repellat, reprehenderit veniam.</p>
                </div>
            </div>


        </Container>

    )
}