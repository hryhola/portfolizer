import { HeroBanner } from "@/components/features/heroBanner";
import { SimpleProjectCard } from "@/components/features/simpleProjectCard";
import { SimpleUserCard } from "@/components/features/simpleUserCard";

export default function Home() {
  return (
    <div className="h-dvh">
      <HeroBanner className="h-1/3"/>
      <div className="flex flex-wrap justify-center items-center gap-5 p-5">
        <SimpleUserCard id="dude12" imageSrc="/images/Dude.webp" name="Some Dude" projectsAmount={123} />
        <SimpleProjectCard id='project12' totalHours={123} authorId="user123" authorName="SomeUser" name="Project X 12" imageSrc="/images/image_25.png" />
      </div>
    </div>
  );
}
