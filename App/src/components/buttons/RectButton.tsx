import {Text, TouchableOpacity} from 'react-native';

type RectButtonProps = {
  text: string;
  onPress: () => void;
  disabled?: boolean;
};

const RectButton = ({text, onPress, disabled}: RectButtonProps) => {
  return (
    <TouchableOpacity
      activeOpacity={0.5}
      onPress={onPress}
      disabled={disabled}
      style={{
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderWidth: 1,
        borderRadius: 6,
        borderColor: '#000',
        backgroundColor: '#000',
      }}>
      <Text
        style={{
          color: '#fff',
        }}>
        {text}
      </Text>
    </TouchableOpacity>
  );
};

export default RectButton;
