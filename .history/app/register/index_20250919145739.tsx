import { Ionicons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import React, { JSX, useEffect, useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";

interface FormState {
  surname: string;
  name: string;
  phone1: string;
  phone2: string;
  emerg1: string;
  emergRelation: string;
  email: string;
  password: string;
  password2: string;
}

export default function RegisterScreen(): JSX.Element {
  const [form, setForm] = useState<FormState>({
    surname: "",
    name: "",
    phone1: "",
    phone2: "",
    emerg1: "",
    emergRelation: "",
    email: "",
    password: "",
    password2: "",
  });

  const [touched, setTouched] = useState<Partial<Record<keyof FormState, boolean>>>({});
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [allValid, setAllValid] = useState<boolean>(false);

  const relations = ["Аав", "Ээж", "Ах", "Эгч", "Дүү", "Хамаатан", "Найз", "Хөрш"];

  const validators: Record<keyof FormState, (v: string, all: FormState) => boolean> = {
    surname: (v) => v.trim().length > 0,
    name: (v) => v.trim().length > 0,
    phone1: (v) => /^\+?[0-9]{7,15}$/.test(v.trim()),
    phone2: (v) => /^\+?[0-9]{7,15}$/.test(v.trim()),
    emerg1: (v) => /^\+?[0-9]{7,15}$/.test(v.trim()),
    emergRelation: (v) => v.trim().length > 0,
    email: (v) => /^\S+@\S+\.\S+$/.test(v.trim()),
    password: (v) => v.length >= 6,
    password2: (v, all) => v === all.password && v.length >= 6,
  };

  const isFieldValid = (field: keyof FormState): boolean => validators[field](form[field], form);

  useEffect(() => {
    const keys = Object.keys(form) as (keyof FormState)[];
    setAllValid(keys.every((k) => isFieldValid(k)));
  }, [form]);

  const handleChange = (name: keyof FormState, value: string) => setForm((s) => ({ ...s, [name]: value }));
  const handleBlur = (name: keyof FormState) => setTouched((t) => ({ ...t, [name]: true }));

  const renderInput = (
    label: string,
    name: keyof FormState,
    placeholder: string,
    secure: boolean = false,
    keyboardType: "default" | "email-address" | "phone-pad" = "default",
    styleOverride: object = {}
  ) => {
    const valid = isFieldValid(name);
    const showError = !!(touched[name] && !valid);

    return (
      <View style={[styles.inputWrapper, styleOverride]}>
        <Text style={styles.label}>{label}</Text>
        <View style={styles.inputRow}>
          <TextInput
            value={form[name]}
            onChangeText={(text) => handleChange(name, text)}
            onBlur={() => handleBlur(name)}
            placeholder={placeholder}
            secureTextEntry={secure && !showPassword}
            keyboardType={keyboardType}
            placeholderTextColor="#bbb"
            style={[styles.input, { borderColor: showError ? "red" : valid && form[name] ? "#4ade80" : "#555" }]}
          />
          {secure && (
            <TouchableOpacity onPress={() => setShowPassword((s) => !s)} style={styles.eyeButton}>
              <Ionicons name={showPassword ? "eye-off" : "eye"} size={20} color="#ccc" />
            </TouchableOpacity>
          )}
          {valid ? <Ionicons name="checkmark-circle" size={20} color="#4ade80" /> : showError ? <Ionicons name="alert-circle" size={20} color="red" /> : <View style={styles.iconPlaceholder} />}
        </View>
      </View>
    );
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : "height"}> 
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.formWrapper}>
            <Text style={styles.title}>I-KonTor</Text>

            <View style={styles.row}>
                    {renderInput("Овог", "surname", "Овог оруулна уу")}
            </View>
            <View style={styles.row}>
                     {renderInput("Нэр", "name", "Нэр оруулна уу")}
            </View>
            <View style={styles.row}>
              {renderInput("Утас 1", "phone1", "+976 88xxxxxx", false, "phone-pad")}
              {renderInput("Утас 2", "phone2", "+976 88xxxxxx", false, "phone-pad", { marginRight: 0 })}
            </View>

            <View style={styles.row}>
              <View style={{ flex: 1, marginRight: 8 }}>{renderInput("Яаралтай холбоо", "emerg1", "+976 88xxxxxx", false, "phone-pad")}</View>
              <View style={styles.pickerWrapper}>
                <Text style={styles.label}>Таны хэн болох</Text>
                <View style={[styles.pickerContainer, { borderColor: form.emergRelation ? "#4ade80" : "#555" }]}> 
                  <Picker style={{ color: "#ccc#000000ff" }} selectedValue={form.emergRelation} onValueChange={(v) => handleChange("emergRelation", v)} dropdownIconColor="#fff">
                    <Picker.Item label="Сонгоно уу" value=""  color="#4ade80"/>
                    
                    {relations.map((r) => (
                      <Picker.Item key={r} label={r} value={r} />
                    ))}
                  </Picker>
                </View>
              </View>
            </View>

            <View style={styles.row}>{renderInput("И-мэйл", "email", "example@mail.com", false, "email-address")}
            <View style={styles.row}>{renderInput("Нууц үг", "password", "Нууц үг оруулна уу", true)}</View>
            <View style={styles.row}></View>{renderInput("Нууц үг давтах", "password2", "Давтан оруулна уу", true)}

            {allValid ? (
              <TouchableOpacity onPress={onSubmit} style={styles.submitButton}>
                <Text style={styles.submitText}>Үргэлжлэх</Text>
              </TouchableOpacity>
            ) : (
              <Text style={styles.errorText}>Бүх талбаруудыг бөглөнө үү</Text>
            )}
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );

  function onSubmit() {
    if (!allValid) return;
    alert("Бүртгэл амжилттай!");
  }
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#083344" }, // ✅ Background өнгө яг хүссэнээр
  scrollContent: { padding: 20, flexGrow: 1 },
  formWrapper: { flex: 1, justifyContent: "center" },
  title: { fontSize: 24, fontWeight: "bold", textAlign: "center", color: "white", marginBottom: 16 },
  row: { flexDirection: "row", alignItems: "flex-start", marginBottom: 12 },
  inputWrapper: { flex: 1, marginBottom: 12, marginRight: 8 },
  inputRow: { flexDirection: "row", alignItems: "center" },
  label: { color: "#ccc", marginBottom: 4, fontSize: 14 },
  input: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 10,
    color: "white",
    backgroundColor: "#1e293b", // ✅ Илүү харанхуй орууллаа
  },
  eyeButton: { marginLeft: -30, marginRight: 10 },
  iconPlaceholder: { width: 20 },
  pickerWrapper: { width: 140 },
  pickerContainer: {
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: "#1e293b",
    overflow: "hidden",
  },
  submitButton: { backgroundColor: "#4ade80", padding: 14, borderRadius: 8, marginTop: 10 },
  submitText: { color: "white", textAlign: "center", fontWeight: "bold" },
  errorText: { textAlign: "center", color: "#f87171", marginTop: 10 },
});
