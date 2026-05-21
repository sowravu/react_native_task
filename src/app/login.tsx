import React, { useState, useRef } from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Switch,
  Animated,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { Feather, Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function Login() {
  const router = useRouter();
  
  // State for form fields
  const [phone, setPhone] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [keepLoggedIn, setKeepLoggedIn] = useState(false);

  // Focus states for fields to highlight borders
  const [focusedField, setFocusedField] = useState<string | null>(null);

  // Scale animation for login button
  const buttonScale = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(buttonScale, {
      toValue: 0.96,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(buttonScale, {
      toValue: 1,
      friction: 4,
      tension: 40,
      useNativeDriver: true,
    }).start();
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardView}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Back Navigation Arrow */}
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
            activeOpacity={0.7}
          >
            <Feather name="arrow-left" size={24} color="#0F172A" />
          </TouchableOpacity>

          {/* Logo Section */}
          <View style={styles.logoSection}>
            <Image
              source={require("../../assets/images/kojo_logo.png")}
              style={styles.logoImage}
              resizeMode="contain"
            />
          </View>

          {/* Form Fields Section */}
          <View style={styles.formContainer}>
            
            {/* Phone Number Field */}
            <Text style={styles.label}>
              Phone Number<Text style={styles.requiredAsterisk}>*</Text>
            </Text>
            <View style={styles.phoneInputRow}>
              {/* Country Picker Mock */}
              <TouchableOpacity style={styles.countryPicker} activeOpacity={0.8}>
                <Text style={styles.flagEmoji}>🇺🇸</Text>
                <Feather name="chevron-down" size={14} color="#3B82F6" style={styles.pickerChevron} />
              </TouchableOpacity>
              <TextInput
                style={[
                  styles.input,
                  styles.phoneInput,
                  focusedField === "phone" && styles.inputFocused,
                ]}
                placeholder="Enter Your Phone Number"
                placeholderTextColor="#94A3B8"
                keyboardType="phone-pad"
                value={phone}
                onChangeText={setPhone}
                onFocus={() => setFocusedField("phone")}
                onBlur={() => setFocusedField(null)}
              />
            </View>

            {/* First Name Field */}
            <Text style={styles.label}>
              First Name<Text style={styles.requiredAsterisk}>*</Text>
            </Text>
            <TextInput
              style={[
                styles.input,
                focusedField === "firstName" && styles.inputFocused,
              ]}
              placeholder="Enter Your First Name"
              placeholderTextColor="#94A3B8"
              value={firstName}
              onChangeText={setFirstName}
              onFocus={() => setFocusedField("firstName")}
              onBlur={() => setFocusedField(null)}
            />

            {/* Last Name Field */}
            <Text style={styles.label}>
              Last Name<Text style={styles.requiredAsterisk}>*</Text>
            </Text>
            <TextInput
              style={[
                styles.input,
                focusedField === "lastName" && styles.inputFocused,
              ]}
              placeholder="Enter Your Last Name"
              placeholderTextColor="#94A3B8"
              value={lastName}
              onChangeText={setLastName}
              onFocus={() => setFocusedField("lastName")}
              onBlur={() => setFocusedField(null)}
            />

            {/* Email Address Field */}
            <Text style={styles.label}>
              Email Address<Text style={styles.requiredAsterisk}>*</Text>
            </Text>
            <TextInput
              style={[
                styles.input,
                focusedField === "email" && styles.inputFocused,
              ]}
              placeholder="Enter Your Email"
              placeholderTextColor="#94A3B8"
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
              onFocus={() => setFocusedField("email")}
              onBlur={() => setFocusedField(null)}
            />

            {/* Biometric Login Section */}
            <TouchableOpacity style={styles.biometricRow} activeOpacity={0.7}>
              <Ionicons name="finger-print-outline" size={20} color="#3B82F6" />
              <Text style={styles.biometricText}>Use Biometric Login</Text>
            </TouchableOpacity>

            {/* Submit Action Button */}
            <Animated.View style={{ transform: [{ scale: buttonScale }] }}>
              <TouchableOpacity
                style={styles.loginButton}
                activeOpacity={0.9}
                onPressIn={handlePressIn}
                onPressOut={handlePressOut}
                onPress={() => router.replace("/home")}
              >
                <Text style={styles.loginButtonText}>Log In</Text>
              </TouchableOpacity>
            </Animated.View>

            {/* Keep me logged in toggle */}
            <View style={styles.toggleRow}>
              <Text style={styles.toggleLabel}>Keep me logged in</Text>
              <Switch
                trackColor={{ false: "#E2E8F0", true: "#93C5FD" }}
                thumbColor={keepLoggedIn ? "#3B82F6" : "#F1F5F9"}
                onValueChange={setKeepLoggedIn}
                value={keepLoggedIn}
              />
            </View>

            {/* Footer Navigation Link */}
            <View style={styles.footerContainer}>
              <Text style={styles.footerText}>
                Don't have an account ?{" "}
                <Text style={styles.signUpLink} onPress={() => {}}>
                  Sign Up
                </Text>
              </Text>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  backButton: {
    alignSelf: "flex-start",
    marginTop: 8,
    marginBottom: 8,
    padding: 6,
    borderRadius: 20,
    backgroundColor: "#F8FAFC",
  },
  logoSection: {
    alignItems: "center",
    marginVertical: 10,
  },
  logoImage: {
    width: 200,
    height: 150,
  },
  formContainer: {
    marginTop: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#334155",
    marginBottom: 8,
    marginTop: 14,
  },
  requiredAsterisk: {
    color: "#EF4444",
  },
  phoneInputRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  countryPicker: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    backgroundColor: "#FAFAFA",
    borderRadius: 12,
    height: 48,
    paddingHorizontal: 12,
    marginRight: 10,
  },
  flagEmoji: {
    fontSize: 18,
  },
  pickerChevron: {
    marginLeft: 6,
  },
  input: {
    flex: 1,
    height: 48,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    backgroundColor: "#FAFAFA",
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 14,
    color: "#1E293B",
  },
  phoneInput: {
    flex: 1.8,
  },
  inputFocused: {
    borderColor: "#3B82F6",
    backgroundColor: "#FFFFFF",
  },
  biometricRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 18,
    marginBottom: 10,
    alignSelf: "flex-start",
  },
  biometricText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#64748B",
    marginLeft: 8,
  },
  loginButton: {
    width: "100%",
    height: 50,
    borderRadius: 12,
    backgroundColor: "#3B82F6",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 16,
    shadowColor: "#3B82F6",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 3,
  },
  loginButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  toggleRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 16,
    paddingHorizontal: 4,
  },
  toggleLabel: {
    fontSize: 14,
    fontWeight: "500",
    color: "#64748B",
  },
  footerContainer: {
    alignItems: "center",
    marginTop: 32,
    marginBottom: 10,
  },
  footerText: {
    fontSize: 14,
    color: "#64748B",
  },
  signUpLink: {
    color: "#3B82F6",
    fontWeight: "600",
  },
});
