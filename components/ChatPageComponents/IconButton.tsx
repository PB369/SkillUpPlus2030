import { FontAwesome } from "@expo/vector-icons";
import { Pressable, StyleSheet } from "react-native";

type Props = {
    onClick?: () => any,
    icon: keyof typeof FontAwesome.glyphMap,
    style?: Record<string, any>,
    iconColor?: string,
    iconSize?: number
};

export default function IconButton({ onClick, icon, style, iconColor, iconSize }: Props) {
    return (
        <Pressable onPress={() => {
            if (onClick) {
                onClick()
            }
        }} style={{ ...styles.button, ...style }}>
            <FontAwesome name={icon} size={iconSize ? iconSize : 20} color={iconColor ? iconColor : "#0D0D0D"} />
        </Pressable>
    );
}

const styles = StyleSheet.create({
    button: {
        height: 35,
        width: 35,
        borderRadius: 35,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center"
    }
});