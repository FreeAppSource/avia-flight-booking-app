import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useTheme } from '../theme';
import Header from '../components/Header';
import Button from '../components/Button';

export default function ConfirmationScreen() {
  const { theme } = useTheme();
  const router = useRouter();

  const [paymentMethod, setPaymentMethod] = useState('apple'); // apple, card, crypto
  const [loading, setLoading] = useState(false);

  const handleConfirmPay = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      Alert.alert(
        'Booking Confirmed! ✈️',
        'Your flight to Seoul (ICN) is booked. Your boarding pass is ready in your Boarding Pass tab.',
        [
          {
            text: 'View Boarding Pass',
            onPress: () => router.replace('/(tabs)/ticket'),
          },
        ]
      );
    }, 1200);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <Header
        title="Payment & Confirmation"
        subtitle="Review Flight Details"
        showBack={true}
        showSettings={false}
      />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Booking Route Card */}
        <View style={[styles.card, { backgroundColor: theme.cardBg, borderColor: theme.border }]}>
          <View style={styles.routeHeader}>
            <View>
              <Text style={[styles.cityText, { color: theme.text }]}>Saint-Petersburg</Text>
              <Text style={[styles.codeText, { color: theme.textSecondary }]}>LED · Russia</Text>
            </View>

            <View style={styles.arrowIcon}>
              <Ionicons name="airplane" size={20} color={theme.accent} />
            </View>

            <View style={{ alignItems: 'flex-end' }}>
              <Text style={[styles.cityText, { color: theme.text }]}>Seoul</Text>
              <Text style={[styles.codeText, { color: theme.textSecondary }]}>ICN · South Korea</Text>
            </View>
          </View>

          <View style={[styles.divider, { backgroundColor: theme.border }]} />

          <View style={styles.infoRow}>
            <View>
              <Text style={[styles.infoLabel, { color: theme.textMuted }]}>FLIGHT</Text>
              <Text style={[styles.infoVal, { color: theme.text }]}>Jet Airways #4739</Text>
            </View>
            <View style={{ alignItems: 'flex-end' }}>
              <Text style={[styles.infoLabel, { color: theme.textMuted }]}>SEAT</Text>
              <Text style={[styles.infoVal, { color: theme.accent }]}>15A (Business)</Text>
            </View>
          </View>

          <View style={styles.infoRow}>
            <View>
              <Text style={[styles.infoLabel, { color: theme.textMuted }]}>DEPARTURE</Text>
              <Text style={[styles.infoVal, { color: theme.text }]}>Mon, 14 Oct · 04:55</Text>
            </View>
            <View style={{ alignItems: 'flex-end' }}>
              <Text style={[styles.infoLabel, { color: theme.textMuted }]}>ARRIVAL</Text>
              <Text style={[styles.infoVal, { color: theme.text }]}>Mon, 14 Oct · 11:20</Text>
            </View>
          </View>
        </View>

        {/* Payment Methods */}
        <Text style={[styles.sectionTitle, { color: theme.textSecondary }]}>PAYMENT METHOD</Text>

        <TouchableOpacity
          style={[
            styles.paymentCard,
            { backgroundColor: theme.cardBg, borderColor: paymentMethod === 'apple' ? theme.accent : theme.border },
          ]}
          onPress={() => setPaymentMethod('apple')}
        >
          <View style={styles.paymentLeft}>
            <Ionicons name="logo-apple" size={24} color={theme.text} />
            <Text style={[styles.paymentTitle, { color: theme.text }]}>Apple Pay</Text>
          </View>
          <Ionicons
            name={paymentMethod === 'apple' ? 'radio-button-on' : 'radio-button-off'}
            size={22}
            color={paymentMethod === 'apple' ? theme.accent : theme.textMuted}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.paymentCard,
            { backgroundColor: theme.cardBg, borderColor: paymentMethod === 'card' ? theme.accent : theme.border },
          ]}
          onPress={() => setPaymentMethod('card')}
        >
          <View style={styles.paymentLeft}>
            <Ionicons name="card-outline" size={24} color={theme.text} />
            <View>
              <Text style={[styles.paymentTitle, { color: theme.text }]}>Credit Card</Text>
              <Text style={[styles.paymentSub, { color: theme.textMuted }]}>•••• 4920 · Exp 08/29</Text>
            </View>
          </View>
          <Ionicons
            name={paymentMethod === 'card' ? 'radio-button-on' : 'radio-button-off'}
            size={22}
            color={paymentMethod === 'card' ? theme.accent : theme.textMuted}
          />
        </TouchableOpacity>

        {/* Price Breakdown */}
        <View style={[styles.breakdownCard, { backgroundColor: theme.cardBg, borderColor: theme.border }]}>
          <View style={styles.priceRow}>
            <Text style={[styles.priceLabel, { color: theme.textSecondary }]}>Flight Ticket (Business)</Text>
            <Text style={[styles.priceVal, { color: theme.text }]}>$1,180</Text>
          </View>
          <View style={styles.priceRow}>
            <Text style={[styles.priceLabel, { color: theme.textSecondary }]}>Taxes & Airport Surcharges</Text>
            <Text style={[styles.priceVal, { color: theme.text }]}>$70</Text>
          </View>
          <View style={[styles.divider, { backgroundColor: theme.border }]} />
          <View style={styles.priceRow}>
            <Text style={[styles.totalLabel, { color: theme.text }]}>Total Amount</Text>
            <Text style={[styles.totalVal, { color: theme.accent }]}>$1,250</Text>
          </View>
        </View>

        <Button
          title="Confirm & Pay $1,250"
          onPress={handleConfirmPay}
          loading={loading}
          variant="primary"
          style={{ marginTop: 20 }}
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
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 40,
  },
  card: {
    borderRadius: 20,
    borderWidth: 1,
    padding: 18,
    marginTop: 8,
  },
  routeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cityText: {
    fontSize: 18,
    fontWeight: '800',
  },
  codeText: {
    fontSize: 12,
    marginTop: 2,
  },
  arrowIcon: {
    padding: 8,
  },
  divider: {
    height: 1,
    marginVertical: 14,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 6,
  },
  infoLabel: {
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  infoVal: {
    fontSize: 14,
    fontWeight: '700',
    marginTop: 2,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.5,
    marginTop: 24,
    marginBottom: 10,
    marginLeft: 4,
  },
  paymentCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderRadius: 16,
    borderWidth: 1.5,
    marginBottom: 10,
  },
  paymentLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  paymentTitle: {
    fontSize: 15,
    fontWeight: '700',
    marginLeft: 12,
  },
  paymentSub: {
    fontSize: 12,
    marginLeft: 12,
    marginTop: 2,
  },
  breakdownCard: {
    borderRadius: 16,
    borderWidth: 1,
    padding: 16,
    marginTop: 14,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 4,
  },
  priceLabel: {
    fontSize: 13,
  },
  priceVal: {
    fontSize: 14,
    fontWeight: '600',
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: '800',
  },
  totalVal: {
    fontSize: 20,
    fontWeight: '900',
  },
});
