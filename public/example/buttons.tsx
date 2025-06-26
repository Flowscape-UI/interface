// 'use client';

// import { cn } from "@/lib/utils";
// import { motion, AnimatePresence } from "framer-motion";
// import React from "react";
// import { useState } from "react";
// import { FaCheck, FaCopy, FaDownload, FaSpinner } from "react-icons/fa6";

// /* -------------------- BaseButton -------------------- */
// export interface BaseButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
//     variant?: "default" | "secondary" | "ghost";
//     isLoading?: boolean;
// }

// const baseStyles = {
//     default: "bg-sky-600 hover:bg-sky-500 text-white",
//     secondary: "bg-white/10 hover:bg-white/20 text-slate-100 border border-white/20",
//     ghost: "hover:bg-white/10 text-slate-100",
// };

// // function Button({
// //     variant = "default",
// //     isLoading,
// //     className,
// //     disabled,
// //     children,
// //     ...props
// // }: BaseButtonProps) {
// //     return (
// //         <button
// //             className={cn(
// //                 "relative inline-flex items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition disabled:cursor-not-allowed disabled:opacity-60 cursor-pointer",
// //                 baseStyles[variant],
// //                 className
// //             )}
// //             disabled={disabled || isLoading}
// //             {...props}
// //         >
// //             {isLoading && (
// //                 <FaSpinner className="size-4 animate-spin" />
// //             )}
// //             {children}
// //         </button>
// //     );
// // }

// /* -------------------- CopyButton -------------------- */
// // function CopyButton({
// //     textToCopy,
// //     className,
// //     ...props
// // }: BaseButtonProps & { textToCopy: string }) {
// //     const [copied, setCopied] = useState(false);

// //     const handleCopy = async () => {
// //         await navigator.clipboard.writeText(textToCopy);
// //         setCopied(true);
// //         setTimeout(() => setCopied(false), 2000);
// //     };

// //     return (
// //         <Button
// //             variant="secondary"
// //             onClick={handleCopy}
// //             aria-label="Copy code"
// //             className={cn("w-28 justify-center", className)}
// //             {...props}
// //         >
// //             <AnimatePresence initial={false} mode="popLayout">
// //                 {copied ? (
// //                     <motion.span
// //                         key="copied"
// //                         initial={{ y: -8, opacity: 0 }}
// //                         animate={{ y: 0, opacity: 1 }}
// //                         exit={{ y: 8, opacity: 0 }}
// //                         transition={{ duration: 0.2 }}
// //                         className="inline-flex items-center gap-1"
// //                     >
// //                         <FaCheck className="h-4 w-4" /> Copied
// //                     </motion.span>
// //                 ) : (
// //                     <motion.span
// //                         key="copy"
// //                         initial={{ y: 8, opacity: 0 }}
// //                         animate={{ y: 0, opacity: 1 }}
// //                         exit={{ y: -8, opacity: 0 }}
// //                         transition={{ duration: 0.2 }}
// //                         className="inline-flex items-center gap-1"
// //                     >
// //                         <FaCopy className="h-4 w-4" /> Copy
// //                     </motion.span>
// //                 )}
// //             </AnimatePresence>
// //         </Button>
// //     );
// // }

// /* -------------------- DownloadButton -------------------- */
// // function DownloadButton({
// //     href,
// //     filename,
// //     className,
// //     ...props
// // }: BaseButtonProps & { href: string; filename?: string }) {
// //     return (
// //         <Button
// //             as="a" // TypeScript ignore; link styled like button
// //             href={href}
// //             download={filename}
// //             className={cn("inline-flex items-center gap-1", className)}
// //             {...(props as any)}
// //         >
// //             <FaDownload className="h-4 w-4" /> Download
// //         </Button>
// //     );
// // }