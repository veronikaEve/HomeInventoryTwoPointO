import React, { useState, useLayoutEffect } from "react";
import {
  Platform,
  StyleSheet,
  View,
  Alert,
  Text,
  TextInput,
} from "react-native";
import { Button, Input } from "react-native-elements";

import { getFromDatabase } from "../utils/backendConnections";
import { modalStyles } from "../styles/modalStyles";
import ImageComponent from "./ImageComponent";
import { HeaderTitle } from "@react-navigation/stack";

const ViewItem = ({ navigation, route }) => {
  const item = route.params.item;
  const [inEditmode, setInEditMode] = useState(false);
  const [itemDetails, setItemDetails] = useState(item || {});

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: item.name,
      headerRight: () => (
        <Button
          style={styles.save}
          onPress={() => setInEditMode(true)}
          title="Edit"
        />
      ),
    });
  });

  //   const handleSubmit = async () => {
  //     const promise = await postToDatabase(itemDetails, "addItem");

  //     if (promise.statusCode == 200) {
  //       Alert.alert("Confirm adding this item", "", [
  //         {
  //           text: "Cancel",
  //         },
  //         {
  //           text: "OK",
  //           onPress: () =>
  //             Alert.alert("✨ Item addedd successfully ✨", "", [
  //               {
  //                 text: "OK",
  //                 onPress: () => navigation.navigate("Home"),
  //               },
  //             ]),
  //         },
  //       ]);
  //     }
  //   };

  const itemImage = (image) => {
    setItemDetails({ ...itemDetails, image });
  };

  return (
    <View style={styles.addItemContainer}>
      <View style={styles.details}>
        <ImageComponent getImage={itemImage} item={item} />
        <View
          style={{
            flexGrow: 1,
          }}
        >
          {inEditmode ? (
            <View>
              <TextInput
                style={styles.text}
                placeholder="Item name"
                defaultValue={itemDetails.name}
                onChangeText={(value) =>
                  setItemDetails({ ...itemDetails, name: value })
                }
              />
              <TextInput
                style={styles.text}
                placeholder="Notes"
                defaultValue={itemDetails.notes}
                onChangeText={(value) =>
                  setItemDetails({ ...itemDetails, notes: value })
                }
              />
            </View>
          ) : (
            <View>
              <Text style={styles.text}>{item.name}</Text>
              <Text style={styles.text}>{item.notes}</Text>
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  ...modalStyles,
  addItemContainer: {},
  modalText: {
    marginBottom: 15,
  },
  details: {
    marginTop: 10,
    flexDirection: "row",
  },
  text: {
    borderBottomWidth: 1,
    borderBottomColor: "grey",
    // backgroundColor: "pink",
    margin: 10,
    padding: 5,
    fontSize: 20,
  },
  save: {
    marginRight: 10,
  },
});

export default ViewItem;
