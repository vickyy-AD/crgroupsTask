import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TextInputProps,
  ViewStyle,
  TouchableOpacity,
  Image,
} from 'react-native';
import { COLORS } from '../constants/colors';

const EYE_ON = require('../assets/icons/eyeon.png');
const EYE_OFF = require('../assets/icons/eyeoff.png');

interface InputFieldProps extends TextInputProps {
  label: string;
  error?: string | null;
  containerStyle?: ViewStyle;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  error,
  style,
  containerStyle,
  secureTextEntry,
  ...props
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  return (
    <View style={[styles.container, containerStyle]}>
      {label ? <Text style={styles.label}>{label}</Text> : null}

      <View style={styles.inputContainer}>
        <TextInput
          style={[styles.input, error && styles.errorInput, style]}
          secureTextEntry={secureTextEntry && !isPasswordVisible}
          placeholderTextColor={COLORS.GREY}
          {...props}
        />
        {secureTextEntry && (
          <TouchableOpacity
            style={styles.eyeIcon}
            onPress={() => setIsPasswordVisible(!isPasswordVisible)}
            activeOpacity={0.7}
          >
            <Image
              source={isPasswordVisible ? EYE_ON : EYE_OFF}
              style={styles.eyeImage}
              resizeMode="contain"
            />
          </TouchableOpacity>
        )}
      </View>

      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
};

export default InputField;

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    marginBottom: 8,
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.TEXT_PRIMARY,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: COLORS.LIGHT_ORANGE_BORDER,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingRight: 50,
    height: 54,
    fontSize: 16,
    backgroundColor: COLORS.WHITE,
    color: COLORS.TEXT_PRIMARY,
  },
  eyeIcon: {
    position: 'absolute',
    right: 16,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  eyeImage: {
    width: 24,
    height: 24,
    tintColor: COLORS.LIGHT_ORANGE,
  },
  errorInput: {
    borderColor: COLORS.RED,
  },
  errorText: {
    color: COLORS.RED,
    fontSize: 12,
    marginTop: 6,
    marginLeft: 4,
  },
});
