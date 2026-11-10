import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useTheme } from '../theme';
import Button from '../components/Button';

export default function SettingsScreen() {
  const { theme, toggleTheme, isDark } = useTheme();
  const router = useRouter();

  // Settings from Sketch:
  // Sort by Recommended, Kids 0, Adult 1, Food Vegetarian, Departure time / Arrival time, First Class / Business / Economy
  const [sortBy, setSortBy] = useState('Recommended');
  const [adults, setAdults] = useState(1);
  const [kids, setKids] = useState(0);
  const [food, setFood] = useState('Vegetarian');
  const [flightClass, setFlightClass] = useState('Business');
  const [directOnly, setDirectOnly] = useState(true);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Top Header (Sketch: Cancel & Done) */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={[styles.cancelBtn, { color: theme.textSecondary }]}>Cancel</Text>
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: theme.text }]}>Settings & Filters</Text>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={[styles.doneBtn, { color: theme.accent }]}>Done</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Theme Switcher: Dark mode 🌚 vs Bright mode 🌈 */}
        <View style={[styles.sectionCard, { backgroundColor: theme.cardBg, borderColor: theme.border }]}>
          <View style={styles.row}>
            <View style={styles.rowLeft}>
              <View style={[styles.iconBox, { backgroundColor: theme.surface }]}>
                <Ionicons name={isDark ? 'moon' : 'sunny'} size={20} color={theme.accent} />
              </View>
              <View>
                <Text style={[styles.rowTitle, { color: theme.text }]}>Appearance</Text>
                <Text style={[styles.rowSubtitle, { color: theme.textSecondary }]}>
                  {isDark ? 'Dark Mode 🌚 (Midnight Navy)' : 'Bright Mode 🌈 (Cobalt Blue)'}
                </Text>
              </View>
            </View>
            <Switch
              value={!isDark}
              onValueChange={toggleTheme}
              trackColor={{ false: '#09214D', true: '#024EE0' }}
              thumbColor={theme.accent}
            />
          </View>
        </View>

        {/* Sort by Option (Sketch: Sort by -> Recommended) */}
        <Text style={[styles.sectionTitle, { color: theme.textSecondary }]}>SORT BY</Text>
        <View style={[styles.sectionCard, { backgroundColor: theme.cardBg, borderColor: theme.border }]}>
          {['Recommended', 'Cheapest', 'Fastest Duration'].map((opt, i) => (
            <TouchableOpacity
              key={opt}
              style={[
                styles.optionRow,
                i > 0 && { borderTopWidth: 1, borderTopColor: theme.border },
              ]}
              onPress={() => setSortBy(opt)}
            >
              <Text style={[styles.optionText, { color: theme.text }]}>{opt}</Text>
              {sortBy === opt && <Ionicons name="checkmark" size={20} color={theme.accent} />}
            </TouchableOpacity>
          ))}
        </View>

        {/* Passengers (Sketch: Adult 1, Kids 0) */}
        <Text style={[styles.sectionTitle, { color: theme.textSecondary }]}>PASSENGERS</Text>
        <View style={[styles.sectionCard, { backgroundColor: theme.cardBg, borderColor: theme.border }]}>
          <View style={styles.counterRow}>
            <View>
              <Text style={[styles.counterTitle, { color: theme.text }]}>Adults</Text>
              <Text style={[styles.counterSub, { color: theme.textMuted }]}>Age 12+</Text>
            </View>
            <View style={styles.counterControls}>
              <TouchableOpacity
                onPress={() => setAdults(Math.max(1, adults - 1))}
                style={[styles.counterBtn, { backgroundColor: theme.surface }]}
              >
                <Ionicons name="remove" size={18} color={theme.text} />
              </TouchableOpacity>
              <Text style={[styles.counterNumber, { color: theme.text }]}>{adults}</Text>
              <TouchableOpacity
                onPress={() => setAdults(adults + 1)}
                style={[styles.counterBtn, { backgroundColor: theme.surface }]}
              >
                <Ionicons name="add" size={18} color={theme.text} />
              </TouchableOpacity>
            </View>
          </View>

          <View style={[styles.divider, { backgroundColor: theme.border }]} />

          <View style={styles.counterRow}>
            <View>
              <Text style={[styles.counterTitle, { color: theme.text }]}>Kids</Text>
              <Text style={[styles.counterSub, { color: theme.textMuted }]}>Age 2-11</Text>
            </View>
            <View style={styles.counterControls}>
              <TouchableOpacity
                onPress={() => setKids(Math.max(0, kids - 1))}
                style={[styles.counterBtn, { backgroundColor: theme.surface }]}
              >
                <Ionicons name="remove" size={18} color={theme.text} />
              </TouchableOpacity>
              <Text style={[styles.counterNumber, { color: theme.text }]}>{kids}</Text>
              <TouchableOpacity
                onPress={() => setKids(kids + 1)}
                style={[styles.counterBtn, { backgroundColor: theme.surface }]}
              >
                <Ionicons name="add" size={18} color={theme.text} />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Food Preference (Sketch: Food -> Vegetarian) */}
        <Text style={[styles.sectionTitle, { color: theme.textSecondary }]}>IN-FLIGHT MEALS</Text>
        <View style={[styles.sectionCard, { backgroundColor: theme.cardBg, borderColor: theme.border }]}>
          {['Vegetarian', 'Standard Meal', 'Halal', 'Kosher', 'Gluten Free'].map((m, i) => (
            <TouchableOpacity
              key={m}
              style={[
                styles.optionRow,
                i > 0 && { borderTopWidth: 1, borderTopColor: theme.border },
              ]}
              onPress={() => setFood(m)}
            >
              <Text style={[styles.optionText, { color: theme.text }]}>{m}</Text>
              {food === m && <Ionicons name="checkmark" size={20} color={theme.accent} />}
            </TouchableOpacity>
          ))}
        </View>

        {/* Flight Class (Sketch: First Class, Business, Economy) */}
        <Text style={[styles.sectionTitle, { color: theme.textSecondary }]}>CABIN CLASS</Text>
        <View style={[styles.sectionCard, { backgroundColor: theme.cardBg, borderColor: theme.border }]}>
          {['Economy', 'Business', 'First Class'].map((c, i) => (
            <TouchableOpacity
              key={c}
              style={[
                styles.optionRow,
                i > 0 && { borderTopWidth: 1, borderTopColor: theme.border },
              ]}
              onPress={() => setFlightClass(c)}
            >
              <Text style={[styles.optionText, { color: theme.text }]}>{c}</Text>
              {flightClass === c && <Ionicons name="checkmark" size={20} color={theme.accent} />}
            </TouchableOpacity>
          ))}
        </View>

        {/* Direct Flights Only Switch */}
        <View style={[styles.sectionCard, { backgroundColor: theme.cardBg, borderColor: theme.border, marginTop: 14 }]}>
          <View style={styles.row}>
            <View style={styles.rowLeft}>
              <View style={[styles.iconBox, { backgroundColor: theme.surface }]}>
                <Ionicons name="airplane-sharp" size={20} color={theme.accent} />
              </View>
              <View>
                <Text style={[styles.rowTitle, { color: theme.text }]}>Direct Flights Only</Text>
                <Text style={[styles.rowSubtitle, { color: theme.textSecondary }]}>
                  Exclude multi-stop connections
                </Text>
              </View>
            </View>
            <Switch
              value={directOnly}
              onValueChange={setDirectOnly}
              trackColor={{ false: '#09214D', true: '#024EE0' }}
              thumbColor={theme.accent}
            />
          </View>
        </View>

        <Button
          title="Apply Filters"
          onPress={() => router.back()}
          variant="primary"
          style={{ marginTop: 24 }}
          textStyle={{ color: '#001339', fontWeight: '800' }}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 14,
  },
  cancelBtn: {
    fontSize: 16,
    fontWeight: '600',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
  },
  doneBtn: {
    fontSize: 16,
    fontWeight: '700',
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 120,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.5,
    marginTop: 20,
    marginBottom: 8,
    marginLeft: 4,
  },
  sectionCard: {
    borderRadius: 18,
    borderWidth: 1,
    overflow: 'hidden',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  rowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconBox: {
    width: 38,
    height: 38,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  rowTitle: {
    fontSize: 15,
    fontWeight: '700',
  },
  rowSubtitle: {
    fontSize: 12,
    marginTop: 2,
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  optionText: {
    fontSize: 15,
    fontWeight: '600',
  },
  counterRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  counterTitle: {
    fontSize: 15,
    fontWeight: '700',
  },
  counterSub: {
    fontSize: 12,
    marginTop: 2,
  },
  counterControls: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  counterBtn: {
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: 'center',
    justifyContent: 'center',
  },
  counterNumber: {
    fontSize: 16,
    fontWeight: '700',
    marginHorizontal: 16,
  },
  divider: {
    height: 1,
    marginHorizontal: 16,
  },
});
