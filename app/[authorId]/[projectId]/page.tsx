import Image from 'next/image'
import { TimeSpentChart } from '@/components/ui/project/timeSpentChart';
import { TimeSpentChartDetails } from '@/components/ui/project/timeSpentChartDetails';
import { ComplexityLevelsBlock } from '@/components/ui/project/complexityLevelsBlock';
import { ProjectName } from '@/components/ui/project/projectName';
import { ProjectTimeTotal } from '@/components/ui/project/projectTimeTotal';
import { ProjectSign } from '@/components/ui/project/projectSign';
import { StackBlock } from '@/components/ui/project/stackBlock';
import { ProjectDescription } from '@/components/ui/project/projectDescription';
import { LinksBlock } from '@/components/ui/project/linksBlock';
import { EditableTimeSpent } from '@/components/ui/project/editableTimeSpent';

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
    { id: 'id-6', order: 5, field: 'State', value: 'Redux' },
    { id: 'id-3', order: 2, field: 'Frontend', value: 'React' },
    { id: 'id-4', order: 3, field: 'UI', value: 'Flat' },
    { id: 'id-2', order: 1, field: 'Database', value: 'MongoDB' },
    { id: 'id-1', order: 0, field: 'Backend', value: 'Node' },
    { id: 'id-5', order: 4, field: 'Styling', value: 'Tailwind' },
  ];

  const complexity = [
    { id: 'id-1', order: 0, label: 'Backend logic', level: 'High' as const, levelsExplanation: 'Explanation' },
    { id: 'id-2', order: 1, label: 'Frontend logic', level: 'Low' as const },
    { id: 'id-3', order: 2, label: 'Database design', level: 'High' as const, levelsExplanation: 'Explanation' },
    { id: 'id-4', order: 3, label: 'Styling', level: 'Medium' as const }
  ];

  const features = [
    { id: 'id-1', order: 0, text: '🤓 Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
    { id: 'id-2', order: 1, text: '😎 Aliquam lobortis sem euismod suscipit maximus.' },
    { id: 'id-3', order: 2, text: '😧 Praesent dictum nisl ut neque facilisis mollis.' },
    { id: 'id-4', order: 3, text: '🤩 Etiam nec ligula convallis tortor ornare fermentum vulputate eu nisl.' },
    { id: 'id-5', order: 4, text: '🥳 Aliquam porttitor est a ante ultricies porta.' },
    { id: 'id-6', order: 5, text: '😒 Duis ac mauris eget nulla semper gravida.' },
    { id: 'id-7', order: 6, text: '😔 Quisque in nunc ac felis rutrum eleifend.' },
    { id: 'id-8', order: 7, text: '😟 Vivamus eu nulla sit amet lacus malesuada pretium.' },
    { id: 'id-9', order: 8, text: '😱 Vivamus et quam in lorem maximus elementum.' },
    { id: 'id-10', order: 9, text: '😐 Quisque egestas tortor vel justo blandit, in ornare risus posuere.' },
    { id: 'id-11', order: 10, text: '🥴 Morbi et tortor a orci interdum aliquam eu dictum elit.' },
    { id: 'id-12', order: 11, text: '🎃 Nulla pulvinar velit id ultrices cursus.' },
    { id: 'id-13', order: 12, text: '✊ Donec consectetur lacus vitae metus faucibus consectetur.' },
    { id: 'id-14', order: 13, text: '🎃 Suspendisse sit amet lorem eget felis porttitor consequat ac sed tellus.' },
    { id: 'id-15', order: 14, text: '🎃 Ut in purus id nisi ultricies vestibulum.' },
  ];

  const links = [
    { id: 'id-1', order: 1, label: 'See live:', url: 'https://www.google.com/' },
    { id: 'id-2', order: 2, label: 'Figma Design:', url: 'https://www.google.com/' },
    { id: 'id-3', order: 3, label: 'Source Code:', url: 'https://www.google.com/' }
  ]

  return (<form>
    <Image className="w-full h-80 object-cover" src='/images/image_25.png' alt={'alt'} width={1400} height={300} />
    <div className="container mx-auto px-5">
      <div className="my-5 gap-5 sm:gap-x-10 grid items-start grid-cols-[1fr_min-content]">
        <ProjectName className='align-text-bottom col-span-2 sm:col-span-1 order-1' mode={mode} value='Project Name' />
        <ProjectTimeTotal className='order-3 sm:order-2' mode={mode} value='99' />
        <ProjectSign className='order-2 sm:order-3' value='Username' projectClient='Some Client' authorPictureSrc='https://github.com/shadcn.png' mode={mode} />
        <ProjectDescription className='order-4 sm:order-5 col-span-2 sm:col-span-1' value='Description Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus faucibus convallis porta. Vestibulum luctus a ligula a eleifend. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nulla eget nibh at leo consectetur rutrum. Etiam in quam mi. Pellentesque quis aliquam nisi. Sed finibus purus nec risus vulputate, ac imperdiet odio aliquet. Mauris sodales felis in mattis volutpat. Fusce non gravida metus. Mauris non nisi id ipsum tincidunt gravida nec sit amet metus. In sed nisi non erat semper accumsan vel condimentum libero. Curabitur interdum lorem massa, eu euismod leo lacinia eu.' mode={mode} />
        <StackBlock className='text-left order-5 sm:order-4 col-span-2 sm:col-span-1 sm:row-span-2 sm:text-right' data={stack} mode={mode} />
        <ComplexityLevelsBlock className='order-last col-span-2 sm:text-center' data={complexity} mode={mode} />
      </div>
      <LinksBlock className='my-5' data={links} mode={mode} />
      {mode === 'view' && <>
        <TimeSpentChart data={timeSpent} />
        <TimeSpentChartDetails data={timeSpent} />
      </>}
      {mode === 'edit' && <EditableTimeSpent data={timeSpent} />}
      <h3 className='text-3xl pb-3'>Features</h3>
      <ul className='space-y-3'>
        {features.map(f => <li key={f.order}>{f.text}</li>)}
      </ul>
    </div>
    <Image className="w-full h-80 object-cover my-5" src='/images/image_25.png' alt={'alt'} width={1400} height={300} />
  </form>);
}
