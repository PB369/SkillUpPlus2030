import { MessageType } from "@/utils/types/messagesType";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import LoadingMessage from "./LoadingMsg";

type Props = {
  messages: Array<MessageType>,
};

export default function Chat({ messages }: Props) {

  // console.log(messages)
  return (
    <ScrollView
      style={styles.chat}
      contentContainerStyle={styles.contentContainer}
      keyboardShouldPersistTaps="handled"
    >
      {messages.map((message, index) => (
        <View
          key={index}
          style={message.role === "user" ? styles.messageUserRow : styles.messageAIRow}
        >
          <View style={message.role === "user" ? styles.messageUser : message.content === "<loading>" ? styles.messageAILoading :  styles.messageAI}>
            {message.content === "<loading>" && message.role === "model" ? (
              <LoadingMessage />
            ) : (
              <Text style={message.role === "user" ? styles.messageUserText : styles.messageAIText}>
                {message.content}
              </Text>
            )}
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  chat: {
    flex: 1,
    paddingHorizontal: 10,
  },
  contentContainer: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  messageUserRow: {
    width: "100%",
    flexDirection: "row-reverse",
  },
  messageUser: {
    width: "80%",
    backgroundColor: "#3C3C3C",
    borderRadius: 20,
    padding: 10,
    marginTop: 10,
  },
  messageUserText: {
    color: "#F0F0F0",
  },
  messageAIRow: {
    width: "100%",
    flexDirection: "row",
  },
  messageAI: {
    width: "80%",
    backgroundColor: "#14b8a6",
    borderRadius: 20,
    padding: 10,
    marginTop: 10,
  },
  messageAIText: {
    color: "#000",
  },
  messageAILoading: {
    width: "10%",
    backgroundColor: "#14b8a6",
    borderRadius: 20,
    padding: 10,
    marginTop: 10,
  },
});