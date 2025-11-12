import { AuthProvider } from "@/context/AuthContext";
import { UserProvider } from "@/context/UserContext";
import { Slot } from "expo-router";

export default function RootLayout() {
  return (
    <UserProvider>
      <AuthProvider>
        <Slot/>
      </AuthProvider>
    </UserProvider>
  );
}