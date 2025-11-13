import { useAuth } from "@/context/AuthContext";
import '@/global.css';
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, Pressable, Text, TextInput, View } from "react-native";

export default function SignIn() {
  const { user, signIn } = useAuth();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const router = useRouter();

  const [showErrorMessage, setShowErrorMessage] = useState<boolean>(false);
  const [isLoadingSignIn, setIsLoadingSignIn] = useState<boolean>(false);

  useEffect(() => {
  if (user?.isAuthenticated) {
    router.replace("/(tabs)");
  }
  }, [user]);

  const handleSignIn = async () => { 
    setShowErrorMessage(false);
    setIsLoadingSignIn(true);

    const loggedUser = await signIn(email, password);
    setIsLoadingSignIn(false);

    if(loggedUser){
      setShowErrorMessage(false);
      router.replace('/(tabs)');
    } else {
      setShowErrorMessage(true);
    }
  }

  return (
    <View className="flex-1 justify-center items-center bg-teal-500 w-full">
      <View className="absolute top-1/4 w-full items-center">
        <Text className="text-black font-bold italic text-2xl w-full text-center mb-2">Bem-vindo ao</Text>
        <Text className="text-black font-bold italic text-5xl w-full text-center">SkillUpPlus 2030!</Text>
      </View>
      <View className="w-4/5 justify-center items-center">
        <Text className="text-black text-2xl font-semibold">Sign In</Text>
        <TextInput onChangeText={setEmail} value={email} placeholder="Email"
          className="py-2 px-2 my-4 bg-white text-black text-base  rounded-md w-full placeholder:text-black"
        />
        <TextInput onChangeText={setPassword} value={password} placeholder="Senha" secureTextEntry
          className="py-2 px-2 mb-8 bg-white text-black text-base  rounded-md w-full placeholder:text-black"
        />
        <Pressable 
          onPress={handleSignIn} 
          className={`${isLoadingSignIn ? 'bg-black' : 'bg-black'} py-2 mb-4 w-full rounded-md`}
          disabled={isLoadingSignIn}
        >
          {isLoadingSignIn ? 
            <ActivityIndicator size={21} color="#ffffff" /> 
            : 
            <Text className="text-white text-center text-base font-semibold">Acessar</Text>
          }
        </Pressable>
        <Pressable onPress={()=>router.replace('/signUp')} className="bg-transparent py-2 mb-4 w-full rounded-md">
          <Text className="text-center text-base font-semibold text-black underline">Criar minha conta</Text>
        </Pressable>
        {showErrorMessage && (
            <Text className="text-black font-semibold">Credenciais inválidas! Tente novamente.</Text>
        )}
      </View>
      <View className="absolute bottom-8" />
    </View>
  );
}