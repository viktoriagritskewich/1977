import LavaLampBackground from "./components/LavaLampBackground";

const cards = [
  {
    title: "Маркетинг",
    text: "Позиционирование, воронки, контент и запуск коммуникаций без шума вокруг лишнего.",
  },
  {
    title: "AI и автоматизация",
    text: "Автоматизация процессов, ассистенты, аналитика и связки между рабочими системами.",
  },
  {
    title: "Дизайн",
    text: "Айдентика, интерфейсы, презентации и визуальные правила, которые держат форму бренда.",
  },
  {
    title: "Ивенты",
    text: "События, деловые форматы, сценарии и продакшн как управляемый контакт с аудиторией.",
  },
  {
    title: "Инфраструктура",
    text: "CRM, регламенты, базы знаний и операционные контуры для роста без ручного хаоса.",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#080909] text-[#f4efe7] font-[family-name:var(--font-montserrat)]">
      <section className="relative flex min-h-screen isolate overflow-hidden bg-[#0b0c0b] px-5 py-5 sm:px-8 lg:px-12">
        <div
          className="absolute inset-0 -z-20 scale-105 bg-cover bg-center bg-no-repeat opacity-100"
          style={{ backgroundImage: "url('/bg-test.jpg')" }}
        />
        <LavaLampBackground />
        <div className="matte-glass absolute inset-[18px] z-0 rounded-[46px]" />

        <div className="relative z-10 flex min-h-[calc(100vh-2.5rem)] w-full flex-col">
          <header className="flex items-center justify-between border-b border-white/[0.07] pb-5 text-[11px] uppercase tracking-[0.24em] text-[#f4efe7]/55">
            <a href="#" className="text-[#f4efe7]/80">
              1977
            </a>

            <nav className="hidden items-center gap-8 sm:flex">
              <a href="#directions" className="transition hover:text-[#f4efe7]">
                Directions
              </a>

              <a href="#directions" className="transition hover:text-[#f4efe7]">
                System
              </a>

              <a href="#directions" className="transition hover:text-[#f4efe7]">
                Contact
              </a>
            </nav>
          </header>

          <div className="flex flex-1 items-center py-20 sm:py-24 lg:py-28">
            <div className="grid w-full gap-14 lg:grid-cols-[minmax(0,1fr)] lg:items-end">
              <div>
                <p className="mb-8 text-xs uppercase tracking-[0.42em] text-[#d9c6ad]/55">
                  Studio for ordered growth
                </p>

                <h1 className="font-[family-name:var(--font-druk)] max-w-6xl text-[clamp(4.6rem,15vw,13.5rem)] font-semibold uppercase leading-[0.78] tracking-[-0.01em] text-[#f7f0e6]">
                  STUDIO 1977
                </h1>

                <p className="mt-8 max-w-3xl text-balance text-lg leading-8 text-[#eee3d2]/72 sm:text-xl sm:leading-9">
                  Маркетинг, дизайн, AI-автоматизация, ивенты и инфраструктура
                  для бизнеса, который растёт из хаоса в систему.
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-end justify-between border-t border-white/[0.07] pt-5 text-[11px] uppercase tracking-[0.24em] text-[#f4efe7]/45">
            <span>Moscow / Worldwide</span>

            <span className="hidden sm:inline">
              Prototype scene 01
            </span>
          </div>
        </div>
      </section>

      <section
        id="directions"
        className="bg-[#090a09] px-5 py-20 sm:px-8 sm:py-24 lg:px-12 lg:py-32"
      >
        <div className="mx-auto max-w-7xl">
          <div className="mb-14 grid gap-8 border-b border-[#f4efe7]/10 pb-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(320px,0.45fr)] lg:items-end">
            <h2 className="font-[family-name:var(--font-druk)] max-w-4xl text-4xl font-semibold uppercase leading-[0.98] tracking-[-0.010em] text-[#f4efe7] sm:text-6xl lg:text-7xl">
              Не набор услуг. Система направлений.
            </h2>

            <p className="text-base leading-7 text-[#f4efe7]/52">
              Каждый блок может работать отдельно, но сильнее всего раскрывается
              в связке: стратегия, образ, процессы, события и операционная
              основа.
            </p>
          </div>

          <div className="service-row flex gap-4">
            {cards.map((card, index) => (
              <article
                key={card.title}
                className="service-card group min-h-72 flex-1 p-6 sm:p-7"
              >
                <p className="service-index mb-10 text-xs uppercase tracking-[0.3em] text-[#bfa582]/48">
                  0{index + 1}
                </p>

                <h3 className="service-title mb-5 text-2xl font-medium tracking-[-0.035em] text-[#f4efe7]">
                  {card.title}
                </h3>

                <p className="service-body text-sm leading-6 text-[#f4efe7]/55">
                  {card.text}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

    </main>
  );
}
