import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useTheme } from '../theme';
import Header from '../components/Header';
import Button from '../components/Button';
import { initialSeats } from '../data';

const { width } = Dimensions.get('window');
const COLUMNS_LEFT = ['A', 'B', 'C'];
const COLUMNS_RIGHT = ['D', 'E', 'F'];

export default function SeatsSelectionScreen() {
  const { theme } = useTheme();
  const router = useRouter();

  const [activeTab, setActiveTab] = useState('Business'); // Business vs Economy
  const [seats, setSeats] = useState(initialSeats);
  const [selectedSeat, setSelectedSeat] = useState({ row: 15, col: 'A', class: 'Business class', price: 1250 });

  const handleSeatPress = (row, col, currentClass, status) => {
    if (status === 'occupied') return;

    setSeats(prev =>
      prev.map(s => {
        if (s.row === row && s.col === col) {
          return { ...s, status: 'selected' };
        } else if (s.status === 'selected') {
          return { ...s, status: 'available' };
        }
        return s;
      })
    );

    setSelectedSeat({
      row,
      col,
      class: currentClass === 'Business' ? 'Business class' : 'Economy class',
      price: currentClass === 'Business' ? 1250 : 890,
    });
  };

  const getSeatStatus = (row, col) => {
    const found = seats.find(s => s.row === row && s.col === col);
    return found ? found.status : 'available';
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <Header
        title="Select Seat"
        subtitle="Jet Airways · Boeing 777"
        showBack={true}
        showSettings={true}
      />

      {/* Class Switcher Tabs (Sketch: Business Class vs Economy Class) */}
      <View style={[styles.tabContainer, { backgroundColor: theme.surface }]}>
        <TouchableOpacity
          style={[styles.tabButton, activeTab === 'Business' && { backgroundColor: theme.accent }]}
          onPress={() => setActiveTab('Business')}
        >
          <Text style={[styles.tabText, { color: activeTab === 'Business' ? '#001339' : theme.textSecondary }]}>
            Business Class
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tabButton, activeTab === 'Economy' && { backgroundColor: theme.accent }]}
          onPress={() => setActiveTab('Economy')}
        >
          <Text style={[styles.tabText, { color: activeTab === 'Economy' ? '#001339' : theme.textSecondary }]}>
            Economy Class
          </Text>
        </TouchableOpacity>
      </View>

      {/* Seat Legend */}
      <View style={styles.legendContainer}>
        <View style={styles.legendItem}>
          <View style={[styles.legendBox, { backgroundColor: theme.seatFree, borderColor: theme.border }]} />
          <Text style={[styles.legendText, { color: theme.textSecondary }]}>Free</Text>
        </View>

        <View style={styles.legendItem}>
          <View style={[styles.legendBox, { backgroundColor: theme.seatReserved }]} />
          <Text style={[styles.legendText, { color: theme.textSecondary }]}>Reserved</Text>
        </View>

        <View style={styles.legendItem}>
          <View style={[styles.legendBox, { backgroundColor: theme.seatSelected }]} />
          <Text style={[styles.legendText, { color: theme.textSecondary }]}>Selected</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.cabinScroll}>
        {/* Airplane Fuselage Silhouette Header */}
        <View style={styles.fuselageNose}>
          <Ionicons name="airplane" size={32} color={theme.accent} />
          <Text style={[styles.cabinLabel, { color: theme.textMuted }]}>COCKPIT · FRONT</Text>
        </View>

        {/* Column Labels */}
        <View style={styles.columnsHeader}>
          <View style={styles.colGroup}>
            {COLUMNS_LEFT.map(c => (
              <Text key={c} style={[styles.colLabel, { color: theme.textMuted }]}>{c}</Text>
            ))}
          </View>
          <View style={styles.aisleSpace} />
          <View style={styles.colGroup}>
            {COLUMNS_RIGHT.map(c => (
              <Text key={c} style={[styles.colLabel, { color: theme.textMuted }]}>{c}</Text>
            ))}
          </View>
        </View>

        {/* Rows (Rows 12 to 18) */}
        {[12, 14, 15, 16, 17, 18].map(rowNum => {
          const isRowBusiness = rowNum <= 15;
          const isTargetClass = (activeTab === 'Business' && isRowBusiness) || (activeTab === 'Economy' && !isRowBusiness);

          return (
            <View
              key={rowNum}
              style={[
                styles.seatRow,
                !isTargetClass && { opacity: 0.4 },
              ]}
            >
              {/* Left 3 seats (A, B, C) */}
              <View style={styles.seatGroup}>
                {COLUMNS_LEFT.map(col => {
                  const status = getSeatStatus(rowNum, col);
                  const isSelected = status === 'selected';
                  const isOccupied = status === 'occupied';

                  return (
                    <TouchableOpacity
                      key={col}
                      activeOpacity={0.7}
                      disabled={isOccupied}
                      onPress={() => handleSeatPress(rowNum, col, isRowBusiness ? 'Business' : 'Economy', status)}
                      style={[
                        styles.seatChair,
                        {
                          backgroundColor: isSelected
                            ? theme.seatSelected
                            : isOccupied
                            ? theme.seatReserved
                            : theme.seatFree,
                          borderColor: theme.border,
                        },
                      ]}
                    >
                      <MaterialCommunityIcons
                        name="seat-passenger"
                        size={16}
                        color={isSelected ? '#001339' : isOccupied ? theme.textMuted : theme.text}
                      />
                    </TouchableOpacity>
                  );
                })}
              </View>

              {/* Aisle with Row Number */}
              <View style={styles.aisleCol}>
                <Text style={[styles.rowNumberText, { color: theme.textMuted }]}>{rowNum}</Text>
              </View>

              {/* Right 3 seats (D, E, F) */}
              <View style={styles.seatGroup}>
                {COLUMNS_RIGHT.map(col => {
                  const status = getSeatStatus(rowNum, col);
                  const isSelected = status === 'selected';
                  const isOccupied = status === 'occupied';

                  return (
                    <TouchableOpacity
                      key={col}
                      activeOpacity={0.7}
                      disabled={isOccupied}
                      onPress={() => handleSeatPress(rowNum, col, isRowBusiness ? 'Business' : 'Economy', status)}
                      style={[
                        styles.seatChair,
                        {
                          backgroundColor: isSelected
                            ? theme.seatSelected
                            : isOccupied
                            ? theme.seatReserved
                            : theme.seatFree,
                          borderColor: theme.border,
                        },
                      ]}
                    >
                      <MaterialCommunityIcons
                        name="seat-passenger"
                        size={16}
                        color={isSelected ? '#001339' : isOccupied ? theme.textMuted : theme.text}
                      />
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
          );
        })}
      </ScrollView>

      {/* Bottom Selected Seat Card (Sketch artboard seats: Button 375x174) */}
      <View style={[styles.bottomCard, { backgroundColor: theme.cardBg, borderTopColor: theme.border }]}>
        <View style={styles.selectedRow}>
          <View style={styles.selectedLeft}>
            <View style={[styles.seatIconBadge, { backgroundColor: theme.surface }]}>
              <Ionicons name="airplane" size={20} color={theme.accent} />
            </View>
            <View>
              <Text style={[styles.selectedLabel, { color: theme.textSecondary }]}>Selected Seat</Text>
              <Text style={[styles.selectedSeatCode, { color: theme.text }]}>
                {`${selectedSeat.row}${selectedSeat.col}`}
              </Text>
            </View>
          </View>

          <View style={[styles.classPill, { backgroundColor: theme.surface }]}>
            <Text style={[styles.classText, { color: theme.accent }]}>{selectedSeat.class}</Text>
          </View>
        </View>

        <Button
          title={`Choose ${selectedSeat.row}${selectedSeat.col} · $${selectedSeat.price}`}
          onPress={() => router.push('/confirmation')}
          variant="primary"
          style={styles.confirmButton}
          textStyle={{ color: '#001339', fontWeight: '800' }}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabContainer: {
    flexDirection: 'row',
    marginHorizontal: 20,
    borderRadius: 16,
    padding: 4,
    marginTop: 8,
    marginBottom: 12,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 12,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '700',
  },
  legendContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 10,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 14,
  },
  legendBox: {
    width: 14,
    height: 14,
    borderRadius: 4,
    marginRight: 6,
    borderWidth: 1,
  },
  legendText: {
    fontSize: 12,
    fontWeight: '600',
  },
  cabinScroll: {
    alignItems: 'center',
    paddingBottom: 40,
    paddingTop: 10,
    paddingHorizontal: 16,
  },
  fuselageNose: {
    alignItems: 'center',
    marginBottom: 16,
  },
  cabinLabel: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1,
    marginTop: 4,
  },
  columnsHeader: {
    flexDirection: 'row',
    width: '100%',
    maxWidth: 330,
    justifyContent: 'space-between',
    paddingHorizontal: 8,
    marginBottom: 8,
  },
  colGroup: {
    flexDirection: 'row',
    width: 124,
    justifyContent: 'space-between',
  },
  colLabel: {
    fontSize: 13,
    fontWeight: '700',
  },
  aisleSpace: {
    width: 40,
  },
  seatRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    maxWidth: 330,
    paddingHorizontal: 8,
    marginVertical: 6,
  },
  seatGroup: {
    flexDirection: 'row',
    width: 124,
    justifyContent: 'space-between',
  },
  seatChair: {
    width: 36,
    height: 38,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  aisleCol: {
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rowNumberText: {
    fontSize: 13,
    fontWeight: '700',
  },
  bottomCard: {
    padding: 20,
    borderTopWidth: 1,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 8,
  },
  selectedRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  selectedLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 8,
  },
  seatIconBadge: {
    width: 42,
    height: 42,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  selectedLabel: {
    fontSize: 12,
    fontWeight: '600',
  },
  selectedSeatCode: {
    fontSize: 22,
    fontWeight: '900',
    marginTop: 2,
  },
  classPill: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 12,
  },
  classText: {
    fontSize: 13,
    fontWeight: '700',
  },
  confirmButton: {
    width: '100%',
  },
});
