'use client';

import { cn } from '@/lib/utils';
import { useState } from 'react';
import { FaCheck } from 'react-icons/fa6';
import { IoIosCopy } from 'react-icons/io';

export function CopyButton({ copyText }: { copyText: string }) {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(copyText);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <button
            onClick={handleCopy}
            disabled={copied}
            className={cn(
                'bg-background/70 cursor-pointer rounded-md border-2 p-2 shadow-xl shadow-black backdrop-blur transition hover:bg-white/5',
                copied && 'cursor-default border-emerald-400/30',
            )}
            aria-label="Copy code"
        >
            {copied ? (
                <FaCheck className="text-emerald-400" />
            ) : (
                <IoIosCopy className="text-white/50" />
            )}
        </button>
    );
}
