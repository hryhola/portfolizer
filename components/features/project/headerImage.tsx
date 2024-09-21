import React from 'react'
import Image from 'next/image'
import { EditableComponentProps } from '../../ui/types';
import { EditableHeaderImage } from './editableHeaderImage';

interface HeaderImageProps extends EditableComponentProps {
    value: string
}

export const HeaderImage: React.FC<HeaderImageProps> = (props) => {
    const width = 1400;
    const height = 300;
    const className = 'w-full h-80 object-cover border-b border-black';
    const alt='Project Header Image';

    return props.mode === 'edit'
        ? <EditableHeaderImage mode='edit' className={className} value={props.value} alt={alt}  width={width} height={height}  />
        : <Image className={className} src={props.value} alt={alt}  width={width} height={height} />;
}
