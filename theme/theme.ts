const theme = {
  breakpoints: {
    xs: 575,
    sm: 576,
    md: 768,
    lg: 992,
    xl: 1200,
  },
  colors: {
    primary: '#5065AB',
    accent: '#5065AB',
    dark: '#111111',
    black: '#000000',
    grayNeutral: '#7a7a7a',
  },
  typography: {
    heading: 'Mark Pro',
    body: "'Baloo 2', cursive",
  },
  get mediaQueries() {
    return {
      xs: `max-width: ${this.breakpoints.xs}px`,
      sm: `min-width: ${this.breakpoints.sm}px`,
      md: `min-width: ${this.breakpoints.md}px`,
      lg: `min-width: ${this.breakpoints.lg}px`,
      xl: `min-width: ${this.breakpoints.xl}px`,
    }
  }
}

export default theme;
