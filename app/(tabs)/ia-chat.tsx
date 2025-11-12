import Chat from '@/components/ChatPageComponents/Chat';
import ChatTextField from '@/components/ChatPageComponents/ChatTextField';
import TextButton from '@/components/ChatPageComponents/TextButton';
import { useUser } from '@/context/UserContext';
import '@/global.css';
import { contentGenerationPrompt } from '@/utils/contentGenerationPrompt';
import { GEMINI_API_KEY } from '@/utils/geminiKey';
import { EducationalCourseType } from '@/utils/types/educationalCourseType';
import { MessageType } from '@/utils/types/messagesType';
import { GoogleGenAI } from "@google/genai";
import { useState } from 'react';
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  View
} from "react-native";

export default function IAChat() {
  const [textValue, setTextValue] = useState("");
  const [isResponseLoading, setIsResponseLoading] = useState(false);
  const { user, changeUserProperty, setUser } = useUser();

  const sugestionValues: string[] = ["Explique o que é um ativo financeiro", "Crie uma nova carteira de investimentos", "Liste os ativos que estão rendendo mais", "Crie um curso de iniciantes sobre Renda Fixa"];

  const verticalSugestions: string[] = ["Ativos com meu perfil", "Notícias recentes"];

  const [messages, setMessages] = useState<MessageType[]>([{
    role: "model",
    content: contentGenerationPrompt(user),
  }]);

  const [chat, setChat] = useState<MessageType[]>([]);

  const addEducationalCourse = (educationalCourse: EducationalCourseType) => {
    if(!user) return;
    const updatedEducationalCourses = [...(user.educationalCourses || []), educationalCourse];
    setUser({...user, educationalCourses: updatedEducationalCourses});
  }

  const send = async () => {
    if (!textValue.trim()) return;

    try {
      const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

      const userMessage: MessageType = { role: "user", content: textValue };

      const updatedMessages = [...messages, userMessage];
      setMessages(updatedMessages);

      const updatedChat = [...chat, userMessage];
      setChat(updatedChat);
      setTextValue("");

      setIsResponseLoading(true);
      setChat(prev => [
        ...prev,
        { role: "model", content: "<loading>" }
      ]);

      const aiResponse = await ai.models.generateContent({
        model: "gemini-2.0-flash-lite",
        contents: updatedMessages.map(m => ({
          role: m.role,
          parts: [{ text: m.content }],
        })),
      });

      const responseText = aiResponse.text as string;

      let aiMessage: MessageType;

      try {
        const cleanedResponse = responseText.trim().replace(/^```json\s*/, '').replace(/```$/, '');
        const parsed = JSON.parse(cleanedResponse);
        console.log("Resposta:", parsed);

        if (parsed.action === "create_course") {
          const educationalCourse: EducationalCourseType = parsed.educationalCourse;
          addEducationalCourse(educationalCourse);

          aiMessage = {
            role: "model",
            content: `Seu mais novo curso ${educationalCourse.courseName} foi criado e está pronto para ser estudado! Acesse a página Educação para acessá-lo.`
          };
        } else if (parsed.action === "chat") {
          aiMessage = {
            role: "model",
            content: parsed.message
          };
        } else {
          aiMessage = {
            role: "model",
            content: responseText
          };
        }

      } catch {
        console.log("Parse falhou. Conteúdo: \n\n", responseText);
        aiMessage = {
          role: "model",
          content: responseText
        };
      }

      setChat(prev => {
        const withoutLoading = prev.filter(m => m.content !== "<loading>");
        return [...withoutLoading, aiMessage];
      });

      setMessages(prev => [...prev, aiMessage]);

    } catch (err) {
      console.error("Erro ao enviar mensagem para IA:", err);

      const errorMessage: MessageType = {
        role: "model",
        content: "Desculpe, estou enfrentando problemas técnicos e não consigo responder sua mensagem no momento. Tente novamente mais tarde."
      };

      setChat(prev => {
        const withoutLoading = prev.filter(m => m.content !== "<loading>");
        return [...withoutLoading, errorMessage];
      });

      setMessages(prev => [...prev, errorMessage]);
    }
  };


  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: "#0D0D0D" }}
      behavior={"padding"}
    >
        <View style={styles.contentHolder}>
          {chat.length === 0 && <View style={styles.verticalSugestions}>
            <Text style={styles.sugestionTitle}>Sobre o que você quer conversar hoje?</Text>
            {sugestionValues.map((value: string) => {
              return <TextButton
                key={value}
                text={value}
                style={styles.verticalSugestionButton}
                onClick={() => setTextValue(value)}
              />
            })}
          </View>}
          {chat.length > 0 && <Chat messages={chat} />}
          {chat.length === 0 && <View style={styles.horizontalSugestions}>
            {verticalSugestions.map((value: string) => {
              return (<TextButton key={value} text={value} style={styles.horizontalSugestionButton} onClick={() => setTextValue(value)} />);
            })}
          </View>}
          <ChatTextField value={textValue} onChangeText={setTextValue} onSubmit={send} />
        </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  horizontalSugestions: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  verticalSugestions: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    flex: 1
  },
  contentHolder: {
    flex: 1,
    backgroundColor: "#0D0D0D",
    paddingHorizontal: 10,
    paddingTop: 20,
  },
  horizontalSugestionButton: {
    marginHorizontal: 2,
    flex: 1
  },
  verticalSugestionButton: {
    marginBottom: 10,
    width: "89%"
  },
  sugestionTitle: {
    fontSize: 23,
    marginBottom: 20,
    color: "#F0F0F0",
    textAlign: "center"
  }
});