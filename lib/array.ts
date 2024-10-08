export function moveOrderedElementUp<T extends { id: string, order: number }>(elements: T[], id: string): T[] {
    const index = elements.findIndex(element => element.id === id)

    if (index === 0) {
        // Element is already at the beginning, no need to move
        return elements
    }

    // Create a copy of the array and the affected elements to avoid mutating the original
    const updatedElements = [...elements]
    const updatedElement = { ...updatedElements[index] }
    const previousElement = { ...updatedElements[index - 1] }

    // Swap the current element with the element at the previous index
    updatedElements[index - 1] = updatedElement
    updatedElements[index] = previousElement

    return updatedElements.map((e, i) => ({...e, order: i }))
}

export function moveOrderedElementDown<T extends { id: string, order: number }>(elements: T[], id: string): T[] {
    const index = elements.findIndex(element => element.id === id)

    if (index === elements.length - 1) {
        // Element is already at the end, no need to move
        return elements
    }

    // Create a copy of the array and the affected elements to avoid mutating the original
    const updatedElements = [...elements]
    const updatedElement = { ...updatedElements[index] }
    const nextElement = { ...updatedElements[index + 1] }

    // Swap the current element with the element at the next index
    updatedElements[index + 1] = updatedElement
    updatedElements[index] = nextElement

    return updatedElements.map((e, i) => ({...e, order: i }))
}