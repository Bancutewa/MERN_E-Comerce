// export const formatMoney = (number) => Number(number.toFixed(1)).toLocaleString();

export const formatMoney = (number) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(number);
