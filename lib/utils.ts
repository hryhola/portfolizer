import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { ProjectData } from "./firebase/admin/db"
import { ComplexityLevelValue } from "@/components/features/project/complexityLevel"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export const getAverageComplexity = (project: ProjectData): ComplexityLevelValue | undefined => {
    if (!project.complexity) {
        return undefined
    }


    const array = Object.values(project.complexity)

    if (array.length === 0) {
        return undefined
    }

    // Mapping complexity levels to numerical values
    const complexityMapping = {
        "Low": 1,
        "Medium": 2,
        "High": 3
    };

    // Sum the complexity values
    const total = array.reduce((sum, record) => sum + complexityMapping[record.value], 0);

    // Calculate the average complexity value
    const average = total / array.length;

    // Round the average to the nearest integer
    const roundedAverage = Math.round(average);

    // Map the rounded value back to a complexity string
    const complexityReverseMapping = {
        1: "Low" as const,
        2: "Medium" as const,
        3: "High" as const
    };

    return complexityReverseMapping[roundedAverage as 1 | 2 | 3];
}
