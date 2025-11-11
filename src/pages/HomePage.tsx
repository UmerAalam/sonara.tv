import {
  featuredChannels,
  monochromePalette,
  packages,
  trendingShows,
} from "../data/data";

function HomePage() {
  return (
    <main class="min-h-screen bg-[#202020] text-white antialiased">
      <div class="mx-auto flex max-w-6xl flex-col gap-16 px-6 py-12 lg:py-16">
        <header class="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div class="space-y-2">
            <p class="text-xs font-semibold uppercase tracking-[0.6em] text-[#ccff33]">
              IPTV_APP
            </p>
            <h1 class="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Fluid streaming for bold screens
            </h1>
            <p class="max-w-2xl text-sm font-medium text-white/70">
              Live television, on-demand archives, and monochrome aesthetics
              engineered for viewers who want a premium IPTV experience across
              every device.
            </p>
          </div>
          <div class="flex gap-3">
            <button class="rounded-full border border-white/20 px-4 py-2 text-sm font-semibold uppercase tracking-wide text-white transition hover:border-white hover:text-white/80">
              Schedule
            </button>
            <button class="rounded-full bg-[#ccff33] px-4 py-2 text-sm font-semibold uppercase tracking-wide text-[#111] transition hover:bg-[#dfff4d]">
              Start free preview
            </button>
          </div>
        </header>

        <section class="grid gap-10 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,0.8fr)]">
          <div class="relative overflow-hidden rounded-3xl border border-white/10 bg-linear-to-br from-[#2a2a2a] via-[#161616] to-[#070707] p-8">
            <div class="absolute left-20 top-10 h-64 w-64 rounded-full bg-[#ccff33]/10 blur-3xl" />
            <div class="relative space-y-8">
              <div class="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-white/80">
                Live UHD Grid
                <span class="inline-flex h-2 w-2 rounded-full bg-[#ccff33]" />
              </div>
              <div class="space-y-4">
                <p class="text-sm font-semibold text-white/70">
                  Tonight on IPTV_APP
                </p>
                <h2 class="text-4xl font-black leading-tight tracking-tight text-white sm:text-5xl">
                  Bold, electric,
                  <br />
                  completely bufferless.
                </h2>
              </div>
              <div class="flex flex-wrap gap-4">
                <button class="flex items-center gap-2 rounded-2xl bg-[#ccff33] px-5 py-3 text-sm font-bold uppercase tracking-wide text-[#101010] transition hover:bg-[#e5ff66]">
                  Watch metro feed
                  <span aria-hidden class="text-lg">
                    ↗
                  </span>
                </button>
                <button class="rounded-2xl border border-white/25 px-5 py-3 text-sm font-bold uppercase tracking-wide text-white transition hover:border-white/60 hover:text-white/80">
                  Explore channels
                </button>
              </div>
              <div class="grid gap-6 sm:grid-cols-3">
                {[
                  { label: "Latency", value: "1.8s edge" },
                  { label: "Live channels", value: "240+" },
                  { label: "UHD ready", value: "Dolby Vision" },
                ].map((metric) => (
                  <div
                    class="rounded-2xl border border-white/10 bg-white/5 p-4 text-center"
                    aria-label={`${metric.label} ${metric.value}`}
                  >
                    <p class="text-xs font-semibold uppercase tracking-[0.3em] text-white/60">
                      {metric.label}
                    </p>
                    <p class="mt-2 text-xl font-bold text-white">
                      {metric.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div class="space-y-4 rounded-3xl border border-white/10 bg-[#151515]/80 p-6 backdrop-blur">
            <p class="text-xs font-semibold uppercase tracking-[0.4em] text-white/50">
              Featured signals
            </p>
            <div class="space-y-4">
              {featuredChannels.map((channel) => (
                <div class="flex items-center justify-between rounded-2xl border border-white/5 bg-white/5 p-4">
                  <div>
                    <p class="text-lg font-bold text-white">{channel.name}</p>
                    <p class="text-xs font-semibold uppercase tracking-[0.3em] text-white/50">
                      {channel.genre}
                    </p>
                  </div>
                  <div class="text-right">
                    <span
                      class={`inline-flex items-center rounded-full ${channel.accent} px-3 py-1 text-[10px] font-black uppercase tracking-[0.3em] text-[#050505]`}
                    >
                      {channel.status}
                    </span>
                    <p class="mt-3 text-sm font-semibold text-white/80">
                      {channel.viewers} tuned in
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div class="rounded-2xl border border-dashed border-white/20 p-4 text-sm font-semibold text-white/70">
              Adaptive bitrate powered by TanStack Router navigation — hop
              channels without losing the stream.
            </div>
          </div>
        </section>

        <section class="space-y-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-xs font-semibold uppercase tracking-[0.4em] text-white/50">
                Trending
              </p>
              <h3 class="text-2xl font-bold">Shows stealing the spotlight</h3>
            </div>
            <button class="text-xs font-bold uppercase tracking-[0.3em] text-[#ccff33]">
              View guide →
            </button>
          </div>
          <div class="grid gap-6 md:grid-cols-3">
            {trendingShows.map((show) => (
              <article class="group relative overflow-hidden rounded-3xl border border-white/5 bg-linear-to-b from-white/10 via-white/5 to-[#111] p-6">
                <div class="absolute inset-0 bg-linear-to-b from-[#ccff33]/5 to-transparent opacity-0 transition group-hover:opacity-100" />
                <div class="relative">
                  <p class="text-xs font-semibold uppercase tracking-[0.4em] text-white/60">
                    {show.category}
                  </p>
                  <h4 class="mt-3 text-xl font-bold text-white">
                    {show.title}
                  </h4>
                  <p class="mt-6 text-sm font-semibold text-white/60">
                    {show.time}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section class="space-y-6">
          <div class="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <p class="text-xs font-semibold uppercase tracking-[0.4em] text-white/50">
                Plans
              </p>
              <h3 class="text-2xl font-bold">Three tuned packages</h3>
            </div>
            <span class="rounded-full border border-[#ccff33]/30 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-[#ccff33]">
              Cancel anytime
            </span>
          </div>
          <div class="grid gap-6 lg:grid-cols-3">
            {packages.map((pkg) => (
              <div
                class={`flex flex-col gap-4 rounded-3xl border ${
                  pkg.highlight
                    ? "border-[#ccff33]/80 bg-[#111]"
                    : "border-white/10 bg-[#151515]"
                } p-6`}
              >
                <div class="flex items-center justify-between">
                  <h4 class="text-xl font-bold">{pkg.name}</h4>
                  <p class="text-lg font-black text-[#ccff33]">{pkg.price}</p>
                </div>
                <ul class="space-y-3 text-sm font-semibold text-white/70">
                  {pkg.perks.map((perk) => (
                    <li class="flex items-center gap-3">
                      <span class="h-2 w-2 rounded-full bg-[#ccff33]" />
                      {perk}
                    </li>
                  ))}
                </ul>
                <button
                  class={`mt-auto rounded-2xl border px-4 py-3 text-xs font-black uppercase tracking-[0.3em] ${
                    pkg.highlight
                      ? "border-[#ccff33] bg-[#ccff33] text-[#101010]"
                      : "border-white/20 text-white hover:border-white/60"
                  }`}
                >
                  Select {pkg.name}
                </button>
              </div>
            ))}
          </div>
        </section>

        <section class="space-y-6">
          <div>
            <p class="text-xs font-semibold uppercase tracking-[0.4em] text-white/50">
              Palette
            </p>
            <h3 class="text-2xl font-bold">Monochrome support cast</h3>
          </div>
          <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {monochromePalette.map((tone) => (
              <div
                class="rounded-3xl border border-white/10 p-4 text-center"
                style={{ background: tone.value }}
              >
                <p class="text-xs font-semibold uppercase tracking-[0.3em] text-white/60">
                  {tone.label}
                </p>
                <p class="mt-3 text-lg font-bold">{tone.value}</p>
              </div>
            ))}
          </div>
        </section>

        <footer class="flex flex-col gap-4 border-t border-white/5 pt-8 text-sm font-semibold text-white/50 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} IPTV_APP. Engineered on TanStack +
            Solid.
          </p>
          <div class="flex gap-4 text-xs uppercase tracking-[0.3em]">
            <button class="text-white/60 hover:text-white">Status</button>
            <button class="text-white/60 hover:text-white">Support</button>
            <button class="text-white/60 hover:text-white">
              Download apps
            </button>
          </div>
        </footer>
      </div>
    </main>
  );
}

export default HomePage;
