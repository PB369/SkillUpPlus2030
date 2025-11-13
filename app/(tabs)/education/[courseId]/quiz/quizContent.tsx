import { useUser } from "@/context/UserContext";
import { EducationalCourseQuizType } from "@/utils/types/educationalCourseType";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import { Pressable, Text, View } from "react-native";

export default function QuizContent() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [answers, setAnswers] = useState<number[]>([]);
  const router = useRouter();
  const { user } = useUser();
  const { courseId } = useLocalSearchParams();

  const course = user!.educationalCourses?.find(
    (c) => c.courseId === Number(courseId)
  );

  const quiz = course?.quiz || [];

  const questions: EducationalCourseQuizType[] = quiz.map((question) => ({
    ...question,
  }));

  const currentQuestion = questions[currentIndex];

  const handleNext = () => {
    if (selectedOption === null) return;

    const updatedAnswers = [...answers];
    updatedAnswers[currentIndex] = selectedOption;
    setAnswers(updatedAnswers);

    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setSelectedOption(answers[currentIndex + 1] ?? null);
    } else {
      const correctAnswers = updatedAnswers.filter(
        (a, i) => a === questions[i].correct
      ).length;

      router.replace({
        pathname: "/(tabs)/education/[courseId]/quiz/quizResult",
        params: {
          courseId: courseId.toString(),
          correctAnswers: correctAnswers.toString(),
          totalQuestions: questions.length.toString(),
          answers: JSON.stringify(updatedAnswers),
          questions: JSON.stringify(questions),
        },
      });
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setSelectedOption(answers[currentIndex - 1] ?? null);
    }
  };

  return (
    <View className="flex-1 bg-white justify-between items-center px-6 py-8">
      <View className="w-full">
        <View className="flex-row justify-between items-center w-full mb-3">
          <Text className="text-black font-medium text-lg text-right">
            Pergunta {currentIndex + 1}/{questions.length}
          </Text>
          <Pressable onPress={() => router.push(`/(tabs)/education/${courseId}/content`)}>
            <Ionicons name="close-circle" size={40} color="#ff0707" />
          </Pressable>
        </View>

        <Text className="text-black text-2xl font-bold mb-6">
          {currentQuestion.question}
        </Text>

        {currentQuestion.options.map((option, index) => (
          <Pressable
            key={index}
            onPress={() => setSelectedOption(index)}
            className={`w-full p-4 my-2 rounded-md border ${
              selectedOption === index
                ? "bg-[#14b8a6] border-black"
                : "border-black"
            }`}
          >
            <Text
              className={`text-lg ${
                selectedOption === index
                  ? "text-black font-medium"
                  : "text-black font-medium"
              }`}
            >
              {option}
            </Text>
          </Pressable>
        ))}
      </View>

      <View className="flex-row justify-between w-full mt-8">
        <Pressable
          className={`px-6 py-3 rounded-md ${
            currentIndex === 0 ? "bg-neutral-400" : "bg-neutral-300"
          }`}
          disabled={currentIndex === 0}
          onPress={handlePrevious}
        >
          <Text className={`${currentIndex === 0 ? "text-neutral-300" : "text-black"} text-lg`}>Voltar</Text>
        </Pressable>

        <Pressable
          className={`px-6 py-3 rounded-md ${
            selectedOption === null ? "bg-neutral-400" : "bg-[#14b8a6]"
          }`}
          disabled={selectedOption === null}
          onPress={handleNext}
        >
          <Text className="text-black text-lg font-semibold">
            {currentIndex === questions.length - 1 ? "Finalizar" : "Próxima"}
          </Text>
        </Pressable>
      </View>
    </View>
  );
}