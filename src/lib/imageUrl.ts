// Cloudinary URL transforms — bypass the Next.js image optimizer for
// CDN-hosted hero/LCP images to cut an extra network hop.

const TRANSFORMS_INSERT = "/image/upload/";

export function cloudinaryUrl(
  url: string,
  opts: { w?: number; q?: number | "auto"; progressive?: boolean } = {}
): string {
  if (!url || !url.includes(TRANSFORMS_INSERT)) return url;

  const idx = url.indexOf(TRANSFORMS_INSERT);
  const base = url.slice(0, idx + TRANSFORMS_INSERT.length);
  const rest = url.slice(idx + TRANSFORMS_INSERT.length);

  const transforms: string[] = ["f_auto"];
  transforms.push(opts.q ? `q_${opts.q}` : "q_auto");
  if (opts.w) transforms.push(`w_${opts.w},c_limit`);
  if (opts.progressive !== false) transforms.push("fl_progressive");

  return `${base}${transforms.join(",")}/${rest}`;
}

export function cloudinarySrcSet(
  url: string,
  widths: number[] = [480, 768, 1024, 1280, 1600]
): string {
  return widths.map((w) => `${cloudinaryUrl(url, { w })} ${w}w`).join(", ");
}
