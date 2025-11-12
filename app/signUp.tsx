import { useAuth } from "@/context/AuthContext";
import '@/global.css';
import { useRouter } from "expo-router";
import { useState } from "react";
import { ActivityIndicator, Pressable, Text, TextInput, View } from "react-native";

export default function SignUp() {
  const { signUp } = useAuth();
  const router = useRouter();

  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

  const [showErrorMessage, setShowErrorMessage] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isLoadingSignUp, setIsLoadingSignUp] = useState<boolean>(false);

  const handleRegister = () => {
    setShowErrorMessage(false);
    setIsLoadingSignUp(true);

    if(username.length === 0 || email.length === 0 || password.length === 0 || confirmPassword.length === 0){
      setErrorMessage('Preencha todos os campos para criar sua conta!');
      setShowErrorMessage(true);
    } else {
      if(password.length < 6){
        setErrorMessage('A senha deve ter ao menos 6 caracteres.');
        setShowErrorMessage(true);
      } else if(!emailRegex.test(email)){
        setErrorMessage('Formato de email inválido');
        setShowErrorMessage(true);
      } else {
        if(password === confirmPassword) {
          signUp(username, email, password);
          router.replace('/signIn');
        } else {
          setErrorMessage('Os campos de senha não são iguais');
          setShowErrorMessage(true);
        }
      }
    }
    setIsLoadingSignUp(false);
  }

  return (
    <View className="flex-1 justify-center items-center bg-teal-500 w-full">
      <View className="w-4/5 justify-center items-center">
        <View className="flex flex-row justify-center items-center w-11/12 mb-10">
          {/* <Image source={require('@/assets/images/logos/investyou-logo.png')} style={{width:'50%'}} resizeMode="contain"/> */}
        </View>
        <Text className="text-black text-2xl font-semibold">Crie sua conta!</Text>
        <TextInput onChangeText={setUsername} value={username} placeholder="Nome" textContentType="name" 
          className="py-2 px-2 my-4 bg-white text-black text-base  rounded-md w-full placeholder:text-black"
        />
        <TextInput onChangeText={setEmail} value={email} placeholder="Email" textContentType="emailAddress"
          className="py-2 px-2 mb-4 bg-white text-black text-base  rounded-md w-full placeholder:text-black"
        />
        <TextInput onChangeText={setConfirmPassword} value={confirmPassword} secureTextEntry placeholder="Senha" textContentType="password"
          className="py-2 px-2 mb-4 bg-white text-black text-base  rounded-md w-full placeholder:text-black" 
        />
        <TextInput onChangeText={setPassword} value={password} secureTextEntry placeholder="Confirmar senha" textContentType="password"
          className="py-2 px-2 mb-8 bg-white text-black text-base  rounded-md w-full placeholder:text-black"
        />
        <Pressable onPress={handleRegister} className="bg-black py-2 mb-4 w-full rounded-md">
          {isLoadingSignUp ? 
            <ActivityIndicator size={21} color="#000000" /> 
            : 
            <Text className="text-white text-center text-base font-semibold">Criar minha conta</Text>
          }
        </Pressable>
        <Pressable onPress={()=>router.replace('/signIn')} className="bg-transparent py-2 mb-4 w-full rounded-md">
          <Text className="text-center text-base font-semibold text-black underline">Já tenho uma conta</Text>
        </Pressable>
      </View>
      {showErrorMessage && (
            <Text className="text-black font-semibold">{errorMessage}</Text>
        )}
    </View>
  );
}