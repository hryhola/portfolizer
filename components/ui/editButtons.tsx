import { ChevronUp, ChevronDown } from 'lucide-react';
import React from 'react'
import { Button } from './button';

interface EditButtonsProps {
    id: string,
    removeButtonContent?: JSX.Element
    onRemove: React.MouseEventHandler<HTMLButtonElement>
    onUp: React.MouseEventHandler<HTMLButtonElement>
    onDown: React.MouseEventHandler<HTMLButtonElement>
}

export const EditButtons: React.FC<EditButtonsProps> = (props) => {
    return <>
        <Button variant='ghost'
            type="button"
            onClick={props.onRemove}
            data-id={props.id}
        >{ props.removeButtonContent ? props.removeButtonContent : '❌' }</Button>
        <Button className='opacity-40 hover:opacity-100'
            variant='ghost'
            type='button'
            onClick={props.onUp}
            data-id={props.id}
        >
            <ChevronUp />
        </Button>
        <Button className='opacity-40 hover:opacity-100'
            variant='ghost'
            type='button'
            onClick={props.onDown}
            data-id={props.id}
        >
            <ChevronDown />
        </Button>
    </>;
}
