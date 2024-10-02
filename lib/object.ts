export function removeUndefined<T extends Record<string, any>>(obj: T): Partial<T> {
    return Object.entries(obj).reduce((acc, [key, value]) => {
        if (value !== undefined) {
            acc[key as keyof T] = value
        }
        return acc
    }, {} as Partial<T>)
}

export const unpackRecords = <T extends Record<string, any>>(records: Record<string, T> | null | undefined): Array<T & { id: string }> => {
    return Object.entries(records || {}).map(([id, properties]) => ({
        ...properties,
        id
    }))
}

export const packRecords = <T extends { id: string }>(items: Array<T>): Record<string, Omit<T, 'id'>> => {
    return items.reduce((acc, item) => {
        const { id, ...rest } = item
        acc[id] = rest
        return acc
    }, {} as Record<string, Omit<T, 'id'>>)
}
