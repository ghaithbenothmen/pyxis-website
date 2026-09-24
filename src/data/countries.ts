export type Country = {
  name: string;
  /** Approximate geographic centre, in degrees. */
  lat: number;
  lon: number;
  /** Pyxis office in this country. */
  office?: { role: "Headquarters" | "Office"; city: string };
};

/** Countries where Pyxis operates (list supplied by Pyxis). */
export const countries: Country[] = [
  { name: "United Kingdom", lat: 52.2, lon: -3.0, office: { role: "Headquarters", city: "Kington" } },
  { name: "Tunisia", lat: 34.0, lon: 9.5, office: { role: "Office", city: "Tunis" } },
  { name: "Algeria", lat: 28.0, lon: 2.6 },
  { name: "Morocco", lat: 31.8, lon: -7.1 },
  { name: "France", lat: 46.6, lon: 2.4 },
  { name: "Iraq", lat: 33.2, lon: 43.7 },
  { name: "Kuwait", lat: 29.3, lon: 47.6 },
  { name: "Lebanon", lat: 33.9, lon: 35.9 },
  { name: "Egypt", lat: 26.8, lon: 30.8 },
  { name: "Jordan", lat: 31.2, lon: 36.5 },
  { name: "South Africa", lat: -29.0, lon: 24.7 },
  { name: "Chile", lat: -30.0, lon: -71.0 },
  { name: "Colombia", lat: 4.6, lon: -74.1 },
  { name: "Mexico", lat: 23.6, lon: -102.5 },
  { name: "Cameroon", lat: 5.7, lon: 12.4 },
  { name: "Central African Republic", lat: 6.6, lon: 20.9 },
  { name: "Côte d'Ivoire", lat: 7.5, lon: -5.5 },
  { name: "Nigeria", lat: 9.1, lon: 8.7 },
  { name: "Mauritania", lat: 20.3, lon: -10.3 },
  { name: "Madagascar", lat: -19.4, lon: 46.9 },
  { name: "Indonesia", lat: -2.5, lon: 118.0 },
];

/**
 * Projection of the source map (assets/map-pyxis.png), calibrated on known
 * points (United Kingdom, Tunisia, Mexico, South Africa): nearly linear in
 * both axes. Returns coordinates in the map's pixel space.
 */
export const project = ({ lat, lon }: { lat: number; lon: number }) => ({
  x: 548.8 + 3.39 * lon,
  y: 353.4 - 4.6 * lat,
});
