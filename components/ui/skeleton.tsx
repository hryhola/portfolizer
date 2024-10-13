import { cn } from '@/lib/utils'

function Skeleton({
    className,
    children,
    ...props
}: React.HTMLAttributes<HTMLDivElement> & { children?: React.ReactNode }) {
    return (
        <div className={cn('animate-pulse rounded-md bg-muted border border-gray-200', className)} {...props}>
            {children}
        </div>
    )
}

export { Skeleton }
