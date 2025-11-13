import { useUser } from '@/context/UserContext';
import { findBanner } from '@/utils/courseBannerMapper';
import { Feather } from '@expo/vector-icons';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useLocalSearchParams, useRouter } from "expo-router";
import { Image, Pressable, ScrollView, Text, View } from "react-native";

export default function EducationalCourse() {
  const { courseId } = useLocalSearchParams();
  const router = useRouter();
  const { user, setUser } = useUser();

  const course = user!.educationalCourses?.find(
    (c) => c.courseId === Number(courseId)
  );
  
  if(!course){return (
    <ScrollView className="flex-1 bg-white w-full py-6" contentContainerStyle={{justifyContent:'center', alignItems:'center'}}>
      <View className="flex-col justify-center items-center w-11/12 flex-1">
        <Text className="text-black opacity-70 text-center font-bold text-xl">Curso não encontrado.</Text>
      </View>
    </ScrollView>
  )}

  const handleStartCourse = () => {
    if (!user) return;

    const updatedCourses = user.educationalCourses?.map(c => {
      if (c.courseId === course.courseId) {
        return { ...c, hasBeenStarted: true };
      }
      return c;
    }) || [];

    setUser({ ...user, educationalCourses: updatedCourses });

    router.push({
      pathname: "/(tabs)/education/[courseId]/content",
      params: { 
        courseId: course.courseId,
      }
    });
  };

  
  return (
    <ScrollView className="flex-1 bg-white w-full py-6" contentContainerStyle={{justifyContent:'center', alignItems:'center'}}>
      <View className="flex-col justify-center items-center w-full">
        <Image source={findBanner(course.category)} style={{width: "100%", height: 200}}/>
        <Pressable onPress={()=>router.push('/(tabs)/education')} className="absolute top-2 right-2">
          <Ionicons name="close-circle" size={40} color="#ff0707" />
        </Pressable>
        <View className="flex-col justify-center items-start px-6 mt-6 w-full border-t pt-4">
          <Text className="text-black text-2xl font-bold">{course.courseName}</Text>
          <Text className="text-neutral-600 mt-1 mb-4 font-medium">{course.duration} - {course.difficultyLevel}</Text>
          <Text className="text-black text-lg text-justify">{course.description}</Text>
        </View>
      </View>
      <Pressable className="bg-[#14b8a6] w-11/12 mt-5 py-2 rounded-md" onPress={handleStartCourse}>
        <Text className="text-xl font-semibold text-center text-black">Comece agora</Text>
      </Pressable>
      <View className="w-11/12 my-10">
        <Text className="text-black font-bold text-2xl w-full mb-5">O que você aprenderá?</Text>
        <View className="flex-col justify-center items-center border border-black w-full p-5 rounded-md">
          {course.whatWillLearn.map((item, index)=>(
            <View key={index} className="flex-row w-full justify-center items-center my-2">
              <Feather name="check" size={20} color="black" />
              <Text className="text-black flex-1 text-justify ml-3 text-base font-medium">{item}</Text>
            </View>
          ))}
        </View>
      </View>

      <View className="flex-col justify-center items-center w-11/12 mb-20">
        <Text className="text-black font-bold text-2xl self-start">Estrutura do Curso</Text>
        <View className="bg-white border p-6 mt-4 rounded-md relative">
          {course.modules.map((module, index) => (
            <View key={index} className="flex-row items-start w-full relative my-3">
              <View className="items-center">
                <View 
                  className={`border-2 border-[#14b8a6] w-12 h-12 justify-center items-center rounded-full ${index === 0 && "bg-[#14b8a6]"}`}
                >
                  <Text 
                    className={`font-bold text-2xl ${index === 0 ? "text-black" : "text-black"}`}
                  >
                    {index + 1}
                  </Text>
                </View>

                <View
                  className={`w-[2px] bg-black flex-1 my-5 mb-1 ${index === course.modules.length - 1 ? "opacity-100" : ""}`} style={{ height: 40 }}
                />
              </View>

              <View className="flex-1 ml-5">
                <Text className="text-black font-bold text-xl">{module.moduleName}</Text>
                <Text className="text-black text-base font-medium">{module.moduleDescription}</Text>
              </View>
            </View>
          ))}

          <View className="flex-row items-start w-full relative my-3">
            <View className="items-center">
              <View className="border-2 border-[#14b8a6] w-12 h-12 justify-center items-center rounded-full mt-1">
                <Text className="font-bold text-2xl text-black">{course.modules.length + 1}</Text>
              </View>
            </View>
            <View className="flex-1 ml-5">
              <Text className="text-black font-bold text-xl">Quiz</Text>
              <Text className="text-black text-base font-medium">Teste seu conhecimento e conclua esta jornada de aprendizado!</Text>
            </View>
          </View>
        </View>
      </View>

    </ScrollView>
  );
}