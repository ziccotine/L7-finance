import React, {useState} from "react";
import {datasource} from './Data.js';
import {TextInput, View, Text, Button} from "react-native";
import RNPickerSelect from 'react-native-picker-select';
import Navigation from "./Navigation.js";

const Add = ({navigation}) => {
    const [Key, setKey] = useState('');
    const [Amount, setAmount] = useState('');
    const [type, setType] = useState('Income');

    return (
        <View style={{padding: 10}}>
            <View style={{padding: 10}}>
                <Text style={{fontWeight: 'bold'}}>Label for income/expense:</Text>
                <TextInput style={{borderWidth: 1}} onChangeText={(text) => setKey(text)}/>
            </View>

            <View style={{ padding: 10 }}>
                <Text style={{ fontWeight: 'bold' }}>Amount:</Text>
                <TextInput style={{ borderWidth: 1 }} onChangeText={(text) => setAmount(Number(text))}/>
            </View>

            <View style={{padding: 10}}>
                <RNPickerSelect
                    value={type}
                    onValueChange={(value) => setType(value)}
                    items={[
                        {label: "Income", value: "Income"},
                        {label: "Expense", value: "Expense"}
                    ]}
                />
            </View>

            <Button title="SUBMIT"
                    onPress={() => {
                        let item = {key: Key, amount: Amount};
                        let indexNum = 0;
                        if (type === 'Expense') {
                            indexNum = 1;
                        }
                        datasource[indexNum].data.push(item);
                        navigation.navigate("Home");
                    }}
            />
        </View>
    );
};

export default Add;
