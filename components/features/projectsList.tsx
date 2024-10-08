'use client'

import React, { useEffect, useState } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { MultiSelect } from '@/components/ui/multi-select'
import { ProjectCard, ProjectCardProps } from './projectCard'
import { Button } from '@/components/ui/button'
import { ArrowDownWideNarrow, ArrowUpWideNarrow } from 'lucide-react'
import { Checkbox } from '../ui/checkbox'

type SortByType = 'date-created' | 'work-hours' | 'complexity'
type SortDirection = 'ascending' | 'descending'

interface ProjectsListProps {
    projects: ProjectCardProps[]
}

export const ProjectsList: React.FC<ProjectsListProps> = (props) => {
    const [searchText, setSearchText] = useState('')
    const [sortDirection, setSortDirection] = useState<SortDirection>('descending')
    const [sortBy, setSortBy] = useState<SortByType>('date-created')
    const [selectedFrameworks, setSelectedFrameworks] = useState<string[]>([])
    const [onlyCommercialProjects, setOnlyCommercialProjects] = useState(false)

    const [list, setList] = useState(props.projects)

    const frameworks = props.projects.reduce((acc, curr) => {
        curr.frameworks.forEach(f =>{
            if (!acc.includes(f)) acc.push(f)
        })
        
        return acc
    }, [] as string[])

    function sortList(array: ProjectCardProps[], by: SortByType, direction: SortDirection) {
        return [...array].sort((a, b) => {
            let comparison = 0
    
            // Map complexity values to numbers for comparison
            const complexityMap = {
                'Low': 1,
                'Medium': 2,
                'High': 3
            }
    
            switch (by) {
            case 'date-created':
                comparison = (a.dateCreated?.getTime() || 0)  - (b.dateCreated?.getTime() || 0)
                break
            case 'work-hours':
                // Handle cases where totalHours is undefined (treat undefined as 0 or set your own logic)
                const hoursA = a.totalHours ?? 0
                const hoursB = b.totalHours ?? 0
                comparison = hoursA - hoursB
                break
            case 'complexity':
                // Convert the string values to numbers using the complexityMap
                const complexityA = complexityMap[a.totalComplexity || 'Low'] // Default to 'Low' if undefined
                const complexityB = complexityMap[b.totalComplexity || 'Low'] // Default to 'Low' if undefined
                comparison = complexityA - complexityB
                break
            default:
                break
            }
    
            // If descending, reverse the comparison result
            if (direction === 'descending') {
                comparison *= -1
            }
    
            return comparison
        })
    }

    useEffect(() => {
        let filtered = props.projects

        if (onlyCommercialProjects) {
            filtered = props.projects.filter(p => p.client?.length)
        }

        if (selectedFrameworks.length) {
            filtered = props.projects.filter(p => p.frameworks.some(f => selectedFrameworks?.includes(f)))
        }
        
        if (searchText.length) {
            filtered = props.projects.filter(p => p.name.toLowerCase().includes(searchText.toLowerCase().trim()))
        }

        setList(sortList(filtered, sortBy, sortDirection))
    }, [searchText, sortBy, sortDirection, selectedFrameworks, onlyCommercialProjects])

    return <>
        <div className='grid grid-cols-1 sm:grid-cols-3 md:grid-cols-[3fr_1fr_2fr] gap-2'>
            <div className='sm:col-span-2 md:col-span-1 flex items-center'>
                <Checkbox name='commercial'
                    checked={onlyCommercialProjects}
                    onCheckedChange={(val) => setOnlyCommercialProjects(typeof val === 'boolean' ? val : false)}
                />
                <Label className='whitespace-nowrap ml-2 mr-3 hover:cursor-pointer text-xs sm:text-sm'
                    htmlFor='commercial'
                    onClick={() => setOnlyCommercialProjects(prev => !prev)}
                >
                    Only Commercial Projects
                </Label>
                <Input className=' border-gray-500 drop-shadow-lg'
                    placeholder='Search'
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                />
            </div>

            <div className='xl:ml-4 md:col-span-1 flex items-center self-baseline gap-1 sm:gap-2'>
                <Button className='px-1 space-x-px sm:space-x-2' variant='ghost'
                    onClick={() => setSortDirection((prev) => prev === 'ascending' ? 'descending' : 'ascending')}
                >
                    <Label className='whitespace-nowrap cursor-pointer drop-shadow-sm text-xs sm:text-sm' htmlFor='sort-projects-by'>Sort by</Label>
                    {sortDirection === 'ascending'
                        ? <ArrowUpWideNarrow className='scale-75 sm:scale-100' />
                        : <ArrowDownWideNarrow className='scale-75 sm:scale-100' />}
                </Button>
                
                <Select name='sort-projects-by' value={sortBy} onValueChange={(value: SortByType) => setSortBy(value)}>
                    <SelectTrigger className='border-gray-500 drop-shadow-lg'>
                        <SelectValue placeholder='Sort value' />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value='date-created'>Date created</SelectItem>
                        <SelectItem value='work-hours'>Work hours</SelectItem>
                        <SelectItem value='complexity'>Complexity</SelectItem>
                    </SelectContent>
                </Select>
                
            </div>

            <div className='xl:ml-4 sm:col-span-3 md:col-span-1 flex items-center gap-2'>
                <Label htmlFor='filter-projects-by' className='whitespace-nowrap text-xs sm:text-sm'>Filter by</Label>
                <MultiSelect
                    className='flex-grow border-gray-500 shadow-lg'
                    name='filter-projects-by'
                    options={frameworks.map(f => ({ value: f, label: f }))}
                    onValueChange={setSelectedFrameworks}
                    placeholder='Filter by frameworks'
                    variant='inverted'
                    maxCount={3}
                    noselectall='true'
                />
            </div>
        </div>
        <div className='space-y-5 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-5'>
            {list.map(p => <ProjectCard key={p.id} {...p} />)}
        </div>
    </>
}
