import { YourSkills } from '@/components/DashboardPageComponents/YourSkills';
import '@/global.css';
import { ScrollView, Text } from "react-native";

export default function Index() {
  return (
    <ScrollView contentContainerStyle={{justifyContent: 'center', alignItems: 'center'}} className='w-full'>
      <Text className='text-center text-2xl font-semiboldborder'>Dashboard</Text>
      <YourSkills/>
    </ScrollView>
  );
}

