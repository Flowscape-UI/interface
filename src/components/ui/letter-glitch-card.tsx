import { cn } from "@/lib/utils";
import LetterGlitch, { type LetterGlitchProps } from "./letter-glitch";

interface LetterGlitchCardProps extends LetterGlitchProps {
    title: string;
    description: string;
    className?: string;
}

export function LetterGlitchCard({ title, description, className = "", ...props }: LetterGlitchCardProps) {
    return (
        <LetterGlitch className={cn("w-80 h-[500px] rounded-lg p-4", className)} {...props}>
            <h3 className="text-2xl font-bold text-white">{title}</h3>
            <p className="mt-2 text-white/70">{description}</p>
        </LetterGlitch>
    );
} 