import { Pressable, StyleSheet, Text } from "react-native";

type Props = {
    text: string,
    style?: Record<string, any>,
    onClick?: () => any
};

export default function TextButton({ text, style, onClick }: Props) {
    return (
        <Pressable onPress={() => {
            if (onClick) {
                onClick();
            }
        }} style={{...styles.button, ...style}}>
            <Text style={styles.text}>{text}</Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: "#3C3C3C",
        height: 35,
        borderRadius: 35,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center"
    },
    text: {
        color: "#F0F0F0",
    }
});