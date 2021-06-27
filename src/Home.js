import React, { Component } from "react";
import { StyleSheet, Text, View, TextInput } from "react-native";
import { Button, SearchBar, ListItem } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";

class HomePage extends Component {
  state = {
    search: "",
    foundItems: [],
  };

  data = {
    inventory: {
      categories: [
        { beauty: { products: ["lipstick", "eyeliner", "mascara"] } },
        { kitchenwear: [] },
        { art: [] },
      ],
      rooms: ["Kitchen", "bedroom", "bathrom", "Other Kitchen"],
    },
  };

  updateSearch = (search) => {
    this.setState({ search });
    let foundItems = [];
    if (search != "") {
      this.data.inventory.rooms.forEach((item) => {
        if (item.includes(search)) {
          foundItems.push(item);
        }
      });
      this.setState({ foundItems });
    } else {
      this.setState({ foundItems: [] });
    }
  };

  render() {
    const { search } = this.state;
    console.log(this.state);
    return (
      <View style={styles.container}>
        <View style={styles.inputArea}>
          <SearchBar
            placeholder="Type Here..."
            onChangeText={this.updateSearch}
            value={search}
            lightTheme
            inputContainerStyle={{
              backgroundColor: "white",
            }}
          />
          <View>
            {this.state.foundItems.map((item, index) => {
              return (
                <ListItem key={index} bottomDivider>
                  <Text>{item}</Text>
                </ListItem>
              );
            })}
          </View>
        </View>
        {!this.state.search && (
          <Button
            style={{
              marginTop: 50,
              width: 50,
              alignSelf: "center",
            }}
            icon={<Icon name="plus" size={15} color="white" />}
          />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    borderWidth: 1,
  },
  container: {
    top: 200,
    width: "100%",
    padding: 10,
    // justifyContent: "center",
  },
});

export default HomePage;
