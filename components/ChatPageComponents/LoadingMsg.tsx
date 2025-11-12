import '@/global.css';
import { useEffect, useState } from "react";
import { Text } from "react-native";

const LoadingMessage = () => {
  const [dots, setDots] = useState(".");

  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prev => (prev.length === 3 ? "." : prev + "."));
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return <Text className="text-xl text-black font-semibold">{dots}</Text>;
};

export default LoadingMessage;