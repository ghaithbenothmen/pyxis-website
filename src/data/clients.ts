export type ClientReference = {
  name: string;
  /** Original colours, trimmed — shown on hover. */
  color: string;
  /** White monochrome version generated from the original — shown at rest. */
  mono: string;
  width: number;
  height: number;
};

const logo = (name: string, file: string, width: number, height: number): ClientReference => ({
  name,
  color: `/images/references/color/${file}`,
  mono: `/images/references/mono/${file}`,
  width,
  height,
});

/**
 * Client references. Source files live in /public/images/references; the
 * `color/` and `mono/` variants are generated from them (trimmed, and a white
 * monochrome version that keeps knocked-out text readable).
 */
export const clients: ClientReference[] = [
  logo("Orange", "orange.png", 46, 47),
  logo("Vodafone", "vodafone.png", 55, 49),
  logo("Ooredoo", "ooredoo.png", 56, 56),
  logo("e& (etisalat and)", "itisalet.png", 55, 50),
  logo("Virgin Mobile", "virqin.png", 88, 45),
  logo("Topnet", "topnet.png", 108, 24),
  logo("Sodetel", "sodetel.png", 76, 33),
  logo("Beyond One", "beyond.png", 99, 27),
];
