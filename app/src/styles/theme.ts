const color = {
    mainRed: "#FF87CA",
    gray: "#eeeeee",
    gray2: "#f3f4f6",
    mainBlue: "#93bfcf",
} as const;

const fontSize = {
    logo: "2.3rem",
    big: "2rem",
    medium: "1.5rem",
    small: "1.2rem",
    normal: "1rem",
} as const;

export const theme = {
    color,
    fontSize,
} as const;

export type ThemeType = typeof theme;
