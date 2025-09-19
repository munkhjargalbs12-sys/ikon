import React from 'react';
import {
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

type HelpMenuProps = {
  visible: boolean;
  onClose: () => void;
};
// HelpMenu.tsx
console.log("HelpMenu loaded");

export default function HelpMenu({ visible, onClose }: HelpMenuProps) {
  const items = [
    { title: '📘 Зааварчилгаа', action: () => console.log("Зааварчилгаа") },
    { title: '📄 Танилцуулга', action: () => console.log("Танилцуулга") },
    { title: '📧 Холбоо барих', action: () => console.log("Холбоо барих") },
    { title: '💬 Санал хүсэлт', action: () => console.log("Санал хүсэлт") },
    { title: '📦 Үйлчилгээний нөхцөл', action: () => console.log("Нөхцөл") },
    { title: '🛡 Нууцлалын бодлого', action: () => console.log("Нууцлал") },
    { title: '🧾 Бүртгэл', action: () => console.log("Бүртгэл") },
    { title: '🔒 Нууц үг сэргээх', action: () => console.log("Нууц үг") },
    { title: '📱 Апп хувилбар', action: () => console.log("Version") },
    { title: '🛠 Тохиргоо', action: () => console.log("Settings") },
  ];

  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent
      onRequestClose={onClose}
    >
      <Pressable style={styles.backdrop} onPress={onClose}>
        <View style={styles.modalContent}>
          <ScrollView
            style={{ maxHeight: 400 }}
            showsVerticalScrollIndicator={true}
            contentContainerStyle={{ paddingBottom: 20 }}
          >
            {items.map((item, index) => (
            <TouchableOpacity
  key={index}
  activeOpacity={0.6}
  delayLongPress={999999}
  onLongPress={() => {}}  // 🔑 Урт даралтын эвент юу ч хийхгүй
  onPress={() => {
    item.action();
    onClose();
  }}
>
  <Text
  style={styles.item}
  selectable={false}
  selectionColor="transparent"   // Хайлтын highlight өнгө байхгүй болгоно
  onLongPress={() => {}}         // Урт даралт хаагдана
  suppressHighlighting={true}    // iOS дээр highlight бүр хаана
>
  {item.title}
</Text>
</TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: 260,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    elevation: 5,
    maxHeight: 420,
  },
  item: {
    fontSize: 16,
    marginBottom: 15,
    color: '#333',
    borderBottomWidth: 0.5,
    borderColor: '#ccc',
    paddingBottom: 5,
  },
});
