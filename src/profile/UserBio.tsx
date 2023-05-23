import React from "react";
import { View, Text } from "react-native";

export default function UserBio({
  name,
  desc,
}: {
  name: string;
  desc: string;
}) {
  return (
    <View
      style={{
        flex: 1,
        flexDirection: "column",
        marginStart: 10,
        marginTop: 20,
      }}
    >
      <View style={{ marginBottom: 5 }}>
        <Text style={{ color: "white", fontWeight: "bold" }}>{name}</Text>
      </View>
      <View style={{ marginBottom: 5 }}>
        <Text style={{ color: "white" }}>{desc}</Text>
      </View>
    </View>
  );
}
