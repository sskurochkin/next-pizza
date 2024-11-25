
import {Container, Filters, ProductsGroupList, Title, TopBar,} from "@/components/shared";
import {prisma} from "@/prisma/prisma-client";





export default async function Home() {

    const categories = await prisma.category.findMany({
        include:{
            products:{
                include:{
                    ingredients: true,
                    items: true
                }
            }
        }
    })

  return (
      <>
          <Container className="mt-10">
              <Title text="Все пиццы" size="lg" className="font-extrabold"/>
          </Container>
          <TopBar categories={categories}/>
          <Container className="pb-14 mt-14">
              <div className="flex gap-[60px]">
                  <div className="w-[250px]">
                      <Filters />
                  </div>
                  <div className="flex-1">
                      <div className="flex flex-col gap-16">
                          {categories.map(x=>(
                              x.products.length && (
                                  <ProductsGroupList
                                      key={x.id}
                                      title={x.name}
                                      categoryId={x.id}
                                      items={x.products} />
                              )
                          ))}
                      </div>


                      <div className="flex items-center gap-6 mt-12">
                          {/*<Pagination pageCount={3} />*/}
                          <span className="text-sm text-gray-400">5 из 65</span>
                      </div>
                  </div>
              </div>
          </Container>
      </>

  );
}
