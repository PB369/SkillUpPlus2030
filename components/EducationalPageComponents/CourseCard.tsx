import ProgressBar from "@/components/ProgressBar/ProgressBar"
import { findBanner } from "@/utils/courseBannerMapper"
import { CourseCardType } from "@/utils/types/couseCardType"
import { Image, Pressable, Text, View } from "react-native"

type Props = {
  cardIndex: number,
  card: CourseCardType,
  onPress?: ()=>void,
}

const CourseCard = ({ cardIndex, card, onPress }: Props) => {

  return (
    <Pressable onPress={onPress}>
      <View className="flex-col bg-[#14b8a6] rounded-md border w-full p-4 mb-3" key={cardIndex}>
        <View className="flex-row justify-start items-center mb-4">
          <Image
            source={findBanner(card.category)}
            style={{width:45, height:45, marginRight:15, borderWidth: 1, borderRadius: 5}}
          />
          <View className="flex-1">
            <Text className="text-black font-medium text-lg">{card.courseName}</Text>
            <Text className="text-black text-base font-medium">{card.duration} - {card.difficultyLevel}</Text>
          </View>
          <Text className="text-black self-end font-medium">{card.progressPercentage}%</Text>
        </View>
        <ProgressBar progressPercentage={card.progressPercentage} bgOfBackBar="#ffffff" bgOfFrontBar="#000000" borderRadius={6} height={3} widthInPercentage={100}/>
      </View>
    </Pressable>
  )
}

export default CourseCard