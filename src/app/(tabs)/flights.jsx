import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useTheme } from '../../theme';
import Header from '../../components/Header';
import Button from '../../components/Button';
import { destinationInfo, flightsList } from '../../data';

const { width } = Dimensions.get('window');

export default function FlightsOptionsScreen() {
  const { theme } = useTheme();
  const router = useRouter();

  const [selectedFlight, setSelectedFlight] = useState(flightsList[0]);

  const handleChooseFlight = (flight) => {
    setSelectedFlight(flight);
    router.push('/seats');
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]} edges={['top']}>
      <Header
        title="Flights"
        subtitle="Saint-Petersburg -> Seoul"
        showBack={false}
        showSettings={true}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Destination City Hero (Sketch artboard options: 532x946 backdrop) */}
        <View style={styles.heroContainer}>
          <Image
            source={require('../../assets/images/seoul_hero.png')}
            style={styles.heroImage}
            resizeMode="cover"
          />
          <View style={styles.heroOverlay} />

          {/* Top Destination Badges */}
          <View style={styles.heroHeader}>
            <View style={styles.weatherTag}>
              <Ionicons name="sunny" size={16} color="#FFD166" />
              <Text style={styles.weatherText}>{destinationInfo.weather}</Text>
            </View>
            <View style={styles.timeTag}>
              <Ionicons name="time-outline" size={14} color="#FFFFFF" />
              <Text style={styles.timeText}>{destinationInfo.localTime}</Text>
            </View>
          </View>

          {/* Destination Details */}
          <View style={styles.heroContent}>
            <Text style={styles.countryLabel}>{destinationInfo.country.toUpperCase()}</Text>
            <Text style={styles.cityName}>{destinationInfo.city}</Text>
            <Text style={styles.descriptionText}>{destinationInfo.description}</Text>

            <View style={styles.heroActions}>
              <TouchableOpacity
                style={styles.mapButton}
                onPress={() => router.push('/suggest')}
              >
                <Ionicons name="map-outline" size={16} color="#FFFFFF" />
                <Text style={styles.mapButtonText}>Get the map</Text>
              </TouchableOpacity>

              <View style={styles.currencyBadge}>
                <Text style={styles.currencyText}>Currency: {destinationInfo.currency}</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Available Flights Section */}
        <View style={styles.flightsSection}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: theme.text }]}>AVAILABLE FLIGHTS</Text>
            <TouchableOpacity onPress={() => router.push('/settings')}>
              <Text style={[styles.filterLink, { color: theme.accent }]}>Filter / Sort</Text>
            </TouchableOpacity>
          </View>

          {flightsList.map((flight) => {
            const isSelected = selectedFlight.id === flight.id;

            return (
              <View
                key={flight.id}
                style={[
                  styles.flightCard,
                  {
                    backgroundColor: theme.cardBg,
                    borderColor: isSelected ? theme.accent : theme.border,
                  },
                ]}
              >
                {/* Flight Card Header */}
                <View style={styles.cardHeader}>
                  <View style={styles.airlineRow}>
                    <Image source={flight.logo} style={styles.airlineLogo} resizeMode="contain" />
                    <View style={styles.airlinDetails}>
                      <Text style={[styles.airlineName, { color: theme.text }]}>{flight.airline}</Text>
                      <Text style={[styles.flightNum, { color: theme.textMuted }]}>{flight.flightNumber}</Text>
                    </View>
                  </View>
                  <Text style={[styles.priceTag, { color: theme.accent }]}>
                    {flight.currency}{flight.price.toLocaleString()}
                  </Text>
                </View>

                {/* Times & Route Row (Sketch: 04:55 LED -> 11:20 ICN, 6h 25m) */}
                <View style={styles.routeRow}>
                  <View style={styles.timeCol}>
                    <Text style={[styles.flightTime, { color: theme.text }]}>{flight.departureTime}</Text>
                    <Text style={[styles.flightAirport, { color: theme.textSecondary }]}>{flight.departureCode}</Text>
                  </View>

                  <View style={styles.durationCol}>
                    <Text style={[styles.durationText, { color: theme.textMuted }]}>{flight.duration}</Text>
                    <View style={styles.durationLine}>
                      <View style={[styles.lineDot, { backgroundColor: theme.accent }]} />
                      <View style={[styles.lineDash, { backgroundColor: theme.border }]} />
                      <Ionicons name="airplane" size={14} color={theme.accent} />
                      <View style={[styles.lineDash, { backgroundColor: theme.border }]} />
                      <View style={[styles.lineDot, { backgroundColor: theme.accent }]} />
                    </View>
                    <Text style={[styles.flightType, { color: theme.accent }]}>{flight.type}</Text>
                  </View>

                  <View style={[styles.timeCol, { alignItems: 'flex-end' }]}>
                    <Text style={[styles.flightTime, { color: theme.text }]}>{flight.arrivalTime}</Text>
                    <Text style={[styles.flightAirport, { color: theme.textSecondary }]}>{flight.arrivalCode}</Text>
                  </View>
                </View>

                {/* Choose Button (Sketch: Choose) */}
                <Button
                  title={isSelected ? 'Selected · Choose Seat' : 'Choose Flight'}
                  onPress={() => handleChooseFlight(flight)}
                  variant={isSelected ? 'primary' : 'outline'}
                  size="medium"
                  style={styles.chooseButton}
                  textStyle={isSelected ? { color: '#001339', fontWeight: '800' } : { color: theme.accent }}
                />
              </View>
            );
          })}
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
    paddingBottom: 110,
  },
  heroContainer: {
    height: 380,
    width: '100%',
    position: 'relative',
    justifyContent: 'space-between',
    padding: 20,
  },
  heroImage: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: 380,
  },
  heroOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 19, 57, 0.65)',
  },
  heroHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  weatherTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  weatherText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
    marginLeft: 6,
  },
  timeTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  timeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 6,
  },
  heroContent: {
    marginBottom: 8,
  },
  countryLabel: {
    color: '#5BD8FF',
    fontSize: 13,
    fontWeight: '800',
    letterSpacing: 1.5,
  },
  cityName: {
    color: '#FFFFFF',
    fontSize: 40,
    fontWeight: '900',
    letterSpacing: -0.5,
    marginVertical: 4,
  },
  descriptionText: {
    color: '#E0E7FF',
    fontSize: 13,
    lineHeight: 18,
    marginBottom: 16,
  },
  heroActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  mapButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#024EE0',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 14,
    marginRight: 12,
  },
  mapButtonText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
    marginLeft: 6,
  },
  currencyBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 14,
  },
  currencyText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  flightsSection: {
    paddingHorizontal: 16,
    marginTop: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
    marginLeft: 4,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  filterLink: {
    fontSize: 13,
    fontWeight: '700',
  },
  flightCard: {
    borderRadius: 22,
    padding: 18,
    borderWidth: 1.5,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  airlineRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  airlineLogo: {
    width: 32,
    height: 32,
    marginRight: 10,
  },
  airlinDetails: {},
  airlineName: {
    fontSize: 16,
    fontWeight: '700',
  },
  flightNum: {
    fontSize: 11,
    marginTop: 1,
  },
  priceTag: {
    fontSize: 22,
    fontWeight: '900',
  },
  routeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 18,
  },
  timeCol: {
    width: 70,
  },
  flightTime: {
    fontSize: 20,
    fontWeight: '800',
  },
  flightAirport: {
    fontSize: 13,
    fontWeight: '600',
    marginTop: 2,
  },
  durationCol: {
    flex: 1,
    alignItems: 'center',
  },
  durationText: {
    fontSize: 11,
    fontWeight: '600',
    marginBottom: 4,
  },
  durationLine: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'center',
  },
  lineDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  lineDash: {
    flex: 1,
    height: 1,
    marginHorizontal: 4,
  },
  flightType: {
    fontSize: 10,
    fontWeight: '700',
    marginTop: 4,
  },
  chooseButton: {
    marginTop: 4,
  },
});
