import ProgressBar from "@/components/ProgressBar/ProgressBar";
import { useUser } from "@/context/UserContext";
import { findBanner } from "@/utils/courseBannerMapper";
import { Ionicons } from "@expo/vector-icons";
import AntDesign from '@expo/vector-icons/AntDesign';
import Entypo from '@expo/vector-icons/Entypo';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import { Image, Pressable, ScrollView, Text, View } from "react-native";

export default function CourseContent() {
  const {user} = useUser();
  const router = useRouter();
  const [expandedIndex, setExpandedIndex] = useState<number | undefined>(undefined);

  const { courseId } = useLocalSearchParams();
  const course = user!.educationalCourses?.find(
    (c) => c.courseId === Number(courseId)
  );

  if(!course) return null;

  const isQuizUnlocked = course.modules.every(module =>
    module.lessons.every(lesson => lesson.isFinished)
  );

  return (
    <ScrollView className="flex-1 bg-white w-full py-6" contentContainerStyle={{justifyContent:'center', alignItems:'center'}}>
      <Image 
        source={findBanner(course.category)} 
        style={{width: "100%", height: 200}}
      />
      <Pressable onPress={()=>router.push('/(tabs)/education')} className="absolute top-2 right-2">
        <Ionicons name="close-circle" size={40} color="#ff0707" />
      </Pressable>

      <View className="flex-col justify-center items-center w-full border-t pt-2">
        <Text className="text-black text-2xl font-bold w-full text-center my-4">{course.courseName}</Text>
        <View className="justify-center items-center w-full my-4">
          <ProgressBar bgOfBackBar="#ffffff" bgOfFrontBar="#000000" borderWidth={1} progressPercentage={course.progressPercentage} borderRadius={6} height={4} widthInPercentage={90}/>
          <Text className="text-black mt-3 font-semibold text-lg">{course.progressPercentage}% Concluído</Text>
        </View>
      </View>

      <View className="w-11/12 mb-8">
        <Text className="text-xl font-semibold text-black">Módulos</Text>
        <View className="w-full">
          {course.modules.map((module, moduleIndex)=>(
            <Pressable 
              key={moduleIndex} 
              className="bg-neutral-200 w-full p-5 my-2 flex-col justify-between items-center rounded-md border"
              onPress={()=>setExpandedIndex(expandedIndex === moduleIndex ? undefined : moduleIndex)}
            >
              <View className="flex-row w-full">
                <Text className="text-black font-semibold text-xl flex-1 text-ellipsis">{moduleIndex+1}. {module.moduleName}</Text>
                <MaterialIcons name="expand-more" size={24} color="black"/>
              </View>
              {expandedIndex === moduleIndex && (
                <View className="py-4 justify-center items-center w-full">
                  {module.lessons.map((lesson, lessonIndex)=>(
                    <Pressable 
                      key={lessonIndex}
                      className="flex-row w-full border p-4 my-1 justify-center items-center rounded-md"
                      onPress={() =>
                        router.push({
                          pathname: "/(tabs)/education/[courseId]/content/lesson",
                          params: {
                            courseId: course.courseId.toString(),
                            moduleIndex: moduleIndex.toString(),
                            lessonIndex: lessonIndex.toString(),
                          },
                        })}
                    >
                      <View className="flex-col flex-1 justify-center items-start">
                        <Text className="text-black text-lg font-medium">{lesson.lessonName}</Text>
                        <Text className="text-black text-lg font-normal">{lesson.lessonDuration}</Text>
                      </View>
                      {lesson.isFinished ? 
                        <AntDesign name="check-circle" size={24} color="#14b8a6" />
                        :
                        <Entypo name="circle" size={24} color="#14b8a6" />
                      }
                    </Pressable>
                  ))}
                </View>
              )}
            </Pressable>
          ))}

          <Pressable 
            className={`w-full p-5 my-2 flex-row justify-center items-center rounded-md ${isQuizUnlocked ? "bg-[#14b8a6]" : "bg-[#14685e]"}`}
            onPress={() => isQuizUnlocked && router.push({
              pathname: "/(tabs)/education/[courseId]/quiz",
              params: { courseId: course.courseId.toString() }
            })}
            disabled={!isQuizUnlocked}
          >
            {!isQuizUnlocked && (
              <Entypo name="lock" size={24} color="white" className="mr-3"/>
            )}
            <Text className={`text-center font-semibold text-xl ${isQuizUnlocked ? "text-black" : "text-white"}`}>
              Realizar Quiz
            </Text>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  )
}