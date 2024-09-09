import React from 'react'
import { MdAccessTime, MdSignalCellular1Bar, MdSignalCellular2Bar , MdSignalCellular4Bar  } from "react-icons/md";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { cn } from '@/lib/utils';
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from '@radix-ui/react-tooltip';
import { Tip } from './tip';

type Props = {
    className?: string
    level: 'Low' | 'Medium' | 'High'
    explanation: string
}

const ComplexityLevel = (props: Props) => {
    let LevelIcon = MdSignalCellular4Bar;

    if (props.level === 'Medium') {
        LevelIcon = MdSignalCellular2Bar
    } else if (props.level === 'Low') {
        LevelIcon = MdSignalCellular1Bar
    } 

  return (
    <div className={cn('inline-block', props.className)}>
        <b><LevelIcon className='inline-block relative top-[-2px] ' /> {props.level} </b>
        <Tip content={props.explanation}>
            <IoIosInformationCircleOutline className='inline opacity-55 relative top-[-1px]' />
        </Tip>
    </div>
  )
}

export default ComplexityLevel
