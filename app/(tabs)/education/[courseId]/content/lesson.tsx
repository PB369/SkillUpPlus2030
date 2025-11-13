import { useUser } from "@/context/UserContext";
import { Feather } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";

export default function CourseLesson() {
  const { courseId, moduleIndex, lessonIndex } = useLocalSearchParams<{
    courseId: string;
    moduleIndex: string;
    lessonIndex: string;
  }>();
  
  const { user, setUser} = useUser();

  const router = useRouter();

  const course = user!.educationalCourses?.find(
    (c) => c.courseId === Number(courseId)
  );

  const [currentModuleIndex, setCurrentModuleIndex] = useState(Number(moduleIndex));
  const [currentLessonIndex, setCurrentLessonIndex] = useState(Number(lessonIndex));
  
  const module = course!.modules[currentModuleIndex];
  const lesson = module.lessons[currentLessonIndex];
  const paragraphs = lesson.content.split(/\n\s*\n/);
  const isFirstLesson = currentModuleIndex === 0 && currentLessonIndex === 0;

  const isLastLesson =
  currentModuleIndex === course!.modules.length - 1 &&
  currentLessonIndex === module.lessons.length - 1;

  const goNext = () => {
    let currentLessonStatus = course!.modules[currentModuleIndex].lessons[currentLessonIndex].isFinished;

    if(currentLessonStatus === false) {
      course!.modules[currentModuleIndex].lessons[currentLessonIndex].isFinished = true;

      const totalLessons = course!.modules.reduce(
        (acc, mod) => acc + mod.lessons.length,
        0
      );
      const finishedLessons = course!.modules.reduce(
        (acc, mod) => acc + mod.lessons.filter(lesson => lesson.isFinished).length,
        0
      );
      course!.progressPercentage = Math.round((finishedLessons / totalLessons) * 100);
  
      const updatedCourses = user!.educationalCourses!.map(c =>
        c.courseId === course!.courseId ? course! : c
      );
      setUser({ ...user!, educationalCourses: updatedCourses });
    }

    if (currentLessonIndex < module.lessons.length - 1) {
      setCurrentLessonIndex(currentLessonIndex + 1);
    } else if (currentModuleIndex < course!.modules.length - 1) {
      setCurrentModuleIndex(currentModuleIndex + 1);
      setCurrentLessonIndex(0);
    } else {
      router.push({
        pathname: "/(tabs)/education/[courseId]/quiz",
        params: { courseId },
      });
    }
  };

  const goBack = () => {
    if (currentLessonIndex > 0) {
      setCurrentLessonIndex(currentLessonIndex - 1);
    } else if (currentModuleIndex > 0) {
      const prevModule = course!.modules[currentModuleIndex - 1];
      setCurrentModuleIndex(currentModuleIndex - 1);
      setCurrentLessonIndex(prevModule.lessons.length - 1);
    } else {
      router.back();
    }
  };

  return (
    <View className="flex-1 bg-white justify-between">
      <ScrollView
        className="flex-1 w-full py-6"
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: "flex-start",
          alignItems: "center",
          paddingBottom: 20,
        }}
      >
        <View className="flex-col justify-center items-center w-11/12">
          <Pressable onPress={() => router.replace(`/(tabs)/education/${courseId}/content`)} className="self-start w-1/4 py-2 ">
            <Feather name="arrow-left" size={28} color="black" />
          </Pressable>
          <Text className="text-black text-2xl font-bold mb-4 text-center">
            {currentModuleIndex + 1}. {module.moduleName}
          </Text>
          <Text className="text-black text-xl mb-6 text-center font-medium">
            {lesson.lessonName}
          </Text>
        </View>

        <View className="flex-col justify-center items-center w-11/12">
          {paragraphs.map((p, index) => (
            <Text
              key={index}
              className="text-black text-lg text-justify flex-1 mb-5 font-medium"
            >
              {p.trim()}
            </Text>
          ))}
        </View>
      </ScrollView>

      <View className="flex-row w-full justify-around my-6">
        <Pressable
          onPress={goBack}
          disabled={isFirstLesson}
          className={`py-2 px-6 rounded-md ${
            isFirstLesson ? "bg-neutral-400" : "bg-neutral-300"
          }`}
        >
          <Text className={`${isFirstLesson ? "text-neutral-300" : "text-black"} text-lg`}>Voltar</Text>
        </Pressable>

        <Pressable
          onPress={goNext}
          className="py-2 px-6 bg-[#14b8a6] rounded-md"
        >
          <Text className="text-black text-lg font-semibold">
            {isLastLesson ? "Finalizar" : "Próximo"}
          </Text>
        </Pressable>
      </View>
    </View>
  )
}