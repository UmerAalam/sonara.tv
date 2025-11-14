import { ssr, ssrHydrationKey, escape, createComponent, ssrAttribute } from 'solid-js/web';
import { createSignal, createMemo, onMount } from 'solid-js';

const pakistani = '#EXTM3U\r\n#EXTINF:-1 tvg-id="92NewsHD.pk@SD",92 News HD (720p)\r\nhttp://92news.vdn.dstreamone.net/92newshd/92hd/playlist.m3u8\r\n#EXTINF:-1 tvg-id="92NewsUK.uk@SD",92 News UK (576p)\r\nhttps://securecontributions.sechls01.visionip.tv/live/securecontributions-securecontributions-92_news-hsslive-25f-16x9-SD/chunklist.m3u8\r\n#EXTINF:-1 tvg-id="ABNNews.pk@SD",ABN News (1080p)\r\nhttp://116.90.120.149:8000/play/a01r/index.m3u8\r\n#EXTINF:-1 tvg-id="AikNews.pk@SD",Aik News\r\nhttps://video.primexsports.com/pnn/live/playlist.m3u8\r\n#EXTINF:-1 tvg-id="ARYDigital.pk@USA" http-referrer="https://live.arydigital.tv/",ARY Digital USA (720p) [Not 24/7]\r\n#EXTVLCOPT:http-referrer=https://live.arydigital.tv/\r\nhttps://6zklx4wryw9b-hls-live.5centscdn.com/arydigitalusa/498f1704b692c3ad4dbfdf5ba5d04536.sdp/playlist.m3u8\r\n#EXTINF:-1 tvg-id="ARYMusik.pk@SD" http-referrer="https://live.arydigital.tv/",ARY Musik (1080p)\r\n#EXTVLCOPT:http-referrer=https://live.arydigital.tv/\r\nhttps://arymusik.aryzap.com/3fd38b2c62d0c3bbd74aedabb533c03a/6459fa78/v1/01847ac7a4930b8ed5aa6ed04aba/01847ac8f5f70b8ed5aa6ed04abd/main.m3u8\r\n#EXTINF:-1 tvg-id="aurLifeHD.pk@SD",aurLife HD (614p)\r\nhttp://124.109.47.101/hls/stream1.m3u8\r\n#EXTINF:-1 tvg-id="AVTKhyber.pk@SD",AVT Khyber\r\nhttps://trn03.tulix.tv/gf-khybertv/index.m3u8\r\n#EXTINF:-1 tvg-id="ChannelFive.pk@SD",Channel Five\r\nhttps://uvotv-aniview.global.ssl.fastly.net/hls/live/2119688/channel5/playlist.m3u8\r\n#EXTINF:-1 tvg-id="CityNewsHD.pk@SD",City News HD (1080p)\r\nhttp://cdn.citymediagroupreg.com:1935/citynewshd/myStream/playlist.m3u8\r\n#EXTINF:-1 tvg-id="DiscoverPakistan.pk@SD",Discover Pakistan (1080p)\r\nhttps://livecdn.live247stream.com/discoverpakistan/web/playlist.m3u8\r\n#EXTINF:-1 tvg-id="DiscoverPakistan.pk@SD",Discover Pakistan\r\nhttps://uvotv-aniview.global.ssl.fastly.net/hls/live/2119688/discoverpakistan/playlist.m3u8\r\n#EXTINF:-1 tvg-id="DunyaNews.pk@SD",Dunya News (INT Feed) (720p) [Not 24/7]\r\nhttps://imob.dunyanews.tv/livehd/ngrp:dunyalivehd_2_all/playlist.m3u8\r\n#EXTINF:-1 tvg-id="DunyaNews.pk@SD",Dunya News (INT Feed) (720p) [Not 24/7]\r\nhttps://intl.dunyanews.tv/livehd/ngrp:dunyalivehd_2_all/playlist.m3u8\r\n#EXTINF:-1 tvg-id="DunyaNewsUK.uk@SD",Dunya News (UK Feed) (720p) [Not 24/7]\r\nhttps://ukintl.dunyanews.tv/liveuk/ngrp:dunyalive_all/playlist.m3u8\r\n#EXTINF:-1 tvg-id="ExpressEntertainment.pk@SD",Express Entertainment (1080p)\r\nhttps://5dcabf026b188.streamlock.net/expressdigital/livestream/playlist.m3u8\r\n#EXTINF:-1 tvg-id="FazalTV.pk@SD",Fazal TV (1080p)\r\nhttp://cdn9.live247stream.com/punjabitvcanada/tv/playlist.m3u8\r\n#EXTINF:-1 tvg-id="GawahiTV.pk@SD",Gawahi TV (720p)\r\nhttps://livecdn.live247stream.com/gawahi/tv/playlist.m3u8\r\n#EXTINF:-1 tvg-id="GeoKahani.pk@SD",Geo Kahani (360p)\r\nhttps://jk3lz82elw79-hls-live.5centscdn.com/harPalGeo/955ad3298db330b5ee880c2c9e6f23a0.sdp/playlist.m3u8\r\n#EXTINF:-1 tvg-id="GeoNews.pk@SD",Geo News (576p)\r\nhttps://jk3lz82elw79-hls-live.5centscdn.com/GEONEWS/3500ba09d0538297440ca620c9dd46bf.sdp/playlist.m3u8\r\n#EXTINF:-1 tvg-id="GeoSuper.pk@SD",Geo Super (1080p)\r\nhttp://116.90.120.149:8000/play/a021/index.m3u8\r\n#EXTINF:-1 tvg-id="GeoTez.pk@SD",Geo Tez (576i)\r\nhttps://jk3lz82elw79-hls-live.5centscdn.com/newgeonews/07811dc6c422334ce36a09ff5cd6fe71.sdp/playlist.m3u8\r\n#EXTINF:-1 tvg-id="GraceNetwork.pk@SD",Grace Network (720p)\r\nhttps://livecdn.live247stream.com/grace/tv/playlist.m3u8\r\n#EXTINF:-1 tvg-id="HKTV.pk@SD",HK TV (720p)\r\nhttps://streamer12.vdn.dstreamone.net/hktv/hktv/playlist.m3u8\r\n#EXTINF:-1 tvg-id="HumTV.pk@SD",Hum TV\r\nhttps://g4wlkwx8l23a-hls-live.5centscdn.com/HUM/271ddf829afeece44d8732757fba1a66.sdp/playlist_dvr.m3u8\r\n#EXTINF:-1 tvg-id="IsaacTV.pk@SD",Isaac TV (720p)\r\nhttps://livecdn.live247stream.com/isaac/tv/playlist.m3u8\r\n#EXTINF:-1 tvg-id="JooMusic.pk@SD",JooMusic (720p)\r\nhttps://livecdn.live247stream.com/joomusic/tv/playlist.m3u8\r\n#EXTINF:-1 tvg-id="JoshuaTV.pk@SD",Joshua TV (720p)\r\nhttps://livecdn.live247stream.com/joshua/tv/playlist.m3u8\r\n#EXTINF:-1 tvg-id="KhyberNews.pk@SD",Khyber News\r\nhttps://trn03.tulix.tv/gf-khybernews/index.m3u8\r\n#EXTINF:-1 tvg-id="KingTV.pk@SD",King TV (720p) [Not 24/7]\r\nhttps://streamer12.vdn.dstreamone.net/kingtv/kingtv/playlist.m3u8\r\n#EXTINF:-1 tvg-id="LahoreNews.pk@SD",Lahore News (720p) [Not 24/7]\r\nhttps://vcdn.dunyanews.tv/lahorelive/ngrp:lnews_1_all/playlist.m3u8\r\n#EXTINF:-1 tvg-id="MadaniChannelBangla.bd@SD",Madani Channel Bangla (1080p)\r\nhttps://streaming.madanichannel.tv/static/streaming-playlists/hls/d3e49b76-ac06-4689-a641-9200445b647f/master.m3u8\r\n#EXTINF:-1 tvg-id="MadaniChannelEnglish.pk@SD",Madani Channel English (720p)\r\nhttps://streaming.madanichannel.tv/static/streaming-playlists/hls/c6a600b0-82cb-454a-8953-2bb2bb372edc/master.m3u8\r\n#EXTINF:-1 tvg-id="MadaniChannelUrdu.pk@SD",Madani Channel Urdu (720p)\r\nhttps://streaming.madanichannel.tv/static/streaming-playlists/hls/b9790f10-cb0d-4e30-82bf-84a756234e58/master.m3u8\r\n#EXTINF:-1 tvg-id="Minimax.pk@SD",Minimax (576p) [Not 24/7]\r\nhttp://116.90.120.149:8000/play/a01c/index.m3u8\r\n#EXTINF:-1 tvg-id="OneGolf.pk@SD",One Golf (720p)\r\nhttp://162.250.201.58:6211/pk/ONEGOLF/index.m3u8\r\n#EXTINF:-1 tvg-id="PMITV.pk@SD",PMI TV (720p) [Not 24/7]\r\nhttps://cdn.live247stream.com/pmi/tv/playlist.m3u8\r\n#EXTINF:-1 tvg-id="PNNNews.pk@SD",PNN News (720p)\r\nhttps://cdn.bmstudiopk.com/pnn/smil:PNN.smil/playlist.m3u8\r\n#EXTINF:-1 tvg-id="PraiseTV.pk@SD",Praise TV (720p)\r\nhttps://livecdn.live247stream.com/praise/tv/playlist.m3u8\r\n#EXTINF:-1 tvg-id="PraiseTV.pk@SD",Praise TV\r\nhttps://pixelsmedia.live/livepraisetv/index.m3u8\r\n#EXTINF:-1 tvg-id="PTVSports.pk@SD",PTV Sports (720p)\r\nhttps://tvsen5.aynaott.com/Ptvsports/index.m3u8\r\n#EXTINF:-1 tvg-id="RaaviTV.pk@SD",Raavi TV (576p) [Not 24/7]\r\nhttp://116.90.120.149:8000/play/a01f/index.m3u8\r\n#EXTINF:-1 tvg-id="SABTV.pk@SD",SAB TV\r\nhttps://uvotv-aniview.global.ssl.fastly.net/hls/live/2119688/sabtv/playlist.m3u8\r\n#EXTINF:-1 tvg-id="SamaaTV.pk@SD",Samaa TV (576p) [Not 24/7]\r\nhttp://116.90.120.149:8000/play/a01g/index.m3u8\r\n#EXTINF:-1 tvg-id="SeeTV.pk@SD",See TV (576p)\r\nhttp://116.90.120.149:8000/play/a01l/index.m3u8\r\n#EXTINF:-1 tvg-id="ShineStarTV.pk@SD",Shine Star TV (720p) [Not 24/7]\r\nhttps://f-tx-edge-87.christianworldmedia.com/shinetvpak2/mp4:shinetvpak2/playlist.m3u8\r\n#EXTINF:-1 tvg-id="SindhTV.pk@SD",Sindh TV\r\nhttps://stream717.duckdns.org/hls/stream1.m3u8\r\n#EXTINF:-1 tvg-id="SindhTV.pk@SD",Sindh TV\r\nhttps://uvotv-aniview.global.ssl.fastly.net/hls/live/2119688/sindhtv/playlist.m3u8\r\n#EXTINF:-1 tvg-id="SindhTVNews.pk@SD",Sindh TV News\r\nhttps://uvotv-aniview.global.ssl.fastly.net/hls/live/2119688/sindhnews/playlist.m3u8\r\n#EXTINF:-1 tvg-id="SuchTV.pk@SD",Such TV\r\nhttps://video.primexsports.com/suchnews/live/playlist.m3u8\r\n#EXTINF:-1 tvg-id="SunoNewsHD.pk@SD",Suno News HD (720p)\r\nhttps://cdn.bmstudiopk.com/sunotv/live/playlist.m3u8\r\n#EXTINF:-1 tvg-id="TenSportsPakistan.pk@SD",Ten Sports Pakistan\r\nhttp://121.91.61.106:8000/play/a04h/index.m3u8\r\n#EXTINF:-1 tvg-id="VoiceNews.pk@SD",Voice News (720p)\r\nhttps://cdn.bmstudiopk.com/vop/live/playlist.m3u8\r\n#EXTINF:-1 tvg-id="ZindagiTV.pk@SD",Zindagi TV (576p) [Not 24/7]\r\nhttps://5ad386ff92705.streamlock.net/live_transcoder/ngrp:zindagitv.stream_all/chunklist.m3u8\r\n';
function parseAttributes(str) {
  const attrs = {};
  const attrRegex = /([a-zA-Z0-9\-]+)="([^"]*)"/g;
  let match;
  while ((match = attrRegex.exec(str)) !== null) {
    const [, key, value] = match;
    attrs[key] = value;
  }
  return attrs;
}
function parseM3u(text) {
  const lines = text.split(/\r?\n/);
  const channels = [];
  let lastChannel = null;
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line || line === "#EXTM3U") continue;
    if (line.startsWith("#EXTINF")) {
      const m = line.match(/^#EXTINF:(-?\d+)\s*(.*?)\s*,(.*)$/);
      if (!m) continue;
      const duration = Number(m[1]);
      const attrPart = m[2] || "";
      const name = m[3].trim();
      const attributes = parseAttributes(attrPart);
      lastChannel = { name, url: "", duration, attributes };
      let j = i + 1;
      while (j < lines.length) {
        const nextLine = lines[j].trim();
        if (!nextLine) {
          j++;
          continue;
        }
        if (nextLine.startsWith("#EXTVLCOPT:") && lastChannel) {
          const opt = nextLine.substring("#EXTVLCOPT:".length);
          const [k, v] = opt.split("=");
          if (k && v) lastChannel.attributes[k.trim()] = v.trim();
          j++;
          continue;
        }
        if (nextLine.startsWith("#")) {
          j++;
          continue;
        }
        lastChannel.url = nextLine;
        channels.push(lastChannel);
        i = j;
        break;
      }
    }
  }
  return channels;
}
const COUNTRY_LABELS = {
  pk: "Pakistan",
  uk: "United Kingdom",
  us: "United States",
  usa: "United States",
  ae: "United Arab Emirates",
  ca: "Canada",
  bd: "Bangladesh",
  in: "India",
  sa: "Saudi Arabia",
  de: "Germany",
  fr: "France"
};
const streamingChannels = parseM3u(pakistani);
const curatedStreamingChannels = streamingChannels;
const monitorMetrics = [
  { label: "Bitrate shield", value: "Adaptive" },
  { label: "Feed latency", value: "2.1s edge" },
  {
    label: "Channel stack",
    value: `${curatedStreamingChannels.length}+ live`
  }
];
function resolveCountry(channel) {
  if (!channel) return { code: "INT", label: "International feed" };
  const attrCountry = channel.attributes["tvg-country"];
  if (attrCountry) {
    const normalized = attrCountry.toLowerCase();
    const label = COUNTRY_LABELS[normalized] ?? toTitleCase(attrCountry.toLowerCase());
    const code = attrCountry.length <= 3 ? attrCountry.toUpperCase() : attrCountry.slice(0, 3).toUpperCase();
    return { code, label };
  }
  const tvgId = channel.attributes["tvg-id"] ?? "";
  const isoMatch = tvgId.match(/\.([a-z]{2,3})(?:@|$)/i);
  if (isoMatch) {
    const normalized = isoMatch[1].toLowerCase();
    const label = COUNTRY_LABELS[normalized] ?? normalized.toUpperCase();
    return { code: normalized.toUpperCase(), label };
  }
  return { code: "INT", label: "International feed" };
}
function toTitleCase(value) {
  return value.replace(/\b\w/g, (char) => char.toUpperCase());
}
var _tmpl$$3 = ["<div", ' class="space-y-5 rounded-3xl border border-white/10 bg-[#0f0f0f]/80 p-6 backdrop-blur"><div class="flex flex-col gap-3"><p class="text-xs font-semibold uppercase tracking-[0.4em] text-white/50">Channel atlas</p></div><div class="flex items-center justify-between"><div class="flex w-full items-center gap-3 rounded-2xl border px-4 py-3 transition border-white/10 bg-black/30 hover:border-white/40"><input type="text" placeholder="Search channels..." class="w-full bg-transparent text-white placeholder-white/40 focus:outline-none"><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor"></svg></div></div><div class="space-y-3"><!--$-->', '<!--/--><button class="flex w-full justify-center items-center rounded-2xl text-white/50 hover:text-white/70 cursor-pointer border border-white/10 bg-black/30 hover:border-white/40 h-14">Show More</button></div></div>'], _tmpl$2$1 = ["<button", ' type="button" class="', '"', '><div><div class="flex items-center gap-2"><!--$-->', '<!--/--><p class="text-base font-bold text-white">', '</p></div><p class="text-[10px] font-semibold uppercase tracking-[0.4em] text-white/40">', '</p></div><div class="text-right"><p class="text-sm font-bold text-[#ccff33]">', '</p><p class="text-[11px] font-semibold uppercase tracking-[0.4em] text-white/50">', "</p></div></button>"], _tmpl$3$1 = ["<span", ' class="inline-block h-2.5 w-2.5 rounded-full bg-[#ccff33]"></span>'];
function ChannelAtlas(props) {
  const [searchTerm, setSearchTerm] = createSignal("");
  const [channelsCount, setChannelsCount] = createSignal(6);
  const channels = createMemo(() => {
    const allChannels = typeof props.channels === "function" ? props.channels : props.channels;
    const term = searchTerm().toLowerCase();
    return allChannels.reduce((filtered, channel, index) => {
      if (!term || channel.name.toLowerCase().includes(term)) {
        filtered.push({
          channel,
          index
        });
      }
      return filtered;
    }, []);
  });
  const orderedChannels = createMemo(() => {
    const list = channels();
    if (list.length === 0) return list;
    const activeIndex = list.findIndex(({
      index
    }) => index === props.activeIndex);
    if (activeIndex <= 0) return list;
    const reordered = list.slice();
    const [activeEntry] = reordered.splice(activeIndex, 1);
    return [activeEntry, ...reordered];
  });
  return ssr(_tmpl$$3, ssrHydrationKey(), escape(orderedChannels().slice(0, channelsCount()).map(({
    channel,
    index: channelIndex
  }) => {
    const origin = resolveCountry(channel);
    const isActive = props.activeIndex === channelIndex;
    return ssr(_tmpl$2$1, ssrHydrationKey(), `flex cursor-pointer w-full items-center justify-between gap-4 rounded-2xl border px-4 py-3 text-left transition ${isActive ? "border-[#ccff33]/80 bg-white/10" : "border-white/10 bg-black/30 hover:border-white/40"}`, ssrAttribute("aria-pressed", escape(isActive, true), false), isActive && _tmpl$3$1[0] + ssrHydrationKey() + _tmpl$3$1[1], escape(channel.name.replace(/\s*(\([^)]*\)|\[[^\]]*\])\s*/g, "")), escape(channel.attributes["group-title"]) ?? "General", escape(origin.label), escape(origin.code));
  })));
}
var _tmpl$$2 = ["<div", ' class="relative overflow-hidden rounded-3xl border border-white/10 bg-linear-to-br from-[#131313] via-[#080808] to-[#050505] p-8"><div class="absolute inset-y-0 right-0 w-64 bg-[radial-gradient(circle,_#ccff33_0%,_transparent_60%)] opacity-10 blur-3xl"></div><div class="relative space-y-6"><div class="flex flex-col gap-4 md:flex-row md:items-center md:justify-between"><div><p class="text-xs font-semibold uppercase tracking-[0.4em] text-white/60">Live monitor</p><h3 class="text-3xl font-black tracking-tight text-white">Stream while exploring the grid</h3></div><span class="rounded-full border border-white/15 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-white/70"><!--$-->', '<!--/--> signal</span></div><div class="rounded-2xl border border-white/10 bg-white/5 p-4"><div class="flex flex-wrap items-center justify-between gap-4"><div><p class="text-xs font-semibold uppercase tracking-[0.3em] text-white/60">Now playing</p><p class="text-2xl font-bold text-white">', '</p></div><div class="text-right"><p class="text-xs font-semibold uppercase tracking-[0.3em] text-white/50">Origin</p><p class="text-base font-bold text-[#ccff33]">', '</p></div></div><div class="mt-4 overflow-hidden rounded-2xl border border-white/5 bg-black/60">', '</div><div class="mt-4 grid gap-4 sm:grid-cols-3">', "</div></div></div></div>"], _tmpl$2 = ["<div", ' class="relative aspect-video w-full"><video class="h-full w-full rounded-2xl bg-black object-cover" playsinline preload="none"', '></video><div class="pointer-events-none absolute inset-x-0 bottom-0 rounded-b-2xl bg-gradient-to-t from-black/85 via-black/30 to-transparent p-4"><div class="pointer-events-auto flex flex-col gap-3"><div class="flex items-center gap-3"><button class="flex h-10 w-10 items-center justify-center rounded-full border border-white/30 bg-white/10 text-white transition hover:border-[#ccff33] hover:text-[#ccff33]">', '</button><div class="flex flex-1 flex-col gap-1"><input class="h-1 w-full cursor-pointer appearance-none rounded-full bg-white/20 accent-[#ccff33]" type="range" min="0" max="100"', '><div class="flex items-center justify-between text-[11px] font-semibold tracking-wide text-white/80"><span>', "</span><span>", '</span></div></div></div><div class="flex flex-wrap items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.3em] text-white/70"><button class="flex items-center gap-2 rounded-full border border-white/20 px-3 py-1 text-[10px] tracking-[0.2em] transition hover:border-[#ccff33] hover:text-[#ccff33]">', '</button><input class="h-1 w-32 cursor-pointer appearance-none rounded-full bg-white/20 accent-[#ccff33]" type="range" min="0" max="100"', "></div></div></div></div>"], _tmpl$3 = ["<svg", ' class="h-4 w-4" viewBox="0 0 16 16" fill="currentColor"><path d="M5 3h2.5v10H5zm3.5 0H11v10H8.5z"></path></svg>'], _tmpl$4 = ["<svg", ' class="h-4 w-4" viewBox="0 0 16 16" fill="currentColor"><path d="M4 2l10 6-10 6z"></path></svg>'], _tmpl$5 = ["<div", ' class="flex aspect-video w-full items-center justify-center text-sm font-semibold text-white/50">Select a feed to begin streaming preview.</div>'], _tmpl$6 = ["<div", ' class="rounded-xl border border-white/10 bg-black/40 p-3"><p class="text-[10px] font-semibold uppercase tracking-[0.4em] text-white/40">', '</p><p class="mt-2 text-lg font-bold">', "</p></div>"];
function StreamingMonitor(props) {
  const [isPlaying, setIsPlaying] = createSignal(false);
  const [currentTime, setCurrentTime] = createSignal(0);
  const [duration, setDuration] = createSignal(0);
  const [volume, setVolume] = createSignal(1);
  const [isMuted, setIsMuted] = createSignal(false);
  const formatTime = (seconds) => {
    if (!Number.isFinite(seconds) || seconds <= 0) return "00:00";
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor(seconds % 3600 / 60);
    const secs = Math.floor(seconds % 60);
    const parts = [hrs > 0 ? String(hrs).padStart(2, "0") : void 0, String(mins).padStart(2, "0"), String(secs).padStart(2, "0")].filter(Boolean);
    return parts.join(":");
  };
  onMount(() => {
    return;
  });
  const progressPercent = duration() > 0 ? Math.min(currentTime() / duration() * 100, 100) : 0;
  return ssr(_tmpl$$2, ssrHydrationKey(), escape(props.origin.code), escape(props.channel?.name) ?? "Select a channel", escape(props.origin.label), props.channel?.url ? ssr(_tmpl$2, ssrHydrationKey(), ssrAttribute("src", escape(props.channel.url, true), false), isPlaying() ? _tmpl$3[0] + ssrHydrationKey() + _tmpl$3[1] : _tmpl$4[0] + ssrHydrationKey() + _tmpl$4[1], ssrAttribute("value", escape(progressPercent, true), false), escape(formatTime(currentTime())), escape(formatTime(duration())), isMuted() || volume() === 0 ? "Muted" : "Sound", ssrAttribute("value", escape(Math.round(volume() * 100), true), false)) : _tmpl$5[0] + ssrHydrationKey() + _tmpl$5[1], escape(props.metrics.map((metric) => ssr(_tmpl$6, ssrHydrationKey(), escape(metric.label), escape(metric.value)))));
}
var _tmpl$$1 = ["<footer", ' class="flex flex-col gap-4 border-t border-white/5 pt-8 text-sm font-semibold text-white/50 sm:flex-row sm:items-center sm:justify-between"><p>\xA9 <!--$-->', '<!--/--> SONARA.tv Engineered on TanStack + Solid.</p><div class="flex gap-4 text-xs uppercase tracking-[0.3em]"><button class="cursor-pointer text-white/60 hover:text-white">Status</button><button class="cursor-pointer text-white/60 hover:text-white">Support</button><button class="cursor-pointer text-white/60 hover:text-white">Download apps</button></div></footer>'];
const Footer = () => {
  return ssr(_tmpl$$1, ssrHydrationKey(), escape((/* @__PURE__ */ new Date()).getFullYear()));
};
var _tmpl$ = ["<main", ' class="min-h-screen bg-[#202020] text-white antialiased"><div class="mx-auto flex max-w-6xl flex-col gap-16 px-6 py-12 lg:py-16"><section class="grid gap-8 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,0.65fr)]"><!--$-->', "<!--/--><!--$-->", "<!--/--></section><!--$-->", "<!--/--></div></main>"];
function HomePage() {
  const channelList = curatedStreamingChannels;
  const [activeChannelIndex, setActiveChannelIndex] = createSignal(0);
  const activeChannel = createMemo(() => channelList[activeChannelIndex()] ?? channelList[0]);
  const playingOrigin = createMemo(() => resolveCountry(activeChannel()));
  return ssr(_tmpl$, ssrHydrationKey(), escape(createComponent(StreamingMonitor, {
    get channel() {
      return activeChannel();
    },
    get origin() {
      return playingOrigin();
    },
    metrics: monitorMetrics
  })), escape(createComponent(ChannelAtlas, {
    channels: channelList,
    get activeIndex() {
      return activeChannelIndex();
    },
    onSelect: setActiveChannelIndex
  })), escape(createComponent(Footer, {})));
}
const SplitComponent = HomePage;

export { SplitComponent as component };
//# sourceMappingURL=index-BxPv45kc.mjs.map
