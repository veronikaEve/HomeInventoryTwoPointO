import React, { useState, Component } from "react";
import {
  Platform,
  Modal,
  StyleSheet,
  Text,
  View,
  TextInput,
} from "react-native";
import { Button, Input, SearchBar, ListItem } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";

import { postToDatabase } from "../utils";

const AddItem = ({ navigation, route }) => {
  const [itemDetails, setItemDetails] = useState({});
  const [modalVisible, setModalVisible] = useState(false);

  const handleButtonPress = async () => {
    postToDatabase(itemDetails, "addItem").then(setModalVisible(true));
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
        onPress={() => handleButtonPress()}
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
  addItemContainer: {
    // display: "flex",
    // flexDirection: "column",
    // height: "100%",
  },
  saveButton: {
    // position: "relative",
    padding: 10,
    // justifyContent: "flex-end",
    alignSelf: "flex-end",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalText: {
    marginBottom: 15,
  },
  button: {
    // elevation: 2,
  },
  modalView: {
    // margin: 20,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 30,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
});

export default AddItem;
