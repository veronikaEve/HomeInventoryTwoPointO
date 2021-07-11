import React, { useState } from "react";
import { Platform, StyleSheet, Text, View, FlatList } from "react-native";
import { Button, SearchBar, ListItem } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";

import { getFromDatabase } from "../utils/backendConnections";
import { informationTypes } from "../constants/informationTypes";

const HomePage = ({ navigation }) => {
  const [search, setSearch] = useState("");
  const [foundItems, setFoundItems] = useState([]);

  const updateSearch = (searchTerm) => {
    setSearch(searchTerm);

    if (searchTerm != "") {
      getFromDatabase("searchItems", searchTerm).then((result) =>
        setFoundItems(result)
      );
    } else {
      setFoundItems([]);
    }
  };

  return (
    <View style={styles.container}>
      <View>
        <SearchBar
          platform={Platform.OS}
          placeholder="Type Here..."
          onChangeText={updateSearch}
          value={search}
          containerStyle={{
            backgroundColor: "transparent",
          }}
          inputContainerStyle={{
            backgroundColor: "white",
          }}
        />
        <FlatList
          data={foundItems}
          renderItem={({ item }, index) => {
            return (
              foundItems && (
                <ListItem
                  key={index}
                  onPress={() => {
                    updateSearch("");
                    navigation.navigate(informationTypes.ITEM.view, {
                      item,
                    });
                  }}
                  bottomDivider
                >
                  <Text>{item.name}</Text>
                </ListItem>
              )
            );
          }}
          keyExtractor={(item) => item._id}
        />
      </View>
      {!search && (
        <Button
          style={{
            marginTop: 50,
            width: 50,
            alignSelf: "center",
          }}
          icon={<Icon name="plus" size={15} color="white" />}
          onPress={() => {
            updateSearch("");
            navigation.navigate("AddSelection");
          }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    top: 200,
    padding: 10,
  },
});

export default HomePage;
