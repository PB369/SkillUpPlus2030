import { ImageSourcePropType } from "react-native";

const bannerPathsPerCategory: Record<string, ImageSourcePropType> = {
  "Renda Fixa": require("@/assets/images/courses-images/fixed-income-cat.png"),
  "Renda Variável": require("@/assets/images/courses-images/variable-income-cat.png"),
  "Fundos de Investimentos": require("@/assets/images/courses-images/investment-founds-cat.png"),
  "Fundos Imobiliários": require("@/assets/images/courses-images/real-estate-founds-cat.png"),
  "ETFs": require("@/assets/images/courses-images/etfs-cat.png"),
  "Outro": require("@/assets/images/courses-images/other-cat.png"),
}

export const findBanner = (courseCategory: string) => {
  return bannerPathsPerCategory[courseCategory] || bannerPathsPerCategory["Outro"];
}