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
        backgroundColor: "#14b8a6",
        height: 35,
        borderRadius: 10,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center"
    },
    text: {
        color: "#000",
        fontWeight: 500,
    }
});