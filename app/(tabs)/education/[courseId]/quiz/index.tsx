import { useLocalSearchParams, useRouter } from "expo-router";
import { Image, Pressable, Text, View } from "react-native";

export default function InitialScreenOfQuiz() {
  const router = useRouter();
  const { courseId } = useLocalSearchParams();

  return (
    <View className="flex-1 justify-between items-center bg-white w-full py-10">
      <View className="w-4/5 justify-center items-center mt-10">
        <Text className="text-black font-bold text-center" style={{ fontSize: 36 }}>
          Prepare-se para o quiz
        </Text>
        <Text className="text-black text-lg font-medium text-center mt-4 mb-14">
          Teste seus conhecimentos respondendo algumas questões e finalize esta jornada de aprendizado.
        </Text>
        <Image
          source={require("@/assets/images/quiz-images/initial-image.jpg")}
          style={{ width: 340, height: 270, borderWidth: 1, borderRadius: 10 }}
        />
      </View>

      <View className="w-full items-center">
        <Pressable
          className="bg-[#14b8a6] my-2 py-4 w-[75%] rounded-md"
          onPress={() =>
            router.replace({
              pathname: "/(tabs)/education/[courseId]/quiz/quizContent",
              params: { courseId: courseId.toString() }
            })
          }
        >
          <Text className="text-center text-lg font-semibold">Iniciar</Text>
        </Pressable>

        <Pressable
          className="my-2"
          onPress={() =>
            router.back()
          }
        >
          <Text className="text-white text-center text-lg font-semibold">Voltar</Text>
        </Pressable>
      </View>
    </View>
  );
}