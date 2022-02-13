import React, { useState } from "react";
import {
  Text,
  View,
  ScrollView,
  SafeAreaView,
  Image,
  TouchableOpacity
} from "react-native";

import styles from "./styles";
import StaticData from "../common/Setting.json";
import { icons } from "../common/Icons";

const FilterScreen = ({ handleFilter }) => {
  const [ filterData, setfilterData ] = useState(StaticData.FilterData);

  const selectOption = (itemData, item, index) => {
    let newArr = [ ...filterData ];
    for (var i = 0; i < newArr.length; i++) {
      if (newArr[i] === itemData) {
        newArr[i].feilds[index].status = !item.status;
      }
    }
    setfilterData(newArr);
  };

  return (
    <SafeAreaView style={styles.centeredView}>
      <ScrollView>
        <View style={styles.mainView}>
          <Text style={styles.headingText}>Filter feed</Text>
          <TouchableOpacity
            style={styles.closeView}
            onPress={() => handleFilter(filterData)}
          >
            <Image source={icons.closeIcon} style={styles.closeIcon} />
          </TouchableOpacity>
          {filterData.map(itemData => {
            return (
              <View style={styles.titleView}>
                <Text style={styles.titleText}>{itemData.name}</Text>
                {itemData.feilds.map((item, index) => (
                  <View style={styles.flatMainView}>
                    <TouchableOpacity
                      onPress={() => selectOption(itemData, item, index)}
                      style={styles.borderView}
                    >
                      <View
                        style={
                          item.status === true
                            ? styles.borderColorView
                            : styles.borderUnselectView
                        }
                      />
                    </TouchableOpacity>
                    <View>
                      <Text style={styles.dataTitle}>{item.heading}</Text>
                      {item.type ? (
                        <Text style={styles.dataSubTitle}>{item.type}</Text>
                      ) : null}
                    </View>
                  </View>
                ))}
              </View>
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default FilterScreen;
