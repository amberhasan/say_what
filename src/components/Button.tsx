import {Text, TouchableOpacity, StyleSheet} from 'react-native';
import colors from '../theme/colors';

const Button = ({title, onPress, buttonTextStyle, buttonContainer}: any) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.container, buttonContainer]}>
      <Text style={[styles.title, buttonTextStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0,
    backgroundColor: colors.lightPink, // A lighter shade of pink
    paddingHorizontal: 20,
    borderRadius: 10, // Fully rounded corners
    marginVertical: 8, // Adjusted vertical margin
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: 'rgba(0, 0, 0, 0)', // Light shadow
    shadowOpacity: 1,
    elevation: 6,
  },
  title: {
    color: '#000', // Dark text color
    fontSize: 28,
    fontFamily: 'PlayfairDisplay-Regular', // Assuming you have this font integrated
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
});

export default Button;
