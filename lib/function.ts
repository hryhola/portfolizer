export const debounce = (fn: Function, ms = 50) => {
    let timeoutId: ReturnType<typeof setTimeout>
    return function (this: any, ...args: any[]) {
        clearTimeout(timeoutId)
        timeoutId = setTimeout(() => fn.apply(this, args), ms)
    }
}

export const throttle = (fn: Function, wait: number = 300) => {
    let inThrottle = false

    return function (this: any) {
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        const context = this
        // eslint-disable-next-line prefer-rest-params
        const args = arguments

        if (!inThrottle) {
            fn.apply(context, args)
            inThrottle = true
            setTimeout(() => {
                inThrottle = false
            }, wait)
        }
    }
}
