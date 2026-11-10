import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useTheme } from '../theme';

export default function Header({
  title,
  subtitle,
  showBack = false,
  showSettings = true,
  rightAction,
  onBack,
}) {
  const { theme, toggleTheme, isDark } = useTheme();
  const router = useRouter();

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else if (router.canGoBack()) {
      router.back();
    } else {
      router.replace('/');
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.left}>
        {showBack ? (
          <TouchableOpacity onPress={handleBack} style={[styles.iconButton, { backgroundColor: theme.surface }]}>
            <Ionicons name="chevron-back" size={22} color={theme.text} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={toggleTheme} style={[styles.iconButton, { backgroundColor: theme.surface }]}>
            <Text style={styles.themeEmoji}>{isDark ? '🌚' : '🌈'}</Text>
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.center}>
        {title && <Text style={[styles.title, { color: theme.text }]}>{title}</Text>}
        {subtitle && <Text style={[styles.subtitle, { color: theme.textSecondary }]}>{subtitle}</Text>}
      </View>

      <View style={styles.right}>
        {rightAction ? (
          rightAction
        ) : showSettings ? (
          <TouchableOpacity
            onPress={() => router.push('/settings')}
            style={[styles.iconButton, { backgroundColor: theme.surface }]}
          >
            <Ionicons name="ellipsis-vertical" size={20} color={theme.text} />
          </TouchableOpacity>
        ) : (
          <View style={styles.iconButton} />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 12,
  },
  left: {
    width: 44,
    alignItems: 'flex-start',
  },
  center: {
    flex: 1,
    alignItems: 'center',
  },
  right: {
    width: 44,
    alignItems: 'flex-end',
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: -0.3,
  },
  subtitle: {
    fontSize: 12,
    marginTop: 2,
    fontWeight: '500',
  },
  iconButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: 'center',
    justifyContent: 'center',
  },
  themeEmoji: {
    fontSize: 18,
  },
});
