import Image from "next/image";
import {Button} from "@/components/ui/button";
import {Container, Title, TopBar,} from "@/components/shared";



export default function Home() {
  return (
      <>
          <Container className="mt-10">
              <Title text="Все пиццы" size="lg" className="font-extrabold"/>
          </Container>
          <TopBar/>
      </>

  );
}
