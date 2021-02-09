export const getCurrentRoute = (nav) => {
  if (!nav || !nav.routes || !nav.routes[nav.index]) {
    return nav
  }
  return getCurrentRoute(nav.routes[nav.index])
}
