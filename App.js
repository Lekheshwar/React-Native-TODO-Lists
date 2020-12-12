import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  Modal,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import Colors from "./Colors";
import TodoList from "./components/TodoList";
import tempData from "./tempData";
import AddListModal from "./components/AddListModal";
import Fire from "./Fire";

const numOfColumn = 2;
const WIDTH = Dimensions.get("window").width;

export default class App extends React.Component {
  state = {
    addTodoVisible: false,
    lists: tempData,
    user: {},
    loading: true,
  };

  componentDidMount() {
    firebase = new Fire((error, user) => {
      if (error) {
        return alert("OOps!!");
      }

      firebase.getLists((lists) => {
        this.setState({ lists, user }, () => {
          this.setState({ loading: false });
        });
      });
      this.setState({ user });
      console.log(user.uid);
    });
  }

  componentWillUnmount() {
    firebase.detach();
  }

  toggleTodoModal = () => {
    this.setState({ addTodoVisible: !this.state.addTodoVisible });
  };

  renderList = (list) => {
    return <TodoList list={list} updateList={this.updateList} />;
  };

  addList = (list) => {
    this.setState({
      lists: [
        ...this.state.lists,
        { ...list, id: this.state.lists.length + 1, todos: [] },
      ],
    });
  };

  updateList = (list) => {
    this.setState({
      lists: this.state.lists.map((item) => {
        return item.id === list.id ? list : item;
      }),
    });
  };

  render() {
    if (this.state.loading) {
      return (
        <View style={styles.container}>
          <ActivityIndicator size="large" />
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <Modal
          animationType="slide"
          visible={this.state.addTodoVisible}
          onRequestClose={() => this.toggleTodoModal()}
        >
          <AddListModal
            closeModal={() => this.toggleTodoModal()}
            addList={this.addList}
          />
        </Modal>
        <View>
          <Text>User: {this.state.user.uid}</Text>
        </View>

        <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
          <View style={styles.divider}></View>
          <Text style={styles.title}>
            TODO{" "}
            <Text style={{ fontWeight: "100", color: Colors.blue }}>
              Lists{" "}
            </Text>
          </Text>
          <View style={styles.divider}></View>
        </View>

        <View style={{ flex: 9 }}>
          <FlatList
            data={this.state.lists}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => this.renderList(item)}
            numColumns={numOfColumn}
            keyboardShouldPersistTaps="always"
          />
        </View>

        <View style={{ position: "absolute", right: 20, bottom: 20 }}>
          <TouchableOpacity
            style={styles.addList}
            onPress={() => this.toggleTodoModal()}
          >
            <AntDesign name="plus" size={22} color={Colors.white} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    marginTop: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  divider: {
    backgroundColor: Colors.lightBlue,
    height: 2,
    flex: 1,
    alignSelf: "center",
  },
  title: {
    fontSize: 40,
    fontWeight: "bold",
    color: Colors.black,
    paddingHorizontal: 20,
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
