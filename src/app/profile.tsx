import * as React from "react";
import { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Image,
  Switch,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { Feather, Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { BlurView } from "expo-blur";
const TypedBlurView = BlurView as any;
import Svg, {
  Path,
  Rect,
  G,
  Text as SvgText,
} from "react-native-svg";

const { width } = Dimensions.get("window");

export default function Profile() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"home" | "messages" | "analytics" | "wallet" | "profile">("profile");

  // Interactive Switch States
  const [faceIdEnabled, setFaceIdEnabled] = useState(false);
  const [fingerprintEnabled, setFingerprintEnabled] = useState(false);
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />

      {/* Curved lavender header segment */}
      <SafeAreaView edges={["top"]} style={styles.headerBackground}>
        <View style={styles.headerRow}>
          {/* Back Caret Button */}
          <TouchableOpacity
            style={styles.headerButton}
            onPress={() => router.replace("/home")}
            activeOpacity={0.8}
          >
            <Feather name="chevron-left" size={20} color="#0F172A" />
          </TouchableOpacity>

          {/* Page Title */}
          <Text style={styles.headerTitle}>Profile</Text>

          {/* Forward Caret Button */}
          <TouchableOpacity
            style={styles.headerButton}
            activeOpacity={0.8}
            onPress={() => router.replace("/home")}
          >
            <Feather name="chevron-right" size={20} color="#0F172A" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      {/* Main Curved White Body Sheet */}
      <View style={styles.bodySheet}>
        <ScrollView
          style={styles.scrollContainer}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Avatar & Character Section */}
          <View style={styles.avatarContainer}>
            <View style={styles.avatarBorderRing}>
              <Image
                source={require("../../assets/images/sarah_avatar.png")}
                style={styles.avatarImage}
              />
            </View>
            <Text style={styles.profileName}>Sarah Joe</Text>
          </View>

          {/* Personal Info Rows */}
          <View style={styles.infoSection}>
            {/* Email Row */}
            <View style={styles.infoRow}>
              <View style={styles.iconWrapper}>
                <Feather name="mail" size={20} color="#346AFD" />
              </View>
              <View style={styles.infoTextContainer}>
                <Text style={styles.infoLabel}>Email</Text>
                <Text style={styles.infoValue}>Sample@example.com</Text>
              </View>
            </View>

            {/* Phone Row */}
            <View style={styles.infoRow}>
              <View style={styles.iconWrapper}>
                <Feather name="smartphone" size={20} color="#346AFD" />
              </View>
              <View style={styles.infoTextContainer}>
                <Text style={styles.infoLabel}>Phone</Text>
                <Text style={styles.infoValue}>(968) 000- 8888</Text>
              </View>
            </View>

            {/* DOB Row - Using mail/placeholder exactly per figma design */}
            <View style={styles.infoRow}>
              <View style={styles.iconWrapper}>
                <Feather name="mail" size={20} color="#346AFD" />
              </View>
              <View style={styles.infoTextContainer}>
                <Text style={styles.infoLabel}>DOB</Text>
                <Text style={styles.infoValue}>Sample@example.com</Text>
              </View>
            </View>
          </View>

          {/* Security Preferences Section */}
          <Text style={styles.sectionHeader}>Security</Text>

          <View style={styles.preferenceContainer}>
            {/* Face ID Row */}
            <View style={styles.preferenceRow}>
              <View style={styles.iconWrapper}>
                <Ionicons name="happy-outline" size={20} color="#346AFD" />
              </View>
              <View style={styles.preferenceTextContainer}>
                <Text style={styles.preferenceLabel}>Face ID</Text>
                <Text style={styles.preferenceSubtext}>Use Face ID to unlock the app</Text>
              </View>
              <Switch
                trackColor={{ false: "#E2E8F0", true: "#346AFD" }}
                thumbColor="#FFFFFF"
                ios_backgroundColor="#E2E8F0"
                onValueChange={setFaceIdEnabled}
                value={faceIdEnabled}
              />
            </View>

            {/* Fingerprint Row */}
            <View style={styles.preferenceRow}>
              <View style={styles.iconWrapper}>
                <Ionicons name="finger-print" size={20} color="#346AFD" />
              </View>
              <View style={styles.preferenceTextContainer}>
                <Text style={styles.preferenceLabel}>Fingerprint</Text>
                <Text style={styles.preferenceSubtext}>Use Fingerprint to unlock the app</Text>
              </View>
              <Switch
                trackColor={{ false: "#E2E8F0", true: "#346AFD" }}
                thumbColor="#FFFFFF"
                ios_backgroundColor="#E2E8F0"
                onValueChange={setFingerprintEnabled}
                value={fingerprintEnabled}
              />
            </View>
          </View>

          {/* Appearance Section */}
          <Text style={styles.sectionHeader}>Appearance</Text>

          <View style={styles.preferenceContainer}>
            {/* Dark Mode Row */}
            <View style={styles.preferenceRow}>
              <View style={styles.iconWrapper}>
                <Feather name="moon" size={20} color="#346AFD" />
              </View>
              <View style={styles.preferenceTextContainer}>
                <Text style={styles.preferenceLabel}>Dark Mode</Text>
                <Text style={styles.preferenceSubtext}>Use dark mode theme across the app</Text>
              </View>
              <Switch
                trackColor={{ false: "#E2E8F0", true: "#346AFD" }}
                thumbColor="#FFFFFF"
                ios_backgroundColor="#E2E8F0"
                onValueChange={setDarkModeEnabled}
                value={darkModeEnabled}
              />
            </View>
          </View>

          {/* Extra spacer at the bottom to avoid tabbar overlap */}
          <View style={styles.scrollSpacer} />
        </ScrollView>
      </View>

      {/* Premium Frosted Glass Bottom Tab Bar */}
      <View style={styles.tabBar}>
        <TypedBlurView
          intensity={80}
          tint="light"
          style={{
            position: "absolute",
            left: "1.37%",
            right: "0.87%",
            top: 13,
            height: 70,
            borderRadius: 35,
            overflow: "hidden",
            borderWidth: 1,
            borderColor: "rgba(255, 255, 255, 0.35)",
            backgroundColor: "rgba(255, 255, 255, 0.08)",
          }}
        />
        <Svg
          width="100%"
          height="100%"
          viewBox="0 0 402 83"
          fill="none"
          preserveAspectRatio="xMidYMid meet"
          style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
        >
          {/* Transparent SVG Rect to preserve structural layout */}
          <Rect
            x="5.5"
            y="13"
            width="393"
            height="70"
            rx="35"
            fill="transparent"
          />

          {/* Home Tab Icon - Inactive */}
          <G transform="translate(42, 36)">
            <Path
              d="M9.09644 3.31476C10.3496 2.34403 12.3345 2.23587 13.7234 3.02863L13.9929 3.19952L19.7537 7.2298C20.2227 7.55826 20.6665 8.09692 20.9939 8.72394C21.3213 9.35112 21.5095 10.0242 21.5095 10.5999V17.3802C21.5094 19.6538 19.664 21.5001 17.3904 21.5003H6.61011C4.3378 21.5003 2.49022 19.6455 2.48999 17.3704V10.47L2.4978 10.265C2.53449 9.77632 2.69782 9.22066 2.95874 8.69073C3.25678 8.08546 3.66124 7.55653 4.08765 7.22394L9.09644 3.31476ZM11.9998 13.7503C11.3137 13.7504 10.7498 14.3142 10.7498 15.0003V18.0003C10.7499 18.6862 11.3138 19.2502 11.9998 19.2503C12.6858 19.2503 13.2496 18.6863 13.2498 18.0003V15.0003C13.2498 14.3142 12.6859 13.7503 11.9998 13.7503Z"
              fill={activeTab === "home" ? "#346AFD" : "#484C52"}
              stroke={activeTab === "home" ? "#346AFD" : "#484C52"}
            />
          </G>

          {/* Messages Tab Icon - Inactive */}
          <G transform="translate(116, 36)">
            <Path
              d="M2.25 12.76C2.25 14.36 3.373 15.754 4.957 15.987C6.044 16.147 7.142 16.27 8.25 16.356V21L12.326 16.924C12.6024 16.6493 12.9735 16.4909 13.363 16.481C15.2644 16.4284 17.161 16.2634 19.043 15.987C20.627 15.754 21.75 14.361 21.75 12.759V6.741C21.75 5.139 20.627 3.746 19.043 3.513C16.711 3.17072 14.357 2.99926 12 3C9.608 3 7.256 3.175 4.957 3.513C3.373 3.746 2.25 5.14 2.25 6.741V12.759V12.76Z"
              stroke={activeTab === "messages" ? "#346AFD" : "#484C52"}
              strokeWidth={1.5}
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
          </G>

          {/* Analytics Tab Icon - Inactive */}
          <G transform="translate(190, 36)">
            <Path
              d="M18.32 12C20.92 12 22 11 21.04 7.72C20.39 5.51 18.49 3.61 16.28 2.96C13 2 12 3.08 12 5.68V8.56C12 11 13 12 15 12H18.32Z"
              stroke={activeTab === "analytics" ? "#346AFD" : "#484C52"}
              strokeWidth={1.5}
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
            <Path
              d="M20.0001 14.7C19.0701 19.33 14.6301 22.69 9.58005 21.87C5.79005 21.26 2.74005 18.21 2.12005 14.42C1.31005 9.39001 4.65005 4.95001 9.26005 4.01001"
              stroke={activeTab === "analytics" ? "#346AFD" : "#484C52"}
              strokeWidth={1.5}
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
          </G>

          {/* Wallet Tab Icon - Inactive */}
          <G transform="translate(0, 0)">
            <Path
              d="M266.05 54.75C271.386 54.7457 276.698 55.4522 281.847 56.851C282.574 57.049 283.3 56.509 283.3 55.755V54.75M267.55 40.5V41.25C267.55 41.4489 267.471 41.6397 267.33 41.7803C267.19 41.921 266.999 42 266.8 42H266.05M266.05 42V41.625C266.05 41.004 266.554 40.5 267.175 40.5H284.05M266.05 42V51M284.05 40.5V41.25C284.05 41.664 284.386 42 284.8 42H285.55M284.05 40.5H284.425C285.046 40.5 285.55 41.004 285.55 41.625V51.375C285.55 51.996 285.046 52.5 284.425 52.5H284.05M266.05 51V51.375C266.05 51.6734 266.169 51.9595 266.38 52.1705C266.591 52.3815 266.877 52.5 267.175 52.5H267.55M266.05 51H266.8C266.999 51 267.19 51.079 267.33 51.2197C267.471 51.3603 267.55 51.5511 267.55 51.75V52.5M284.05 52.5V51.75C284.05 51.5511 284.129 51.3603 284.27 51.2197C284.41 51.079 284.601 51 284.8 51H285.55M284.05 52.5H267.55M278.8 46.5C278.8 47.2956 278.484 48.0587 277.921 48.6213C277.359 49.1839 276.596 49.5 275.8 49.5C275.004 49.5 274.241 49.1839 273.679 48.6213C273.116 48.0587 272.8 47.2956 272.8 46.5C272.8 45.7044 273.116 44.9413 273.679 44.3787C274.241 43.8161 275.004 43.5 275.8 43.5C276.596 43.5 277.359 43.8161 277.921 44.3787C278.484 44.9413 278.8 45.7044 278.8 46.5ZM281.8 46.5H281.808V46.508H281.8V46.5ZM269.8 46.5H269.808V46.508H269.8V46.5Z"
              stroke={activeTab === "wallet" ? "#346AFD" : "#484C52"}
              strokeWidth={1.5}
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
          </G>
        </Svg>

        {/* Absolute touch overlays */}
        <View
          style={{
            position: "absolute",
            left: "4.23%",
            right: "3.73%",
            top: 13,
            height: 70,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* Home Tab */}
          <TouchableOpacity
            style={{ flex: 1, height: "100%", justifyContent: "center", alignItems: "center" }}
            onPress={() => {
              setActiveTab("home");
              router.replace("/home");
            }}
            activeOpacity={0.7}
          />
          {/* Messages Tab */}
          <TouchableOpacity
            style={{ flex: 1, height: "100%", justifyContent: "center", alignItems: "center" }}
            onPress={() => {
              setActiveTab("messages");
              router.replace("/messages");
            }}
            activeOpacity={0.7}
          />
          {/* Analytics Tab */}
          <TouchableOpacity
            style={{ flex: 1, height: "100%", justifyContent: "center", alignItems: "center" }}
            onPress={() => setActiveTab("analytics")}
            activeOpacity={0.7}
          />
          {/* Wallet Tab */}
          <TouchableOpacity
            style={{ flex: 1, height: "100%", justifyContent: "center", alignItems: "center" }}
            onPress={() => setActiveTab("wallet")}
            activeOpacity={0.7}
          />
          {/* Profile Tab */}
          <TouchableOpacity
            style={{
              flex: 1,
              height: "100%",
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={() => {}}
            activeOpacity={0.7}
          >
            <Image
              source={require("../../assets/images/sarah_avatar.png")}
              style={{
                width: 44,
                height: 44,
                borderRadius: 22,
                borderWidth: 1.5,
                borderColor: activeTab === "profile" ? "#346AFD" : "#E2E8F0",
              }}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },
  headerBackground: {
    width: "100%",
    backgroundColor: "#EBF1FF", // Curved blue-lavender header segment
    paddingBottom: 24,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 24,
    marginTop: 16,
  },
  headerButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#0F172A",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.6)",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: "#0F172A",
    letterSpacing: -0.6,
  },
  bodySheet: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    marginTop: -16, // Curved overlap
  },
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 140, // Avoid bottom tab bar cover
  },
  avatarContainer: {
    alignItems: "center",
    marginBottom: 28,
  },
  avatarBorderRing: {
    width: 112,
    height: 112,
    borderRadius: 56,
    borderWidth: 3,
    borderColor: "#346AFD", // Premium brand-blue ring around character
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#346AFD",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    backgroundColor: "#FFFFFF",
  },
  avatarImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  profileName: {
    fontSize: 22,
    fontWeight: "800",
    color: "#0F172A",
    marginTop: 12,
    letterSpacing: -0.5,
  },
  infoSection: {
    marginBottom: 24,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
  },
  iconWrapper: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#EFF6FF", // Light-blue circle icon container
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
    shadowColor: "#346AFD",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.02,
    shadowRadius: 4,
  },
  infoTextContainer: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 13,
    fontWeight: "500",
    color: "#94A3B8", // Subtle slate label
  },
  infoValue: {
    fontSize: 15,
    fontWeight: "600",
    color: "#0F172A", // Dark Slate
    marginTop: 2,
  },
  sectionHeader: {
    fontSize: 16,
    fontWeight: "800",
    color: "#0F172A",
    marginTop: 16,
    marginBottom: 16,
    letterSpacing: -0.3,
  },
  preferenceContainer: {
    marginBottom: 12,
  },
  preferenceRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
    marginBottom: 8,
  },
  preferenceTextContainer: {
    flex: 1,
    marginLeft: 16,
    marginRight: 12,
  },
  preferenceLabel: {
    fontSize: 15,
    fontWeight: "700",
    color: "#0F172A",
  },
  preferenceSubtext: {
    fontSize: 12,
    color: "#94A3B8",
    fontWeight: "400",
    marginTop: 2,
  },
  scrollSpacer: {
    height: 40,
  },
  tabBar: {
    position: "absolute",
    bottom: 24,
    width: width > 402 ? 402 : width - 16,
    alignSelf: "center",
    height: 83,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#0F172A",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.08,
    shadowRadius: 20,
    elevation: 8,
  },
});
