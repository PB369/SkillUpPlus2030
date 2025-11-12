import { useAuth } from '@/context/AuthContext';
import { useUser } from '@/context/UserContext';
import '@/global.css';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Pressable, Text, View } from 'react-native';

const PageHeader = () => {
  const { user } = useUser();
  const { signOutUser } = useAuth();

  return (
    <View className='flex flex-row justify-between items-center w-full px-2'>
      <View className="flex-row justify-center items-center">
        <FontAwesome5 name="user-circle" size={30} color="black" />
        <Text className='text-black text-2xl font-semibold ml-2'>{user ? user.username : 'null'}</Text>
      </View>
      <Pressable onPress={async ()=>await signOutUser()}>
        <MaterialIcons name="logout" size={35} color="black" />
      </Pressable>
    </View>
  );
}

export default PageHeader;