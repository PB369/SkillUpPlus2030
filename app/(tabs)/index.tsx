import { YourSkills } from '@/components/DashboardPageComponents/YourSkills';
import LastCourse from '@/components/EducationalPageComponents/LastCourse';
import { useUser } from '@/context/UserContext';
import '@/global.css';
import { getUser } from '@/services/userService';
import { CourseCardType } from '@/utils/types/couseCardType';
import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import { ScrollView, Text, View } from "react-native";

export default function Index() {
  const { user, setUser } = useUser();
  const coursesList = user?.educationalCourses || [];
  const isCourseListEmpty = coursesList.length === 0;

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

  const courseOverviewPath = `/(tabs)/education/[courseId]/overview`;
  const courseContentPath = `/(tabs)/education/[courseId]/content`;

  const router = useRouter();

  useEffect(() => {
  if (user) {
    getUser(user.id).then(freshUser => {
      if (freshUser) setUser(freshUser);
    });
  }
}, []);

  return (
    <ScrollView contentContainerStyle={{justifyContent: 'center', alignItems: 'center'}} className='w-full'>
      <Text className='text-center text-2xl font-semibold mt-6'>Dashboard</Text>
      <View className='w-11/12 flex-col'>
        <Text className='text-black text-xl font-bold mt-5 mb-3'>Suas Habilidades</Text>
        <YourSkills/>
      </View>
      <View className='w-11/12 flex-col'>
        <Text className='text-black text-xl font-bold mt-5 mb-3'>Seu Último Curso</Text>
        {isCourseListEmpty ?
          (<Text className='text-lg'>Nenhum curso em andamento. Peça para seu assistente criar um novo 😉</Text>)
          :
          (
            <LastCourse
              lastCourseCard={lastCourseCard}
              onPress={() =>
                router.push({
                  pathname: lastCourseCard.hasBeenStarted
                    ? courseContentPath
                    : courseOverviewPath,
                  params: { courseId: lastCourseCard.courseId },
                })
              }
            />
          )
        }
      </View>
      <View className='w-11/12 flex-col'>
        <Text className='text-black text-xl font-bold mt-5 mb-3'>Status da sua Jornada</Text>
        <Text className='text-black text-lg font-medium mb-1'>- Cursos Realizados: {user?.userJourney.amountFinishedCourses} ✔️</Text>
        <Text className='text-black text-lg font-medium mb-1'>- User Points Conquistados: {user?.userJourney.userPoints} 🚀</Text>
        <Text className='text-black text-lg font-medium mb-1'>- Acessos Sequênciais: {user?.userJourney.amountStreakDays} 🔥</Text>
        <Text className='text-black text-lg font-medium mb-1'>- Dias Acessados: {user?.userJourney.amountTotalAccessDays} 📅</Text>
        <Text className='text-black text-lg font-medium mb-1'>- Interações com o Assistente: {user?.userJourney.amountChatMessages} 💬</Text>
      </View>
    </ScrollView>
  );
}