export const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };
  
  export const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-IN');
  };