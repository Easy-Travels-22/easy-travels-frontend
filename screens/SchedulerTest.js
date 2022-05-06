import { StatusBar } from "expo-status-bar";
import React, { useRef, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  PanResponder,
  Animated,
  FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SchedulerScreen() {
  let itemArr = [
    { name: "destination 1", key: "0" },
    { name: "destination 2", key: "1" },
    { name: "destination 3", key: "2" },
    { name: "destination 4", key: "3" },
    { name: "destination 5", key: "4" },
    { name: "destination 6", key: "5" },
    { name: "destination 7", key: "6" },
    { name: "destination 8", key: "7" },
    { name: "destination 9", key: "8" },
    { name: "destination 10", key: "9" },
    { name: "destination 11", key: "10" },
    { name: "destination 12", key: "11" },
  ];
  const [isDragging, setIsDragging] = useState(false);
  const pan = useRef(new Animated.ValueXY()).current;
  const cursor = new Animated.ValueXY();
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
      onPanResponderGrant: (evt, gestureState) => {
        // The gesture has started. Show visual feedback so the user knows
        // what is happening!
        // gestureState.d{x,y} will be set to zero now
        console.log("gesture fine" + gestureState.y0);
        setIsDragging(true);
      },
      onPanResponderMove: (evt, gestureState) => {
        console.log("gesture movin" + gestureState.moveY);
        Animated.event([{ y: cursor.y }], { useNativeDriver: false })({
          y: gestureState.moveY,
        });
        console.log(cursor.getLayout().top);
        console.log(cursor.y._value);
      },
      onPanResponderTerminationRequest: (evt, gestureState) => false,
      onPanResponderRelease: () => {
        // pan.flattenOffset();
        setIsDragging(false);
      },
      onShouldBlockNativeResponder: (evt, gestureState) => {
        // Returns whether this component should block native components from becoming the JS
        // responder. Returns true by default. Is currently only supported on android.
        return true;
      },
    })
  ).current;

  const renderItem = ({ item }) => (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 2,
        borderStyle: "solid",
        borderColor: "cyan",
        height: 55,
        borderRadius: 10,
      }}
    >
      <View {...panResponder.panHandlers}>
        <Text>
          {"    "}||{"    "}
        </Text>
      </View>

      <Text>{item.name}</Text>
    </View>
  );
  return (
    <View style={styles.container}>
      <View style={{ backgroundColor: "cyan", height: 30, width: "100%" }}>
        <Text>arbitrary placeholder</Text>
      </View>
      <View
        style={{
          flex: 1,
          alignSelf: "stretch",
          position: "relative",
        }}
      >
        {isDragging && (
          <Animated.View
            style={[
              {
                zIndex: 2,
                position: "absolute",
                top: cursor.y._value,
                // transform: [{ translateY: cursor.getLayout().top }],
                width: "100%",
              },
              cursor.getLayout(),
            ]}
          >
            {renderItem({ item: { name: "destination 0123", key: "11" } })}
          </Animated.View>
        )}
        <FlatList
          scrollEnabled={!isDragging}
          data={itemArr}
          renderItem={renderItem}
          keyExtractor={(item) => item.key}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "flex-start",
    paddingVertical: 20,
    paddingHorizontal: 28,
    backgroundColor: "white",
  },
  titleText: {
    fontSize: 14,
    lineHeight: 24,
    fontWeight: "bold",
  },
  box: {
    height: 150,
    width: 150,
    backgroundColor: "blue",
    borderRadius: 5,
  },
});
