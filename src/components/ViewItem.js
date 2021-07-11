import React, { useState, useLayoutEffect } from "react";
import {
  Platform,
  StyleSheet,
  View,
  Alert,
  Text,
  TextInput,
} from "react-native";
import { Button } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";

import ImageComponent from "./ImageComponent";
import { postToDatabase } from "../utils/backendConnections";

const actionTypes = {
  update: { action: "updateItem", name: "update" },
  delete: { action: "deleteItem", name: "delete" },
};

const ViewItem = ({ navigation, route }) => {
  const item = route.params.item;
  const [inEditMode, setInEditMode] = useState(false);
  const [itemDetails, setItemDetails] = useState(item || {});

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "",
      headerRight: () =>
        inEditMode ? (
          <View style={{ flexDirection: "row" }}>
            <Button
              style={styles.headerRight}
              type="clear"
              onPress={() => {
                setInEditMode(false), setItemDetails(item);
              }}
              title="Cancel"
            />
            <Button
              style={styles.headerRight}
              onPress={() => handleSubmit(actionTypes.update)}
              title="Save"
            />
          </View>
        ) : (
          <Button
            style={styles.headerRight}
            onPress={() => setInEditMode(true)}
            title="Edit"
          />
        ),
    });
  });

  const handleSubmit = async (actionType) => {
    Alert.alert(`Confirm ${actionType.name}`, "", [
      {
        text: "Cancel",
      },
      {
        text: "OK",
        onPress: async () => {
          const promise = await postToDatabase(itemDetails, actionType.action);
          if (promise.statusCode == 200) {
            Alert.alert(`✨ Item ${actionType.name}d successfully ✨`, "", [
              {
                text: "OK",
                onPress: () => {
                  setInEditMode(false);
                  if (actionType == actionTypes.delete) {
                    navigation.navigate("Home");
                  }
                },
              },
            ]);
          }
        },
      },
    ]);
  };

  const itemImage = (image) => {
    setItemDetails({ ...itemDetails, image });
  };

  return (
    <View style={styles.addItemContainer}>
      <View style={styles.details}>
        <ImageComponent
          getImage={itemImage}
          item={item}
          inEditMode={inEditMode}
        />
        <View
          style={{
            flexGrow: 1,
          }}
        >
          {inEditMode ? (
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
              <Text style={styles.text}>{itemDetails.name}</Text>
              <Text style={styles.text}>{itemDetails.notes}</Text>
            </View>
          )}
        </View>
      </View>
      {inEditMode && (
        <View
          style={{
            flexDirection: "row",
            justifyContent: "flex-end",
          }}
        >
          <Button
            buttonStyle={{ margin: 10, backgroundColor: "crimson" }}
            onPress={() => handleSubmit(actionTypes.delete)}
            icon={
              <Icon
                name="trash"
                size={15}
                color="white"
                style={{ marginRight: 5 }}
              />
            }
            title="Delete"
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
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
    margin: 10,
    padding: 5,
    fontSize: 20,
  },
  headerRight: {
    marginRight: 10,
  },
});

export default ViewItem;
