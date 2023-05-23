import React from "react";
import { View, Image, GestureResponderEvent , StyleSheet, Pressable} from "react-native";
import { FlatList, TouchableOpacity } from "react-native";
import type { ParamListBase } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import ImageInfo from "./ImageDetail";

const data = [
  { key: "1" },
  { key: "2" },
  { key: "3" },
  { key: "4" },
  { key: "5" },
  { key: "6" },
  { key: "7" },
  { key: "8" },
  { key: "9" },
];

function ImageItem({
  imageInfo,
}: {
  imageInfo: ImageInfo;
}) {
  return (
    <View style={{ flex: 1 }}>
      <TouchableOpacity>
        <Image
          source={{ uri: imageInfo.url}}
          style={{
            height: 150,
            width: 122,
            flex: 1,
            marginEnd: 2,
            marginBottom: 2,
            alignItems: "center",
          }}
        />
      </TouchableOpacity>
    </View> 
  );
}

function Item({
  imageInfo,
  onPress
}: {
  imageInfo: ImageInfo;
  onPress: ((event: GestureResponderEvent) => void) | null | undefined;
}) {
  return (
    <Pressable 
    onPress={onPress}
    >
    <View style={{ flex: 1 }}>
        <Image 
          source={{ uri: imageInfo.url}}
          style={{
            height: 139,
            width: 122,
            flex: 1,
            marginEnd: 2,
            marginBottom: 2,
            alignItems: "center",
          }}
        />
        </View>
        </Pressable>
  );
}

export default function ProfileGrid({
  navigation,
  urls
}: {
  navigation: NativeStackScreenProps<ParamListBase>,
  urls: string[],
}) {
  return (
    <FlatList
      data={urls}
      style={{ marginTop: 2, marginStart: 2 }}
      renderItem={({ item, index }) => (
        <Pressable 
          >
          <Item
           imageInfo={{url: item}}
           onPress={() => {
            navigation.navigate("ImageDetail", {
              url: item,
            })
          }}
          />
          

        </Pressable>
      )}
      numColumns={3}
      indicatorStyle={"white"}
      showsVerticalScrollIndicator={true}
    />
  );
}

const Styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  prfilePicture: {
    height: 80,
    width: 80,
    borderRadius: 100,
    marginLeft: 20,
  },
  numberContainer: {
    color: 'white',
    fontWeight: 'bold',
    alignSelf: 'center',
    fontSize: 15,
  },
  container2: {
    flex: 1,
    flexDirection: 'row',
    alignSelf: 'center',
    marginEnd: 20,
  },
  text: {
    color: 'white',
    //fontWeight: 'bold',
    alignSelf: 'center',
  },
  container3: {
    flexDirection: 'column',
    flex: 1,
    justifyContent: 'space-between',
  },
});
