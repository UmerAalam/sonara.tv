import { createEffect, createMemo, createSignal, type JSX } from "solid-js";
import type { Channel } from "../data/parse-m3u";
import { resolveCountry } from "../data/streaming-grid";

interface ChannelAtlasProps {
  channels: Channel[];
  activeIndex: number;
  onSelect: (index: number) => void;
}

function ChannelAtlas(props: ChannelAtlasProps): JSX.Element {
  const [searchTerm, setSearchTerm] = createSignal("");
  const [channelsCount, setChannelsCount] = createSignal(6);

  const channels = createMemo(() => {
    const allChannels =
      typeof props.channels === "function" ? props.channels : props.channels;
    const term = searchTerm().toLowerCase();

    return allChannels.reduce<{ channel: Channel; index: number }[]>(
      (filtered, channel, index) => {
        if (!term || channel.name.toLowerCase().includes(term)) {
          filtered.push({ channel, index });
        }
        return filtered;
      },
      [],
    );
  });

  const orderedChannels = createMemo(() => {
    const list = channels();
    if (list.length === 0) return list;

    const activeIndex = list.findIndex(
      ({ index }) => index === props.activeIndex,
    );
    if (activeIndex <= 0) return list;

    const reordered = list.slice();
    const [activeEntry] = reordered.splice(activeIndex, 1);
    return [activeEntry, ...reordered];
  });

  const visibleChannels = createMemo(() =>
    orderedChannels().slice(0, channelsCount()),
  );

  const hasMoreChannels = createMemo(
    () => orderedChannels().length > channelsCount(),
  );

  createEffect(() => {
    // Reset pagination when the channel source changes.
    props.channels;
    setChannelsCount(6);
  });

  const onSearch = (e: InputEvent) => {
    const value = (e.target as HTMLInputElement).value;
    setSearchTerm(value);
  };

  return (
    <div class="space-y-5 rounded-3xl border border-white/10 bg-[#0f0f0f]/80 p-6 backdrop-blur">
      <div class="flex flex-col gap-3">
        <p class="text-xs font-semibold uppercase tracking-[0.4em] text-white/50">
          Channel atlas
        </p>
      </div>
      <div class="flex items-center justify-between">
        <div class="flex w-full items-center gap-3 rounded-2xl border px-4 py-3 transition border-white/10 bg-black/30 hover:border-white/40">
          <input
            type="text"
            placeholder="Search channels..."
            class="w-full bg-transparent text-white placeholder-white/40 focus:outline-none"
            onInput={(e) => onSearch(e)}
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 text-white/60"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          ></svg>
        </div>
      </div>
      <div class="space-y-3">
        {visibleChannels().map(({ channel, index: channelIndex }) => {
            const origin = resolveCountry(channel);
            const isActive = props.activeIndex === channelIndex;
            return (
              <button
                type="button"
                class={`flex cursor-pointer w-full items-center justify-between gap-4 rounded-2xl border px-4 py-3 text-left transition ${
                  isActive
                    ? "border-[#ccff33]/80 bg-white/10"
                    : "border-white/10 bg-black/30 hover:border-white/40"
                }`}
                aria-pressed={isActive}
                onClick={() => props.onSelect(channelIndex)}
              >
                <div>
                  <div class="flex items-center gap-2">
                    {isActive && (
                      <span class="inline-block h-2.5 w-2.5 rounded-full bg-[#ccff33]"></span>
                    )}
                    <p class="text-base font-bold text-white">
                      {channel.name.replace(/\s*(\([^)]*\)|\[[^\]]*\])\s*/g, "")}
                    </p>
                  </div>
                  <p class="text-[10px] font-semibold uppercase tracking-[0.4em] text-white/40">
                    {channel.attributes["group-title"] ?? "General"}
                  </p>
                </div>
                <div class="text-right">
                  <p class="text-sm font-bold text-[#ccff33]">{origin.label}</p>
                  <p class="text-[11px] font-semibold uppercase tracking-[0.4em] text-white/50">
                    {origin.code}
                  </p>
                </div>
              </button>
            );
          })}
        {hasMoreChannels() && (
          <button
            onClick={() => setChannelsCount((prev) => prev + 6)}
            class="flex w-full justify-center items-center rounded-2xl text-white/50 hover:text-white/70 cursor-pointer border border-white/10 bg-black/30 hover:border-white/40 h-14"
          >
            Show More
          </button>
        )}
      </div>
    </div>
  );
}

export default ChannelAtlas;
