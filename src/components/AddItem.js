import React, { useState } from "react";
import { Platform, Modal, StyleSheet, Text, View } from "react-native";
import { Button, Input } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";

import { postToDatabase } from "../utils/backendConnections";
import { modalStyles } from "../styles/modalStyles";
import ImageComponent from "./ImageComponent";

const AddItem = ({ navigation }) => {
  const [itemDetails, setItemDetails] = useState({});
  const [modalVisible, setModalVisible] = useState(false);

  const handleSubmit = async () => {
    const promise = await postToDatabase(itemDetails, "addItem");
    if (promise.statusCode == 200) {
      setModalVisible(true);
    }
  };

  const itemImage = (image) => {
    setItemDetails({ ...itemDetails, image });
  };

  return (
    <View style={styles.addItemContainer}>
      <View style={styles.details}>
        <ImageComponent getImage={itemImage} />
        <View
          style={{
            flexGrow: 1,
          }}
        >
          <Input
            placeholder="Item name"
            onChangeText={(value) =>
              setItemDetails({ ...itemDetails, name: value })
            }
          />
          <Input
            multiline
            placeholder="Notes"
            onChangeText={(value) =>
              setItemDetails({ ...itemDetails, notes: value })
            }
          />
        </View>
      </View>
      <Button
        style={styles.saveButton}
        icon={<Icon name="check" size={50} color="white" />}
        onPress={() => handleSubmit()}
      />
      <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>
                You've added an item successfully!
              </Text>
              <Button
                style={styles.button}
                onPress={() => {
                  setModalVisible(!modalVisible);
                  navigation.navigate("Home");
                }}
                title="OK"
              ></Button>
            </View>
          </View>
        </Modal>
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
  saveButton: {
    padding: 10,
    alignItems: "flex-end",
  },
});

export default AddItem;
