import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import Colors from '../Colors';

export default class TodoModal extends React.Component {
    state={
        name: this.props.list.name,
        color: this.props.list.color,
        todo: this.props.list.todo
    }

    render(){
        return(
            <View style={styles.conatiner}>
                <TouchableOpacity style={{position:"absolute", top:64, right:32, zIndex: 10}} onPress={ this.props.closeModal}> 
                    <AntDesign name="close" size={24} color={Colors.black} />
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    conatiner: {
        flex:1,
        alignItems: "center",
        justifyContent: "center"
    }
});