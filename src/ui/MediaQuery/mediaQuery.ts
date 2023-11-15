import { css } from "styled-components";

const device = {
  small: "767px",
  mediumMin: "768px",
  mediumMax: "1023px",
  large: "1024px",
};

export const media = {
  small: (...args: [TemplateStringsArray, string?]) => css`
    @media (max-width: ${device.small}) {
      ${css(...args)};
    }
  `,
  medium: (...args: [TemplateStringsArray, string?]) => css`
    @media (min-width: ${device.mediumMin}) and (max-width: ${device.mediumMax}) {
      ${css(...args)};
    }
  `,
  large: (...args: [TemplateStringsArray, string?]) => css`
    @media (min-width: ${device.large}) {
      ${css(...args)}
    }
  `,
};
