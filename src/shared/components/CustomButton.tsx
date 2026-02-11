import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
} from 'react-native';

interface ButtonProps {
  title: string;
  onPress: () => void;
  loading?: boolean;
  variant?: 'primary' | 'outline';
  style?: ViewStyle;
}

const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  loading,
  variant = 'primary',
  style,
}) => {
  const isOutline = variant === 'outline';

  return (
    <TouchableOpacity
      style={[
        styles.button,
        isOutline ? styles.outlineButton : styles.primaryButton,
        style,
      ]}
      onPress={onPress}
      disabled={loading}
    >
      {loading ? (
        <ActivityIndicator color={isOutline ? '#000000' : '#fff'} />
      ) : (
        <Text style={[styles.text, isOutline ? styles.outlineText : styles.primaryText]}>
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    height: 35,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
    borderWidth: 1,
  },
  primaryButton: {
    backgroundColor: '#000000',
    borderColor: '#000000',
  },
  outlineButton: {
    backgroundColor: 'transparent',
    borderColor: '#000000',
  },
  text: {
    fontSize: 14,
    fontWeight: '600',
  },
  primaryText: {
    color: '#fff',
  },
  outlineText: {
    color: '#794a4aff',
  },
});
