import {Text, TouchableOpacity, StyleSheet} from 'react-native';

type CustomButtonProps = {
  text: string;
  onPress: () => void;
  disabled?: boolean;
};

const CustomButton = ({text, onPress, disabled}: CustomButtonProps) => {
  return (
    <TouchableOpacity
      style={[styles.button, disabled && {backgroundColor: '#A9A9A9'}]}
      activeOpacity={0.8}
      onPress={onPress}
      disabled={disabled}>
      <Text style={styles.buttonText}>{text}</Text>
    </TouchableOpacity>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#000',
    borderRadius: 9999,
    paddingVertical: 15,
    paddingHorizontal: 15,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
});
