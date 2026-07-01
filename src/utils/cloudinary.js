/**
 * Cloudinary URL optimizer for the public website.
 *
 * Takes any Cloudinary image URL and injects on-the-fly transformations
 * (auto format, auto quality, responsive width, DPR) right after "/upload/".
 *
 * Non-Cloudinary URLs are returned unchanged.
 *
 * @param {string} url  - Original image URL
 * @param {object} [opts]
 * @param {number} [opts.width]   - Desired width in px (default: auto)
 * @param {string} [opts.quality] - Quality preset: 'auto', 'auto:best', 'auto:good' (default: 'auto')
 * @param {string} [opts.format]  - Output format: 'auto', 'webp', 'avif' (default: 'auto')
 * @returns {string} Optimized URL
 */
export function optimizeCloudinaryUrl(url, opts = {}) {
  if (!url || typeof url !== 'string') return url || '';

  // Only transform Cloudinary URLs
  if (!url.includes('res.cloudinary.com')) return url;

  // Build transform segment
  const parts = [];
  parts.push(`f_${opts.format || 'auto'}`);           // auto picks webp/avif per browser
  parts.push(`q_${opts.quality || 'auto'}`);           // smart quality compression
  if (opts.width) {
    parts.push(`w_${opts.width}`);                     // explicit width
    parts.push('c_limit');                              // never upscale
  }
  parts.push('dpr_auto');                              // retina-aware
  const transform = parts.join(',');

  // Inject after /upload/ (before any existing transforms or the version/path)
  const uploadIdx = url.indexOf('/upload/');
  if (uploadIdx === -1) return url;

  const before = url.slice(0, uploadIdx + '/upload/'.length);
  const after = url.slice(uploadIdx + '/upload/'.length);

  // Don't double-inject if already optimised
  if (after.startsWith('f_')) return url;

  return `${before}${transform}/${after}`;
}
