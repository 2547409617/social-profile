import * as React from "react";
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  Pressable,
  Image,
  ImageSourcePropType,
  GestureResponderEvent,
  Button,
} from "react-native";
import type { ParamListBase } from "@react-navigation/native";
import { NavigationContainer } from "@react-navigation/native";
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import { useEffect, useLayoutEffect } from "react";

export interface ImageInfo {
  url: string;
}

export type NativeStackParams = {
  Detail: ImageInfo;
};

export default function ImageDetail({
  route,
  navigation,
}: NativeStackScreenProps<NativeStackParams, "Detail">) {
  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
      fullScreenGestureEnabled: true,
    });
  }, [navigation]);
  const { url } = route.params;
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "space-around",
        alignItems: "center",
        backgroundColor: "#fefefe",
      }}
    >
      <View>
        <Image style={{ width: 350, height: 350 }} source={{ uri: url }} />
        <Button
          title="Go Back"
          style={styles.button}
          onPress={() => {
            navigation.goBack();
          }}
        >
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  dialog: {
    padding: 16,
    width: "90%",
    maxWidth: 400,
    borderRadius: 3,
    backgroundColor: "#fff",
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
  },
  text: {
    alignSelf: "center",
    marginHorizontal: 20,
  },
  button: {
    alignSelf: "center",
    marginHorizontal: 10,
    marginVertical: 20,
  },
});
