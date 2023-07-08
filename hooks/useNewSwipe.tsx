import { useRef } from "react";
import { PanResponder, PanResponderGestureState } from "react-native";

export function useNewSwipe(
  onSwipeLeft?: any,
  onSwipeRight?: any,
  onSwipeUp?: any,
  onSwipeDown?: any,
  swipeThreshold = 50,
  swipeVelocityThreshold = 0.3
) {
  const swipeDirection = useRef("");

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (evt, gestureState) => {
        return Math.abs(gestureState.dx) > 5 || Math.abs(gestureState.dy) > 5;
      },
      onPanResponderMove: (evt, gestureState) => {
        if (Math.abs(gestureState.dx) > Math.abs(gestureState.dy)) {
          if (gestureState.dx > swipeThreshold) {
            swipeDirection.current = "right";
          } else if (gestureState.dx < -swipeThreshold) {
            swipeDirection.current = "left";
          }
        } else {
          if (gestureState.dy > swipeThreshold) {
            swipeDirection.current = "down";
          } else if (gestureState.dy < -swipeThreshold) {
            swipeDirection.current = "up";
          }
        }
      },
      onPanResponderRelease: (evt, gestureState) => {
        if (swipeDirection.current === "right") {
          onSwipeRight && onSwipeRight();
        } else if (swipeDirection.current === "left") {
          onSwipeLeft && onSwipeLeft();
        } else if (swipeDirection.current === "up") {
          onSwipeUp && onSwipeUp();
        } else if (swipeDirection.current === "down") {
          onSwipeDown && onSwipeDown();
        }
        swipeDirection.current = "";
      },
      onPanResponderTerminate: () => {
        swipeDirection.current = "";
      },
      onShouldBlockNativeResponder: () => {
        return true;
      },
    })
  ).current;

  return panResponder;
}
