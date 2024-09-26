type ColorVariantsKeys = 50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;
type ColorVariants = Record<ColorVariantsKeys, string>;
type Color = {
  slate: ColorVariants;
  gray: ColorVariants;
  zinc: ColorVariants;
  neutral: ColorVariants;
  stone: ColorVariants;
  red: ColorVariants;
  orange: ColorVariants;
  amber: ColorVariants;
  yellow: ColorVariants;
  green: ColorVariants;
  lime: ColorVariants;
  esmerald: ColorVariants;
  teal: ColorVariants;
  cyan: ColorVariants;
  sky: ColorVariants;
  blue: ColorVariants;
  indigo: ColorVariants;
  violet: ColorVariants;
  purple: ColorVariants;
  fuchsia: ColorVariants;
  pink: ColorVariants;
  rose: ColorVariants;
};

type FontSizeKeys = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
type FontSize = Record<FontSizeKeys, string>;

type shadowKeys = 'sm' | 'base' | 'md' | 'lg' | 'xl' | 'xxl' | 'inner' | 'none';
type Shadow = Record<shadowKeys, string>;

type fontWeightKeys =
  | 'light'
  | 'normal'
  | 'medium'
  | 'semibold'
  | 'bold'
  | 'extrabold';
type FontWeight = Record<fontWeightKeys, string>;

export type StyleContextType = {
  fontSize: FontSize;
  fontWeight: FontWeight;
  color: Color;
  shadow: Shadow;
};
