import React from "react";
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { Feather, Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import Svg, {
  Path,
  Defs,
  LinearGradient,
  Stop,
  Line,
  Rect,
  Text as SvgText,
} from "react-native-svg";

const { width } = Dimensions.get("window");

export default function Home() {
  const router = useRouter();

  // Credit Score Calculations
  const minScore = 400;
  const maxScore = 850;
  const currentScore = 704;
  const totalRange = maxScore - minScore;
  const progressRatio = (currentScore - minScore) / totalRange;

  // Arc math for react-native-svg
  // Circle segment of radius 80, centered at (100, 100)
  // Arc length is pi * R = 3.14159 * 80 = 251.3
  const strokeDasharray = 251.3;
  const strokeDashoffset = strokeDasharray * (1 - progressRatio);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />

      {/* Main Scrollable Content */}
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header Section */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Hi, Sarah</Text>
            <Text style={styles.subtitle}>Your credit in excellent shape!</Text>
          </View>
          <TouchableOpacity style={styles.notificationButton} activeOpacity={0.8}>
            <Feather name="bell" size={22} color="#0F172A" />
            <View style={styles.notificationBadge} />
          </TouchableOpacity>
        </View>

        {/* Credit Score Arc Card */}
        <View style={styles.card}>
          <View style={styles.gaugeContainer}>
            <Svg width={200} height={120} viewBox="0 0 200 120">
              <Defs>
                <LinearGradient id="gaugeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <Stop offset="0%" stopColor="#EF4444" />
                  <Stop offset="25%" stopColor="#F97316" />
                  <Stop offset="55%" stopColor="#FACC15" />
                  <Stop offset="80%" stopColor="#A3E635" />
                  <Stop offset="100%" stopColor="#22C55E" />
                </LinearGradient>
              </Defs>
              
              {/* Background Arc */}
              <Path
                d="M 20,110 A 80,80 0 0,1 180,110"
                stroke="#F1F5F9"
                strokeWidth="12"
                strokeLinecap="round"
                fill="none"
              />
              
              {/* Progress Arc */}
              <Path
                d="M 20,110 A 80,80 0 0,1 180,110"
                stroke="url(#gaugeGrad)"
                strokeWidth="12"
                strokeLinecap="round"
                fill="none"
                strokeDasharray={strokeDasharray}
                strokeDashoffset={strokeDashoffset}
              />
            </Svg>

            {/* Inner Gauge Text Overlay */}
            <View style={styles.gaugeTextContainer}>
              <Text style={styles.gaugeStatusText}>Good</Text>
              <Text style={styles.gaugeScoreText}>{currentScore}</Text>
              <Text style={styles.gaugeChangeText}>+6pts</Text>
            </View>
          </View>

          {/* Bottom Arc Limits and Updated On date */}
          <View style={styles.gaugeBottomRow}>
            <Text style={styles.gaugeLimitText}>{minScore}</Text>
            <View style={styles.updateRow}>
              <Feather name="calendar" size={14} color="#94A3B8" />
              <Text style={styles.updateText}>update on 02 Oct 2024</Text>
            </View>
            <Text style={styles.gaugeLimitText}>{maxScore}</Text>
          </View>
        </View>

        {/* Quick Actions Grid */}
        <View style={styles.actionsGrid}>
          {/* Pay Money */}
          <TouchableOpacity style={styles.actionItem} activeOpacity={0.8}>
            <Svg width={66} height={44} viewBox="0 0 66 44" fill="none" style={styles.svgIcon}>
              <Rect width="66" height="44" fill="transparent"/>
              <Rect x="11" width="44" height="44" rx="22" fill="#346AFD" fillOpacity={0.1}/>
              <Path d="M23.25 18.25H42.75M23.25 19H42.75M26.25 24.25H32.25M26.25 26.5H29.25M25.5 29.5H40.5C41.0967 29.5 41.669 29.2629 42.091 28.841C42.5129 28.419 42.75 27.8467 42.75 27.25V16.75C42.75 16.1533 42.5129 15.581 42.091 15.159C41.669 14.7371 41.0967 14.5 40.5 14.5H25.5C24.9033 14.5 24.331 14.7371 23.909 15.159C23.4871 15.581 23.25 16.1533 23.25 16.75V27.25C23.25 27.8467 23.4871 28.419 23.909 28.841C24.331 29.2629 24.9033 29.5 25.5 29.5Z" stroke="#346AFD" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
            </Svg>
            <Text style={styles.actionLabel}>Pay{"\n"}Money</Text>
          </TouchableOpacity>

          {/* Loan Request */}
          <TouchableOpacity style={styles.actionItem} activeOpacity={0.8}>
            <Svg width={83} height={44} viewBox="0 0 83 44" fill="none" style={styles.svgIcon}>
              <Rect width="83" height="44" fill="transparent"/>
              <Rect x="19.5" width="44" height="44" rx="22" fill="#00B884" fillOpacity={0.1}/>
              <Path d="M37.75 17.5V16.108C37.75 14.973 38.595 14.01 39.726 13.916C40.099 13.886 40.474 13.859 40.849 13.836M45.25 28H47.5C48.0967 28 48.669 27.7629 49.091 27.341C49.5129 26.919 49.75 26.3467 49.75 25.75V16.108C49.75 14.973 48.905 14.01 47.774 13.916C47.4 13.885 47.0256 13.8583 46.651 13.836M46.651 13.836C46.509 13.3767 46.2226 12.9749 45.8357 12.6895C45.4489 12.4041 44.9808 12.2501 44.5 12.25H43C42.5192 12.2501 42.0511 12.4041 41.6643 12.6895C41.2774 12.9749 40.992 13.3767 40.85 13.836C40.785 14.046 40.75 14.269 40.75 14.5V15.25H46.75V14.5C46.75 14.269 46.716 14.046 46.651 13.836ZM45.25 28.75V26.875C45.25 25.9799 44.8944 25.1215 44.2615 24.4885C43.6285 23.8556 42.7701 23.5 41.875 23.5H40.375C40.0766 23.5 39.7905 23.3815 39.5795 23.1705C39.3685 22.9595 39.25 22.6734 39.25 22.375V20.875C39.25 19.9799 38.8944 19.1215 38.2615 18.4885C37.6285 17.8556 36.7701 17.5 35.875 17.5H34.75M36.25 17.5H34.375C33.754 17.5 33.25 18.004 33.25 18.625V30.625C33.25 31.246 33.754 31.75 34.375 31.75H44.125C44.746 31.75 45.25 31.246 45.25 30.625V26.5C45.25 24.1131 44.3018 21.8239 42.614 20.136C40.9261 18.4482 38.6369 17.5 36.25 17.5Z" stroke="#00B884" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
            </Svg>
            <Text style={styles.actionLabel}>Loan{"\n"}Request</Text>
          </TouchableOpacity>

          {/* Chat Support */}
          <TouchableOpacity style={styles.actionItem} activeOpacity={0.8}>
            <Svg width={83} height={44} viewBox="0 0 83 44" fill="none" style={styles.svgIcon}>
              <Rect width="83" height="44" fill="transparent"/>
              <Rect x="19.5" width="44" height="44" rx="22" fill="#F97316" fillOpacity={0.1}/>
              <Path d="M33 25.5H36L40 29.5V25.5H42.5C44.98 25.5 47 23.48 47 21V16.5C47 14.02 44.98 12 42.5 12H32.5C30.02 12 28 14.02 28 16.5V21C28 23.48 30.02 25.5 33 25.5Z" stroke="#F97316" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
              <Path d="M44.5 19.5H47.5C49.98 19.5 52 21.52 52 24V28.5C52 30.98 49.98 33 47.5 33H45V37L41 33H38.5C36.02 33 34 30.98 34 28.5" stroke="#F97316" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
            </Svg>
            <Text style={styles.actionLabel}>Chat{"\n"}Support</Text>
          </TouchableOpacity>

          {/* Finance Hub */}
          <TouchableOpacity style={styles.actionItem} activeOpacity={0.8}>
            <Svg width={80} height={44} viewBox="0 0 80 44" fill="none" style={styles.svgIcon}>
              <Rect width="80" height="44" fill="transparent"/>
              <Rect x="18" width="44" height="44" rx="22" fill="#6B5BFF" fillOpacity={0.1}/>
              <Path d="M31 23.125C31 22.504 31.504 22 32.125 22H34.375C34.996 22 35.5 22.504 35.5 23.125V29.875C35.5 30.496 34.996 31 34.375 31H32.125C31.8266 31 31.5405 30.8815 31.3295 30.6705C31.1185 30.4595 31 30.1734 31 29.875V23.125ZM37.75 18.625C37.75 18.004 38.254 17.5 38.875 17.5H41.125C41.746 17.5 42.25 18.004 42.25 18.625V29.875C42.25 30.496 41.746 31 41.125 31H38.875C38.5766 31 38.2905 30.8815 38.0795 30.6705C37.8685 30.4595 37.75 30.1734 37.75 29.875V18.625ZM44.5 14.125C44.5 13.504 45.004 13 45.625 13H47.875C48.496 13 49 13.504 49 14.125V29.875C49 30.496 48.496 31 47.875 31H45.625C45.3266 31 45.0405 30.8815 44.8295 30.6705C44.6185 30.4595 44.5 30.1734 44.5 29.875V14.125Z" stroke="#6B5BFF" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
            </Svg>
            <Text style={styles.actionLabel}>Finance{"\n"}Hub</Text>
          </TouchableOpacity>
        </View>

        {/* History Section Title */}
        <Text style={styles.sectionTitle}>Credit Score History</Text>

        {/* Credit Score History Card & Floating Plus Button */}
        <View style={styles.historyCardContainer}>
          <View style={styles.historyCard}>
            <Svg width="100%" height={160} viewBox="0 0 340 160">
              {/* Horizontal Dotted Grid Lines */}
              <Line x1="40" y1="20" x2="330" y2="20" stroke="#F1F5F9" strokeWidth="1" strokeDasharray="4 4" />
              <Line x1="40" y1="55" x2="330" y2="55" stroke="#F1F5F9" strokeWidth="1" strokeDasharray="4 4" />
              <Line x1="40" y1="90" x2="330" y2="90" stroke="#F1F5F9" strokeWidth="1" strokeDasharray="4 4" />
              <Line x1="40" y1="125" x2="330" y2="125" stroke="#F1F5F9" strokeWidth="1" strokeDasharray="4 4" />

              {/* Y-Axis Labels */}
              <SvgText x="10" y="24" fill="#94A3B8" fontSize="10" fontWeight="600">850</SvgText>
              <SvgText x="10" y="59" fill="#94A3B8" fontSize="10" fontWeight="600">800</SvgText>
              <SvgText x="10" y="94" fill="#94A3B8" fontSize="10" fontWeight="600">750</SvgText>
              <SvgText x="10" y="129" fill="#94A3B8" fontSize="10" fontWeight="600">650</SvgText>

              {/* Curve path representing the credit history */}
              <Path
                d="M 40,125 C 55,108 65,85 80,85 C 95,85 100,95 115,90 C 130,85 135,70 150,70 C 165,70 170,105 185,100 C 200,95 210,75 225,75 C 240,75 245,85 260,85 C 275,85 280,45 295,45 C 310,45 315,65 330,60"
                fill="none"
                stroke="#3B82F6"
                strokeWidth="3.5"
                strokeLinecap="round"
              />

              {/* X-Axis Labels */}
              <SvgText x="40" y="152" fill="#94A3B8" fontSize="10" fontWeight="600">Jan</SvgText>
              <SvgText x="95" y="152" fill="#94A3B8" fontSize="10" fontWeight="600">Feb</SvgText>
              <SvgText x="150" y="152" fill="#94A3B8" fontSize="10" fontWeight="600">Mar</SvgText>
              <SvgText x="210" y="152" fill="#94A3B8" fontSize="10" fontWeight="600">Apr</SvgText>
              <SvgText x="265" y="152" fill="#94A3B8" fontSize="10" fontWeight="600">May</SvgText>
              <SvgText x="315" y="152" fill="#94A3B8" fontSize="10" fontWeight="600">Jun</SvgText>
            </Svg>
          </View>

          {/* Floating plus action button */}
          <TouchableOpacity style={styles.fabButton} activeOpacity={0.85}>
            <Feather name="plus" size={24} color="#FFFFFF" />
          </TouchableOpacity>
        </View>

        {/* Space wrapper for bottom tab bar margin */}
        <View style={styles.bottomSpacer} />
      </ScrollView>

      {/* Sleek Custom Bottom Tab Bar */}
      <View style={styles.tabBar}>
        {/* Home Tab (Active) */}
        <TouchableOpacity style={styles.tabItem} activeOpacity={0.8}>
          <View style={styles.activeTabCircle}>
            <Ionicons name="home" size={20} color="#3B82F6" />
          </View>
          <Text style={styles.tabLabelActive}>Home</Text>
          <View style={styles.tabDotActive} />
        </TouchableOpacity>

        {/* Messages Tab */}
        <TouchableOpacity style={styles.tabItem} activeOpacity={0.8}>
          <Ionicons name="chatbubble-outline" size={22} color="#94A3B8" />
        </TouchableOpacity>

        {/* Analytics Tab */}
        <TouchableOpacity style={styles.tabItem} activeOpacity={0.8}>
          <Ionicons name="pie-chart-outline" size={22} color="#94A3B8" />
        </TouchableOpacity>

        {/* Wallet Tab */}
        <TouchableOpacity style={styles.tabItem} activeOpacity={0.8}>
          <Ionicons name="card-outline" size={22} color="#94A3B8" />
        </TouchableOpacity>

        {/* Profile Tab */}
        <TouchableOpacity 
          style={styles.tabItem} 
          activeOpacity={0.8}
          onPress={() => router.replace("/login")}
        >
          <Image
            source={require("../../assets/images/sarah_avatar.png")}
            style={styles.avatarImage}
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC", // Sleek cool light grey/slate background
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 100, // Account for custom floating bottom navigation
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    marginTop: 8,
  },
  greeting: {
    fontSize: 26,
    fontWeight: "800",
    color: "#0F172A", // Slate 900
    letterSpacing: -0.6,
  },
  subtitle: {
    fontSize: 14,
    color: "#94A3B8", // Slate 400
    fontWeight: "500",
    marginTop: 2,
  },
  notificationButton: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#0F172A",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
    borderWidth: 1,
    borderColor: "#F1F5F9",
  },
  notificationBadge: {
    position: "absolute",
    top: 14,
    right: 14,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#EF4444", // Crimson alert red
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    padding: 20,
    alignItems: "center",
    shadowColor: "#0F172A",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.04,
    shadowRadius: 16,
    elevation: 3,
    borderWidth: 1,
    borderColor: "#F1F5F9",
    marginBottom: 20,
  },
  gaugeContainer: {
    width: 200,
    height: 120,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  gaugeTextContainer: {
    position: "absolute",
    alignItems: "center",
    top: 48,
  },
  gaugeStatusText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#64748B", // Slate 500
    letterSpacing: 0.4,
  },
  gaugeScoreText: {
    fontSize: 38,
    fontWeight: "800",
    color: "#0F172A", // Slate 900
    letterSpacing: -1,
    marginVertical: 1,
  },
  gaugeChangeText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#22C55E", // Green 500
  },
  gaugeBottomRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 8,
    marginTop: 6,
    alignItems: "center",
  },
  gaugeLimitText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#64748B",
  },
  updateRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F8FAFC",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
  },
  updateText: {
    fontSize: 10,
    fontWeight: "600",
    color: "#94A3B8",
    marginLeft: 6,
  },
  actionsGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 24,
  },
  actionItem: {
    alignItems: "center",
    width: (width - 48 - 36) / 4, // Calculate responsive widths
  },
  svgIcon: {
    height: 44,
    marginBottom: 8,
  },
  actionLabel: {
    fontSize: 11,
    fontWeight: "700",
    color: "#64748B",
    textAlign: "center",
    lineHeight: 14,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#0F172A",
    marginBottom: 12,
    letterSpacing: -0.4,
  },
  historyCardContainer: {
    position: "relative",
    marginBottom: 20,
  },
  historyCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    padding: 16,
    shadowColor: "#0F172A",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.04,
    shadowRadius: 16,
    elevation: 3,
    borderWidth: 1,
    borderColor: "#F1F5F9",
  },
  fabButton: {
    position: "absolute",
    right: 12,
    bottom: -16,
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#3B82F6", // Bright energetic brand blue
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#3B82F6",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 4,
  },
  bottomSpacer: {
    height: 20,
  },
  tabBar: {
    position: "absolute",
    bottom: 24,
    left: 24,
    right: 24,
    height: 64,
    borderRadius: 22,
    backgroundColor: "rgba(255, 255, 255, 0.95)", // High quality solid backing for blur illusion
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    shadowColor: "#0F172A",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.08,
    shadowRadius: 20,
    elevation: 8,
    borderWidth: 1,
    borderColor: "#F1F5F9",
    paddingHorizontal: 8,
  },
  tabItem: {
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    width: (width - 48) / 5,
  },
  activeTabCircle: {
    backgroundColor: "#EFF6FF",
    padding: 8,
    borderRadius: 12,
    marginBottom: 1,
  },
  tabLabelActive: {
    fontSize: 10,
    fontWeight: "700",
    color: "#3B82F6",
    marginTop: 1,
  },
  tabDotActive: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#3B82F6",
    position: "absolute",
    bottom: 2,
  },
  avatarImage: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: "#E2E8F0",
  },
});
