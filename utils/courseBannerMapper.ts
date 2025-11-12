import { ImageSourcePropType } from "react-native";

const bannerPathsPerCategory: Record<string, ImageSourcePropType> = {
  "TI": require("@/assets/images/banners/ti-banner.jpg"),
  "IA": require("@/assets/images/banners/ai-banner.jpg"),
  "Sustentabilidade": require("@/assets/images/banners/sustentability-banner.jpg"),
  "Arquitetura": require("@/assets/images/banners/architecture-banner.jpg"),
  "Economia": require("@/assets/images/banners/economy-banner.jpg"),
  "Outro": require("@/assets/images/banners/other-banner.jpg"),
}

export const findBanner = (courseCategory: string) => {
  return bannerPathsPerCategory[courseCategory] || bannerPathsPerCategory["Outro"];
}