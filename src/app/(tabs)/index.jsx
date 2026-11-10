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
import { initialFlightSearch } from '../../data';

const { width } = Dimensions.get('window');

export default function MainSearchScreen() {
  const { theme, isDark } = useTheme();
  const router = useRouter();

  const [searchState, setSearchState] = useState(initialFlightSearch);

  const swapRoute = () => {
    setSearchState(prev => ({
      ...prev,
      origin: prev.destination,
      destination: prev.origin,
    }));
  };

  const handleSearch = () => {
    router.push('/(tabs)/flights');
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]} edges={['top']}>
      <Header
        title="AVIA"
        subtitle="Flight Booking UI"
        showBack={false}
        showSettings={true}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Route Map Visual Banner (Sketch artboard 0: confirmation / main-screen) */}
        <View style={styles.mapContainer}>
          <Image
            source={require('../../assets/images/map.png')}
            style={styles.mapImage}
            resizeMode="cover"
          />

          {/* Departure City */}
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => router.push('/suggest')}
            style={styles.originBadge}
          >
            <Text style={[styles.cityTitle, { color: theme.text }]}>
              {searchState.origin.city}
            </Text>
            <Text style={[styles.countryCode, { color: theme.accent }]}>
              {searchState.origin.country}, {searchState.origin.code}
            </Text>
          </TouchableOpacity>

          {/* Plane flight path connection icon */}
          <TouchableOpacity onPress={swapRoute} style={[styles.swapButton, { backgroundColor: theme.cardBg }]}>
            <Ionicons name="swap-vertical" size={20} color={theme.accent} />
          </TouchableOpacity>

          {/* Destination City */}
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => router.push('/suggest')}
            style={styles.destinationBadge}
          >
            <Text style={[styles.cityTitle, { color: theme.text }]}>
              {searchState.destination.city}
            </Text>
            <Text style={[styles.countryCode, { color: theme.accent }]}>
              {searchState.destination.country}, {searchState.destination.code}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Flight Search Parameters Card (Sketch Rectangle 12 Copy: 343x335) */}
        <View style={[styles.searchCard, { backgroundColor: theme.cardBg, borderColor: theme.border }]}>
          {/* Departure Date */}
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => router.push('/calendar')}
            style={styles.rowItem}
          >
            <View style={[styles.iconCircle, { backgroundColor: theme.surface }]}>
              <Ionicons name="calendar-outline" size={20} color={theme.accent} />
            </View>
            <View style={styles.rowTexts}>
              <Text style={[styles.rowLabel, { color: theme.textSecondary }]}>Departure Date</Text>
              <Text style={[styles.rowValue, { color: theme.text }]}>{searchState.departureDate}</Text>
              <Text style={[styles.rowSubValue, { color: theme.textMuted }]}>{searchState.departureTimeRange}</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color={theme.textMuted} />
          </TouchableOpacity>

          <View style={[styles.divider, { backgroundColor: theme.border }]} />

          {/* Arrival Date */}
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => router.push('/calendar')}
            style={styles.rowItem}
          >
            <View style={[styles.iconCircle, { backgroundColor: theme.surface }]}>
              <Ionicons name="calendar" size={20} color={theme.accent} />
            </View>
            <View style={styles.rowTexts}>
              <Text style={[styles.rowLabel, { color: theme.textSecondary }]}>Arrival Date</Text>
              <Text style={[styles.rowValue, { color: theme.text }]}>{searchState.arrivalDate}</Text>
              <Text style={[styles.rowSubValue, { color: theme.textMuted }]}>{searchState.arrivalTimeRange}</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color={theme.textMuted} />
          </TouchableOpacity>

          <View style={[styles.divider, { backgroundColor: theme.border }]} />

          {/* Passengers */}
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => router.push('/settings')}
            style={styles.rowItem}
          >
            <View style={[styles.iconCircle, { backgroundColor: theme.surface }]}>
              <Ionicons name="people-outline" size={20} color={theme.accent} />
            </View>
            <View style={styles.rowTexts}>
              <Text style={[styles.rowLabel, { color: theme.textSecondary }]}>Passenger</Text>
              <Text style={[styles.rowValue, { color: theme.text }]}>
                {`${searchState.passengers.adults} Adult   ${searchState.passengers.children} Child   ${searchState.passengers.infants} Infant`}
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color={theme.textMuted} />
          </TouchableOpacity>

          {/* Search Button (Sketch: Button 305x21) */}
          <Button
            title="Search Flights"
            onPress={handleSearch}
            variant="primary"
            style={styles.searchButton}
            textStyle={{ color: '#001339', fontWeight: '800' }}
          />
        </View>

        {/* Quick Travel Highlights Preview */}
        <View style={styles.quickNav}>
          <TouchableOpacity
            style={[styles.quickCard, { backgroundColor: theme.cardBg }]}
            onPress={() => router.push('/suggest')}
          >
            <Ionicons name="search" size={22} color={theme.accent} />
            <Text style={[styles.quickTitle, { color: theme.text }]}>Airports</Text>
            <Text style={[styles.quickSub, { color: theme.textMuted }]}>Suggest</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.quickCard, { backgroundColor: theme.cardBg }]}
            onPress={() => router.push('/calendar')}
          >
            <Ionicons name="calendar-sharp" size={22} color={theme.accent} />
            <Text style={[styles.quickTitle, { color: theme.text }]}>Calendar</Text>
            <Text style={[styles.quickSub, { color: theme.textMuted }]}>Dates</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.quickCard, { backgroundColor: theme.cardBg }]}
            onPress={() => router.push('/seats')}
          >
            <Ionicons name="grid-outline" size={22} color={theme.accent} />
            <Text style={[styles.quickTitle, { color: theme.text }]}>Seat Map</Text>
            <Text style={[styles.quickSub, { color: theme.textMuted }]}>Choose</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.quickCard, { backgroundColor: theme.cardBg }]}
            onPress={() => router.push('/(tabs)/ticket')}
          >
            <Ionicons name="barcode-outline" size={22} color={theme.accent} />
            <Text style={[styles.quickTitle, { color: theme.text }]}>Ticket</Text>
            <Text style={[styles.quickSub, { color: theme.textMuted }]}>Pass</Text>
          </TouchableOpacity>
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
    paddingBottom: 40,
  },
  mapContainer: {
    height: 250,
    width: '100%',
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  mapImage: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: 250,
    opacity: 0.85,
  },
  originBadge: {
    alignItems: 'center',
    position: 'absolute',
    top: 25,
  },
  destinationBadge: {
    alignItems: 'center',
    position: 'absolute',
    bottom: 25,
  },
  cityTitle: {
    fontSize: 26,
    fontWeight: '800',
    letterSpacing: -0.5,
  },
  countryCode: {
    fontSize: 13,
    fontWeight: '600',
    marginTop: 4,
  },
  swapButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
  },
  searchCard: {
    marginHorizontal: 16,
    borderRadius: 24,
    padding: 20,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 5,
  },
  rowItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  iconCircle: {
    width: 44,
    height: 44,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  rowTexts: {
    flex: 1,
  },
  rowLabel: {
    fontSize: 12,
    fontWeight: '500',
  },
  rowValue: {
    fontSize: 16,
    fontWeight: '700',
    marginTop: 2,
  },
  rowSubValue: {
    fontSize: 12,
    marginTop: 2,
  },
  divider: {
    height: 1,
    marginVertical: 4,
    marginLeft: 58,
  },
  searchButton: {
    marginTop: 20,
  },
  quickNav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginTop: 24,
  },
  quickCard: {
    width: (width - 32 - 36) / 4,
    borderRadius: 16,
    paddingVertical: 14,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  quickTitle: {
    fontSize: 12,
    fontWeight: '700',
    marginTop: 8,
  },
  quickSub: {
    fontSize: 10,
    marginTop: 2,
  },
});
