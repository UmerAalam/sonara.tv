import type { JSX } from "solid-js";
import type { Channel } from "../data/parse-m3u";
import { resolveCountry } from "../data/streaming-grid";

interface ChannelAtlasProps {
  channels: Channel[];
  activeIndex: number;
  onSelect: (index: number) => void;
}

function ChannelAtlas(props: ChannelAtlasProps): JSX.Element {
  return (
    <div class="space-y-5 rounded-3xl border border-white/10 bg-[#0f0f0f]/80 p-6 backdrop-blur">
      <div class="flex flex-col gap-3">
        <p class="text-xs font-semibold uppercase tracking-[0.4em] text-white/50">
          Channel atlas
        </p>
        <div class="flex items-center justify-between">
          <h3 class="text-2xl font-bold">Country-guided feeds</h3>
          <span class="text-xs font-semibold uppercase tracking-[0.3em] text-white/50">
            {props.channels.length} live
          </span>
        </div>
      </div>
      <div class="rounded-2xl border border-dashed border-white/15 px-4 py-3 text-sm font-semibold text-white/60">
        Tap a channel to instantly swap the preview window without losing the
        soundstage.
      </div>
      <div class="space-y-3">
        {props.channels.map((channel, index) => {
          const origin = resolveCountry(channel);
          const isActive = props.activeIndex === index;
          return (
            <button
              type="button"
              class={`flex w-full items-center justify-between gap-4 rounded-2xl border px-4 py-3 text-left transition ${
                isActive
                  ? "border-[#ccff33]/80 bg-white/10"
                  : "border-white/10 bg-black/30 hover:border-white/40"
              }`}
              aria-pressed={isActive}
              onClick={() => props.onSelect(index)}
            >
              <div>
                <p class="text-base font-bold text-white">{channel.name}</p>
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
      </div>
    </div>
  );
}

export default ChannelAtlas;
