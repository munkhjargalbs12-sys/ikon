// app/(auth)/welcome/index.tsx — 3 слайдтай onboarding
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { Checkbox } from "react-native-paper";
import React, { useState } from "react";

const slides = [
  { id: 1, image: require("@/assets/slide1_welcome_notext_clean.png"), text: "Тавтай морил!" },
  { id: 2, image: require("@/assets/slide2_register_full.png"), text: "Бүртгүүлээд эхлээрэй" },
  { id: 3, image: require("@/assets/slide3_help_full.png"), text: "Тусламж хүсвэл энд байна" },
];

export default function WelcomeScreen() {
  const router = useRouter();
  const [doNotShowAgain, setDoNotShowAgain] = useState(false);

  const handleContinue = async () => {
    if (doNotShowAgain) {
      await AsyncStorage.setItem("hasSeenWelcome", "true");
    }
    router.replace("/Login");
  };

  return (
    <ScrollView horizontal pagingEnabled style={styles.container} showsHorizontalScrollIndicator={false}>
      {slides.map((slide) => (
        <View key={slide.id} style={styles.slide}>
          <Image source={slide.image} style={styles.image} resizeMode="contain" />
          <Text style={styles.text}>{slide.text}</Text>
          {slide.id === 3 && (
            <View style={styles.checkboxContainer}>
              <Checkbox
                status={doNotShowAgain ? "checked" : "unchecked"}
                onPress={() => setDoNotShowAgain(!doNotShowAgain)}
              />
              <Text style={styles.checkboxText}>Ахин бүү харуулах</Text>
            </View>
          )}
          {slide.id === 3 && (
            <TouchableOpacity style={styles.button} onPress={handleContinue}>
              <Text style={styles.buttonText}>Эхлэх</Text>
            </TouchableOpacity>
          )}
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  slide: {
    width: 360,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  image: {
    width: "100%",
    height: 300,
  },
  text: {
    fontSize: 18,
    marginTop: 20,
    textAlign: "center",
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
  },
  checkboxText: {
    fontSize: 16,
  },
  button: {
    marginTop: 20,
    backgroundColor: "#2c5364",
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
});
