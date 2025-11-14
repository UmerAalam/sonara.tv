import { createSignal, onCleanup, onMount, type JSX } from "solid-js";
import type { Channel } from "../data/parse-m3u";
import type { ChannelOrigin } from "../data/streaming-grid";
import Hls from "hls.js";

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
  let videoRef: HTMLVideoElement | undefined;
  let containerRef: HTMLDivElement | undefined;
  let hls: Hls | undefined;

  const [isPlaying, setIsPlaying] = createSignal(false);
  const [currentTime, setCurrentTime] = createSignal(0);
  const [duration, setDuration] = createSignal(0);
  const [volume, setVolume] = createSignal(1);
  const [isMuted, setIsMuted] = createSignal(false);
  const [showControls, setShowControls] = createSignal(true);
  const [isFullscreen, setIsFullscreen] = createSignal(false);

  const formatTime = (seconds: number) => {
    if (!Number.isFinite(seconds) || seconds <= 0) return "00:00";
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);
    const parts = [
      hrs > 0 ? String(hrs).padStart(2, "0") : undefined,
      String(mins).padStart(2, "0"),
      String(secs).padStart(2, "0"),
    ].filter(Boolean);
    return parts.join(":");
  };

  onMount(() => {
    if (!videoRef) return;

    const src = props.channel?.url;

    if (Hls.isSupported()) {
      hls = new Hls();
      hls.loadSource(src!);
      hls.attachMedia(videoRef);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        videoRef!.play();
      });
    } else if (videoRef.canPlayType("application/vnd.apple.mpegurl")) {
      videoRef && videoRef.src === src;
      videoRef.play();
    }

    const syncPlayState = () => setIsPlaying(!videoRef!.paused);
    const syncTime = () => setCurrentTime(videoRef!.currentTime);
    const syncDuration = () => setDuration(videoRef!.duration || 0);
    const syncVolume = () => {
      setVolume(videoRef!.volume);
      setIsMuted(videoRef!.muted);
    };

    videoRef.addEventListener("play", syncPlayState);
    videoRef.addEventListener("pause", syncPlayState);
    videoRef.addEventListener("timeupdate", syncTime);
    videoRef.addEventListener("loadedmetadata", syncDuration);
    videoRef.addEventListener("durationchange", syncDuration);
    videoRef.addEventListener("volumechange", syncVolume);

    syncPlayState();
    syncTime();
    syncDuration();
    syncVolume();

    const handleFullscreenChange = () => {
      setIsFullscreen(document.fullscreenElement === containerRef);
    };

    const handleKeydown = (event: KeyboardEvent) => {
      if (event.code === "Space") {
        event.preventDefault();
        togglePlayback();
        return;
      }
      const key = event.key.toLowerCase();
      if (key === "f" || event.key === "F11" || event.code === "F11") {
        event.preventDefault();
        toggleFullscreen();
      }
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    window.addEventListener("keydown", handleKeydown);

    onCleanup(() => {
      videoRef?.removeEventListener("play", syncPlayState);
      videoRef?.removeEventListener("pause", syncPlayState);
      videoRef?.removeEventListener("timeupdate", syncTime);
      videoRef?.removeEventListener("loadedmetadata", syncDuration);
      videoRef?.removeEventListener("durationchange", syncDuration);
      videoRef?.removeEventListener("volumechange", syncVolume);
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      window.removeEventListener("keydown", handleKeydown);
      hls?.destroy();
    });
  });

  const togglePlayback = () => {
    if (!videoRef) return;
    if (videoRef.paused) {
      void videoRef.play();
    } else {
      videoRef.pause();
    }
  };

  const handleSeek = (value: number) => {
    if (!videoRef || !duration()) return;
    const time = (value / 100) * duration();
    videoRef.currentTime = time;
    setCurrentTime(time);
  };

  const handleVolume = (value: number) => {
    if (!videoRef) return;
    const nextVolume = value / 100;
    videoRef.volume = nextVolume;
    videoRef.muted = nextVolume === 0;
    setVolume(nextVolume);
    setIsMuted(videoRef.muted);
  };

  const toggleMute = () => {
    if (!videoRef) return;
    videoRef.muted = !videoRef.muted;
    setIsMuted(videoRef.muted);
  };

  const toggleFullscreen = async () => {
    if (typeof document === "undefined") return;
    if (document.fullscreenElement) {
      await document.exitFullscreen();
    } else if (containerRef?.requestFullscreen) {
      await containerRef.requestFullscreen();
    }
  };

  const progressPercent = () =>
    duration() > 0 ? Math.min((currentTime() / duration()) * 100, 100) : 0;

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
              <div
                class="relative aspect-video w-full"
                ref={containerRef}
                onClick={() => setShowControls((prev) => !prev)}
              >
                <video
                  ref={videoRef}
                  class="h-full w-full rounded-2xl bg-black object-cover"
                  playsinline
                  preload="none"
                  src={props.channel.url}
                  onClick={(event) => {
                    event.stopPropagation();
                    setShowControls((prev) => !prev);
                  }}
                />
                <div
                  class={`pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-t from-black/85 via-black/30 to-transparent p-4 transition-opacity duration-200 ${showControls() ? "opacity-100" : "opacity-0"}`}
                >
                  <button
                    class="pointer-events-auto absolute right-4 top-4 rounded-full border border-white/30 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-white transition hover:border-[#ccff33] hover:text-[#ccff33]"
                    onClick={(event) => {
                      event.stopPropagation();
                      toggleFullscreen();
                    }}
                  >
                    ↔
                  </button>
                  <div
                    class="pointer-events-auto flex h-full flex-col justify-end gap-3"
                    onClick={(event) => event.stopPropagation()}
                  >
                    <div class="flex items-center justify-between gap-4">
                      <button
                        class="flex h-10 w-10 items-center justify-center rounded-full border border-white/30 bg-white/10 text-white transition hover:border-[#ccff33] hover:text-[#ccff33]"
                        onClick={togglePlayback}
                      >
                        {isPlaying() ? (
                          <svg
                            class="h-4 w-4"
                            viewBox="0 0 16 16"
                            fill="currentColor"
                          >
                            <path d="M5 3h2.5v10H5zm3.5 0H11v10H8.5z" />
                          </svg>
                        ) : (
                          <svg
                            class="h-4 w-4"
                            viewBox="0 0 16 16"
                            fill="currentColor"
                          >
                            <path d="M4 2l10 6-10 6z" />
                          </svg>
                        )}
                      </button>
                      <div class="flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.3em] text-white/70">
                        <div class="flex flex-col items-center gap-2">
                          <button
                            class="rounded-full border border-white/20 px-3 py-1 transition hover:border-[#ccff33] hover:text-[#ccff33]"
                            onClick={toggleMute}
                          >
                            {isMuted() || volume() === 0 ? "Muted" : "Sound"}
                          </button>
                          <span class="text-[9px] tracking-[0.2em]">Vol</span>
                        </div>
                        <input
                          class="h-0.5 w-24 cursor-pointer appearance-none rounded-full bg-white/20 accent-[#ccff33]"
                          type="range"
                          min="0"
                          max="100"
                          value={Math.round(volume() * 100)}
                          onInput={(event) =>
                            handleVolume(Number(event.currentTarget.value))
                          }
                        />
                      </div>
                    </div>
                    <div class="flex flex-col gap-1">
                      <input
                        class="h-0.5 w-full cursor-pointer appearance-none rounded-full bg-white/25 accent-[#ccff33]"
                        type="range"
                        min="0"
                        max="100"
                        value={progressPercent()}
                        onInput={(event) =>
                          handleSeek(Number(event.currentTarget.value))
                        }
                      />
                      <div class="flex items-center justify-between text-[11px] font-semibold tracking-wide text-white/80">
                        <span>{formatTime(currentTime())}</span>
                        <span>{formatTime(duration())}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
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
