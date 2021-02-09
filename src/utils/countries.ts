export const getCountryNameByCode = (provider: any) => {
  if (!provider || !provider.country) return 'International'
  const code = provider.country.iso_code
  switch (code) {
    case 'my':
      return 'Malaysia'
    case 'sg':
      return 'Singapore'
    default:
      return 'International'
  }
}
