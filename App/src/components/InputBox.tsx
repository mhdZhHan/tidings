import React, {useState, useRef, useEffect} from 'react';
import {TextInput, StyleSheet, Animated, TextInputProps} from 'react-native';

type InputBoxProps = TextInputProps & {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  icon?: React.ReactNode;
};

const InputBox = ({value, setValue, icon, ...props}: InputBoxProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: isFocused ? 1 : 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [isFocused]);

  const backgroundColor = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['#F2F2F2', '#fff'],
  });

  const borderColor = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['#F2F2F2', '#000'],
  });

  return (
    <Animated.View style={[styles.inputBox, {backgroundColor, borderColor}]}>
      {icon && icon}
      <TextInput
        {...props}
        style={styles.input}
        value={value}
        onChangeText={setValue}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
    </Animated.View>
  );
};

export default InputBox;

const styles = StyleSheet.create({
  inputBox: {
    position: 'relative',
    width: '100%',
    borderRadius: 8,
    paddingLeft: 10,
    marginBottom: 25,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
  },
  input: {
    flex: 1,
    paddingHorizontal: 10,
    color: '#000',
  },
});
