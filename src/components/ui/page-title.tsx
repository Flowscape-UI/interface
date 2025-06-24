import { cn } from "@/lib/utils"; // adjust the import to your cn helper
import type { ComponentPropsWithoutRef } from "react";

/**
 * A reusable <h1> wrapper with sensible defaults.
 * Extends all native <h1> props, while merging additional classNames.
 */
/**
 * Props for the PageTitle component.
 * Extends all native <h1> element props.
 * 
 * @example
 * <PageTitle className="custom-class">Page Title</PageTitle>
 */
export interface PageTitleProps extends ComponentPropsWithoutRef<"h1"> {}

export default function PageTitle({ className, children, ...props }: PageTitleProps) {
    return (
        <h1 className={cn("mb-3 text-2xl sm:text-3xl font-bold", className)} {...props}>
            {children}
        </h1>
    );
}