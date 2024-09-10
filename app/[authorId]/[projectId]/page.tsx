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
      <div className="my-5 gap-5 sm:gap-x-10 grid items-start grid-cols-[1fr_min-content]">
        <h1 className="text-5xl font-extrabold  align-text-bottom col-span-2 sm:col-span-1 order-1">Project Name</h1>
        <h3 className="text-xl sm:text-5xl font-bold sm:font-normal text-right whitespace-nowrap flex items-center gap-1 sm:gap-4 order-3 sm:order-2"><MdAccessTime className='inline opacity-20 relative top-[1px]' /> 99h</h3>
        <h3 className="text-xl gap-2 flex flex-wrap order-2 sm:order-3">
          <div className='flex items-top'>
            <Avatar className="w-7 h-7 mr-2 inline-block">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <span>Username</span>
          </div>
          <div>& Project Client</div>
        </h3>
        <p className='order-4 sm:order-5 col-span-2 sm:col-span-1'>Description Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus faucibus convallis porta. Vestibulum luctus a ligula a eleifend. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nulla eget nibh at leo consectetur rutrum. Etiam in quam mi. Pellentesque quis aliquam nisi. Sed finibus purus nec risus vulputate, ac imperdiet odio aliquet. Mauris sodales felis in mattis volutpat. Fusce non gravida metus. Mauris non nisi id ipsum tincidunt gravida nec sit amet metus. In sed nisi non erat semper accumsan vel condimentum libero. Curabitur interdum lorem massa, eu euismod leo lacinia eu.</p>
        <StackBlock className=' text-left order-5 sm:order-4 col-span-2 sm:col-span-1 sm:row-span-2 sm:text-right' data={[
          { order: 0, field: 'Backend', value: 'Node' },
          { order: 1, field: 'Database', value: 'MongoDB' },
          { order: 2, field: 'Frontend', value: 'React' },
          { order: 3, field: 'UI', value: 'Flat' },
          { order: 4, field: 'Styling', value: 'Tailwind' },
          { order: 5, field: 'State', value: 'Redux' },
        ]} />
        <ComplexityLevelsBlock className='order-last col-span-2 sm:text-center' data={[
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
      <h3 className='text-3xl pb-3'>Features</h3>
      <ul className='space-y-3'>
        <li>🤓 Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
        <li>😎 Aliquam lobortis sem euismod suscipit maximus.</li>
        <li>😧 Praesent dictum nisl ut neque facilisis mollis.</li>
        <li>🤩 Etiam nec ligula convallis tortor ornare fermentum vulputate eu nisl.</li>
        <li>🥳 Aliquam porttitor est a ante ultricies porta.</li>
        <li>😒 Duis ac mauris eget nulla semper gravida.</li>
        <li>😔 Quisque in nunc ac felis rutrum eleifend.</li>
        <li>😟 Vivamus eu nulla sit amet lacus malesuada pretium.</li>
        <li>😱 Vivamus et quam in lorem maximus elementum.</li>
        <li>😐 Quisque egestas tortor vel justo blandit, in ornare risus posuere.</li>
        <li>🥴 Morbi et tortor a orci interdum aliquam eu dictum elit.</li>
        <li>🎃 Nulla pulvinar velit id ultrices cursus.</li>
        <li>✊ Donec consectetur lacus vitae metus faucibus consectetur.</li>
        <li>🎃 Suspendisse sit amet lorem eget felis porttitor consequat ac sed tellus.</li>
        <li>🎃 Ut in purus id nisi ultricies vestibulum.</li>
      </ul>
    </div>
    <Image className="w-full h-80 object-cover my-5" src='/images/image_25.png' alt={'alt'} width={1400} height={300} />
  </>);
}
