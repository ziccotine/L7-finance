import React from 'react';
import {StatusBar, Button, SectionList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {datasource} from './Data.js';
import Navigation from "./Navigation.js";

const styles = StyleSheet.create({
    textStyle: {
        fontSize: 15,
        margin: 10,
        textAlign: 'left',
    },
    opacityStyle: {
        borderWidth: 1,
    },
    headerText: {
        fontSize: 20,
        margin: 10,
        textAlign: 'center',
        fontWeight:'bold',
    },
    circularButton: {
        backgroundColor: 'pink',
        width: 80,
        height: 80,
        borderRadius: 40,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
    },
    buttonText: {
        textAlign: 'center',
        fontWeight: 'bold',
    },
});

const Home = ({navigation}) => {

    const renderItem = ({item, index, section}) => {
        return (
            <TouchableOpacity style={styles.opacityStyle}
                              onPress={() =>
                              {
                                  navigation.navigate("Edit", {index: index, type:section.title, key:item.key, amount:item.amount});
                              }}
            >
                <Text style={styles.textStyle}>{item.key} - ${item.amount}</Text>
            </TouchableOpacity>
        );
    };

    const calculateIncome = () => {
        let totali = 0;
        datasource.forEach((section) => {
            if (section.title === "Incomes") {
                section.data.forEach((item) => {
                    totali += item.amount;
                });
            }
        });
        return totali;
    };

    const calculateExpense = () => {
        let totale = 0;
        datasource.forEach((section) => {
            if (section.title === "Expenses") {
                section.data.forEach((item) => {
                    totale += item.amount;
                });
            }
        });
        return totale;
    };

    const totalIncome = calculateIncome();
    const totalExpense = calculateExpense();
    const overallView = totalIncome - totalExpense;

    return (
        <View>
            <StatusBar/>
            <Button title='Add Income/Expense'
                    onPress={() => {navigation.navigate("Add")}}
            />
            <Text style={{ textAlign: 'center' }}>────────────────── ⋆⋅☆⋅⋆ ──────────────────</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-around'}}>
                <TouchableOpacity
                    style={styles.circularButton}
                    onPress={() => alert(`Total Income: $${totalIncome}`)}
                >
                <Text style={styles.buttonText}>Total Income</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.circularButton}
                    onPress={() => alert(`Total Expense: $${totalExpense}`)}
                >
                    <Text style={styles.buttonText}>Total Expense</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.circularButton}
                    onPress={() =>
                        alert(
                            `Income: $${totalIncome}\nExpense: $${totalExpense}\nRemaining Balance: $${overallView}`
                        )
                    }
                >
                    <Text style={styles.buttonText}>Overall</Text>
                </TouchableOpacity>
            </View>
            <Text style={{ textAlign: 'center' }}>────────────────── ⋆⋅☆⋅⋆ ──────────────────</Text>
            <SectionList sections={datasource} renderItem={renderItem}
                         renderSectionHeader={({section:{title,bgcolor}})=>(
                             <Text style={[styles.headerText,{backgroundColor:bgcolor}]}>
                                 {title}
                             </Text>
                         )}/>
        </View>
    );
};

export default Home;
