import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="h-dvh">
      <div className="h-1/3 flex flex-col justify-center items-center gap-10 border-b">
        <h1 className="text-3xl">Show Your Portfolio Everyone</h1>
        <div className="flex gap-5">
          <Button>Sign Up</Button>
          <Link href='/a/b'>
            <Button variant='outline'>View Users</Button>
          </Link>
          <Button variant='outline'>View Projects</Button>
        </div>
      </div>
    </div>
  );
}
