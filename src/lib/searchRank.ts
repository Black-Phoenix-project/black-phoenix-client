import type { Product } from "@/types";

const BRAND_QUERY_ALIASES = [
  "spej odejda",
  "spets odejda",
  "spec odejda",
  "specodejda",
  "spetsodejda",
];

const WORK_CLOTHES_TERMS = [
  "maxsus",
  "kiyim",
  "himoya",
  "uniform",
  "workwear",
  "spec",
  "spets",
  "odejda",
];

const CYRILLIC_TO_LATIN: Record<string, string> = {
  "\u0430": "a",
  "\u0431": "b",
  "\u0432": "v",
  "\u0433": "g",
  "\u0434": "d",
  "\u0435": "e",
  "\u0451": "e",
  "\u0436": "j",
  "\u0437": "z",
  "\u0438": "i",
  "\u0439": "y",
  "\u043a": "k",
  "\u043b": "l",
  "\u043c": "m",
  "\u043d": "n",
  "\u043e": "o",
  "\u043f": "p",
  "\u0440": "r",
  "\u0441": "s",
  "\u0442": "t",
  "\u0443": "u",
  "\u0444": "f",
  "\u0445": "h",
  "\u0446": "ts",
  "\u0447": "ch",
  "\u0448": "sh",
  "\u0449": "sh",
  "\u044a": "",
  "\u044b": "y",
  "\u044c": "",
  "\u044d": "e",
  "\u044e": "yu",
  "\u044f": "ya",
};

export function normalizeSearchText(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^\w\u0400-\u04FF\s]/g, " ")
    .replace(/_/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function toLatin(value: string): string {
  return Array.from(value)
    .map((char) => CYRILLIC_TO_LATIN[char] ?? char)
    .join("");
}

function hasBrandIntent(query: string): boolean {
  const norm = normalizeSearchText(query);
  const latin = normalizeSearchText(toLatin(norm));

  return BRAND_QUERY_ALIASES.some((term) => {
    const termNorm = normalizeSearchText(term);
    return latin.includes(termNorm) || norm.includes(termNorm);
  });
}

export function scoreProductSearch(product: Product, query: string): number {
  const q = normalizeSearchText(query);
  if (!q) return 0;

  const name = normalizeSearchText(product.name || "");
  const description = normalizeSearchText(product.description || "");
  const category = normalizeSearchText(product.category || "");
  const haystack = `${name} ${description} ${category}`.trim();

  const qLatin = normalizeSearchText(toLatin(q));
  const haystackLatin = normalizeSearchText(toLatin(haystack));
  const tokens = qLatin.split(" ").filter((token) => token.length > 1);

  let score = 0;

  if (name.includes(q) || haystackLatin.includes(qLatin)) score += 120;
  if (description.includes(q) || description.includes(qLatin)) score += 70;
  if (category.includes(q) || category.includes(qLatin)) score += 55;

  tokens.forEach((token) => {
    if (name.includes(token) || haystackLatin.includes(token)) score += 22;
    else if (description.includes(token)) score += 12;
    else if (category.includes(token)) score += 10;
  });

  if (hasBrandIntent(query)) {
    const hasWorkClothesMatch = WORK_CLOTHES_TERMS.some((term) =>
      haystackLatin.includes(term)
    );
    if (hasWorkClothesMatch) score += 200;
  }

  return score;
}
