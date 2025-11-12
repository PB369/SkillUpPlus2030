import React from "react";
import { StyleSheet, TextInput, View } from "react-native";
import IconButton from "./IconButton";

type Props = {
  value?: string;
  onChangeText?: (text: string) => void;
  onSubmit?: () => void;
};

export default function ChatTextField({ value = "", onChangeText, onSubmit }: Props): React.JSX.Element {
  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Pergunte alguma coisa"
        placeholderTextColor='#b1b1b1'
        style={styles.textInput}
        onChangeText={onChangeText}
        value={value}
      />
      <IconButton icon="arrow-right" style={{ backgroundColor: "#FFCE00" }} onClick={() => {
        if (onSubmit) {
          onSubmit();
        }
      }} />
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1E1E1E",
    borderRadius: 32,
    paddingHorizontal: 10,
    paddingVertical: 6,
    marginBottom: 10, 
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 6,
    paddingHorizontal: 12,
    color: "#F0F0F0",
    maxHeight: 120,
  },
});