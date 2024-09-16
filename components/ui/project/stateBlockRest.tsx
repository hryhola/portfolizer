'use client';

import { useState } from "react";
import { Button } from "../button";
import { cn } from "@/lib/utils";
import type { StackData } from "./stackBlock";

export const StateBlockRest: React.FC<{ data: StackData[] }> = (props) => {
    const [isExpanded, setIsExpanded] = useState(false)

    if (!props.data.length) return <></>

    return <>
        <li data-set='1' className={cn({ hidden: isExpanded, block: !isExpanded})}><Button type="button" className='p-0 m-0 h-4' onClick={() => setIsExpanded(true)} variant='link'>expand rest</Button></li>
        {props.data.map(r => <li
            className={cn({ block: isExpanded, hidden: !isExpanded})}
            key={r.order}
            >
            {r.id}: <b>{r.value}</b>
        </li>)}
    </>
}
