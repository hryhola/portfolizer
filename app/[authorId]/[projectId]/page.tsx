import { ComplexityLevelsBlock } from '@/components/features/project/complexityLevelsBlock';
import { EditApproveButtons } from '@/components/features/project/editApproveButtons';
import { ProjectFeatures } from '@/components/features/project/features';
import { HeaderImage } from '@/components/features/project/headerImage';
import { LinksBlock } from '@/components/features/project/linksBlock';
import { ProjectDescription } from '@/components/features/project/projectDescription';
import { PreEditButtons } from '@/components/features/project/preEditButtons';
import { ProjectFormWrapper } from '@/components/features/project/projectFormWrapper';
import { ProjectName } from '@/components/features/project/projectName';
import { ProjectPhotos } from '@/components/features/project/projectPhotos';
import { ProjectSign } from '@/components/features/project/projectSign';
import { ProjectTimeSpent } from '@/components/features/project/projectTimeSpent';
import { ProjectTimeTotal } from '@/components/features/project/projectTimeTotal';
import { StackBlock } from '@/components/features/project/stackBlock';
import { getProject } from '@/lib/firebase/admin/db';
import { getCurrentUser } from '@/lib/firebase/admin/session';
import { unpackRecords } from '@/lib/object';
import { notFound } from 'next/navigation';
import { FC } from 'react';

type Page = {
    searchParams: { mode: string },
    params: { authorId: string, projectId: string }
}

export default async function Page(page: Page) {
    const project = await getProject(page.params.authorId, page.params.projectId)!

    if (!project) {
        return notFound()
    }

    const currentUser = await getCurrentUser();

    if (!project.published && currentUser?.uid !== project.authorUid) {
        return notFound()
    }

    const isCurrentUsersProject = currentUser?.uid === project.authorUid

    const mode = page.searchParams.mode === 'edit' && isCurrentUsersProject
        ? 'edit'
        : 'view';

    const timeSpent = unpackRecords(project.time)
    const stack = unpackRecords(project.stack)
    const complexity = unpackRecords(project.complexity)
    const features = project.features || []
    const links = project.links || []
    const photos = project.photos || []

    let Wrapper: FC<{ children: JSX.Element | JSX.Element[] }> = (props) => <div>{props.children}</div>

    if (mode === 'edit') {
        Wrapper = (props) => <ProjectFormWrapper id={project.id}
            uid={project.uid}
            complexity={complexity}
            features={features}
            links={links}
            stack={stack}
            time={timeSpent}
            photos={photos}
        >
            {props.children}
        </ProjectFormWrapper>;
    }

    return (<Wrapper>
        {mode === 'edit' ? <EditApproveButtons published={project.published} /> : <></>}
        <HeaderImage value={project.headerImageSrc} mode={mode} />
        <div className="container mx-auto px-5">
            {mode !== 'edit' && isCurrentUsersProject ? <PreEditButtons authorId={project.authorId} projectId={project.id} projectName={project.name} projectUid={project.uid} /> : <></>}
            <div className="my-5 gap-5 sm:gap-x-10 grid items-start grid-cols-[1fr_min-content]">
                <ProjectName className='align-text-bottom col-span-2 sm:col-span-1 order-1' mode={mode} value={project.name} />
                <ProjectTimeTotal className='order-3 sm:order-2' mode={mode} value={project.timeTotal} />
                <ProjectSign className='order-2 sm:order-3' date={project.date} value={project.authorName} authorId={project.authorId} projectClient={project.client} authorImageSrc={project.authorImageSrc} mode={mode} />
                <ProjectDescription className='order-4 sm:order-5 col-span-2 sm:col-span-1' value={project.description} mode={mode} />
                <StackBlock className='text-left order-5 sm:order-4 col-span-2 sm:col-span-1 sm:row-span-2 sm:text-right' data={stack} mode={mode} />
                <ComplexityLevelsBlock className='order-last col-span-2 sm:text-center' data={complexity} mode={mode} />
            </div>
            <LinksBlock className='my-5' data={links} mode={mode} />
            <ProjectTimeSpent data={timeSpent} mode={mode} />
            <ProjectFeatures data={features} mode={mode} />
        </div>
        <ProjectPhotos data={photos} mode={mode} />
    </Wrapper>);
}
