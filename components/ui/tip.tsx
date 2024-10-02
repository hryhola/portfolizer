
'use client';

import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@radix-ui/react-tooltip";
import React from "react";

export const Tip = ({
    content,
    children,
    className
  }: React.PropsWithChildren<{ content: string | React.ReactNode; className?: string }>) => {
    const [open, setOpen] = React.useState(false);
  
    return (
      <TooltipProvider delayDuration={0}>
        <Tooltip open={open}>
          <TooltipTrigger asChild>
            <button
              type="button"
              className={cn('cursor-pointer', className)}
              onClick={() => setOpen(!open)}
              onMouseEnter={() => setOpen(true)}
              onMouseLeave={() => setOpen(false)}
              onTouchStart={() => setOpen(!open)}
              onKeyDown={(e) => {
                e.preventDefault();
                if (e.key === 'Enter') setOpen(!open);
              }}
            >
              {children}
            </button>
          </TooltipTrigger>
          <TooltipContent className={!content ? 'hidden' : ''}>
            <span className="inline-block px-2 py-1 bg-white border rounded-lg border-black">{content}</span>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  };