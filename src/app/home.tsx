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
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { Feather, Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { BlurView } from "expo-blur";
const TypedBlurView = BlurView as any;
import Svg, {
  Path,
  Defs,
  LinearGradient,
  Stop,
  Line,
  Rect,
  Text as SvgText,
  G,
} from "react-native-svg";

const { width } = Dimensions.get("window");

// Segmented Arc Polar Math Helpers
const polarToCartesian = (centerX: number, centerY: number, radius: number, angleInDegrees: number) => {
  const angleInRadians = (angleInDegrees * Math.PI) / 180.0;
  return {
    x: centerX + radius * Math.cos(angleInRadians),
    y: centerY - radius * Math.sin(angleInRadians),
  };
};

const describeArc = (x: number, y: number, radius: number, startAngle: number, endAngle: number) => {
  const start = polarToCartesian(x, y, radius, startAngle);
  const end = polarToCartesian(x, y, radius, endAngle);
  const largeArcFlag = Math.abs(startAngle - endAngle) <= 180 ? "0" : "1";
  
  return [
    "M", start.x, start.y,
    "A", radius, radius, 0, largeArcFlag, 1, end.x, end.y
  ].join(" ");
};

export default function Home() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"home" | "messages" | "analytics" | "wallet" | "profile">("home");

  // Credit Score Calculations
  const minScore = 400;
  const maxScore = 850;
  const currentScore = 704;
  const totalRange = maxScore - minScore;
  const progressRatio = (currentScore - minScore) / totalRange;
  const endAngleLimit = 180 - (180 * progressRatio);

  const renderSegment = (
    index: number,
    startAngle: number,
    endAngle: number,
    activeColor: string
  ) => {
    const gap = 5;
    const sAngle = startAngle - gap;
    const eAngle = endAngle + gap;

    // Background grey path
    const bgPath = describeArc(100, 110, 80, sAngle, eAngle);

    // Active path logic
    let activePath = null;
    if (endAngleLimit < startAngle) {
      const activeEnd = Math.max(eAngle, Math.min(sAngle, endAngleLimit));
      if (activeEnd < sAngle) {
        activePath = describeArc(100, 110, 80, sAngle, activeEnd);
      }
    }

    return (
      <G key={`seg-${index}`}>
        {/* Inactive background segment */}
        <Path
          d={bgPath}
          stroke="#E2E8F0"
          strokeWidth="10"
          strokeLinecap="round"
          fill="none"
        />
        {/* Active colored progress segment */}
        {activePath && (
          <Path
            d={activePath}
            stroke={activeColor}
            strokeWidth="10"
            strokeLinecap="round"
            fill="none"
          />
        )}
      </G>
    );
  };

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
              {renderSegment(1, 180, 135, "#FF5B35")}
              {renderSegment(2, 135, 90, "#FFA834")}
              {renderSegment(3, 90, 45, "#D4E738")}
              {renderSegment(4, 45, 0, "#8CD83B")}
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

          {/* Home Tab Icon */}
          <G transform="translate(42, 36)">
            <Path
              d="M9.09644 3.31476C10.3496 2.34403 12.3345 2.23587 13.7234 3.02863L13.9929 3.19952L19.7537 7.2298C20.2227 7.55826 20.6665 8.09692 20.9939 8.72394C21.3213 9.35112 21.5095 10.0242 21.5095 10.5999V17.3802C21.5094 19.6538 19.664 21.5001 17.3904 21.5003H6.61011C4.3378 21.5003 2.49022 19.6455 2.48999 17.3704V10.47L2.4978 10.265C2.53449 9.77632 2.69782 9.22066 2.95874 8.69073C3.25678 8.08546 3.66124 7.55653 4.08765 7.22394L9.09644 3.31476ZM11.9998 13.7503C11.3137 13.7504 10.7498 14.3142 10.7498 15.0003V18.0003C10.7499 18.6862 11.3138 19.2502 11.9998 19.2503C12.6858 19.2503 13.2496 18.6863 13.2498 18.0003V15.0003C13.2498 14.3142 12.6859 13.7503 11.9998 13.7503Z"
              fill={activeTab === "home" ? "#346AFD" : "#484C52"}
              stroke={activeTab === "home" ? "#346AFD" : "#484C52"}
            />
          </G>
          {activeTab === "home" && (
            <Path
              d="M43.96 58.66V67H42.592V63.352H38.668V67H37.3V58.66H38.668V62.236H42.592V58.66H43.96ZM48.629 67.108C48.005 67.108 47.441 66.968 46.937 66.688C46.433 66.4 46.037 66 45.749 65.488C45.461 64.968 45.317 64.368 45.317 63.688C45.317 63.016 45.465 62.42 45.761 61.9C46.057 61.38 46.461 60.98 46.973 60.7C47.485 60.42 48.057 60.28 48.689 60.28C49.321 60.28 49.893 60.42 50.405 60.7C50.917 60.98 51.321 61.38 51.617 61.9C51.913 62.42 52.061 63.016 52.061 63.688C52.061 64.36 51.909 64.956 51.605 65.476C51.301 65.996 50.885 66.4 50.357 66.688C49.837 66.968 49.261 67.108 48.629 67.108ZM48.629 65.92C48.981 65.92 49.309 65.836 49.613 65.668C49.925 65.5 50.177 65.248 50.369 64.912C50.561 64.576 50.657 64.168 50.657 63.688C50.657 63.208 50.565 62.804 50.381 62.476C50.197 62.14 49.953 61.888 49.649 61.72C49.345 61.552 49.017 61.468 48.665 61.468C48.313 61.468 47.985 61.552 47.681 61.72C47.385 61.888 47.149 62.14 46.973 62.476C46.797 62.804 46.709 63.208 46.709 63.688C46.709 64.4 46.889 64.952 47.249 65.344C47.617 65.728 48.077 65.92 48.629 65.92ZM61.4173 60.28C61.9373 60.28 62.4013 60.388 62.8093 60.604C63.2253 60.82 63.5493 61.14 63.7813 61.564C64.0213 61.988 64.1413 62.5 64.1413 63.1V67H62.7853V63.304C62.7853 62.712 62.6373 62.26 62.3413 61.948C62.0453 61.628 61.6413 61.468 61.1293 61.468C60.6173 61.468 60.2093 61.628 59.9053 61.948C59.6093 62.26 59.4613 62.712 59.4613 63.304V67H58.1053V63.304C58.1053 62.712 57.9573 62.26 57.6613 61.948C57.3653 61.628 56.9613 61.468 56.4493 61.468C55.9373 61.468 55.5293 61.628 55.2253 61.948C54.9293 62.26 54.7813 62.712 54.7813 63.304V67H53.4133V60.388H54.7813V61.144C55.0053 60.872 55.2893 60.66 55.6333 60.508C55.9773 60.356 56.3453 60.28 56.7373 60.28C57.2653 60.28 57.7373 60.392 58.1533 60.616C58.5693 60.84 58.8893 61.164 59.1133 61.588C59.3133 61.188 59.6253 60.872 60.0493 60.64C60.4733 60.4 60.9293 60.28 61.4173 60.28ZM71.9421 63.532C71.9421 63.78 71.9261 64.004 71.8941 64.204H66.8421C66.8821 64.732 67.0781 65.156 67.4301 65.476C67.7821 65.796 68.2141 65.956 68.7261 65.956C69.4621 65.956 69.9821 65.648 70.2861 65.032H71.7621C71.5621 65.64 71.1981 66.14 70.6701 66.532C70.1501 66.916 69.5021 67.108 68.7261 67.108C68.0941 67.108 67.5261 66.968 67.0221 66.688C66.5261 66.4 66.1341 66 65.8461 65.488C65.5661 64.968 65.4261 64.368 65.4261 63.688C65.4261 63.008 65.5621 62.412 65.8341 61.9C66.1141 61.38 66.5021 60.98 66.9981 60.7C67.5021 60.42 68.0781 60.28 68.7261 60.28C69.3501 60.28 69.9061 60.416 70.3941 60.688C70.8821 60.96 71.2621 61.344 71.5341 61.84C71.8061 62.328 71.9421 62.892 71.9421 63.532ZM70.5141 63.1C70.5061 62.596 70.3261 62.192 69.9741 61.888C69.6221 61.584 69.1861 61.432 68.6661 61.432C68.1941 61.432 67.7901 61.584 67.4541 61.888C67.1181 62.184 66.9181 62.588 66.8541 63.1H70.5141Z"
              fill="#346AFD"
            />
          )}

          {/* Messages Tab Icon */}
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

          {/* Analytics Tab Icon */}
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

          {/* Wallet Tab Icon */}
          <Path
            d="M266.05 54.75C271.386 54.7457 276.698 55.4522 281.847 56.851C282.574 57.049 283.3 56.509 283.3 55.755V54.75M267.55 40.5V41.25C267.55 41.4489 267.471 41.6397 267.33 41.7803C267.19 41.921 266.999 42 266.8 42H266.05M266.05 42V41.625C266.05 41.004 266.554 40.5 267.175 40.5H284.05M266.05 42V51M284.05 40.5V41.25C284.05 41.664 284.386 42 284.8 42H285.55M284.05 40.5H284.425C285.046 40.5 285.55 41.004 285.55 41.625V51.375C285.55 51.996 285.046 52.5 284.425 52.5H284.05M266.05 51V51.375C266.05 51.6734 266.169 51.9595 266.38 52.1705C266.591 52.3815 266.877 52.5 267.175 52.5H267.55M266.05 51H266.8C266.999 51 267.19 51.079 267.33 51.2197C267.471 51.3603 267.55 51.5511 267.55 51.75V52.5M284.05 52.5V51.75C284.05 51.5511 284.129 51.3603 284.27 51.2197C284.41 51.079 284.601 51 284.8 51H285.55M284.05 52.5H267.55M278.8 46.5C278.8 47.2956 278.484 48.0587 277.921 48.6213C277.359 49.1839 276.596 49.5 275.8 49.5C275.004 49.5 274.241 49.1839 273.679 48.6213C273.116 48.0587 272.8 47.2956 272.8 46.5C272.8 45.7044 273.116 44.9413 273.679 44.3787C274.241 43.8161 275.004 43.5 275.8 43.5C276.596 43.5 277.359 43.8161 277.921 44.3787C278.484 44.9413 278.8 45.7044 278.8 46.5ZM281.8 46.5H281.808V46.508H281.8V46.5ZM269.8 46.5H269.808V46.508H269.8V46.5Z"
            stroke={activeTab === "wallet" ? "#346AFD" : "#484C52"}
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </Svg>

        {/* Absolute responsive transparent touch overlays */}
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
          <TouchableOpacity
            style={{ flex: 1, height: "100%", justifyContent: "center", alignItems: "center" }}
            onPress={() => setActiveTab("home")}
            activeOpacity={0.7}
          />
          <TouchableOpacity
            style={{ flex: 1, height: "100%", justifyContent: "center", alignItems: "center" }}
            onPress={() => {
              setActiveTab("messages");
              router.replace("/messages");
            }}
            activeOpacity={0.7}
          />
          <TouchableOpacity
            style={{ flex: 1, height: "100%", justifyContent: "center", alignItems: "center" }}
            onPress={() => setActiveTab("analytics")}
            activeOpacity={0.7}
          />
          <TouchableOpacity
            style={{ flex: 1, height: "100%", justifyContent: "center", alignItems: "center" }}
            onPress={() => setActiveTab("wallet")}
            activeOpacity={0.7}
          />
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
