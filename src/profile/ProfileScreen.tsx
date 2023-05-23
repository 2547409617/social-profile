import React from "react";
import { View, Text } from "react-native";
import ProfileHeader from "./ProfileHeader";
import { FlatList } from "react-native";
import UserBio from "./UserBio";
import LineSeperator from "./LineSeperator";
import ProfileGrid from "./ProfileGrid";
import colors from "../../res/colors";
import ImageDetail from "./ImageDetail";
import type { ParamListBase } from "@react-navigation/native";
import { useState, useEffect } from "react";

import { NavigationContainer } from "@react-navigation/native";
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";

const data = [{ key: "1" }];
const profileUrl = "http://127.0.0.1:3000/api/profile/one";

enum RequestStatus {
  IDLE = "IDLE",
  SUCCESS = "SUCCESS",
  ERROR = "ERROR",
  PENDING = "PENDING",
}

interface Profile {
  name: string;
  posts: number;
  followers: number;
  following: number;
  desc: string;
  avatar: string;
  userid: string;
  id: string;
  urls: string[];
}

function ProfileLayout({ navigation }: NativeStackScreenProps<ParamListBase>) {
  const [profile, setProfile] = useState<Profile>({
    name: "",
    posts: 0,
    followers: 0,
    following: 0,
    desc: "",
    avatar: "",
    userid: "",
    id: "",
    urls: [],
  });

  const [requestStatus, setRequestStatus] = useState<RequestStatus>(
    RequestStatus.IDLE
  );

  useEffect(() => {
    setRequestStatus(RequestStatus.PENDING);

    fetch(profileUrl, {
      method: 'GET',
      headers: {
          "Accept": "application/json",
          "Content-Type": 'application/json',
          "Connection": "close",
          "type": "getUserData",
      }})
      .then((res) => res.json())
      .then((profileJ: Profile) => {
        if (!!profileJ && !!profileJ.urls) {
          setProfile(profileJ);
          setRequestStatus(RequestStatus.SUCCESS);
        } else {
          setRequestStatus(RequestStatus.ERROR);
        }
      })
      .catch((error) => {
        console.log(error)
        setRequestStatus(RequestStatus.ERROR);
      });
  }, []);

  if (requestStatus === RequestStatus.ERROR) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "space-around",
          alignItems: "center",
          backgroundColor: "#fefefe",
        }}
      >
        <Text>Network error</Text>
      </View>
    );
  }
  if (requestStatus === RequestStatus.PENDING || requestStatus === RequestStatus.IDLE) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "space-around",
          alignItems: "center",
          backgroundColor: "#fefefe",
        }}
      >
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <FlatList
      style={{ flex: 1, backgroundColor: colors.bottomBackGround }}
      data={data}
      renderItem={() => (
        <>
          <ProfileHeader
            avatar={profile.avatar}
            posts={profile.posts.toString()}
            followers={profile.followers.toString()}
            following={profile.following.toString()}
          />
          <UserBio name={profile.name} desc={profile.desc} />
          <LineSeperator />
          <ProfileGrid navigation={navigation} urls={profile.urls} />
        </>
      )}
    />
  );
}

const Stack = createNativeStackNavigator();

export default function ProfileInfo({
  navigation,
}: {
  navigation: NativeStackScreenProps<ParamListBase>;
}) {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator
        initialRouteName="ProfileLayout"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="ProfileLayout" component={ProfileLayout} />
        <Stack.Screen name="ImageDetail" component={ImageDetail} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
