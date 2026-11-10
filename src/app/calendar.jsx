import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useTheme } from '../theme';
import Button from '../components/Button';

const { width } = Dimensions.get('window');
const DAYS_OF_WEEK = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];

export default function CalendarScreen() {
  const { theme } = useTheme();
  const router = useRouter();

  const [isReturn, setIsReturn] = useState(true);
  const [selectedStart, setSelectedStart] = useState(14); // Sketch: 14 October
  const [selectedEnd, setSelectedEnd] = useState(15); // Sketch: 15 October

  // 31 days of October
  const days = Array.from({ length: 31 }, (_, i) => i + 1);

  const handleSelectDay = (day) => {
    if (!isReturn) {
      setSelectedStart(day);
      setSelectedEnd(null);
    } else {
      if (!selectedStart || (selectedStart && selectedEnd)) {
        setSelectedStart(day);
        setSelectedEnd(null);
      } else if (day >= selectedStart) {
        setSelectedEnd(day);
      } else {
        setSelectedStart(day);
        setSelectedEnd(null);
      }
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={[styles.backBtn, { backgroundColor: theme.surface }]}>
          <Ionicons name="close" size={22} color={theme.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: theme.text }]}>Flight Dates</Text>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={[styles.doneBtn, { color: theme.accent }]}>Done</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Trip Type Switcher (Sketch: One way ticket vs Return) */}
        <View style={[styles.tabSwitcher, { backgroundColor: theme.surface }]}>
          <TouchableOpacity
            style={[styles.tabBtn, !isReturn && { backgroundColor: theme.accent }]}
            onPress={() => {
              setIsReturn(false);
              setSelectedEnd(null);
            }}
          >
            <Text style={[styles.tabText, { color: !isReturn ? '#001339' : theme.textSecondary }]}>
              One way ticket
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.tabBtn, isReturn && { backgroundColor: theme.accent }]}
            onPress={() => setIsReturn(true)}
          >
            <Text style={[styles.tabText, { color: isReturn ? '#001339' : theme.textSecondary }]}>
              Return
            </Text>
          </TouchableOpacity>
        </View>

        {/* Selected Route Info (Korea, ICN · Seoul) */}
        <View style={styles.destinationCard}>
          <Text style={[styles.destCountry, { color: theme.accent }]}>Korea, ICN</Text>
          <Text style={[styles.destCity, { color: theme.text }]}>Seoul</Text>
        </View>

        {/* Month Title (Sketch: October, 2018) */}
        <View style={styles.monthHeader}>
          <Text style={[styles.monthTitle, { color: theme.text }]}>October, 2018</Text>
          <View style={styles.monthArrows}>
            <TouchableOpacity style={[styles.arrowBtn, { backgroundColor: theme.surface }]}>
              <Ionicons name="chevron-back" size={16} color={theme.text} />
            </TouchableOpacity>
            <TouchableOpacity style={[styles.arrowBtn, { backgroundColor: theme.surface, marginLeft: 8 }]}>
              <Ionicons name="chevron-forward" size={16} color={theme.text} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Calendar Day Header */}
        <View style={styles.daysHeader}>
          {DAYS_OF_WEEK.map(d => (
            <Text key={d} style={[styles.dayColName, { color: theme.textMuted }]}>
              {d}
            </Text>
          ))}
        </View>

        {/* Calendar Grid */}
        <View style={styles.grid}>
          {days.map(day => {
            const isStart = day === selectedStart;
            const isEnd = day === selectedEnd;
            const inRange = selectedStart && selectedEnd && day > selectedStart && day < selectedEnd;
            const isHighlighted = isStart || isEnd;

            return (
              <TouchableOpacity
                key={day}
                activeOpacity={0.7}
                onPress={() => handleSelectDay(day)}
                style={[
                  styles.dayCell,
                  inRange && { backgroundColor: theme.surface },
                  isStart && styles.rangeStart,
                  isEnd && styles.rangeEnd,
                ]}
              >
                <View
                  style={[
                    styles.dayCircle,
                    isHighlighted && { backgroundColor: theme.accent },
                  ]}
                >
                  <Text
                    style={[
                      styles.dayNumber,
                      { color: isHighlighted ? '#001339' : theme.text },
                      isHighlighted && { fontWeight: '800' },
                    ]}
                  >
                    {day}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Selected Date Summary Card */}
        <View style={[styles.selectionCard, { backgroundColor: theme.cardBg, borderColor: theme.border }]}>
          <View style={styles.selectionRow}>
            <View>
              <Text style={[styles.selectionLabel, { color: theme.textSecondary }]}>Departure</Text>
              <Text style={[styles.selectionValue, { color: theme.text }]}>
                {selectedStart ? `Mon, ${selectedStart} October` : 'Select Date'}
              </Text>
            </View>
            {isReturn && (
              <View style={{ alignItems: 'flex-end' }}>
                <Text style={[styles.selectionLabel, { color: theme.textSecondary }]}>Return</Text>
                <Text style={[styles.selectionValue, { color: theme.text }]}>
                  {selectedEnd ? `Sun, ${selectedEnd} October` : 'Select Date'}
                </Text>
              </View>
            )}
          </View>

          <Button
            title="Confirm Dates"
            onPress={() => router.back()}
            variant="primary"
            style={{ marginTop: 16 }}
            textStyle={{ color: '#001339' }}
          />
        </View>
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
  backBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
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
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  tabSwitcher: {
    flexDirection: 'row',
    borderRadius: 16,
    padding: 4,
    marginVertical: 14,
  },
  tabBtn: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 12,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '700',
  },
  destinationCard: {
    alignItems: 'center',
    marginVertical: 12,
  },
  destCountry: {
    fontSize: 13,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  destCity: {
    fontSize: 28,
    fontWeight: '800',
    marginTop: 2,
  },
  monthHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 20,
    marginBottom: 12,
  },
  monthTitle: {
    fontSize: 18,
    fontWeight: '700',
  },
  monthArrows: {
    flexDirection: 'row',
  },
  arrowBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  daysHeader: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 8,
  },
  dayColName: {
    width: (width - 40) / 7,
    textAlign: 'center',
    fontSize: 13,
    fontWeight: '600',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  dayCell: {
    width: (width - 40) / 7,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 2,
  },
  dayCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dayNumber: {
    fontSize: 15,
    fontWeight: '600',
  },
  rangeStart: {
    borderTopLeftRadius: 18,
    borderBottomLeftRadius: 18,
  },
  rangeEnd: {
    borderTopRightRadius: 18,
    borderBottomRightRadius: 18,
  },
  selectionCard: {
    marginTop: 24,
    borderRadius: 20,
    borderWidth: 1,
    padding: 18,
  },
  selectionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  selectionLabel: {
    fontSize: 12,
    fontWeight: '500',
  },
  selectionValue: {
    fontSize: 16,
    fontWeight: '700',
    marginTop: 4,
  },
});
