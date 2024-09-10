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
import { ProjectName } from '@/components/ui/project/projectName';
import { ProjectTimeTotal } from '@/components/ui/project/projectTimeTotal';
import { ProjectSign } from '@/components/ui/project/projectSign';
import { StackBlock } from '@/components/ui/stackBlock';

type Page = {
  searchParams: { mode: string },
  params: { authorId: string, projectId: string }
}

export default async function Page(page: Page) {
  const mode = page.searchParams.mode === 'edit' ? 'edit' : 'view';

  const timeSpent = [
    { id: 's1', label: 'Smtn1', minutesSpent: 90 },
    { id: 's2', label: 'Smtn2', minutesSpent: 80 },
    { id: 's3', label: 'Smtn3', minutesSpent: 70 },
    { id: 's4', label: 'Smtn4', minutesSpent: 60 },
    { id: 'be', label: 'Backend', minutesSpent: 231, description: 'I did something something something somethingsomethin gsomething somethingso methings omethingsometh ingsomething something something something something something something' },
    { id: 'fe', label: 'Frontend', minutesSpent: 332 },
    { id: 'deploy', label: 'Deploy', minutesSpent: 122 },
  ];

  const stack = [
    { order: 0, field: 'Backend', value: 'Node' },
    { order: 1, field: 'Database', value: 'MongoDB' },
    { order: 2, field: 'Frontend', value: 'React' },
    { order: 3, field: 'UI', value: 'Flat' },
    { order: 4, field: 'Styling', value: 'Tailwind' },
    { order: 5, field: 'State', value: 'Redux' },
  ];

  const complexity = [
    { order: 0, label: 'Backend logic', level: 'High', levelsExplanation: 'Explanation' },
    { order: 1, label: 'Frontend logic', level: 'Low' },
    { order: 2, label: 'Database design', level: 'High', levelsExplanation: 'Explanation' },
    { order: 3, label: 'Styling', level: 'Medium' }
  ];

  const features = [
    { order: 0, text: '🤓 Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
    { order: 1, text: '😎 Aliquam lobortis sem euismod suscipit maximus.' },
    { order: 2, text: '😧 Praesent dictum nisl ut neque facilisis mollis.' },
    { order: 3, text: '🤩 Etiam nec ligula convallis tortor ornare fermentum vulputate eu nisl.' },
    { order: 4, text: '🥳 Aliquam porttitor est a ante ultricies porta.' },
    { order: 5, text: '😒 Duis ac mauris eget nulla semper gravida.' },
    { order: 6, text: '😔 Quisque in nunc ac felis rutrum eleifend.' },
    { order: 7, text: '😟 Vivamus eu nulla sit amet lacus malesuada pretium.' },
    { order: 8, text: '😱 Vivamus et quam in lorem maximus elementum.' },
    { order: 9, text: '😐 Quisque egestas tortor vel justo blandit, in ornare risus posuere.' },
    { order: 10, text: '🥴 Morbi et tortor a orci interdum aliquam eu dictum elit.' },
    { order: 11, text: '🎃 Nulla pulvinar velit id ultrices cursus.' },
    { order: 12, text: '✊ Donec consectetur lacus vitae metus faucibus consectetur.' },
    { order: 13, text: '🎃 Suspendisse sit amet lorem eget felis porttitor consequat ac sed tellus.' },
    { order: 14, text: '🎃 Ut in purus id nisi ultricies vestibulum.' },
  ];

  return (<form>
    <Image className="w-full h-80 object-cover" src='/images/image_25.png' alt={'alt'} width={1400} height={300} />
    <div className="container mx-auto px-5">
      <div className="my-5 gap-5 sm:gap-x-10 grid items-start grid-cols-[1fr_min-content]">
        <ProjectName className='align-text-bottom col-span-2 sm:col-span-1 order-1' mode={mode} value='Project Name' />
        <ProjectTimeTotal className='order-3 sm:order-2' mode={mode} value='99' />
        <ProjectSign className='order-2 sm:order-3' value='Username' projectClient='Some Client' authorPictureSrc='https://github.com/shadcn.png' mode={mode} />
        <p className='order-4 sm:order-5 col-span-2 sm:col-span-1'>Description Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus faucibus convallis porta. Vestibulum luctus a ligula a eleifend. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nulla eget nibh at leo consectetur rutrum. Etiam in quam mi. Pellentesque quis aliquam nisi. Sed finibus purus nec risus vulputate, ac imperdiet odio aliquet. Mauris sodales felis in mattis volutpat. Fusce non gravida metus. Mauris non nisi id ipsum tincidunt gravida nec sit amet metus. In sed nisi non erat semper accumsan vel condimentum libero. Curabitur interdum lorem massa, eu euismod leo lacinia eu.</p>
        <StackBlock className=' text-left order-5 sm:order-4 col-span-2 sm:col-span-1 sm:row-span-2 sm:text-right' data={stack} />
        <ComplexityLevelsBlock className='order-last col-span-2 sm:text-center' data={complexity} />
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
        {features.map(f => <li key={f.order}>{f.text}</li>)}
      </ul>
    </div>
    <Image className="w-full h-80 object-cover my-5" src='/images/image_25.png' alt={'alt'} width={1400} height={300} />
  </form>);
}
