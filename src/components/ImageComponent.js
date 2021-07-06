import React, { useState, useEffect } from "react";
import { Platform, StyleSheet, View, Pressable, Image } from "react-native";
import * as ImagePicker from "expo-image-picker";

import Icon from "react-native-vector-icons/FontAwesome";

const ImageComponent = (props) => {
  const [image, setImage] = useState();

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }, []);

  const uploadImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
      props.getImage(result.uri);
    }
  };
  return (
    <View>
      {image ? (
        <Image style={styles.image} source={{ uri: image }} />
      ) : (
        <Pressable onPress={uploadImage}>
          <View style={styles.image}>
            <Icon name="camera" size={50} color="white" />
          </View>
        </Pressable>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    margin: 10,
    backgroundColor: "lightgrey",
    height: 100,
    width: 100,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ImageComponent;
