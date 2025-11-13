import { useUser } from "@/context/UserContext";
import { UserType } from "@/utils/types/userType";
import Feather from "@expo/vector-icons/Feather";
import { Picker } from "@react-native-picker/picker";
import React, { useState } from "react";
import {
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View
} from "react-native";

type Skill = {
  skillName: string;
  level: "Básico" | "Intermediário" | "Avançado";
};

export const YourSkills = () => {
  const { user, setUser } = useUser();

  const [modalVisible, setModalVisible] = useState(false);
  const [confirmModalVisible, setConfirmModalVisible] = useState(false);
  const [currentAction, setCurrentAction] = useState<
    "add" | "edit" | "delete" | null
  >(null);

  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);
  const [skillName, setSkillName] = useState("");
  const [level, setLevel] = useState<Skill["level"]>("Básico");

  const updateUserSkills = async (updatedSkills: Skill[]) => {
    if (!user) return;
    const updatedUser: UserType = { ...user, skills: updatedSkills };
    setUser(updatedUser);
  };

  const handleEditSkill = (skill: Skill) => {
    setSelectedSkill(skill);
    setSkillName(skill.skillName);
    setLevel(skill.level);
    setCurrentAction("edit");
    setModalVisible(true);
  };

  const handleAddSkill = () => {
    setSkillName("");
    setLevel("Básico");
    setCurrentAction("add");
    setModalVisible(true);
  };

  const handleDeleteSkill = (skill: Skill) => {
    setSelectedSkill(skill);
    setCurrentAction("delete");
    setConfirmModalVisible(true);
  };

  const handleConfirmSave = () => {
    if (!user) return;

    let updatedSkills = user.skills ? [...user.skills] : [];

    if (currentAction === "add") {
      updatedSkills.push({ skillName, level });
    }

    if (currentAction === "edit" && selectedSkill) {
      updatedSkills = updatedSkills.map((s) =>
        s.skillName === selectedSkill.skillName ? { skillName, level } : s
      );
    }

    updateUserSkills(updatedSkills);
    setModalVisible(false);
    setSelectedSkill(null);
  };

  const handleConfirmDelete = () => {
    if (!user || !selectedSkill) return;
    const updatedSkills =
      user.skills?.filter((s) => s.skillName !== selectedSkill.skillName) || [];
    updateUserSkills(updatedSkills);
    setConfirmModalVisible(false);
    setSelectedSkill(null);
  };

  return (
    <View style={styles.container} className="w-full">
      <ScrollView>
        {user?.skills && user.skills.length > 0 ? (
          user.skills.map((skill) => (
            <View key={skill.skillName} className="justify-between flex-row items-center mb-2 p-4 bg-[#f8f9fa] rounded-md border">
              <View>
                <Text style={styles.skillText}>
                  {skill.skillName} - {skill.level}
                </Text>
              </View>

              <View style={styles.actions}>
                <Pressable onPress={() => handleEditSkill(skill)}>
                  <Feather name="edit" size={22} color="#007bff" />
                </Pressable>
                <Pressable onPress={() => handleDeleteSkill(skill)}>
                  <Feather
                    name="trash-2"
                    size={22}
                    color="#dc3545"
                    style={{ marginLeft: 15 }}
                  />
                </Pressable>
              </View>
            </View>
          ))
        ) : (
          <Text style={{ color: "#888", textAlign: "center" }}>
            Nenhuma habilidade cadastrada.
          </Text>
        )}
      </ScrollView>

      <Pressable style={styles.addButton} onPress={handleAddSkill}>
        <Text style={styles.addButtonText}>Adicionar Habilidade</Text>
      </Pressable>

      {/* Modal de Criação/Edição */}
      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              {currentAction === "edit" ? "Editar Habilidade" : "Nova Habilidade"}
            </Text>

            <TextInput
              placeholder="Nome da habilidade"
              value={skillName}
              onChangeText={setSkillName}
              style={styles.input}
            />

            <Picker
              selectedValue={level}
              onValueChange={(itemValue) => setLevel(itemValue)}
            >
              <Picker.Item label="Básico" value="Básico" />
              <Picker.Item label="Intermediário" value="Intermediário" />
              <Picker.Item label="Avançado" value="Avançado" />
            </Picker>

            <View className="flex-row mt-3 justify-end">
              <Pressable
                className="bg-red-600 justify-center items-center px-4 py-3 mr-4 rounded-md"
                onPress={() => setModalVisible(false)}
              >
                <Text className="text-white text-lg">Cancelar</Text>
              </Pressable>
              <Pressable
                className="bg-green-600 justify-center items-center px-4 py-3 rounded-md"
                onPress={handleConfirmSave}
                disabled={!skillName.trim()}
              >
                <Text className="text-white text-lg">Confirmar</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>

      {/* Modal de Confirmação para Deletar */}
      <Modal visible={confirmModalVisible} animationType="fade" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Confirmar Exclusão</Text>
            <Text style={{ marginVertical: 10 }}>
              Tem certeza que deseja excluir{" "}
              <Text style={{ fontWeight: "700" }}>
                {selectedSkill?.skillName}
              </Text>
              ?
            </Text>
            <View style={styles.modalButtons}>
              <Pressable
                className="bg-neutral-500 justify-center items-center px-4 py-3 mr-3 rounded-md"
                onPress={() => setConfirmModalVisible(false)}
              >
                <Text className="text-white text-lg">Cancelar</Text>
              </Pressable>
              <Pressable
                className="bg-red-600 justify-center items-center px-4 py-3 rounded-md"
                onPress={handleConfirmDelete}
              >
                <Text className="text-white text-lg">Excluir</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  skillText: { fontSize: 16 },
  actions: { flexDirection: "row" },
  addButton: {
    marginTop: 20,
    backgroundColor: "#14b8a6",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  addButtonText: { color: "#000", fontWeight: "600" },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.4)",
  },
  modalContent: {
    backgroundColor: "#fff",
    width: "85%",
    padding: 20,
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 10,
  },
});
