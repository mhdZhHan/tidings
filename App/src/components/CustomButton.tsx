import {Text, TouchableOpacity, StyleSheet} from 'react-native';

type CustomButtonProps = {
  text: string;
  onPress: () => void;
};

const CustomButton = ({text, onPress}: CustomButtonProps) => {
  return (
    <TouchableOpacity
      style={styles.button}
      activeOpacity={0.8}
      onPress={onPress}>
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
