import React from "react";
import { StyleSheet, View } from "react-native";
import { Text, TextInput } from "react-native-paper";
import { Address } from "../../src/types";

type Props = {
  address: Address;
  setAddress: (field: keyof Address, value: string) => void;
};

export default function AddressFields({ address, setAddress }: Props) {
  const fields: { label: string; field: keyof Address }[] = [
    { label: "Хот", field: "city" },
    { label: "Дүүрэг", field: "district" },
    { label: "Хороо", field: "khoroo" },
    { label: "Байр", field: "building" },
    { label: "Орц", field: "entrance" },
    { label: "Давхар", field: "floor" },
    { label: "Тоот", field: "door" },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📍 Хаяг</Text>

      {fields.map(({ label, field }) => (
        <TextInput
          key={field}
          label={label}
          value={address[field]}
          onChangeText={(text) => setAddress(field, text)}
          style={styles.input}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
  },
  input: {
    marginBottom: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
});
