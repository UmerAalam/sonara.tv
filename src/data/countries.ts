import pk from "../streams/pk.m3u?raw";
import uk from "../streams/uk.m3u?raw";
import us from "../streams/us.m3u?raw";
import ae from "../streams/ae.m3u?raw";
import ca from "../streams/ca.m3u?raw";
import bd from "../streams/bd.m3u?raw";
import india from "../streams/in.m3u?raw";
import sa from "../streams/sa.m3u?raw";
import de from "../streams/de.m3u?raw";
import fr from "../streams/fr.m3u?raw";

const CountryLabel: Record<string, string> = {
  pk: "Pakistan",
  uk: "United Kingdom",
  us: "United States",
  ae: "United Arab Emirates",
  ca: "Canada",
  bd: "Bangladesh",
  in: "India",
  sa: "Saudi Arabia",
  de: "Germany",
  fr: "France",
};

export interface Country {
  label: string;
  channels: string;
}
export const countries: Country[] = [
  {
    label: CountryLabel.pk,
    channels: pk,
  },
  {
    label: CountryLabel.uk,
    channels: uk,
  },
  {
    label: CountryLabel.us,
    channels: us,
  },
  {
    label: CountryLabel.ae,
    channels: ae,
  },
  {
    label: CountryLabel.ca,
    channels: ca,
  },
  {
    label: CountryLabel.bd,
    channels: bd,
  },
  {
    label: CountryLabel.in,
    channels: india,
  },
  {
    label: CountryLabel.sa,
    channels: sa,
  },
  {
    label: CountryLabel.de,
    channels: de,
  },
  {
    label: CountryLabel.fr,
    channels: fr,
  },
];
