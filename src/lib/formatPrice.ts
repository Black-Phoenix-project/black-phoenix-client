/**
 * Formats price consistently on both server and client.
 * Avoids toLocaleString() which differs between Node.js and browser.
 * Example: 1212000 → "1 212 000"
 */
export function formatPrice(amount: number): string {
    return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  }