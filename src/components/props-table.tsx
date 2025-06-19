import { cn } from "@/lib/utils";

export interface PropsTableRow {
    prop: string;
    type: string;
    required: boolean;
    description: string;
    defaultValue?: string;
}

export function PropsTable({ rows, className }: { rows: PropsTableRow[]; className?: string }) {
    return (
        <div className={cn("overflow-x-auto rounded-lg border border-white/10", className)}>
            <table className="min-w-full text-left text-sm text-slate-200">
                <thead className="bg-white/5 uppercase text-xs tracking-wider">
                    <tr>
                        <th className="px-3 py-2">Prop</th>
                        <th className="px-3 py-2">Type</th>
                        <th className="px-3 py-2">Req.</th>
                        <th className="px-3 py-2">Default</th>
                        <th className="px-3 py-2">Description</th>
                    </tr>
                </thead>
                <tbody>
                    {rows.map((r, i) => {
                        const def = r.required ? "-" : r.defaultValue ?? "undefined";
                        return (
                            <tr key={i} className="border-t border-white/5 even:bg-white/5">
                                <td className="px-3 py-2 font-mono text-sky-400">{r.prop}</td>
                                <td className="px-3 py-2 font-mono">{r.type}</td>
                                <td className="px-3 py-2">
                                    {r.required ? (
                                        <span className="rounded bg-red-600/20 px-1.5 py-0.5 text-xs text-red-300">yes</span>
                                    ) : (
                                        <span className="rounded bg-white/10 px-1.5 py-0.5 text-xs text-slate-400">no</span>
                                    )}
                                </td>
                                <td className="px-3 py-2 font-mono text-slate-300">{def}</td>
                                <td className="px-3 py-2">{r.description}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}
