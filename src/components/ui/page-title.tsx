import { useTranslation } from "@/hooks/use-translation";
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
export type PageTitleProps = ComponentPropsWithoutRef<"h1">

export default function PageTitle({ className, children, ...props }: PageTitleProps) {
    const {t} = useTranslation();
    return (
        <h1 className={cn("mb-3 text-2xl sm:text-3xl font-bold", className)} {...props}>
            {t(String(children))}
        </h1>
    );
}