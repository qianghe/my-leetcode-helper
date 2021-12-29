export const float2Percent = (f, precision = 2) => {
  return (parseFloat(f) * 100).toFixed(precision) + '%'
}