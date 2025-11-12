import { Stack } from "expo-router";

export default function EducationLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="[courseId]/content/index" />
      <Stack.Screen name="[courseId]/content/lesson" />
      <Stack.Screen name="[courseId]/overview" />
      <Stack.Screen name="[courseId]/quiz/index" />
      <Stack.Screen name="[courseId]/quiz/quizContent" />
      <Stack.Screen name="[courseId]/quiz/quizResult" />
    </Stack>
  );
}