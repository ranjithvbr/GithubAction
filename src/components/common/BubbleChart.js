import React from "react";
import { View } from "react-native";
import * as d3 from "d3";
import Svg, { Circle, G, Text as SVGText } from "react-native-svg";
import { Fonts } from "../../styles/fonts";
export default class BubbleChart extends React.Component {
  render() {
    const { height, width, data, textProps, circleProps } = this.props;

    let pack = data =>
      d3
        .pack()
        .size([ width - 2, height - 2 ])
        .padding(3)(d3.hierarchy({ children: data }).sum(d => d.value));
    const root = pack(data);

    let fontSizeGenerator = value => {
      let size = 0;
      if (value < 10) {
        size = Fonts.size.small;
      } else if (value >= 10 && value < 50) {
        size = Fonts.size.base;
      } else {
        size = Fonts.size.medium;
      }
      return size;
    };

    let leaves = [];
    for (let leaf of root.leaves()) {
      leaves.push(
        <G transform={`translate(${leaf.x + 1},${leaf.y + 1})`}>
          <Circle {...circleProps} r={leaf.r} fill={leaf.data.color} />
          <SVGText
            fill="#FFFFFF"
            fontSize={fontSizeGenerator(leaf.data.value)}
            x="0"
            y={leaf.data.value * 0.1}
            textAnchor="middle"
          >{`${leaf.data.name}`}</SVGText>
          <SVGText
            {...textProps}
            fill="white"
            fontSize={fontSizeGenerator(leaf.data.value)}
            x={0}
            y={25}
            textAnchor="middle"
          >
            {`${leaf.data.value}`}
          </SVGText>
        </G>
      );
    }

    return (
      <View style={styles.container}>
        <Svg width={width || 400} height={height || 300}>
          {leaves}
        </Svg>
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1
  }
};
