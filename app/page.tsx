import Hero from "@/components/homepage/hero";
import Features from "@/components/homepage/features";
import PageWrapper from "@/components/wrapper/page-wrapper";
export default function Home() {
  return (
        <PageWrapper>
          <div className="flex flex-col justify-center items-center w-full mt-[1rem] p-3">
            <Hero />
          </div>
          <div className="flex my-[8rem] w-full justify-center items-center">
            <Features />
          </div>
        </PageWrapper>
  );
}
