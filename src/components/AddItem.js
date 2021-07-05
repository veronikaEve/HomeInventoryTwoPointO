import React, { useState, Component } from "react";
import {
  Platform,
  Modal,
  StyleSheet,
  Text,
  View,
  TextInput,
} from "react-native";
import { Button, Input } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";

import { postToDatabase } from "../utils/backendConnections";
import { modalStyles } from "../styles";

const AddItem = ({ navigation, route }) => {
  const [itemDetails, setItemDetails] = useState({});
  const [modalVisible, setModalVisible] = useState(false);

  const handleSubmit = async () => {
    const promise = await postToDatabase(itemDetails, "addItem");
    if (promise.statusCode == 200) {
      setModalVisible(true);
    }
  };

  return (
    <View style={styles.addItemContainer}>
      <Input
        placeholder="Item name"
        onChangeText={(value) =>
          setItemDetails({ ...itemDetails, name: value })
        }
      />
      <Input
        placeholder="Item colour"
        onChangeText={(value) =>
          setItemDetails({ ...itemDetails, colour: value })
        }
      />
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
  saveButton: {
    padding: 10,
    alignSelf: "flex-end",
  },
  modalText: {
    marginBottom: 15,
  },
});

export default AddItem;
