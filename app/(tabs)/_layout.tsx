import PageHeader from "@/components/PageHeader/PageHeader";
import { useAuth } from "@/context/AuthContext";
import '@/global.css';
import { FontAwesome5 } from "@expo/vector-icons";
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Redirect, Tabs, usePathname } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

export default function TabsLayout() {
  const { user } = useAuth();
  const pathname = usePathname();

  const havePathCondition =
    pathname === "/" || pathname === "/ia-chat" || pathname === "/education";

  const [showEducationBadge, setShowEducationBadge] = useState(false);

  const prevEducationCount = useRef(0);

  useEffect(() => {
    if (!user) return;

    const newEducationCount = user.educationalCourses?.length ?? 0;

    if (newEducationCount > prevEducationCount.current) {
      setShowEducationBadge(true);
    }

    prevEducationCount.current = newEducationCount;
  }, [user?.educationalCourses]);

  useEffect(() => {
    if (pathname === "/education") setShowEducationBadge(false);
  }, [pathname]);

  if (!user) {
    return <Redirect href="/signIn" />;
  }

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#000000",
        tabBarInactiveTintColor: "#f0f0f0",
        tabBarStyle: styles.tabs,
        headerStyle: styles.header,
        headerTitle: () => <PageHeader />,
        headerTitleAlign: "left",
        headerShown: havePathCondition,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesome6 name="house" size={20} color={color} />
          ),
          tabBarLabel: ({ focused, color }) => (
            <View style={{ alignItems: "center" }}>
              <Text style={{ color, fontSize: 12 }}>Início</Text>
              {focused && <View style={styles.underline} />}
            </View>
          ),
        }}
      />

      <Tabs.Screen
        name="ia-chat"
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="chat" size={24} color={color} />
          ),
          tabBarLabel: ({ focused, color }) => (
            <View style={{ alignItems: "center" }}>
              <Text style={{ color, fontSize: 12 }}>Assistente</Text>
              {focused && <View style={styles.underline} />}
            </View>
          ),
        }}
      />

      <Tabs.Screen
        name="education"
        options={{
          tabBarIcon: ({ color }) => (
            <View>
              <FontAwesome5 name="book" size={20} color={color} />
              {showEducationBadge && <View style={styles.badge} />}
            </View>
          ),
          tabBarLabel: ({ focused, color }) => (
            <View style={{ alignItems: "center" }}>
              <Text style={{ color, fontSize: 12 }}>Educação</Text>
              {focused && <View style={styles.underline} />}
            </View>
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabs: {
    backgroundColor: "#14b8a6",
    height: 90,
    paddingTop: 5,
    borderTopWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  header: {
    backgroundColor: "#14b8a6",
    height: 90,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  underline: {
    height: 1,
    width: 30,
    backgroundColor: "#000000",
    marginTop: 2,
    borderRadius: 1,
  },
  badge: {
    position: "absolute",
    top: -4,
    right: -6,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "red",
  },
});