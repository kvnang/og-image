export const viewports = {
  mobileS: 340,
  mobileM: 375,
  mobileL: 600,
  tabletS: 768,
  tabletL: 1024,
  laptopS: 1025,
  laptopM: 1440,
  laptopL: 1536,
  desktopS: 1750,
  desktopL: 1920,
};

export const breakpoints = {
  mobileOnly: `(max-width: ${viewports.tabletS - 1}px)`,
  mobileS: `(min-width: ${viewports.mobileS}px)`,
  mobileM: `(min-width: ${viewports.mobileM}px)`,
  mobileL: `(min-width: ${viewports.mobileL}px)`,
  tabletOnly: `(min-width: ${viewports.tabletS}px) and (max-width: ${
    viewports.laptopS - 1
  }px)`,
  mobileAndTablet: `(max-width: ${viewports.laptopS - 1}px)`,
  tabletS: `(min-width: ${viewports.tabletS}px)`,
  tabletL: `(min-width: ${viewports.tabletL}px)`,
  laptopS: `(min-width: ${viewports.laptopS}px)`,
  laptopM: `(min-width: ${viewports.laptopM}px)`,
  laptopL: `(min-width: ${viewports.laptopL}px)`,
  desktopS: `(min-width: ${viewports.desktopS}px)`,
  desktopL: `(min-width: ${viewports.desktopL}px)`,
};
