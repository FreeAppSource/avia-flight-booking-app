import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useTheme } from '../theme';
import { suggestedAirports } from '../data';

export default function SuggestScreen() {
  const { theme } = useTheme();
  const router = useRouter();

  const [query, setQuery] = useState('Se');
  const [selectedDestination, setSelectedDestination] = useState('Seoul');

  const filtered = suggestedAirports.filter(
    item =>
      item.city.toLowerCase().includes(query.toLowerCase()) ||
      item.country.toLowerCase().includes(query.toLowerCase()) ||
      item.code.toLowerCase().includes(query.toLowerCase())
  );

  const handleSelect = (item) => {
    setSelectedDestination(item.city);
    router.back();
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={[styles.backBtn, { backgroundColor: theme.surface }]}>
          <Ionicons name="close" size={22} color={theme.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: theme.text }]}>Destination</Text>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={[styles.doneBtn, { color: theme.accent }]}>Done</Text>
        </TouchableOpacity>
      </View>

      {/* Origin & Destination Display (Sketch: Saint-Petersburg, Russia, LED) */}
      <View style={[styles.routeBox, { backgroundColor: theme.cardBg, borderColor: theme.border }]}>
        <View style={styles.routeRow}>
          <View style={[styles.dot, { backgroundColor: theme.accent }]} />
          <View style={styles.routeDetails}>
            <Text style={[styles.routeLabel, { color: theme.textSecondary }]}>From</Text>
            <Text style={[styles.routeCity, { color: theme.text }]}>Saint-Petersburg</Text>
            <Text style={[styles.routeCode, { color: theme.textMuted }]}>Russia, LED</Text>
          </View>
        </View>

        <View style={[styles.routeDivider, { backgroundColor: theme.border }]} />

        <View style={styles.routeRow}>
          <View style={[styles.dot, { backgroundColor: theme.highlight }]} />
          <View style={styles.routeDetails}>
            <Text style={[styles.routeLabel, { color: theme.textSecondary }]}>To</Text>
            <TextInput
              style={[styles.input, { color: theme.text }]}
              value={query}
              onChangeText={setQuery}
              placeholder="Search city or airport..."
              placeholderTextColor={theme.textMuted}
              autoFocus
            />
          </View>
          {query.length > 0 && (
            <TouchableOpacity onPress={() => setQuery('')}>
              <Ionicons name="close-circle" size={18} color={theme.textMuted} />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Suggestion List (Sketch: Seoul, Seville, Semey, Tacoma) */}
      <FlatList
        data={filtered}
        keyExtractor={item => item.code}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={
          <Text style={[styles.sectionTitle, { color: theme.textSecondary }]}>
            POPULAR AIRPORTS & CITIES
          </Text>
        }
        renderItem={({ item }) => {
          const isSelected = selectedDestination === item.city;
          return (
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => handleSelect(item)}
              style={[
                styles.itemCard,
                { backgroundColor: theme.cardBg, borderColor: isSelected ? theme.accent : theme.border },
              ]}
            >
              <View style={styles.itemLeft}>
                <View style={[styles.iconWrap, { backgroundColor: theme.surface }]}>
                  <Ionicons name="airplane-outline" size={20} color={theme.accent} />
                </View>
                <View>
                  <Text style={[styles.itemCity, { color: theme.text }]}>{item.city}</Text>
                  <Text style={[styles.itemCountry, { color: theme.textMuted }]}>
                    {item.country} · {item.airport}
                  </Text>
                </View>
              </View>

              <View style={[styles.codeBadge, { backgroundColor: theme.surface }]}>
                <Text style={[styles.codeText, { color: theme.accent }]}>{item.code}</Text>
              </View>
            </TouchableOpacity>
          );
        }}
      />
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
  routeBox: {
    marginHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1,
    padding: 16,
    marginTop: 8,
    marginBottom: 20,
  },
  routeRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 14,
  },
  routeDetails: {
    flex: 1,
  },
  routeLabel: {
    fontSize: 11,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  routeCity: {
    fontSize: 16,
    fontWeight: '700',
    marginTop: 2,
  },
  routeCode: {
    fontSize: 12,
    marginTop: 1,
  },
  input: {
    fontSize: 16,
    fontWeight: '700',
    marginTop: 2,
    padding: 0,
    outlineStyle: 'none',
  },
  routeDivider: {
    height: 1,
    marginVertical: 12,
    marginLeft: 24,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.5,
    marginBottom: 12,
    marginLeft: 4,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 30,
  },
  itemCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 14,
    borderRadius: 16,
    borderWidth: 1,
    marginBottom: 10,
  },
  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconWrap: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  itemCity: {
    fontSize: 16,
    fontWeight: '700',
  },
  itemCountry: {
    fontSize: 12,
    marginTop: 2,
  },
  codeBadge: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 10,
  },
  codeText: {
    fontSize: 13,
    fontWeight: '800',
  },
});
