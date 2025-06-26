import { createFileRoute, Link } from '@tanstack/react-router'
import { FaReact } from 'react-icons/fa6'
import { RiTailwindCssFill } from 'react-icons/ri'
import { TbBrandFramerMotion } from 'react-icons/tb'
import { MainLayout } from '../../../main-layout'
import { useTranslation } from '@/hooks/use-translation'

export const Route = createFileRoute('/docs/philosophy/')({
  component: PhilosophyPage,
})

function PhilosophyPage() {
  const {t} = useTranslation();
  return <MainLayout>
    <section className="mx-auto flex max-w-4xl flex-col gap-10 px-6 py-20 text-slate-200 sm:py-28">
  {/* Heading */}
  <header className="text-center sm:text-left">
    <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
      {t('Our Philosophy')} — <span className="bg-gradient-to-r from-emerald-400 to-cyan-300 bg-clip-text text-transparent">{t('simplicity meets motion')}</span>
    </h1>
    <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed sm:mt-6 sm:text-xl">
      Flowscape {t('believes in')} <span className="font-semibold text-white">{t('laser-focused minimalism')}</span>: {t(`every pixel earns its place. 
      Yet modern interfaces should`)} <span className="font-semibold text-white">{t('breathe and move')}</span>. {t('We embrace rich animations — crafted with')}{' '}
      <span className="font-semibold text-white">Framer Motion</span> — {t('that guide, delight and never compromise stability')}.
    </p>
  </header>

  {/* Core values */}
  <ul className="grid gap-6 sm:grid-cols-2">
    <li className="flex items-start gap-3 rounded-lg bg-white/5 p-4 ring-1 ring-white/10">
      <div className="flex shrink-0 items-center justify-center rounded-full bg-sky-500/20 p-2">
        <FaReact className="h-5 w-5 text-sky-400" />
      </div>
      <div className="text-sm leading-relaxed">
        <span className="font-semibold text-white">Clarity first.</span> Clean layouts and accessible colour palettes keep focus where it belongs — on the content.
      </div>
    </li>
    <li className="flex items-start gap-3 rounded-lg bg-white/5 p-4 ring-1 ring-white/10">
      <div className="flex shrink-0 items-center justify-center rounded-full bg-teal-500/20 p-2">
        <RiTailwindCssFill className="h-5 w-5 text-teal-300" />
      </div>
      <div className="text-sm leading-relaxed">
        <span className="font-semibold text-white">Scale without bloat.</span> Utility-first CSS keeps bundles light and tweaks lightning-fast.
      </div>
    </li>
    <li className="flex items-start gap-3 rounded-lg bg-white/5 p-4 ring-1 ring-white/10">
      <div className="flex shrink-0 items-center justify-center rounded-full bg-violet-500/20 p-2">
        <TbBrandFramerMotion className="h-5 w-5 text-violet-300" />
      </div>
      <div className="text-sm leading-relaxed">
        <span className="font-semibold text-white">Motion with meaning.</span> Animations honour physics, respect performance and tell the story of every interaction.
      </div>
    </li>
    <li className="flex items-start gap-3 rounded-lg bg-white/5 p-4 ring-1 ring-white/10">
      <div className="flex shrink-0 items-center justify-center rounded-full bg-emerald-500/20 p-2">
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-emerald-300"
        >
          <path d="M12 5v14" />
          <path d="M5 12h14" />
        </svg>
      </div>
      <div className="text-sm leading-relaxed">
        <span className="font-semibold text-white">Community powered.</span> Open-source spirit and transparent roadmap — build with us, shape with us.
      </div>
    </li>
  </ul>

  {/* Guiding principles */}
  <div className="rounded-lg bg-white/5 p-6 ring-1 ring-white/10">
    <p className="mb-4 text-base font-semibold text-white sm:text-lg">{t('Guiding principles')}</p>
    <ol className="space-y-3 text-sm leading-relaxed sm:text-base">
      <li className="flex items-baseline gap-2">
        <span className="rounded bg-emerald-500 px-2 py-0.5 text-xs font-semibold text-black">1</span>
        <strong className="text-white">{t('Less, but better')}.</strong>{''}{t('Remove noise ruthlessly — clarity inspires confidence')}.
      </li>
      <li className="flex items-baseline gap-2">
        <span className="rounded bg-emerald-500 px-2 py-0.5 text-xs font-semibold text-black">2</span>
        <strong className="text-white">{t('Motion as a guide')}.</strong>{' '}{t('Every transition whispers context, never screams distraction')}.
      </li>
      <li className="flex items-baseline gap-2">
        <span className="rounded bg-emerald-500 px-2 py-0.5 text-xs font-semibold text-black">3</span>
        <strong className="text-white">{t('Performance equals respect')}.</strong>{' '}{t('Stable 60 fps is not a luxury — it’s table stakes')}.
      </li>
      <li className="flex items-baseline gap-2">
        <span className="rounded bg-emerald-500 px-2 py-0.5 text-xs font-semibold text-black">4</span>
        <strong className="text-white">{t('Design for delight')}.</strong>{' '}{t('Small details, playful micro-interactions and elegant typography kindle joy')}.
      </li>
    </ol>
  </div>

  {/* Call to action */}
  <div className="rounded-lg bg-sky-500/10 p-6 ring-1 ring-sky-500/30 text-center sm:text-left">
    <p className="mb-2 text-base font-semibold text-sky-300 sm:text-lg">{t('Ready to sculpt fluid experiences')}?</p>
    <p className="text-sm leading-relaxed sm:text-base">
      {t('Dive into our component library or')}{' '}<Link to="/docs/installation" className="font-semibold underline hover:text-white">{t('start building today')}</Link>.
       {t('Together, we’ll turn minimal code into maximal impact')}
    </p>
  </div>
</section>
  </MainLayout>
}