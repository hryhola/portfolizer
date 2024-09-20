import { Button } from "@/components/ui/button";
import Image from 'next/image';
import Link from "next/link";

export default function Home() {
  return (
    <div className="h-dvh">
      <div className="h-1/3 flex flex-col justify-center items-center gap-10 border-b px-5">
        <h1 className="text-5xl text-center">Show Your Portfolio Everyone</h1>
        <div className="flex gap-5">
          <Link href='/register'>
            <Button>Sign Up</Button>
          </Link>
          <Link href='/users'>
            <Button variant='outline'>View Users</Button>
          </Link>
          <Link href='/projects'>
            <Button variant='outline'>View Projects</Button>
          </Link>
        </div>
      </div>
      <div className="flex flex-wrap justify-center items-center gap-5 p-5">
        <div className="border border-black rounded">
          <Image className='w-full sm:w-auto' src='/images/Dude.webp' width={272} height={272} alt='Profile Picture' />
          <p className="px-2 flex flex-wrap justify-between items-center">
            <Link className="hover:underline text-2xl " href='/dude12'>
              Some Dude
            </Link> 
            <span>12 projects</span>
          </p> 
        </div>
        <div className="border border-black rounded min-w-96 min-h-52">
          <h3 className="text-2xl p-2 border-b border-gray-600">
            <Link className="hover:underline" href='/dude/project'>
              Project Name
            </Link>
          </h3>
          <p className="px-2 flex justify-between">
            <span>
              by <Link className="hover:underline" href='/someuser'>Some User</Link>
            </span>
            <span>99 hours</span>
          </p>
          <Image className="w-full" src='/images/image_25.png' width={272} height={272} alt='Project Pictures'/>
        </div>
      </div>
    </div>
  );
}
