import React from 'react'
import { EditableComponentProps } from '../../ui/types'
import { TimeData, TimeSpentChart } from './timeSpentChart'
import { EditableTimeSpent } from './editableTimeSpent'
import { TimeSpentChartDetails } from './timeSpentChartDetails'

interface ProjectTimeSpentProps extends EditableComponentProps {
    data: TimeData[]
}

export const ProjectTimeSpent: React.FC<ProjectTimeSpentProps> = (props) => {
    return <>
        {props.mode === 'view' && props.data.length > 0 && <>
            <TimeSpentChart data={props.data} />
            <TimeSpentChartDetails data={props.data} />
        </>}
        {props.mode === 'edit' && <EditableTimeSpent />}
    </>
}
