import React from "react";
import { StyleSheet, Text, View, Modal, TouchableOpacity, Dimensions } from "react-native";
import Colors from "../Colors";
import TodoModal from "./TodoModal";


const WIDTH = Dimensions.get('window').width;
export default class TodoList extends React.Component {

  state = {
    showListVisible: false
  }

  toggleListModal() {
    this.setState({ showListVisible: !this.state.showListVisible });
  }

  render() {

    const list = this.props.list;
    const completedCount = list.todos.filter((todo) => todo.completed).length;
    const remainingCount = list.todos.length - completedCount;

    return (
      <View>
        <Modal
          animationType="slide"
          visible={this.state.showListVisible}
          onRequestClose={() => this.toggleListModal()}
        >
          <TodoModal list={list} closeModal={() => this.toggleListModal()} updateList={this.props.updateList} />
        </Modal>
        

        <TouchableOpacity
          style={[styles.listContainer, { backgroundColor: list.color }]}
          onPress={() => this.toggleListModal()}
        >
          <Text style={styles.listTitle} numberOfLines={1}>
            {list.name}
          </Text>

          <View>
            <View style={{ alignItems: "center" }}>
              <Text style={styles.count}>{remainingCount}</Text>
              <Text style={styles.subtitle}>Remaining</Text>
            </View>
            <View style={{ alignItems: "center" }}>
              <Text style={styles.count}>{completedCount}</Text>
              <Text style={styles.subtitle}>Completed</Text>
            </View>
          </View>
          
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  listContainer: {
    paddingVertical: 26,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginHorizontal: 2,
    marginVertical: 2,
    alignItems: "center",
    width: WIDTH/2 - 4 ,
  },
  listTitle: {
    fontSize: 24,
    fontWeight: "200",
    color: Colors.white,
    marginBottom: 18,
  },
  count: {
    fontSize: 26,
    fontWeight: "200",
    color: Colors.white,
  },
  subtitle: {
    fontSize:12,
    fontWeight: "200",
    color: Colors.white,
  },
});
