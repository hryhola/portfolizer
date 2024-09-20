import { ComplexityLevelsBlock } from '@/components/features/project/complexityLevelsBlock';
import { EditApproveButtons } from '@/components/features/project/editApproveButtons';
import { ProjectFeatures } from '@/components/features/project/features';
import { HeaderImage } from '@/components/features/project/headerImage';
import { LinksBlock } from '@/components/features/project/linksBlock';
import { ProjectDescription } from '@/components/features/project/projectDescription';
import { ProjectFormWrapper } from '@/components/features/project/projectFormWrapper';
import { ProjectName } from '@/components/features/project/projectName';
import { ProjectPhotos } from '@/components/features/project/projectPhotos';
import { ProjectSign } from '@/components/features/project/projectSign';
import { ProjectTimeSpent } from '@/components/features/project/projectTimeSpent';
import { ProjectTimeTotal } from '@/components/features/project/projectTimeTotal';
import { StackBlock } from '@/components/features/project/stackBlock';
import { FC } from 'react';

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
    { order: 5, id: 'State', value: 'Redux' },
    { order: 2, id: 'Frontend', value: 'React' },
    { order: 3, id: 'UI', value: 'Flat' },
    { order: 1, id: 'Database', value: 'MongoDB' },
    { order: 0, id: 'Backend', value: 'Node' },
    { order: 4, id: 'Styling', value: 'Tailwind' },
  ];

  const complexity = [
    { order: 0, id: 'Backend logic', level: 'High' as const, levelsExplanation: 'Explanation' },
    { order: 1, id: 'Frontend logic', level: 'Low' as const },
    { order: 2, id: 'Database design', level: 'High' as const, levelsExplanation: 'Explanation' },
    { order: 3, id: 'Styling', level: 'Medium' as const }
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
    { order: 1, id: 'See live:', url: 'https://www.google.com/' },
    { order: 2, id: 'Figma Design:', url: 'https://www.google.com/' },
    { order: 3, id: 'Source Code:', url: 'https://www.google.com/' }
  ]

  const projectImages = [
    {
      src:
        "https://images.unsplash.com/photo-1499696010180-025ef6e1a8f9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    },
    {
      src:
        "https://images.unsplash.com/photo-1432462770865-65b70566d673?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
    },
    {
      src:
        "https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2560&q=80",
    },
    {
      src:
        "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80",
    },
    {
      src:
        "https://images.unsplash.com/photo-1518623489648-a173ef7824f3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2762&q=80",
    },
    {
      src:
        "https://images.unsplash.com/photo-1682407186023-12c70a4a35e0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2832&q=80",
    },
    {
      src:
        "https://demos.creative-tim.com/material-kit-pro/assets/img/examples/blog5.jpg",
    },
    {
      src:
        "https://material-taillwind-pro-ct-tailwind-team.vercel.app/img/content2.jpg",
    },
    {
      src:
        "https://images.unsplash.com/photo-1620064916958-605375619af8?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1493&q=80",
    },
  ];

  let Wrapper: FC<{ children: JSX.Element | JSX.Element[] }> = (props) => <div>{props.children}</div>

  if (mode === 'edit') {
    Wrapper = (props) => <ProjectFormWrapper complexity={complexity}
        features={features}
        links={links}
        photos={projectImages}
        stack={stack}
        time={timeSpent}
      >
        {props.children}
      </ProjectFormWrapper>;
  }

  return (<Wrapper>
    {mode === 'edit' ? <EditApproveButtons /> : <></>}
    <HeaderImage value='/images/image_25.png' mode={mode} />
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
      <ProjectTimeSpent data={timeSpent} mode={mode} />
      <ProjectFeatures data={features} mode={mode} />
    </div>
    <ProjectPhotos data={projectImages} mode={mode} />
  </Wrapper>);
}
