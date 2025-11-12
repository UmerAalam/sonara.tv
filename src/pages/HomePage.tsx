import { createMemo, createSignal } from "solid-js";
import ChannelAtlas from "../components/ChannelAtlas";
import StreamingMonitor from "../components/StreamingMonitor";
import { packages, trendingShows } from "../data/data";
import {
  curatedStreamingChannels,
  monitorMetrics,
  resolveCountry,
} from "../data/streaming-grid";
import Footer from "../components/Footer";

function HomePage() {
  const channelList = curatedStreamingChannels;
  const [activeChannelIndex, setActiveChannelIndex] = createSignal(0);
  const activeChannel = createMemo(
    () => channelList[activeChannelIndex()] ?? channelList[0],
  );
  const playingOrigin = createMemo(() => resolveCountry(activeChannel()));

  return (
    <main class="min-h-screen bg-[#202020] text-white antialiased">
      <div class="mx-auto flex max-w-6xl flex-col gap-16 px-6 py-12 lg:py-16">
        <section class="grid gap-8 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,0.65fr)]">
          <StreamingMonitor
            channel={activeChannel()}
            origin={playingOrigin()}
            metrics={monitorMetrics}
          />
          <ChannelAtlas
            channels={channelList}
            activeIndex={activeChannelIndex()}
            onSelect={setActiveChannelIndex}
          />
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
        <Footer />
      </div>
    </main>
  );
}

export default HomePage;
