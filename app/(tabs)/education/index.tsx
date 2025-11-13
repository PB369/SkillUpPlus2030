import CourseCard from "@/components/EducationalPageComponents/CourseCard";
import CoursesFilters from "@/components/EducationalPageComponents/CoursesFilters";
import LastCourse from "@/components/EducationalPageComponents/LastCourse";
import { useUser } from "@/context/UserContext";
import { CourseCardType } from "@/utils/types/couseCardType";
import { useRouter } from "expo-router";
import { useState } from "react";
import { ScrollView, Text, View } from "react-native";

export default function Education() {
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);
  const { user } = useUser();
  const coursesList = user?.educationalCourses || [];
  const isCourseListEmpty = coursesList.length === 0;

  const router = useRouter();

  const courseCards: CourseCardType[] = !isCourseListEmpty
    ? coursesList.map(course => ({
        courseId: course.courseId,
        courseName: course.courseName,
        category: course.category,
        duration: course.duration,
        difficultyLevel: course.difficultyLevel,
        description: course.description,
        progressPercentage: course.progressPercentage,
        isLastAccessed: course.isLastAccessed,
        hasBeenStarted: course.hasBeenStarted,
      }))
    : [];

  const lastCourseCard: CourseCardType =
    courseCards.find(courseCard => courseCard.isLastAccessed) || courseCards[0];

  const filtersList: string[] = [...new Set(courseCards.map(c => c.category))];

  const filteredCourses = selectedFilter
    ? courseCards.filter(c => c.category === selectedFilter)
    : courseCards;

  const courseOverviewPath = `/(tabs)/education/[courseId]/overview`;
  const courseContentPath = `/(tabs)/education/[courseId]/content`;

  return (
    <View className="flex-1 bg-white justify-center items-center">
      {isCourseListEmpty ? (
        <View className="flex-1 justify-center items-center w-11/12">
          <Text className="text-black opacity-70 text-center font-bold text-xl">
            Nenhum curso criado.
          </Text>
          <Text className="text-black opacity-70 text-center font-bold text-xl mt-2">
            Peça ao seu assistente de IA para gerar um e comece a aprender!
          </Text>
        </View>
      ) : (
        <>
          <View className="w-11/12">
            <Text className="text-black text-2xl font-bold mt-6">Último Curso</Text>
            <LastCourse
              lastCourseCard={lastCourseCard}
              onPress={() =>
                router.push({
                  pathname: lastCourseCard.hasBeenStarted
                    ? courseContentPath
                    : courseOverviewPath,
                  params: { courseId: lastCourseCard.courseId.toString() },
                })
              }
            />

            <Text className="text-black text-2xl font-semibold mt-6">Catálogo</Text>
            <CoursesFilters filtersList={filtersList} onFilterSelect={setSelectedFilter} />
          </View>

          <ScrollView
            contentContainerStyle={{ paddingVertical: 20, alignItems: "center" }}
            className="flex-1 w-11/12"
          >
            {filteredCourses.length > 0 ? (
              filteredCourses.map((card, index) => (
                <CourseCard
                  key={index}
                  card={card}
                  cardIndex={index}
                  onPress={() =>
                    router.push({
                      pathname: lastCourseCard.hasBeenStarted
                        ? courseContentPath
                        : courseOverviewPath,
                      params: { courseId: card.courseId.toString() },
                    })
                  }
                />
              ))
            ) : (
              <Text className="text-black font-semibold text-lg text-center mt-4">
                Nenhum curso encontrado para este catálogo.
              </Text>
            )}
          </ScrollView>
        </>
      )}
    </View>
  );
}