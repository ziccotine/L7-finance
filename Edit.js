import React, {useState} from "react";
import {datasource} from './Data.js';
import {TextInput, View, Text, Button, Alert} from "react-native";
import navigation from './Navigation.js';

const Edit = ({ navigation, route }) => {
    const [Key, setKey] = useState(route.params.key);
    const [Amount, setAmount] = useState(route.params.amount);

    return (
        <View style={{padding: 10}}>
            <View style={{padding: 10}}>
                <Text style={{fontWeight: 'bold'}}>Label for income/expense:</Text>
                <TextInput
                    value={Key}
                    style={{borderWidth: 1}}
                    onChangeText={(text) => setKey(text)}
                />
            </View>

            <View style={{padding: 10}}>
                <Text style={{fontWeight: 'bold'}}>Amount:</Text>
                <TextInput
                    value={Amount}
                    style={{borderWidth: 1}}
                    onChangeText={(number) => setAmount(Number(number))}
                />
            </View>

            <View style={{padding: 10, flexDirection: 'row', justifyContent: 'space-between'}}>
                <View style={{flex: 1, margin: 10}}>
                    <Button
                        title="SAVE"
                        onPress={() => {
                            let indexNum = 0;
                            if (route.params.type === 'Expense') {
                                indexNum = 1;
                            }
                            datasource[indexNum].data[route.params.index] = {
                                key: Key,
                                amount: Amount,
                            };

                            navigation.navigate("Home");
                        }
                        }
                    />

                </View>

                <View style={{margin:10, flex:1}}>

                    <Button
                        title="Delete"
                        onPress={() => {
                            let indexNum = 0;
                            if (route.params.type === 'Expense') {
                                indexNum = 1;
                            }

                            Alert.alert('Are You sure?','',
                                [{text:'Yes', onPress: () => {
                                        datasource[indexNum].data.splice(route.params.index, 1);
                                        navigation.navigate("Home");
                                    }},
                                    {text:'No'}])
                        }
                        }
                    />
                </View>
            </View>
        </View>
    );
};

export default Edit;
