// src/utils/currencyFormatter.js
export const formatCurrency = (value) => {
  return new Intl.NumberFormat('en-BD', {
    style: 'currency',
    currency: 'BDT',
  }).format(value);
};
