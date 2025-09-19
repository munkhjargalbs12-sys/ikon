import { Ionicons } from "@expo/vector-icons";
import CheckBox from "expo-checkbox";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Modal, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import HelpMenu from "./HelpMenu";
const router = useRouter(); // ✅ navigation объект авах


export default function LoginScreen() {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
   const [showHelp, setShowHelp] = useState(false);

  const handleLogin = () => {
    console.log("Login with:", phone, password, "remember:", remember);
  };

  return (
    <View style={styles.container}>
      {/* Баруун дээд буланд тусламж линк */}
       <TouchableOpacity style={styles.helpLink} onPress={() => setShowHelp(true)}>
  <Text style={styles.helpText}>Тусламж</Text>
</TouchableOpacity>


      <View style={styles.card}>
        <Text style={styles.title}>I-KonTor</Text>

        {/* Утасны дугаар */}
        <View style={styles.inputContainer}>
          <Text style={[styles.label, phone ? styles.labelFocused : null]}>
            Утасны дугаар
          </Text>
          <TextInput
            style={styles.input}
            value={phone}
            onChangeText={(text) => setPhone(text.replace(/[^0-9]/g, ""))}
            keyboardType="phone-pad"
            maxLength={10}
            
          />
        </View>

        {/* Нууц үг + Show/Hide */}
        <View style={styles.inputContainer}>
          <Text style={[styles.label, password ? styles.labelFocused : null]}>
            Нууц үг
          </Text>
          <View style={styles.passwordRow}>
            <TextInput
              style={styles.passwordInput}
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <Ionicons
                name={showPassword ? "eye-off" : "eye"}
                size={22}
                color="#4CAF50"
              />
            </TouchableOpacity>
          </View>
        </View>
                  <Modal
  visible={showHelp}
  animationType="fade"
  transparent
  onRequestClose={() => setShowHelp(false)}
>
  <TouchableWithoutFeedback onPress={() => setShowHelp(false)}>
    <View style={styles.overlay}>
      <TouchableWithoutFeedback onPress={() => {}}>
        <View style={styles.modalContainer}>
          {/* Props дамжуулж байна */}
          <HelpMenu 
            visible={showHelp} 
            onClose={() => setShowHelp(false)} 
          />
        </View>
      </TouchableWithoutFeedback>
    </View>
  </TouchableWithoutFeedback>
</Modal>


        {/* Нэвтрэх */}
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Нэвтрэх</Text>
        </TouchableOpacity>

        {/* Линкууд */}
        <TouchableOpacity>
          <Text style={styles.link}>Нууц үг мартсан уу?</Text>
        </TouchableOpacity>

        <TouchableOpacity  onPress={() => router.push("/register")}>
          
          <Text style={styles.link}>Шинээр бүртгүүлэх</Text>
          
        </TouchableOpacity>

        {/* Сануулах checkbox */}
        <View style={styles.checkboxRow}>
          <CheckBox value={remember} onValueChange={setRemember} />
          <Text style={styles.checkboxLabel}>Сануулах</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#002b36",
    padding: 20,
  },
  helpLink: {
    position: "absolute",
    top: 40,
    right: 20,
  },
  helpText: {
    color: "#4CAF50",
    fontWeight: "bold",
    fontSize: 16,
  },
  card: {
    backgroundColor: "rgba(255,255,255,0.1)",
    padding: 20,
    borderRadius: 20,
    width: "100%",
    maxWidth: 350,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "white",
  },
  inputContainer: {
    marginBottom: 25
    ,
    paddingTop:14,
  },
  label: {
    position: "absolute",
    top:30,
    left: 12,
    color: "#aaa",
    fontSize: 14,
    zIndex:1,
  },
  labelFocused: {
    top: -10,
    fontSize: 12,
    color: "#4CAF50",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 12,
    paddingTop: 18,
    backgroundColor: "#fff",
     minHeight: 50, 
     
  },
  passwordRow: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
     minHeight: 50, 
  },
  passwordInput: {
    flex: 1,
    paddingVertical: 12,
  },
  button: {
    backgroundColor: "#4CAF50",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  link: {
    marginTop: 10,
    textAlign: "center",
    color: "#4CAF50",
    fontSize: 14,
  },
  checkboxRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  checkboxLabel: {
    color: "white",
    marginLeft: 8,
  },
  overlay: {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "rgba(0,0,0,0.5)",
},
modalContainer: {
  backgroundColor: "white",
  borderRadius: 12,
  padding: 20,
  width: "80%",
}

});
