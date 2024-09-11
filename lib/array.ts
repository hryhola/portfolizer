export function moveOrderedElementUp<T extends { id: string, order: number }>(elements: T[], id: string): T[] {
    const index = elements.findIndex(element => element.id === id);

    if (index === 0) {
        // Element is already at the beginning, no need to move
        return elements;
    }

    // Create a copy of the array and the affected elements to avoid mutating the original
    const updatedElements = [...elements];
    const updatedElement = { ...updatedElements[index] };
    const previousElement = { ...updatedElements[index - 1] };

    // Swap the current element with the element at the previous index
    updatedElements[index - 1] = updatedElement;
    updatedElements[index] = previousElement;

    // Update the order property for the affected elements
    updatedElement.order += 1;
    previousElement.order -= 1;

    return updatedElements;
}

export function moveOrderedElementDown<T extends { id: string, order: number }>(elements: T[], id: string): T[] {
    const index = elements.findIndex(element => element.id === id);

    if (index === elements.length - 1) {
        // Element is already at the end, no need to move
        return elements;
    }

    // Create a copy of the array and the affected elements to avoid mutating the original
    const updatedElements = [...elements];
    const updatedElement = { ...updatedElements[index] };
    const nextElement = { ...updatedElements[index + 1] };

    // Swap the current element with the element at the next index
    updatedElements[index + 1] = updatedElement;
    updatedElements[index] = nextElement;

    // Update the order property for the affected elements
    updatedElement.order -= 1;
    nextElement.order += 1;

    return updatedElements;
}