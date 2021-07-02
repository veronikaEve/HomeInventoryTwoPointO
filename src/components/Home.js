import React, { useState } from "react";
import { Platform, StyleSheet, Text, View, TextInput } from "react-native";
import { Button, SearchBar, ListItem } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";

const HomePage = ({ navigation }) => {
  const [search, setSearch] = useState("");
  const [foundItems, setFoundItems] = useState([]);

  let data = {
    inventory: {
      items: [
        { name: "lipstick" },
        { name: "lipgloss" },
        { name: "eyeliner" },
        { name: "mascara" },
        { name: "watercolour palette" },
        { name: "brush pen" },
        { name: "that pink dress" },
        { name: "screwdriver" },
        { name: "hammer" },
        { name: "yellow acrylic" },
      ],
    },
  };

  const updateSearch = (e) => {
    setSearch(e);
    let foundItems = [];
    if (e != "") {
      data.inventory.items.forEach((item) => {
        if (item.name.includes(e.toLowerCase())) {
          foundItems.push(item);
        }
      });
      setFoundItems(foundItems);
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
          inputContainerStyle={{
            backgroundColor: "white",
          }}
        />
        <View>
          {foundItems &&
            foundItems.map((item, index) => {
              return (
                <ListItem key={index} bottomDivider>
                  <Text>{item.name}</Text>
                </ListItem>
              );
            })}
        </View>
      </View>
      {!search && (
        <Button
          style={{
            marginTop: 50,
            width: 50,
            alignSelf: "center",
          }}
          icon={<Icon name="plus" size={15} color="white" />}
          onPress={() => navigation.navigate("AddItem", { name: "Jane" })}
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
