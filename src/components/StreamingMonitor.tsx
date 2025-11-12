import type { JSX } from "solid-js";
import type { Channel } from "../data/parse-m3u";
import type { ChannelOrigin } from "../data/streaming-grid";

interface MonitorMetric {
  label: string;
  value: string;
}

interface StreamingMonitorProps {
  channel?: Channel;
  origin: ChannelOrigin;
  metrics: MonitorMetric[];
}

function StreamingMonitor(props: StreamingMonitorProps): JSX.Element {
  return (
    <div class="relative overflow-hidden rounded-3xl border border-white/10 bg-linear-to-br from-[#131313] via-[#080808] to-[#050505] p-8">
      <div class="absolute inset-y-0 right-0 w-64 bg-[radial-gradient(circle,_#ccff33_0%,_transparent_60%)] opacity-10 blur-3xl" />
      <div class="relative space-y-6">
        <div class="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p class="text-xs font-semibold uppercase tracking-[0.4em] text-white/60">
              Live monitor
            </p>
            <h3 class="text-3xl font-black tracking-tight text-white">
              Stream while exploring the grid
            </h3>
          </div>
          <span class="rounded-full border border-white/15 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-white/70">
            {props.origin.code} signal
          </span>
        </div>

        <div class="rounded-2xl border border-white/10 bg-white/5 p-4">
          <div class="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p class="text-xs font-semibold uppercase tracking-[0.3em] text-white/60">
                Now playing
              </p>
              <p class="text-2xl font-bold text-white">
                {props.channel?.name ?? "Select a channel"}
              </p>
            </div>
            <div class="text-right">
              <p class="text-xs font-semibold uppercase tracking-[0.3em] text-white/50">
                Origin
              </p>
              <p class="text-base font-bold text-[#ccff33]">
                {props.origin.label}
              </p>
            </div>
          </div>
          <div class="mt-4 overflow-hidden rounded-2xl border border-white/5 bg-black/60">
            {props.channel?.url ? (
              <video
                class="aspect-video w-full bg-black object-cover"
                controls
                playsInline
                preload="none"
                src={props.channel.url}
              />
            ) : (
              <div class="flex aspect-video w-full items-center justify-center text-sm font-semibold text-white/50">
                Select a feed to begin streaming preview.
              </div>
            )}
          </div>
          <div class="mt-4 grid gap-4 sm:grid-cols-3">
            {props.metrics.map((metric) => (
              <div class="rounded-xl border border-white/10 bg-black/40 p-3">
                <p class="text-[10px] font-semibold uppercase tracking-[0.4em] text-white/40">
                  {metric.label}
                </p>
                <p class="mt-2 text-lg font-bold">{metric.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default StreamingMonitor;
