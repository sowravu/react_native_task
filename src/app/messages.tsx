import * as React from "react";
import { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  TextInput,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { Feather, Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { BlurView } from "expo-blur";
import Svg, {
  Path,
  Defs,
  LinearGradient,
  Stop,
  Rect,
  Circle,
  Line,
  G,
  Text as SvgText,
} from "react-native-svg";

const { width } = Dimensions.get("window");

interface MessageItem {
  id: string;
  title: string;
  snippet: string;
  time: string;
  status: "active" | "pending" | "inactive";
  avatarType: "premium" | "standard" | "basic" | "nova";
}

interface MessageSection {
  title: string;
  date: string;
  data: MessageItem[];
}

export default function Messages() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<"home" | "messages" | "analytics" | "wallet" | "profile">("messages");

  // Mock message data matching Figma screenshot exactly
  const initialSections: MessageSection[] = [
    {
      title: "Today",
      date: "12/10/24",
      data: [
        {
          id: "1",
          title: "Premium Credit Solutions",
          snippet: "Payment confirmed! Your receipt will arrive in your email shortly.",
          time: "2hr ago",
          status: "active", // green
          avatarType: "premium",
        },
        {
          id: "2",
          title: "Standard Payment Services",
          snippet: "We got your request. It's under review and you'll be notified once approved.",
          time: "2day ago",
          status: "pending", // orange
          avatarType: "standard",
        },
        {
          id: "3",
          title: "Basic Financial Support",
          snippet: "Payment recorded successfully. A confirmation email and SMS are on the way.",
          time: "2day ago",
          status: "inactive", // grey
          avatarType: "basic",
        },
      ],
    },
    {
      title: "12/10/24",
      date: "",
      data: [
        {
          id: "4",
          title: "Nova Finance Group",
          snippet: "Your payment went through! We've sent a detailed summary to your dashboard.",
          time: "5day ago",
          status: "active", // green
          avatarType: "nova",
        },
      ],
    },
  ];

  // Filtering based on search query
  const filteredSections = initialSections
    .map((section) => {
      const filteredData = section.data.filter(
        (item) =>
          item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.snippet.toLowerCase().includes(searchQuery.toLowerCase())
      );
      return { ...section, data: filteredData };
    })
    .filter((section) => section.data.length > 0);

  // Status color mapper
  const getStatusColor = (status: "active" | "pending" | "inactive") => {
    switch (status) {
      case "active":
        return "#22C55E"; // Active Green
      case "pending":
        return "#F97316"; // Pending Orange
      case "inactive":
        return "#94A3B8"; // Inactive Grey
    }
  };

  // Custom Geometric Brand Avatars using pure inline SVGs
  const renderAvatar = (type: "premium" | "standard" | "basic" | "nova") => {
    switch (type) {
      case "premium":
        return (
          <Svg width={48} height={48} viewBox="0 0 48 48">
            <Defs>
              <LinearGradient id="gradPremium" x1="0%" y1="0%" x2="100%" y2="100%">
                <Stop offset="0%" stopColor="#1E3A8A" />
                <Stop offset="100%" stopColor="#3B82F6" />
              </LinearGradient>
            </Defs>
            <Rect width={48} height={48} rx={24} fill="url(#gradPremium)" />
            <Path d="M14 34 L24 16 L34 34 Z M20 34 L24 24 L28 34 Z" stroke="rgba(255,255,255,0.4)" strokeWidth={1.5} fill="none" />
            <Line x1="14" y1="34" x2="34" y2="34" stroke="rgba(255,255,255,0.6)" strokeWidth={2} />
            <Line x1="24" y1="12" x2="24" y2="16" stroke="rgba(255,255,255,0.8)" strokeWidth={1.5} />
            <Circle cx={24} cy={11} r={1.5} fill="#FFFFFF" />
          </Svg>
        );
      case "standard":
        return (
          <Svg width={48} height={48} viewBox="0 0 48 48">
            <Defs>
              <LinearGradient id="gradStandard" x1="0%" y1="0%" x2="100%" y2="100%">
                <Stop offset="0%" stopColor="#64748B" />
                <Stop offset="100%" stopColor="#94A3B8" />
              </LinearGradient>
            </Defs>
            <Rect width={48} height={48} rx={24} fill="url(#gradStandard)" />
            <Path d="M18 16 H30 V34 H18 Z M21 16 V34 M24 16 V34 M27 16 V34 M18 21 H30 M18 26 H30 M18 31 H30" stroke="rgba(255,255,255,0.3)" strokeWidth={1} fill="none" />
            <Path d="M15 34 H33" stroke="rgba(255,255,255,0.7)" strokeWidth={2} />
          </Svg>
        );
      case "basic":
        return (
          <Svg width={48} height={48} viewBox="0 0 48 48">
            <Defs>
              <LinearGradient id="gradBasic" x1="0%" y1="0%" x2="100%" y2="100%">
                <Stop offset="0%" stopColor="#0F766E" />
                <Stop offset="100%" stopColor="#0D9488" />
              </LinearGradient>
            </Defs>
            <Rect width={48} height={48} rx={24} fill="url(#gradBasic)" />
            <Path d="M15 34 V24 H21 V34 Z M21 34 V18 H27 V34 Z M27 34 V28 H33 V34 Z" fill="rgba(255,255,255,0.25)" stroke="rgba(255,255,255,0.4)" strokeWidth={1} />
            <Line x1="12" y1="34" x2="36" y2="34" stroke="rgba(255,255,255,0.7)" strokeWidth={2} />
          </Svg>
        );
      case "nova":
        return (
          <Svg width={48} height={48} viewBox="0 0 48 48">
            <Defs>
              <LinearGradient id="gradNova" x1="0%" y1="0%" x2="100%" y2="100%">
                <Stop offset="0%" stopColor="#2563EB" />
                <Stop offset="100%" stopColor="#10B981" />
              </LinearGradient>
            </Defs>
            <Rect width={48} height={48} rx={24} fill="url(#gradNova)" />
            <Path d="M24 14 C29.5 14 34 18.5 34 24 C34 29.5 29.5 34 24 34 C18.5 34 14 29.5 14 24 C14 21.5 16.5 17.5 20 17.5" stroke="rgba(255,255,255,0.6)" strokeWidth={2} fill="none" strokeLinecap="round" />
            <Circle cx={24} cy={24} r={3} fill="#FFFFFF" />
          </Svg>
        );
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />

      {/* Header Accent Blue Section */}
      <SafeAreaView edges={["top"]} style={styles.headerBackground}>
        <View style={styles.headerRow}>
          {/* Back caret button */}
          <TouchableOpacity
            style={styles.headerButton}
            onPress={() => router.replace("/home")}
            activeOpacity={0.8}
          >
            <Feather name="chevron-left" size={20} color="#0F172A" />
          </TouchableOpacity>

          {/* Messages Title */}
          <Text style={styles.headerTitle}>Messages</Text>

          {/* Forward button */}
          <TouchableOpacity style={styles.headerButton} activeOpacity={0.8}>
            <Feather name="chevron-right" size={20} color="#0F172A" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      {/* Main Body Section */}
      <View style={styles.bodySheet}>
        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search Your messages"
            placeholderTextColor="#94A3B8"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          <Feather name="search" size={20} color="#94A3B8" />
        </View>

        {/* Messages List Container */}
        <ScrollView
          style={styles.scrollContainer}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {filteredSections.length > 0 ? (
            filteredSections.map((section, sIdx) => (
              <View key={`sec-${sIdx}`} style={styles.sectionContainer}>
                {/* Section Header Row */}
                <View style={styles.sectionHeader}>
                  <Text style={styles.sectionTitle}>{section.title}</Text>
                  {section.date !== "" && (
                    <Text style={styles.sectionDate}>{section.date}</Text>
                  )}
                </View>

                {/* Message Cards in Section */}
                {section.data.map((item) => (
                  <TouchableOpacity
                    key={item.id}
                    style={styles.card}
                    activeOpacity={0.9}
                  >
                    {/* Brand Avatar */}
                    <View style={styles.avatarContainer}>
                      {renderAvatar(item.avatarType)}
                    </View>

                    {/* Card Content Column */}
                    <View style={styles.cardContent}>
                      {/* Card Header Title and Status Dot */}
                      <View style={styles.cardHeader}>
                        <Text style={styles.cardTitle} numberOfLines={1}>
                          {item.title}
                        </Text>
                        <View
                          style={[
                            styles.statusDot,
                            { backgroundColor: getStatusColor(item.status) },
                          ]}
                        />
                      </View>

                      {/* Snippet message preview */}
                      <Text style={styles.cardSnippet} numberOfLines={2}>
                        {item.snippet}
                      </Text>

                      {/* Time Marker */}
                      <Text style={styles.cardTime}>{item.time}</Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            ))
          ) : (
            /* No search results layout */
            <View style={styles.noResultsContainer}>
              <Feather name="message-square" size={48} color="#CBD5E1" />
              <Text style={styles.noResultsText}>No messages found</Text>
              <Text style={styles.noResultsSub}>
                Try adjusting your search keywords
              </Text>
            </View>
          )}

          {/* Safe spacer for bottom button and floating footer */}
          <View style={styles.scrollSpacer} />
        </ScrollView>
      </View>

      {/* Fixed primary "Start a new chat" action CTA button overlay */}
      <View style={styles.bottomActions}>
        <TouchableOpacity style={styles.newChatButton} activeOpacity={0.9}>
          <Text style={styles.newChatButtonText}>Start a new chat</Text>
        </TouchableOpacity>
      </View>

      {/* Premium responsive Custom Bottom Tab Bar with backdrop blur */}
      <View style={styles.tabBar}>
        <BlurView
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
          {/* Transparent SVG Rect */}
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

          {/* Messages Tab Icon - Active */}
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
          {activeTab === "messages" && (
            <SvgText x="128" y="65" fill="#346AFD" fontSize="9.5" fontWeight="700" textAnchor="middle">
              Message
            </SvgText>
          )}

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
            onPress={() => {}}
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
            onPress={() => {
              setActiveTab("profile");
              router.replace("/profile");
            }}
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
    backgroundColor: "#EBF1FF", // Premium light blue-lavender header fill
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
    fontSize: 24,
    fontWeight: "800",
    color: "#0F172A",
    letterSpacing: -0.6,
  },
  bodySheet: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    marginTop: -16, // overlap curved content sheet over blue header slightly
    paddingHorizontal: 24,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 25,
    borderWidth: 1,
    borderColor: "#F1F5F9",
    paddingHorizontal: 20,
    height: 50,
    marginTop: 24,
    marginBottom: 16,
    shadowColor: "#0F172A",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.02,
    shadowRadius: 8,
    elevation: 1,
  },
  searchInput: {
    flex: 1,
    height: "100%",
    fontSize: 14,
    color: "#0F172A",
    fontWeight: "500",
  },
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 200, // accommodate absolute floating buttons and bottom bar
  },
  sectionContainer: {
    marginTop: 8,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 8,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: "800",
    color: "#0F172A",
    letterSpacing: -0.2,
  },
  sectionDate: {
    fontSize: 12,
    color: "#94A3B8",
    fontWeight: "700",
  },
  card: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#F1F5F9",
    shadowColor: "#0F172A",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.02,
    shadowRadius: 12,
    elevation: 2,
  },
  avatarContainer: {
    marginRight: 14,
    justifyContent: "center",
  },
  cardContent: {
    flex: 1,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#0F172A",
    letterSpacing: -0.2,
    flex: 1,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginLeft: 8,
  },
  cardSnippet: {
    fontSize: 13,
    lineHeight: 18,
    color: "#64748B",
    marginTop: 6,
    fontWeight: "400",
  },
  cardTime: {
    fontSize: 11,
    fontWeight: "600",
    color: "#94A3B8",
    alignSelf: "flex-end",
    marginTop: 6,
  },
  noResultsContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 60,
  },
  noResultsText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#64748B",
    marginTop: 12,
  },
  noResultsSub: {
    fontSize: 13,
    color: "#94A3B8",
    marginTop: 4,
  },
  scrollSpacer: {
    height: 40,
  },
  bottomActions: {
    position: "absolute",
    bottom: 110,
    left: 24,
    right: 24,
    zIndex: 10,
  },
  newChatButton: {
    height: 50,
    borderRadius: 14,
    backgroundColor: "#346AFD",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#346AFD",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 4,
  },
  newChatButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
    letterSpacing: -0.2,
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
