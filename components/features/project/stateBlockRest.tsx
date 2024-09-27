'use client';

import { useState } from "react";
import { cn } from "@/lib/utils";
import type { StackData } from "./stackBlock";
import { Button } from "@/components/ui/button";

export const StateBlockRest: React.FC<{ data: StackData[] }> = (props) => {
    const [isExpanded, setIsExpanded] = useState(false)

    if (!props.data.length) return <></>

    return <>
        <li className={cn({ hidden: isExpanded, block: !isExpanded})}><Button type="button" className='p-0 m-0 h-4' onClick={() => setIsExpanded(true)} variant='link'>expand rest</Button></li>
        {props.data.map((r, i) => <li
            className={cn({ block: isExpanded, hidden: !isExpanded })}
            key={r.id}
            >
            {r.id}: <b>{r.value}</b>
        </li>)}
    </>
}
