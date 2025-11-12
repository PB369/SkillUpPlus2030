import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Pressable, StyleSheet, TextInput, View } from "react-native";

type Props = {
  value?: string;
  onChangeText?: (text: string) => void;
  onSubmit?: () => void;
};

export default function ChatTextField({ value = "", onChangeText, onSubmit }: Props): React.JSX.Element {
  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Pergunte alguma coisa..."
        placeholderTextColor='#0a0a0a'
        style={styles.textInput}
        onChangeText={onChangeText}
        value={value}
      />
      <Pressable onPress={onSubmit}>
        <Ionicons name="send" size={26} color="black" />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderWidth: 2,
    borderRadius: 15,
    paddingHorizontal: 10,
    paddingVertical: 6,
    marginBottom: 10, 
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 6,
    paddingHorizontal: 12,
    color: "#000",
    maxHeight: 120,
  },
});