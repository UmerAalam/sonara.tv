import pakistani from "../streams/pk.m3u?raw";
import unitedKingdom from "../streams/uk.m3u?raw";
import unitedStates from "../streams/us.m3u?raw";
import bangladesh from "../streams/bd.m3u?raw";
import india from "../streams/in.m3u?raw";
import saudiArabia from "../streams/sa.m3u?raw";
import unitedArabEmirates from "../streams/ae.m3u?raw";
import canada from "../streams/ca.m3u?raw";
import germany from "../streams/de.m3u?raw";
import france from "../streams/fr.m3u?raw";
import { type Channel, parseM3u } from "./parse-m3u";

export interface ChannelOrigin {
  code: string;
  label: string;
}

export interface CountryChannels {
  code: string;
  label: string;
  description: string;
  accent: string;
  channels: Channel[];
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
const countrySources: Array<Omit<CountryChannels, "channels"> & { source: string }> = [
  {
    code: "PK",
    label: "Pakistan",
    description: "National, regional and expat feeds",
    accent: "#ccff33",
    source: pakistani,
  },
  {
    code: "UK",
    label: "United Kingdom",
    description: "Public + private HD lineup",
    accent: "#7dd3fc",
    source: unitedKingdom,
  },
  {
    code: "US",
    label: "United States",
    description: "Network, FAST and local mixes",
    accent: "#f472b6",
    source: unitedStates,
  },
  {
    code: "AE",
    label: "United Arab Emirates",
    description: "MENA staples and sports",
    accent: "#a78bfa",
    source: unitedArabEmirates,
  },
  {
    code: "CA",
    label: "Canada",
    description: "National + regional specialty",
    accent: "#facc15",
    source: canada,
  },
  {
    code: "BD",
    label: "Bangladesh",
    description: "News, culture and sports",
    accent: "#34d399",
    source: bangladesh,
  },
  {
    code: "IN",
    label: "India",
    description: "Bollywood, news and sport",
    accent: "#fb923c",
    source: india,
  },
  {
    code: "SA",
    label: "Saudi Arabia",
    description: "Pan-Arabic and domestic",
    accent: "#22d3ee",
    source: saudiArabia,
  },
  {
    code: "DE",
    label: "Germany",
    description: "Public service + specialty",
    accent: "#c084fc",
    source: germany,
  },
  {
    code: "FR",
    label: "France",
    description: "News, culture and FAST",
    accent: "#f97316",
    source: france,
  },
];

export const countryChannelGroups: CountryChannels[] = countrySources.map(
  ({ source, ...meta }) => ({
    ...meta,
    channels: parseM3u(source),
  }),
);

export const streamingChannels = countryChannelGroups[0]?.channels ?? [];
export const curatedStreamingChannels = streamingChannels;

export const monitorMetrics = getMonitorMetrics(curatedStreamingChannels.length);

export function getMonitorMetrics(channelCount: number) {
  return [
    { label: "Bitrate shield", value: "Adaptive" },
    { label: "Feed latency", value: "2.1s edge" },
    {
      label: "Channel stack",
      value: `${channelCount}+ live`,
    },
  ];
}

export function findCountryGroup(code?: string) {
  if (!code) return countryChannelGroups[0];
  return countryChannelGroups.find(
    (country) => country.code.toLowerCase() === code.toLowerCase(),
  );
}

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
