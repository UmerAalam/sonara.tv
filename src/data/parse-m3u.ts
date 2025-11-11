export interface Channel {
  name: string;
  url: string;
  duration?: number;
  attributes: Record<string, string>;
}

function parseAttributes(str: string): Record<string, string> {
  const attrs: Record<string, string> = {};
  const attrRegex = /([a-zA-Z0-9\-]+)="([^"]*)"/g;
  let match: RegExpExecArray | null;

  while ((match = attrRegex.exec(str)) !== null) {
    const [, key, value] = match;
    attrs[key] = value;
  }

  return attrs;
}

export function parseM3u(text: string): Channel[] {
  const lines = text.split(/\r?\n/);
  const channels: Channel[] = [];
  let lastChannel: Channel | null = null;

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

      // read following lines for EXTVLCOPT + URL
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

        // first non-# line is URL
        lastChannel.url = nextLine;
        channels.push(lastChannel);
        i = j;
        break;
      }
    }
  }

  return channels;
}
