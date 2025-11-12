import { StyleSheet, View } from "react-native";
import IconButton from "./IconButton";

export default function Header() {
    return (
        <View style={styles.header}>
            <IconButton icon="bars" iconColor={"#F0F0F0"} iconSize={25} />
            <IconButton icon="search" iconColor={"#F0F0F0"} iconSize={25} />
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        marginTop: 20,
        height: 40,
        width: "100%",
        backgroundColor: "#0D0D0D",
        flexDirection: "row-reverse",
        alignItems: "center"
    }
});