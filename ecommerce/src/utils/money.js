export const formatMoney = (priceCents) => {
  if (priceCents < 0) {
    priceCents = priceCents * -1;
    return `-$${(priceCents / 100).toFixed(2)}`;
  }
  return `$${(priceCents / 100).toFixed(2)}`;
};
