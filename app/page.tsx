import Image from "next/image";
import {Button} from "@/components/ui/button";
import {Container, Filters, ProductsGroupList, Title, TopBar,} from "@/components/shared";
import {ProductCard} from "@/components/shared/product-card";




export default function Home() {
  return (
      <>
          <Container className="mt-10">
              <Title text="Все пиццы" size="lg" className="font-extrabold"/>
          </Container>
          <TopBar/>
          <Container className="pb-14 mt-14">
              <div className="flex gap-[60px]">
                  <div className="w-[250px]">
                      <Filters />
                  </div>
                  <div className="flex-1">
                      <div className="flex flex-col gap-16">
                          <ProductsGroupList title="Пиццы" categoryId={0} items={[1, 2, 3, 4, 5]} />
                          <ProductsGroupList title="Комбо" categoryId={1} items={[1, 2, 3, 4, 5]} />
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
