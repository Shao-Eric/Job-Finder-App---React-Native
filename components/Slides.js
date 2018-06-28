import React, { Component } from "react";
import { View, Text, ScrollView, StyleSheet, Dimensions } from "react-native";
import { Button } from "react-native-elements";

const SCREEN_WIDTH = Dimensions.get("window").width;

class Slides extends Component {
  renderLastSlide = index => {
    if (index === this.props.data.length - 1) {
      return (
        <Button
          text="Onwards!"
          onPress={this.props.onButtonPressed}
          textStyle={{ fontSize: 25 }}
          buttonStyle={styles.buttonStyle}
        />
      );
    }
    return null;
  };

  renderSlides = () => {
    return this.props.data.map((slide, index) => {
      return (
        <View key={slide.text} style={[styles.slide, { backgroundColor: slide.color }]}>
          <Text style={styles.slideText}>{slide.text}</Text>
          {this.renderLastSlide(index)}
        </View>
      );
    });
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          style={{ flex: 1 }}
        >
          {this.renderSlides()}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    width: SCREEN_WIDTH,
    alignItems: "center",
    justifyContent: "center"
  },

  slideText: {
    fontSize: 30,
    textAlign: "center",
    color: "white"
  },
  buttonStyle: {
    backgroundColor: "#0288D1",
    marginTop: 15
  }
});

export default Slides;
