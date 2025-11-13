
import { CourseCardType } from "@/utils/types/couseCardType"
import { Image, Pressable, Text, View } from "react-native"
import ProgressBar from "../ProgressBar/ProgressBar"

type Props = {
  onPress?: () => void,
  lastCourseCard: CourseCardType,
}

const LastCourse = ({ onPress, lastCourseCard }: Props) => {
  return (
    <Pressable onPress={onPress}>
      <View className="w-full bg-[#14b8a6] rounded-md p-4 my-4 flex-col justify-center items-center border">
        <View className="flex-row w-full">
          <Image source={require('@/assets/images/banners/other-banner.jpg')} style={{width:100, height:100, marginRight:10, borderWidth: 1, borderRadius: 5}}/>
          <View className="flex-col flex-1 justify-center items-start">
            <Text className="text-black text-xl font-semibold">{lastCourseCard.courseName}</Text>
            <Text className="text-black text-md my-1">{lastCourseCard.description}</Text>
            <Text className="text-black text-base font-bold">{lastCourseCard.duration} - {lastCourseCard.difficultyLevel}</Text>
          </View>
        </View>
        <View className="flex-col justify-center items-center">
          <Text className="text-black font-semibold self-end mb-1">{lastCourseCard.progressPercentage}%</Text>
          <ProgressBar bgOfBackBar="#ffffff" bgOfFrontBar="#000000" progressPercentage={lastCourseCard.progressPercentage} borderRadius={6} height={3} widthInPercentage={100}/>
        </View>
      </View>
    </Pressable>
  )
}

export default LastCourse