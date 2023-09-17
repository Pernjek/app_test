import { extendTheme } from "@chakra-ui/react";
import { setupColors } from "./colors";
import sizes from "./sizes";
import space from "./space";
import fontWeights from "./fontWeights";
import fontSizes from "./fontSizes";

const breakpoints = {
  sm: "30em",
  md: "48em",
  lg: "62em",
  xl: "80em",
  "2xl": "96em",
};

export const setupTheme = ({
  primaryColor,
  secondaryColor,
  tertiaryColor,
  quaternaryColor,
  font,
  theme,
}) => {
  const fonts = font ? { brand: font } : {};
  const colors = setupColors({
    primaryColor,
    secondaryColor,
    tertiaryColor,
    quaternaryColor,
    theme,
  });
  const extended = extendTheme({
    semanticTokens: {
      colors,
      fontWeights,
      fontSizes,
      sizes,
      space,
    },
    fonts,
    breakpoints,
  });
  return extended;
};
