import pakistani from "../streams/pk.m3u?raw";
import { type Channel, parseM3u } from "./parse-m3u";

export interface ChannelOrigin {
  code: string;
  label: string;
}

export const COUNTRY_LABELS: Record<string, string> = {
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
  fr: "France",
};

export const streamingChannels = parseM3u(pakistani);
export const curatedStreamingChannels = streamingChannels;

export const monitorMetrics = [
  { label: "Bitrate shield", value: "Adaptive" },
  { label: "Feed latency", value: "2.1s edge" },
  {
    label: "Channel stack",
    value: `${curatedStreamingChannels.length}+ live`,
  },
];

export function resolveCountry(channel?: Channel): ChannelOrigin {
  if (!channel) return { code: "INT", label: "International feed" };

  const attrCountry = channel.attributes["tvg-country"];
  if (attrCountry) {
    const normalized = attrCountry.toLowerCase();
    const label =
      COUNTRY_LABELS[normalized] ?? toTitleCase(attrCountry.toLowerCase());
    const code =
      attrCountry.length <= 3
        ? attrCountry.toUpperCase()
        : attrCountry.slice(0, 3).toUpperCase();
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

function toTitleCase(value: string) {
  return value.replace(/\b\w/g, (char) => char.toUpperCase());
}
