import React, { useRef, useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Animated,
  Easing,
  TouchableOpacity,
  TouchableHighlight,
} from "react-native";

export default function FloatingButtons({ fn }) {
  const [buttonIsOpen, setIsOpen] = useState(false);
  useEffect(() => {
    if (buttonIsOpen) {
      open();
    } else {
      close();
    }
  }, [buttonIsOpen]);

  const handleMainButton = () => {
    setIsOpen(!buttonIsOpen);
  };
  const handleSecondaryButton = () => {
    setIsOpen(false);
    fn();
  };

  const baseAnimationTime = 10;
  const variableAnimationTime = 80;

  const slideAnim2 = useRef(new Animated.Value(400)).current;
  const slideAnim3 = useRef(new Animated.Value(400)).current;
  const slideAnim4 = useRef(new Animated.Value(400)).current;
  const slideAnim5 = useRef(new Animated.Value(400)).current;
  const slideOut = (order, animatedValue) => {
    Animated.timing(animatedValue, {
      toValue: 0,
      duration: baseAnimationTime + order * variableAnimationTime,
      useNativeDriver: true,
    }).start();
  };
  const slideIn = (order, animatedValue) => {
    Animated.timing(animatedValue, {
      toValue: 400,
      duration: baseAnimationTime + order * variableAnimationTime,
      useNativeDriver: true,
    }).start();
  };

  const open = () => {
    slideOut(2, slideAnim2);
    slideOut(3, slideAnim3);
    slideOut(4, slideAnim4);
    slideOut(5, slideAnim5);
  };

  const close = () => {
    slideIn(2, slideAnim2);
    slideIn(3, slideAnim3);
    slideIn(4, slideAnim4);
    slideIn(5, slideAnim5);
  };
  return (
    <View style={[styles.buttons__container]}>
      <TouchableHighlight
        style={[styles.button__circle, styles.button__primary]}
        onPress={handleMainButton}
        activeOpacity={0.5}
        underlayColor="darkgrey"
      >
        <View></View>
      </TouchableHighlight>
      <View style={styles.secondaryButtons__container}>
        <View
          style={{
            height: 35.2,
          }}
        ></View>
        <Animated.View
          style={[
            styles.button__secondary,
            {
              transform: [{ translateY: slideAnim2 }],
            },
          ]}
        >
          <View style={styles.button__label}>
            <Text>Transit</Text>
          </View>
          <TouchableOpacity
            style={[styles.button__circle]}
            onPress={handleSecondaryButton}
          ></TouchableOpacity>
        </Animated.View>
        <Animated.View
          style={[
            styles.button__secondary,
            {
              transform: [{ translateY: slideAnim3 }],
            },
          ]}
        >
          <View style={styles.button__label}>
            <Text>Lodging</Text>
          </View>
          <TouchableOpacity
            style={[styles.button__circle]}
            onPress={handleSecondaryButton}
          ></TouchableOpacity>
        </Animated.View>
        <Animated.View
          style={[
            styles.button__secondary,
            {
              transform: [{ translateY: slideAnim4 }],
            },
          ]}
        >
          <View style={styles.button__label}>
            <Text>Food</Text>
          </View>
          <TouchableOpacity
            style={[styles.button__circle]}
            onPress={handleSecondaryButton}
          ></TouchableOpacity>
        </Animated.View>
        <Animated.View
          style={[
            styles.button__secondary,
            {
              transform: [{ translateY: slideAnim5 }],
            },
          ]}
        >
          <View style={styles.button__label}>
            <Text>Activity</Text>
          </View>
          <TouchableOpacity
            style={[styles.button__circle]}
            onPress={handleSecondaryButton}
          ></TouchableOpacity>
        </Animated.View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  buttons__container: {
    position: "absolute",
    flexDirection: "column-reverse",
    alignItems: "flex-end",
    bottom: 30,
    right: 30,
  },
  secondaryButtons__container: {
    flexDirection: "column-reverse",
    overflow: "hidden",
    height: 400,
    justifyContent: "space-between",
    bottom: -32.5,
  },
  button__label: {
    // for future styling
  },
  button__circle: {
    width: 65,
    height: 65,
    borderRadius: 100,
    backgroundColor: "lightgrey",
    marginLeft: 20,
  },
  button__primary: {
    backgroundColor: "grey",
    zIndex: 2,
  },
  button__secondary: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    // transform: [{ translateY: 400 }],
  },
  button__activity: {
    backgroundColor: "blue",
  },
});
