import { useRouter } from 'expo-router';
import { Pressable, Text, View } from 'react-native';

export default function NotFoundScreen() {
  const router = useRouter();

  return (
    <>
      <View className='flex-1 justify-center items-center bg-black'>
        <Text className='text-white text-2xl font-semibold mb-4'>Esta página não existe.</Text>
        <Pressable 
          onPress={()=>router.push('/(tabs)')}
          className='bg-yellow-400 my-2 py-2 px-4 rounded-md'
        >
          <Text className='font-medium text-lg'>Retornar para Início</Text>
        </Pressable>
      </View>
    </>
  );
}