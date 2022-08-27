export function formatAddress(address: string): string {
  return address.length < 4 + 4
    ? address
    : `${address.substring(0, 4)}\u2026${address.substring(
        address.length - 4
      )}`;
}
