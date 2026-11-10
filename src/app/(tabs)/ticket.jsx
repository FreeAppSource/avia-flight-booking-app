import React from 'react';
import {
  View,
  Text,
  Alert,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Share,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useTheme } from '../../theme';
import Header from '../../components/Header';
import Button from '../../components/Button';
import { attractions } from '../../data';

const { width } = Dimensions.get('window');

export default function TicketBoardingPassScreen() {
  const { theme } = useTheme();
  const router = useRouter();

  const handleShare = async () => {
    try {
      await Share.share({
        message: 'Avia Boarding Pass: SFO -> JFK / LED -> ICN, Flight #4739374hfjdj, Jet Airways. Seat 15A.',
      });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]} edges={['top']}>
      <Header
        title="Boarding Pass"
        subtitle="Flight #4739374hfjdj"
        showBack={false}
        showSettings={true}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Ticket Boarding Pass Card (Sketch artboard ticket: 1186px high) */}
        <View style={[styles.ticketCard, { backgroundColor: theme.cardBg, borderColor: theme.border }]}>
          {/* Airline Header */}
          <View style={styles.ticketHeader}>
            <View style={styles.airlineBadge}>
              <Image
                source={require('../../assets/images/airline_logo.png')}
                style={styles.airlineLogo}
                resizeMode="contain"
              />
              <Text style={[styles.airlineTitle, { color: theme.text }]}>Jet Airways</Text>
            </View>
            <View style={[styles.classBadge, { backgroundColor: theme.surface }]}>
              <Text style={[styles.classBadgeText, { color: theme.accent }]}>Business</Text>
            </View>
          </View>

          {/* Departure & Arrival Times (Sketch: 04:55 SFO / LED -> 11:20 JFK / ICN, 6h 25m) */}
          <View style={styles.timesContainer}>
            <View style={styles.stationBlock}>
              <Text style={[styles.stationCode, { color: theme.text }]}>LED</Text>
              <Text style={[styles.stationCity, { color: theme.textSecondary }]}>Saint-Petersburg</Text>
              <Text style={[styles.timeVal, { color: theme.accent }]}>04:55</Text>
            </View>

            <View style={styles.flightMidCol}>
              <Text style={[styles.durationVal, { color: theme.textMuted }]}>6h 25m</Text>
              <View style={styles.lineFlight}>
                <Ionicons name="airplane" size={18} color={theme.accent} />
              </View>
              <Text style={[styles.flightNumberText, { color: theme.textMuted }]}>#4739374hfjdj</Text>
            </View>

            <View style={[styles.stationBlock, { alignItems: 'flex-end' }]}>
              <Text style={[styles.stationCode, { color: theme.text }]}>ICN</Text>
              <Text style={[styles.stationCity, { color: theme.textSecondary }]}>Seoul</Text>
              <Text style={[styles.timeVal, { color: theme.accent }]}>11:20</Text>
            </View>
          </View>

          {/* Ticket Perforated Cut Line */}
          <View style={styles.perforatedSection}>
            <View style={[styles.cutoutLeft, { backgroundColor: theme.background }]} />
            <View style={[styles.cutoutDashes, { borderColor: theme.border }]} />
            <View style={[styles.cutoutRight, { backgroundColor: theme.background }]} />
          </View>

          {/* Passenger & Flight Details Grid */}
          <View style={styles.detailsGrid}>
            <View style={styles.gridCell}>
              <Text style={[styles.cellLabel, { color: theme.textMuted }]}>PASSENGER</Text>
              <Text style={[styles.cellValue, { color: theme.text }]}>2 People (Adult)</Text>
            </View>

            <View style={styles.gridCell}>
              <Text style={[styles.cellLabel, { color: theme.textMuted }]}>SEAT</Text>
              <Text style={[styles.cellValue, { color: theme.text }]}>15A, 15B</Text>
            </View>

            <View style={styles.gridCell}>
              <Text style={[styles.cellLabel, { color: theme.textMuted }]}>DATE</Text>
              <Text style={[styles.cellValue, { color: theme.text }]}>Mon, 14 Oct</Text>
            </View>

            <View style={styles.gridCell}>
              <Text style={[styles.cellLabel, { color: theme.textMuted }]}>PRICE</Text>
              <Text style={[styles.cellValue, { color: theme.accent }]}>$1,250</Text>
            </View>
          </View>

          {/* Barcode Section (Sketch: 600x1300-2 / Barcode) */}
          <View style={styles.barcodeBox}>
            <Image
              source={require('../../assets/images/barcode.png')}
              style={styles.barcodeImage}
              resizeMode="contain"
            />
            <Text style={[styles.barcodeDigits, { color: theme.textMuted }]}>
              ETKT 4739 3749 1048 2901
            </Text>
          </View>

          {/* Download & Share Actions */}
          <View style={styles.actionButtons}>
            <Button
              title="Share Boarding Pass"
              onPress={handleShare}
              variant="outline"
              size="medium"
              style={{ width: '100%' }}
              icon={<Ionicons name="share-social-outline" size={18} color={theme.accent} />}
            />
            <Button
              title="Add to Apple Wallet"
              onPress={() => Alert.alert('Apple Wallet', 'Boarding pass added to Apple Wallet!')}
              variant="primary"
              size="medium"
              style={{ width: '100%' }}
              textStyle={{ color: '#001339', fontWeight: '800' }}
              icon={<Ionicons name="wallet-outline" size={18} color="#001339" />}
            />
          </View>
        </View>

        {/* Attractions Section (Sketch artboard ticket: National Museum of Korea, MUST SEE) */}
        <View style={styles.attractionsSection}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: theme.text }]}>MUST SEE · ATTRACTIONS</Text>
            <Text style={[styles.sectionSub, { color: theme.accent }]}>Seoul Guide</Text>
          </View>

          {/* Featured Museum Banner */}
          <View style={[styles.museumCard, { backgroundColor: theme.cardBg, borderColor: theme.border }]}>
            <Image
              source={require('../../assets/images/attraction_museum.png')}
              style={styles.museumImage}
              resizeMode="cover"
            />
            <View style={styles.museumDetails}>
              <View style={styles.ratingBadge}>
                <Ionicons name="star" size={14} color="#FFD166" />
                <Text style={styles.ratingText}>4.9</Text>
              </View>
              <Text style={[styles.museumTitle, { color: theme.text }]}>National Museum of Korea</Text>
              <Text style={[styles.museumDesc, { color: theme.textSecondary }]}>
                Holders of world-renowned Korean cultural treasures & historic relics.
              </Text>
            </View>
          </View>

          {/* Additional Attractions Horizontal Scroll */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.attractionsScroll}>
            {attractions.slice(1).map(att => (
              <View
                key={att.id}
                style={[styles.smallAttCard, { backgroundColor: theme.cardBg, borderColor: theme.border }]}
              >
                <Image source={att.image} style={styles.smallAttImage} resizeMode="cover" />
                <View style={styles.smallAttDetails}>
                  <Text style={[styles.smallAttSub, { color: theme.accent }]}>{att.subtitle}</Text>
                  <Text style={[styles.smallAttTitle, { color: theme.text }]} numberOfLines={1}>
                    {att.title}
                  </Text>
                </View>
              </View>
            ))}
          </ScrollView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 110,
  },
  ticketCard: {
    borderRadius: 24,
    borderWidth: 1.5,
    padding: 20,
    marginTop: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 4,
  },
  ticketHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  airlineBadge: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  airlineLogo: {
    width: 28,
    height: 28,
    marginRight: 8,
  },
  airlineTitle: {
    fontSize: 16,
    fontWeight: '800',
  },
  classBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
  },
  classBadgeText: {
    fontSize: 12,
    fontWeight: '800',
  },
  timesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  stationBlock: {
    width: 100,
  },
  stationCode: {
    fontSize: 28,
    fontWeight: '900',
  },
  stationCity: {
    fontSize: 12,
    fontWeight: '500',
    marginTop: 2,
  },
  timeVal: {
    fontSize: 16,
    fontWeight: '800',
    marginTop: 4,
  },
  flightMidCol: {
    alignItems: 'center',
    flex: 1,
  },
  durationVal: {
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 4,
  },
  lineFlight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  flightNumberText: {
    fontSize: 10,
    fontWeight: '600',
    marginTop: 4,
  },
  perforatedSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: -20,
    marginVertical: 14,
  },
  cutoutLeft: {
    width: 20,
    height: 20,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },
  cutoutDashes: {
    flex: 1,
    height: 1,
    borderWidth: 1,
    borderStyle: 'dashed',
    marginHorizontal: 8,
  },
  cutoutRight: {
    width: 20,
    height: 20,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  detailsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingVertical: 10,
  },
  gridCell: {
    width: '50%',
    marginVertical: 8,
  },
  cellLabel: {
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  cellValue: {
    fontSize: 15,
    fontWeight: '700',
    marginTop: 2,
  },
  barcodeBox: {
    alignItems: 'center',
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.06)',
    marginTop: 10,
  },
  barcodeImage: {
    width: 220,
    height: 70,
  },
  barcodeDigits: {
    fontSize: 11,
    letterSpacing: 2,
    fontWeight: '600',
    marginTop: 6,
  },
  actionButtons: {
    flexDirection: 'column',
    gap: 10,
    marginTop: 16,
  },
  attractionsSection: {
    marginTop: 28,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  sectionSub: {
    fontSize: 12,
    fontWeight: '700',
  },
  museumCard: {
    borderRadius: 20,
    borderWidth: 1,
    overflow: 'hidden',
    marginBottom: 16,
  },
  museumImage: {
    width: '100%',
    height: 140,
  },
  museumDetails: {
    padding: 16,
  },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  ratingText: {
    color: '#FFD166',
    fontSize: 13,
    fontWeight: '800',
    marginLeft: 4,
  },
  museumTitle: {
    fontSize: 17,
    fontWeight: '800',
  },
  museumDesc: {
    fontSize: 13,
    marginTop: 4,
    lineHeight: 18,
  },
  attractionsScroll: {
    marginLeft: -4,
  },
  smallAttCard: {
    width: 160,
    borderRadius: 16,
    borderWidth: 1,
    overflow: 'hidden',
    marginRight: 12,
  },
  smallAttImage: {
    width: '100%',
    height: 90,
  },
  smallAttDetails: {
    padding: 10,
  },
  smallAttSub: {
    fontSize: 10,
    fontWeight: '800',
  },
  smallAttTitle: {
    fontSize: 13,
    fontWeight: '700',
    marginTop: 2,
  },
});
