import { createFileRoute, Link } from '@tanstack/react-router'
import { MainLayout } from '../../../main-layout'
import { FaRobot } from 'react-icons/fa6'
import { SiEthereum, SiReact } from 'react-icons/si'
import { FaLaptopCode } from 'react-icons/fa'

export const Route = createFileRoute('/docs/about-us/')({
  component: AboutPage,
})

function AboutPage() {
  return <MainLayout>
    <section className="mx-auto flex max-w-4xl flex-col gap-10 px-6 py-20 text-slate-200 sm:py-28">
            {/* Heading */}
            <header className="text-center sm:text-left">
                <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
                    About&nbsp;Us — <span className="bg-gradient-to-r from-purple-400 to-fuchsia-300 bg-clip-text text-transparent">crafting &amp; sharing&nbsp;code</span>
                </h1>
                <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed sm:mt-6 sm:text-xl">
                    We’re a small band of <span className="font-semibold text-white">full-stack professionals</span> who live and breathe the web —&nbsp;
                    from slick interfaces to rock-solid backends. Flowscape is our playground for giving those learnings back to&nbsp;the&nbsp;community.
                </p>
            </header>

            {/* What we do */}
            <ul className="grid gap-6 sm:grid-cols-2">
                <li className="flex items-start gap-3 rounded-lg bg-white/5 p-4 ring-1 ring-white/10">
                    <div className="flex shrink-0 items-center justify-center rounded-full bg-indigo-500/20 p-2">
                        <FaLaptopCode className="h-5 w-5 text-indigo-300" />
                    </div>
                    <div className="text-sm leading-relaxed">
                        <span className="font-semibold text-white">Front&nbsp;+&nbsp;back under one roof.</span> Next.js, NestJS, GraphQL — clean&nbsp;APIs fuel silky&nbsp;UIs.
                    </div>
                </li>
                <li className="flex items-start gap-3 rounded-lg bg-white/5 p-4 ring-1 ring-white/10">
                    <div className="flex shrink-0 items-center justify-center rounded-full bg-emerald-500/20 p-2">
                        <SiEthereum className="h-5 w-5 text-emerald-300" />
                    </div>
                    <div className="text-sm leading-relaxed">
                        <span className="font-semibold text-white">Blockchain-native.</span> Smart contracts on Ethereum, TON, Solana — we ship&nbsp;DApps that just work.
                    </div>
                </li>
                <li className="flex items-start gap-3 rounded-lg bg-white/5 p-4 ring-1 ring-white/10">
                    <div className="flex shrink-0 items-center justify-center rounded-full bg-sky-500/20 p-2">
                        <SiReact className="h-5 w-5 text-sky-300" />
                    </div>
                    <div className="text-sm leading-relaxed">
                        <span className="font-semibold text-white">Web&nbsp;experiences for humans.</span> Accessible, responsive and animated to the&nbsp;core.
                    </div>
                </li>
                <li className="flex items-start gap-3 rounded-lg bg-white/5 p-4 ring-1 ring-white/10">
                    <div className="flex shrink-0 items-center justify-center rounded-full bg-rose-500/20 p-2">
                        <FaRobot className="h-5 w-5 text-rose-300" />
                    </div>
                    <div className="text-sm leading-relaxed">
                        <span className="font-semibold text-white">Eyes on the future.</span> We’re diving into AI/ML — need an LLM-powered idea built? Let’s&nbsp;talk.
                    </div>
                </li>
            </ul>

            {/* How we work */}
            <div className="rounded-lg bg-white/5 p-6 ring-1 ring-white/10">
                <p className="mb-4 text-base font-semibold text-white sm:text-lg">How we work</p>
                <ol className="space-y-3 text-sm leading-relaxed sm:text-base">
                    <li className="flex items-baseline gap-2">
                        <span className="rounded bg-purple-500 px-2 py-0.5 text-xs font-semibold text-black">1</span>
                        <strong className="text-white">Open&nbsp;by default.</strong> Components on this site are free — fork, remix, enjoy.
                    </li>
                    <li className="flex items-baseline gap-2">
                        <span className="rounded bg-purple-500 px-2 py-0.5 text-xs font-semibold text-black">2</span>
                        <strong className="text-white">Client work&nbsp;≠ black box.</strong> We share patterns we polish in real projects.
                    </li>
                    <li className="flex items-baseline gap-2">
                        <span className="rounded bg-purple-500 px-2 py-0.5 text-xs font-semibold text-black">3</span>
                        <strong className="text-white">Grow together.</strong> Blog posts, livestreams, and community calls keep everyone levelling&nbsp;up.
                    </li>
                </ol>
            </div>

            {/* Call to action */}
            <div className="rounded-lg bg-fuchsia-500/10 p-6 ring-1 ring-fuchsia-500/30 text-center sm:text-left">
                <p className="mb-2 text-base font-semibold text-fuchsia-300 sm:text-lg">Need a battle-tested crew?</p>
                <p className="text-sm leading-relaxed sm:text-base">
                    Browse our free components — or&nbsp;
                    <Link to="/pricing" className="font-semibold underline hover:text-white">hire&nbsp;us via Pricing</Link>
                    &nbsp;to bring your next web, web3 or AI idea to life.
                </p>
            </div>
        </section>
  </MainLayout>
}

