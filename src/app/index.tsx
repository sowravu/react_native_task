import * as React from "react";
import { useRef } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Animated,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const { width } = Dimensions.get("window");

export default function Index() {
  const router = useRouter();
  const scaleValue = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scaleValue, {
      toValue: 0.9,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleValue, {
      toValue: 1,
      friction: 4,
      tension: 40,
      useNativeDriver: true,
    }).start();
  };

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />

      {/* Illustration Section */}
      <View style={styles.illustrationContainer}>
        <Image
          source={require("../../assets/images/onboarding_illustration.png")}
          style={styles.illustration}
          resizeMode="cover"
        />
      </View>

      {/* Content and Actions Section */}
      <SafeAreaView style={styles.bottomSection} edges={["bottom", "left", "right"]}>
        <View style={styles.textContainer}>
          <Text style={styles.title}>Your Credit Score</Text>
          <Text style={styles.subtitle}>
            We provide you with the tools to monitor, understand, and improve
            your credit score.
          </Text>
        </View>

        {/* Circular Interactive Next Button */}
        <Animated.View
          style={[styles.buttonContainer, { transform: [{ scale: scaleValue }] }]}
        >
          <TouchableOpacity
            activeOpacity={0.8}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            onPress={() => router.push("/login")}
            style={styles.outerCircle}
          >
            <View style={styles.innerCircle}>
              <Feather name="chevron-right" size={26} color="#FFF" />
            </View>
          </TouchableOpacity>
        </Animated.View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  illustrationContainer: {
    flex: 1.6, // Allow illustration to expand and occupy more screen real estate
    width: "100%",
  },
  illustration: {
    width: "100%",
    height: "100%",
  },
  bottomSection: {
    width: "100%",
    paddingHorizontal: 32,
    paddingBottom: 40,
    flexDirection: "column",
    justifyContent: "flex-end",
  },
  textContainer: {
    marginBottom: 24,
    alignItems: "flex-start",
  },
  title: {
    fontSize: 34,
    fontWeight: "700",
    color: "#0F172A", // Modern slate-900
    letterSpacing: -0.8,
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    lineHeight: 24,
    color: "#64748B", // Modern slate-500
    fontWeight: "400",
    letterSpacing: -0.2,
    maxWidth: "85%",
  },
  buttonContainer: {
    alignSelf: "flex-end",
    marginTop: 10,
  },
  outerCircle: {
    width: 76,
    height: 76,
    borderRadius: 38,
    borderWidth: 2,
    borderColor: "#346AFD", // Premium Kojo brand blue
    justifyContent: "center",
    alignItems: "center",
    padding: 3,
  },
  innerCircle: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: "#346AFD",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#346AFD",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4,
  },
});
