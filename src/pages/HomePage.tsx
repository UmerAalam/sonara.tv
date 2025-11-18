import { createMemo, createSignal } from "solid-js";
import ChannelAtlas from "../components/ChannelAtlas";
import StreamingMonitor from "../components/StreamingMonitor";

import {
  curatedStreamingChannels,
  monitorMetrics,
  resolveCountry,
} from "../data/streaming-grid";
import Footer from "../components/Footer";
import Header from "../components/Header";
import CountryAtlas from "../components/CountryAtlas";

function HomePage() {
  const channelList = curatedStreamingChannels;
  const [activeChannelIndex, setActiveChannelIndex] = createSignal(0);
  const activeChannel = createMemo(
    () => channelList[activeChannelIndex()] ?? channelList[0],
  );
  const playingOrigin = createMemo(() => resolveCountry(activeChannel()));

  return (
    <main class="min-h-screen bg-[#202020] text-white antialiased">
      <div class="mx-auto flex w-full flex-col gap-16 px-6 py-12 lg:py-16">
        <Header />
        <section class="grid gap-8 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,0.65fr)_minmax(0,0.65fr)]">
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
          <CountryAtlas />
        </section>
        <Footer />
      </div>
    </main>
  );
}

export default HomePage;
