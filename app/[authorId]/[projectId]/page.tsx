import Image from 'next/image'
import { MdAccessTime } from "react-icons/md";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { TimeSpentChart } from '@/components/ui/timeSpentChart';
import { TimeSpentChartDetails } from '@/components/ui/timeSpentChartDetails';
import { ComplexityLevelsBlock } from '@/components/ui/complexityLevelsBlock';
import { StackBlock } from '@/components/ui/StackBlock';

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
        <h1 className="text-5xl font-extrabold col-span-2 sm:col-auto align-text-bottom">Project Name</h1>
        <h3 className="text-xl sm:text-5xl font-bold sm:font-normal text-right order-last sm:order-1 whitespace-nowrap flex items-center gap-1 sm:gap-4"><MdAccessTime className='inline opacity-20 relative top-[1px]' /> 99h</h3>
        <h3 className="text-xl order-1 gap-2 flex flex-wrap">
          <div className='flex items-top'>
            <Avatar className="w-7 h-7 mr-2 inline-block">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <span>Username</span>
          </div>
          <div>& Project Client</div>
        </h3>
      </div>
      <div className="grid grid-cols-[1fr_min-content] gap-5 sm:gap-x-10">
        <p className='col-span-2 sm:col-auto'>Description Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus faucibus convallis porta. Vestibulum luctus a ligula a eleifend. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nulla eget nibh at leo consectetur rutrum. Etiam in quam mi. Pellentesque quis aliquam nisi. Sed finibus purus nec risus vulputate, ac imperdiet odio aliquet. Mauris sodales felis in mattis volutpat. Fusce non gravida metus. Mauris non nisi id ipsum tincidunt gravida nec sit amet metus. In sed nisi non erat semper accumsan vel condimentum libero. Curabitur interdum lorem massa, eu euismod leo lacinia eu.</p>
        <StackBlock className='col-span-2 sm:col-auto text-left sm:text-right' data={[
          { order: 0, field: 'Backend', value: 'Node' },
          { order: 1, field: 'Database', value: 'MongoDB' },
          { order: 2, field: 'Frontend', value: 'React' },
          { order: 3, field: 'UI', value: 'Flat' },
          { order: 4, field: 'Styling', value: 'Tailwind' },
          { order: 5, field: 'State', value: 'Redux' },
        ]} />
        <ComplexityLevelsBlock className='sm:col-span-2 sm:text-center' data={[
          { order: 0, label: 'Backend logic', level: 'High', levelsExplanation: 'Explanation'  },
          { order: 1, label: 'Frontend logic', level: 'Low' },
          { order: 2, label: 'Database design', level: 'High', levelsExplanation: 'Explanation'  },
          { order: 3, label: 'Styling', level: 'Medium'  }
        ]} />
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
