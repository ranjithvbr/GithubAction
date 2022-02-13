import React, { useState } from "react";
import {
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  SafeAreaView,
  Image,
  Dimensions,
  Modal
} from "react-native";
import styles from "./styles";
import { icons } from "../common/Icons";
import {
  Menu,
  MenuTrigger,
  MenuOptions,
  MenuOption
} from "react-native-popup-menu";
import { Colors } from "../../styles/colors";
import FilterScreen from "../filterScreen";
import MonitorData from "../common/monitor.json";
import { PlatformType } from "../../constant/commonType";
import { ApplicationConstant } from "../../constant/message";
import { commonStyles } from "../../styles/commonStyles";

const welcomeBackScreen = ({ navigation }) => {
  const searchData = MonitorData.data;
  const [ sourceData, setSourceData ] = useState(MonitorData.data);
  const [ modalVisible, setModalVisible ] = useState(false);
  const [ openFilter, setOpenFilter ] = useState(false);
  const [ subTitle, setSubTitle ] = useState(ApplicationConstant.LOREM_IPSUM);
  const [ description, setDescription ] = useState(ApplicationConstant.VIVAMUS);
  const screenWidth = Dimensions.get("window").width;

  const handleFilterList = (item, filterValue) => {
    let nonRelatedFilter =
      !item.Source.toLowerCase().includes(
        PlatformType.GOOGLE.toLocaleLowerCase()
      ) &&
      !item.Type.toLowerCase().includes(
        PlatformType.PUBLIC.toLocaleLowerCase()
      ) &&
      !item.Type.toLowerCase().includes(
        PlatformType.ALERT.toLocaleLowerCase()
      ) &&
      !item.Type.toLowerCase().includes(
        PlatformType.ACTIVITY.toLocaleLowerCase()
      );

    const id = filterValue.find(element => {
      if (item.Source.toLowerCase().includes(element)) {
        return true;
      }
      if (item.Type.toLowerCase().includes(element)) {
        return true;
      }
    });
    if (id || nonRelatedFilter) {
      return item;
    }
  };

  const handleFilter = async (data = []) => {
    const PUBLIC_SERVICES = "Public services";
    setOpenFilter(false);
    let filterValue = [];
    data.length > 0 &&
      data[0] &&
      data[1].feilds.map(li => {
        if (li.status) {
          filterValue.push(
            li.heading === PUBLIC_SERVICES
              ? PlatformType.PUBLIC.toLocaleLowerCase()
              : li.heading.toLowerCase()
          );
        }
      });
    let arr = await searchData.filter(item => {
      return handleFilterList(item, filterValue);
    });
    setSourceData(arr);
  };

  if (openFilter) {
    return <FilterScreen handleFilter={handleFilter} />;
  }

  const header = () => {
    return (
      <View style={styles.headerView}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Image
            style={styles.backNavigation}
            resizeMode={"contain"}
            source={require("../../assets/Back.png")}
          />
        </TouchableOpacity>
        <View style={styles.headerSubView}>
          <Text style={styles.welcomeTitle}>
            {ApplicationConstant.WHO_IS_USING_YOUR_DATA}
          </Text>
          <Text style={styles.headerSubTitle}>
            {ApplicationConstant.CONNECTED_SERVICES}
          </Text>
          <View style={styles.socialIconView}>
            <Image source={icons.googleIcon} style={styles.headerGIcon} />
            <Image source={icons.pdIcon} style={styles.headerPDIcon} />
          </View>
        </View>
      </View>
    );
  };

  const modelButtons = item => {
    return (
      <View style={styles.finalView}>
        <Text style={styles.finalTitle}>{item.time}</Text>
        <Menu>
          <MenuTrigger>
            <Image source={icons.moreIcon} style={styles.moreIcon} />
          </MenuTrigger>
          <MenuOptions
            customStyles={{
              optionsContainer: {
                width: screenWidth - 20,
                marginLeft: 5,
                marginRight: 15
              }
            }}
          >
            <MenuOption style={styles.modalFlexView}>
              <Image source={icons.flagIcon} style={styles.modalIcon} />
              <Text style={styles.modalText}>
                {ApplicationConstant.FLAG_ISSUE}
              </Text>
            </MenuOption>
            <MenuOption style={styles.modalFlexView}>
              <Image source={icons.unionIcon} style={styles.modalIcon} />
              <Text style={styles.modalText}>
                {ApplicationConstant.FLAG_ISSUE}
              </Text>
            </MenuOption>
          </MenuOptions>
        </Menu>
      </View>
    );
  };

  const openModal = item => {
    setModalVisible(true);
    setSubTitle(item.Summary);
    setDescription(item.Description);
  };

  const listItem = (item, index) => {
    return (
      <View key={index.toString()}>
        <View style={styles.flatListView}>
          <View style={styles.flatListFirstView}>
            <View style={[ styles.stepView, { backgroundColor: item.colorCode } ]}>
              <Image source={icons.googleIcon} style={styles.stepIconFirst} />
            </View>

            <View style={styles.contentView}>
              <Text style={styles.contentName}>{item.Source}</Text>

              {item.Type ? (
                <Text style={styles.contentRequest}>{item.Type}</Text>
              ) : null}

              {item.Usage_Purpose ? (
                <TouchableOpacity
                  onPress={() => openModal(item)}
                  style={styles.identityView}
                >
                  <Image source={icons.infoIcon} style={styles.infoIcon} />
                  <Text style={styles.identityTitle}>{item.Usage_Purpose}</Text>
                </TouchableOpacity>
              ) : null}

              {item.explanation ? (
                <View>
                  <Text style={styles.contentExp} numberOfLines={2}>
                    {item.explanation}
                  </Text>
                </View>
              ) : null}
            </View>
          </View>

          {modelButtons(item)}
        </View>
        <View style={styles.lineView} />
      </View>
    );
  };

  const showModal = () => {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalView}>
          <TouchableOpacity
            onPress={() => setModalVisible(false)}
            style={styles.modalCloseButton}
          >
            <Image source={icons.closeIcon} style={styles.closeIcon} />
          </TouchableOpacity>
          <View style={styles.modalViewText}>
            <Text style={styles.title}>{subTitle}</Text>
            <Text style={styles.agreement}>{description}</Text>
            <View style={styles.submitView}>
              <TouchableOpacity
                style={styles.submit}
                onPress={() => setModalVisible(false)}
                underlayColor={Colors.white}
              >
                <Text style={styles.submitText}>OK</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    );
  };

  const todayView = () => {
    return (
      <View style={styles.todayView}>
        <View style={styles.flexView}>
          <Text style={styles.todayTitle}>{ApplicationConstant.TODAY}</Text>
          <TouchableOpacity onPress={() => setOpenFilter(true)}>
            <Image source={icons.filterIcon} style={styles.filterIcon} />
          </TouchableOpacity>
        </View>
        <View style={styles.mapView}>
          {sourceData.map((itemData, index) => (
            <View>
              {itemData !== null
                ? itemData.show
                  ? listItem(itemData, index)
                  : null
                : null}
            </View>
          ))}
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={commonStyles.flex1}>
      <View style={styles.centeredView}>
        <ScrollView>
          {header()}
          {todayView()}
          {showModal()}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default welcomeBackScreen;
