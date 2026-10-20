const CRORE = 10_000_000;
const LAKH = 100_000;

/**
 * Lahore uses the 225 sq ft marla (1 Kanal = 20 Marla = 4,500 sq ft), which is
 * what the listings in `src/data/properties.ts` are quoted against. Some
 * society documents use the 272.25 sq ft "legal" marla — change this one
 * constant if your listings follow that convention instead.
 */
export const SQFT_PER_MARLA = 225;

export const marlaToKanal = (marla: number) => {
  if (marla < 20) return `${trim(marla)} Marla`;
  return `${trim(marla / 20)} Kanal`;
};

export const marlaToSqft = (marla: number) =>
  Math.round(marla * SQFT_PER_MARLA).toLocaleString("en-PK");

/** "PKR 12 Crore", "PKR 95 Lakh", "PKR 85 Lakh" — the local reading convention. */
export const formatPkr = (amount: number) => {
  if (amount >= CRORE) return `PKR ${trim(amount / CRORE)} Crore`;
  if (amount >= LAKH) return `PKR ${trim(amount / LAKH)} Lakh`;
  return `PKR ${amount.toLocaleString("en-PK")}`;
};

export const formatPrice = (amount: number, isRent: boolean) =>
  isRent
    ? `PKR ${amount.toLocaleString("en-PK")} / month`
    : formatPkr(amount);

/** Compact form for badges and cards where the full price would wrap. */
export const formatPkrShort = (amount: number) => {
  if (amount >= CRORE) return `${trim(amount / CRORE)} Cr`;
  if (amount >= LAKH) return `${trim(amount / LAKH)} Lakh`;
  return amount.toLocaleString("en-PK");
};

const trim = (n: number) =>
  Number.isInteger(n) ? String(n) : String(Number(n.toFixed(2)));

export const areaLabel = (marla: number, sqft: number, unit: "marla" | "sqft") =>
  unit === "sqft"
    ? `${sqft.toLocaleString("en-PK")} sq ft`
    : `${marlaToKanal(marla)} (${sqft.toLocaleString("en-PK")} sq ft)`;

/** Monthly mortgage/installment over a PKR amount using the reducing-balance formula. */
export const monthlyInstallment = (
  principal: number,
  annualRatePercent: number,
  years: number,
) => {
  const r = annualRatePercent / 100 / 12;
  const n = years * 12;
  if (n <= 0) return 0;
  if (r === 0) return principal / n;
  return (principal * r) / (1 - Math.pow(1 + r, -n));
};

export const formatFullPkr = (amount: number) =>
  `PKR ${Math.round(amount).toLocaleString("en-PK")}`;
