import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { MdAccessTime } from "react-icons/md";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import ComplexityLevel from '@/components/ui/complexityLevel';
import { TimeSpentChart } from '@/components/ui/timeSpentChart';
import { TimeSpentChartDetails } from '@/components/ui/timeSpentChartDetails';

export default function Home() {
  const timeSpent = [
    { id: 's1', label: 'Smtn1', minutesSpent: 90 },
    { id: 's2', label: 'Smtn2', minutesSpent: 80 },
    { id: 's3', label: 'Smtn3', minutesSpent: 70 },
    { id: 's4', label: 'Smtn4', minutesSpent: 60 },
    { id: 'be', label: 'Backend', minutesSpent: 231, description: 'I did something something something somethingsomethin gsomething somethingso methings omethingsometh ingsomething something something something something something something' },
    { id: 'fe', label: 'Frontend', minutesSpent: 332 },
    { id: 'deploy', label: 'Deploy', minutesSpent: 122 },
  ];

  return (<>
    <Image className="w-full h-80 object-cover" src='/images/image_25.png' alt={'alt'} width={1400} height={300} />
    <div className="container mx-auto px-5">
      <div className="my-5 gap-5 grid items-start grid-cols-[1fr_min-content]">
        <h1 className="text-5xl font-extrabold  col-span-2 sm:col-auto align-text-bottom">Project Name</h1>
        <h3 className="text-xl sm:text-5xl font-bold sm:font-normal text-right order-last sm:order-1 whitespace-nowrap flex items-center gap-1 sm:gap-4"><MdAccessTime className='inline opacity-20 relative top-[1px]' /> 99h</h3>
        <h3 className="text-xl order-1 gap-2 flex flex-wrap">
          <div className='flex items-top'>
            <Avatar className="w-7 h-7 mr-2 inline-block">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <span>Username</span>
          </div>
          <div>& <span className='italic'>Project Client</span></div>
        </h3>
      </div>
      <div className="grid grid-cols-[1fr_min-content] gap-5 sm:gap-x-10">
        <p className='col-span-2 sm:col-auto'>Description Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus faucibus convallis porta. Vestibulum luctus a ligula a eleifend. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nulla eget nibh at leo consectetur rutrum. Etiam in quam mi. Pellentesque quis aliquam nisi. Sed finibus purus nec risus vulputate, ac imperdiet odio aliquet. Mauris sodales felis in mattis volutpat. Fusce non gravida metus. Mauris non nisi id ipsum tincidunt gravida nec sit amet metus. In sed nisi non erat semper accumsan vel condimentum libero. Curabitur interdum lorem massa, eu euismod leo lacinia eu.</p>
        <div className='col-span-2 sm:col-auto text-left sm:text-right'>
          <h4 className='font-mono mb-1'>Stack</h4>
          <ul className="whitespace-nowrap ">
            <li>Backend: <b>Node</b></li>
            <li>Database: <b>MongoDB</b></li>
            <li>Frontend: <b>React</b></li>
            <li>UI: <b>Flat</b></li>
            <li>Styling: <b>Tailwind</b></li>
            <li><Button className="p-0 h-auto" variant="link" >... expand</Button></li>
            <li className="hidden">#ipsum</li>
            <li className="hidden">#dolor</li>
            <li className="hidden">#sit</li>
            <li className="hidden">#amet</li>
            <li className="hidden">#consectetur</li>
            <li className="hidden">#adipiscing</li>
            <li className="hidden">#elit</li>
            <li className="hidden">#Fusce</li>
            <li className="hidden">#tempor</li>
            <li className="hidden">#porttitor</li>
            <li className="hidden">#tortor</li>
          </ul>
        </div>
        <div className='sm:col-span-2 sm:text-center'>
          <h4 className='font-mono mb-3'>Complexity</h4>
          <ul className="whitespace-nowrap flex flex-col sm:flex-row flex-wrap gap-x-5 md:justify-around justify-center">
            <li>Backend logic: <ComplexityLevel explanation='Because something' level='High' /></li>
            <li>Frontend logic: <ComplexityLevel explanation='Because something' level='Low' /></li>
            <li>Database design: <ComplexityLevel explanation='Because something' level='High' /></li>
            <li>Styling: <ComplexityLevel explanation='Because something' level='Medium' /></li>
          </ul>
        </div>
        <div>
        </div>
      </div>
      <div className='my-5 text-center divide-y-2'>
        <p className='py-3'>See live: <a className='underline' href='https://www.google.com/'>https://www.google.com/</a></p>
        <p className='py-3'>Source Code: <a className='underline' href='https://www.google.com/'>https://www.google.com/</a></p>
        <p className='py-3'>Designs: <a className='underline' href='https://www.google.com/'>https://www.google.com/</a></p>
      </div>
      <TimeSpentChart data={timeSpent} />
      <TimeSpentChartDetails data={timeSpent} />
    </div>
  </>);
}
