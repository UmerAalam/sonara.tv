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
  path: string;
}
export const countries: Country[] = [
  {
    label: CountryLabel.pk,
    path: pk,
  },
  {
    label: CountryLabel.uk,
    path: uk,
  },
  {
    label: CountryLabel.us,
    path: us,
  },
  {
    label: CountryLabel.ae,
    path: ae,
  },
  {
    label: CountryLabel.ca,
    path: ca,
  },
  {
    label: CountryLabel.bd,
    path: bd,
  },
  {
    label: CountryLabel.in,
    path: india,
  },
  {
    label: CountryLabel.sa,
    path: sa,
  },
  {
    label: CountryLabel.de,
    path: de,
  },
  {
    label: CountryLabel.de,
    path: fr,
  },
];
