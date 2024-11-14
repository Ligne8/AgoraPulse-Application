import React, { useEffect, useRef } from 'react';
import { View, Animated, Easing, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface PulsatingIconProps {
  //eslint-disable-next-line
  IconComponent?: React.ComponentType<any>; // Accepts any Expo Icon component
  iconName?: string;
  iconSize?: number;
  iconColor?: string;
  circleSize?: number;
  circleColor?: string;
  animationDuration?: number;
  pulseDelay?: number;
}

export default function PulsatingIcon({
  IconComponent = Ionicons,
  iconName = 'search',
  iconSize = 80,
  iconColor = '#FFFFFF',
  circleSize = 100,
  circleColor = '#2A9BE2',
  animationDuration = 1200,
  pulseDelay = 300,
}: PulsatingIconProps) {
  const scaleAnim1 = useRef(new Animated.Value(0)).current;
  const opacityAnim1 = useRef(new Animated.Value(1)).current;
  const scaleAnim2 = useRef(new Animated.Value(0)).current;
  const opacityAnim2 = useRef(new Animated.Value(1)).current;
  const scaleAnim3 = useRef(new Animated.Value(0)).current;
  const opacityAnim3 = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const pulseAnimations = [
      {
        scaleAnim: scaleAnim1,
        opacityAnim: opacityAnim1,
        delay: pulseDelay,
      },
      {
        scaleAnim: scaleAnim2,
        opacityAnim: opacityAnim2,
        delay: pulseDelay,
      },
      {
        scaleAnim: scaleAnim3,
        opacityAnim: opacityAnim3,
        delay: pulseDelay,
      },
    ];

    const animations = pulseAnimations.map(({ scaleAnim, opacityAnim, delay }) =>
      Animated.loop(
        Animated.sequence([
          Animated.delay(delay),
          Animated.parallel([
            Animated.timing(scaleAnim, {
              toValue: 2,
              duration: animationDuration,
              easing: Easing.out(Easing.quad),
              useNativeDriver: true,
            }),
            Animated.timing(opacityAnim, {
              toValue: 0,
              duration: animationDuration,
              easing: Easing.out(Easing.quad),
              useNativeDriver: true,
            }),
          ]),
          Animated.timing(scaleAnim, {
            toValue: 0,
            duration: 0,
            useNativeDriver: true,
          }),
          Animated.timing(opacityAnim, {
            toValue: 1,
            duration: 0,
            useNativeDriver: true,
          }),
        ])
      )
    );

    Animated.stagger(pulseDelay, animations).start();
  }, [scaleAnim1, opacityAnim1, scaleAnim2, opacityAnim2, scaleAnim3, opacityAnim3, animationDuration, pulseDelay]);

  return (
    <View style={styles.container}>
      {/* Circle 1 */}
      <Animated.View
        style={[
          styles.circle,
          {
            borderColor: circleColor,
            backgroundColor: circleColor,
            width: circleSize,
            height: circleSize,
            borderRadius: circleSize / 2,
            transform: [{ scale: scaleAnim1 }],
            opacity: opacityAnim1,
          },
        ]}
      />
      {/* Circle 2 */}
      <Animated.View
        style={[
          styles.circle,
          {
            borderColor: circleColor,
            backgroundColor: circleColor,
            width: circleSize,
            height: circleSize,
            borderRadius: circleSize / 2,
            transform: [{ scale: scaleAnim2 }],
            opacity: opacityAnim2,
          },
        ]}
      />
      {/* Circle 3 */}
      <Animated.View
        style={[
          styles.circle,
          {
            borderColor: circleColor,
            backgroundColor: circleColor,
            width: circleSize,
            height: circleSize,
            borderRadius: circleSize / 2,
            transform: [{ scale: scaleAnim3 }],
            opacity: opacityAnim3,
          },
        ]}
      />
      {/* Icon in the center */}
      <View
        style={[
          styles.iconContainer,
          { width: iconSize + 40, height: iconSize + 40, borderRadius: (iconSize + 40) / 2 },
        ]}
      >
        <IconComponent name={iconName} size={iconSize} color={iconColor} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  circle: {
    position: 'absolute',
    borderWidth: 10,
  },
  iconContainer: {
    backgroundColor: '#0E3D60',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
