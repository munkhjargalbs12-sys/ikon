import React from "react";
import { StyleSheet, View } from "react-native";
import { TextInput } from "react-native-paper";
import { CompanyFormData } from "../../src/types";
import AddressFields from "./AddressFields";

type Props = {
  data: CompanyFormData;
  setData: (data: CompanyFormData) => void;
};

export default function CompanyForm({ data, setData }: Props) {
  const handleChange = (field: keyof CompanyFormData, value: string) => {
    setData({ ...data, [field]: value });
  };

  const handleAddressChange = (
    field: keyof CompanyFormData["address"],
    value: string
  ) => {
    setData({
      ...data,
      address: {
        ...data.address,
        [field]: value,
      },
    });
  };

  return (
    <View style={styles.container}>
      <TextInput
        label="Байгууллагын нэр"
        value={data.companyName}
        onChangeText={(text) => handleChange("companyName", text)}
        style={styles.input}
      />

      <TextInput
        label="Регистрийн дугаар"
        value={data.registerId}
        onChangeText={(text) => handleChange("registerId", text)}
        style={styles.input}
      />

      <TextInput
        label="Төлөөлөгчийн нэр"
        value={data.representative}
        onChangeText={(text) => handleChange("representative", text)}
        style={styles.input}
      />

      <TextInput
        label="Утасны дугаар"
        value={data.phone}
        keyboardType="number-pad"
        maxLength={8}
        onChangeText={(text) =>
          handleChange("phone", text.replace(/\D/g, "").slice(0, 8))
        }
        style={styles.input}
      />

      <TextInput
        label="Имэйл"
        value={data.email}
        keyboardType="email-address"
        onChangeText={(text) => handleChange("email", text)}
        style={styles.input}
      />

      <AddressFields address={data.address} setAddress={handleAddressChange} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  input: {
    marginBottom: 12,
  },
});
