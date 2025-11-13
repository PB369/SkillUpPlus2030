import { useUser } from "@/context/UserContext";
import { EducationalCourseQuizType } from "@/utils/types/educationalCourseType";
import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { Circle } from "react-native-progress";

export default function QuizResult() {
  const { user, setUser } = useUser();
  const router = useRouter();
  const { courseId, correctAnswers, totalQuestions, answers, questions } = useLocalSearchParams();

  const correct = Number(correctAnswers) || 0;
  const total = Number(totalQuestions) || 1;
  const score = correct / total;
  const percentage = Math.round(score * 100);

  const parsedAnswers = answers ? JSON.parse(answers as string) : [];
  const parsedQuestions: EducationalCourseQuizType[] = questions
    ? JSON.parse(questions as string)
    : [];

  const learnedTopics = parsedQuestions
    .filter((q, i) => parsedAnswers[i] === q.correct)
    .map(q => q.topic);

  const reviewTopics = parsedQuestions
    .filter((q, i) => parsedAnswers[i] !== q.correct)
    .map(q => q.topic);

  const uniqueLearned = [...new Set(learnedTopics)];
  const uniqueReview = [...new Set(reviewTopics)];

  const handleFinishCourse = () => {
    if (!user) return;

    const updatedCourses = user.educationalCourses!.map(course =>
      course.courseId === Number(courseId)
        ? { ...course, isFinished: true, progressPercentage: 100 }
        : course
    );

    const updatedUser = { ...user, educationalCourses: updatedCourses };
    setUser(updatedUser);

    router.replace("/(tabs)/education");
  };

  return (
    <View className="flex-1 bg-black justify-between items-center px-6 py-10">
      <Text className="text-white text-3xl font-bold mb-6">
        Resultado do Quiz
      </Text>

      <View className="items-center mb-6 justify-center">
        <Circle
          progress={score}
          size={250}
          thickness={10}
          color="#FFCE00"
          unfilledColor="#1E1E1E"
          borderWidth={0}
        />
        <Text className="absolute top-[45%] text-white font-bold text-5xl text-center">
          {percentage}%
        </Text>
      </View>

      <View className="items-center mb-6">
        <Text className="text-white font-bold text-lg mb-2">
          {score >= 0.7 ? "Bom trabalho!" : "Continue praticando!"}
        </Text>
        <Text className="text-neutral-400 text-center text-base">
          Você acertou {correct} de {total}.{"\n"}
          {score >= 0.7
            ? "Excelente desempenho!"
            : "Reveja os conteúdos e tente novamente!"}
        </Text>
      </View>

      <View className="flex-row w-full mt-4 mb-8 justify-around">
        <View className="">
          <Text className="text-green-500 font-semibold text-lg mb-2">
            Aprendido ✓
          </Text>
          <ScrollView>
            {uniqueLearned.length > 0 ? (
              uniqueLearned.map((topic, i) => (
                <Text key={i} className="text-neutral-300 text-base mb-1">
                  • {topic}
                </Text>
              ))
            ) : (
              <Text className="text-neutral-500 text-base italic">
                Nenhum tópico aprendido ainda.
              </Text>
            )}
          </ScrollView>
        </View>

        <View className="">
          <Text className="text-red-500 font-semibold text-lg mb-2">X Revisar</Text>
          {uniqueReview.length > 0 ? (
            uniqueReview.map((topic, i) => (
              <Text key={i} className="text-neutral-300 text-base mb-1">
                • {topic}
              </Text>
            ))
          ) : (
            <Text className="text-neutral-500 text-base italic">
              Nenhum tópico a revisar!
            </Text>
          )}
        </View>
      </View>

      <Pressable
        onPress={handleFinishCourse}
        className="bg-[#FFCE00] py-4 w-full rounded-md mb-4"
      >
        <Text className="text-center text-black text-lg font-semibold">
          Concluir
        </Text>
      </Pressable>
    </View>
  );
}