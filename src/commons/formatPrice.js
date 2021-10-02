export const formatPrice = new Intl.NumberFormat('vn-VN', {
      style: 'currency',
      currency: 'VND',
      minimumFractionDigits: 0
})