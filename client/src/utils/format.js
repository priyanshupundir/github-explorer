export const formatDate = (date) => {
  return new Date(date).toLocaleDateString();
};

export const formatNumber = (num) => {
  return num?.toLocaleString() || 0;
};