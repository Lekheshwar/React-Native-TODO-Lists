import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import Colors from "./Colors";
import TodoList from "./components/TodoList";
import tempData from "./tempData";

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={{ flexDirection: "row" }}>
          <View style={styles.divider}></View>
          <Text style={styles.title}>
            TODO{" "}
            <Text style={{ fontWeight: "900", color: Colors.blue }}>
              Lists{" "}
            </Text>
          </Text>
          <View style={styles.divider}></View>
        </View>

        <View style={{ marginVertical: 40 }}>
          <TouchableOpacity style={styles.addList}>
            <AntDesign name="plus" size={20} color={Colors.white} />
          </TouchableOpacity>
        </View>

        <View style={{ height: 265, paddingLeft: 32 }}>
          <FlatList
            data={tempData}
            keyExtractor={(item) => item.name}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => <TodoList list={item} />}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  divider: {
    backgroundColor: Colors.lightBlue,
    height: 1,
    flex: 1,
    alignSelf: "center",
  },
  title: {
    fontSize: 40,
    fontWeight: "900",
    color: Colors.black,
    paddingHorizontal: 30,
  },
  addList: {
    borderWidth: 2,
    borderColor: Colors.blue,
    backgroundColor: Colors.blue,
    borderRadius: 50,
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
  },
});
