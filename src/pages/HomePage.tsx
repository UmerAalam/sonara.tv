import { createEffect, createMemo, createSignal } from "solid-js";
import ChannelAtlas from "../components/ChannelAtlas";
import StreamingMonitor from "../components/StreamingMonitor";
import CountrySelectionPanel from "../components/CountrySelectionPanel";

import {
  countryChannelGroups,
  findCountryGroup,
  getMonitorMetrics,
  resolveCountry,
} from "../data/streaming-grid";
import Footer from "../components/Footer";
import Header from "../components/Header";

function HomePage() {
  const [activeCountryCode, setActiveCountryCode] = createSignal(
    countryChannelGroups[0]?.code,
  );
  const activeCountry = createMemo(
    () => findCountryGroup(activeCountryCode()) ?? countryChannelGroups[0],
  );
  const channelList = createMemo(() => activeCountry()?.channels ?? []);
  const [activeChannelIndex, setActiveChannelIndex] = createSignal(0);
  const activeChannel = createMemo(
    () => channelList()[activeChannelIndex()] ?? channelList()[0],
  );
  const playingOrigin = createMemo(() => resolveCountry(activeChannel()));
  const metrics = createMemo(() => getMonitorMetrics(channelList().length));

  createEffect(() => {
    activeCountry();
    setActiveChannelIndex(0);
  });

  return (
    <main class="min-h-screen bg-[#202020] text-white antialiased">
      <div class="mx-auto flex max-w-6xl flex-col gap-16 px-6 py-12 lg:py-16">
        <Header />
        <section class="grid gap-8 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,0.65fr)]">
          <StreamingMonitor
            channel={activeChannel()}
            origin={playingOrigin()}
            metrics={metrics()}
          />
          <div class="space-y-5 self-start lg:sticky lg:top-4">
            <ChannelAtlas
              channels={channelList()}
              activeIndex={activeChannelIndex()}
              onSelect={setActiveChannelIndex}
            />
            <CountrySelectionPanel
              countries={countryChannelGroups}
              activeCode={activeCountry()?.code}
              onSelect={(code) => setActiveCountryCode(code)}
            />
          </div>
        </section>

        <Footer />
      </div>
    </main>
  );
}

export default HomePage;
