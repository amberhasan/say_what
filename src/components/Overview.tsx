import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const Overview = ({onPressLetsGo}: any) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.welcomeText}>Welcome to...</Text>
        <Text style={styles.titleText}>Capfluencer!</Text>
      </View>

      <View style={{height: 350, marginHorizontal: 20, paddingTop: 40}}>
        <ImageBackground
          resizeMode="stretch"
          style={{
            height: 350,
            width: '100%',
          }}
          source={require('../assets/images/utils/messageCloudPlaceholder.png')}>
          <View
            style={{
              height: 265,
              // backgroundColor: 'orange',
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 100,
              paddingHorizontal: 15,
              // marginHorizontal: 75,,
              // opacity: 0.5,
            }}>
            <Text style={styles.captionText}>Your new Caption Influencer!</Text>

            <Text style={styles.descriptionText}>
              Whether you’re in a pinch, need inspiration, or have no idea what
              to say, Capfluencer is here to help!
            </Text>
          </View>
        </ImageBackground>
      </View>
      <TouchableOpacity style={styles.button} onPress={onPressLetsGo}>
        <Text style={styles.buttonText}>Let's go!</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffeef6',
  },
  header: {
    alignItems: 'flex-start', // Align items to the left
    marginBottom: 20, // Adjust as needed to control spacing from the rest of the content
  },
  welcomeText: {
    fontSize: 80,
    fontWeight: 'bold',
    fontFamily: 'Ephesis-Regular',
    paddingLeft: 15, // Remove margin and padding to bring texts closer
    padding: 0,
    marginRight: 50,
  },
  titleText: {
    fontSize: 40,
    fontWeight: 'bold',
    fontFamily: 'YesevaOne-Regular',
    marginTop: -25, // Negative margin to bring this text closer to the above text
    marginLeft: 100,
  },

  captionText: {
    fontSize: 19,
    textAlign: 'center',
    marginBottom: 10,
    fontFamily: 'YesevaOne-Regular',
  },
  descriptionText: {
    fontSize: 17,
    textAlign: 'center',
    marginBottom: 30,
    paddingHorizontal: 20,
    fontFamily: 'YesevaOne-Regular',
    paddingTop: 10,
    lineHeight: 21,
  },
  button: {
    backgroundColor: '#FFFFFF', // Set to white or the color matching your design
    paddingVertical: 10,
    paddingHorizontal: 15, // Increase padding for a wider button
    borderRadius: 10, // Adjust border radius to match your design, if it's a circle, it should be half of the height
    borderWidth: 2, // Add border width if there is a border in the design
    borderColor: '#000000', // Set border color to match your design
    // Add shadow styles if the button has a shadow
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    marginTop: 200,
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    fontSize: 22.8,
    fontWeight: 'bold', // Add bold if the text is bold in the design
    color: '#000000', // Set text color to match your design
    textAlign: 'center',
    fontFamily: 'YesevaOne-Regular',
  },
});

export default Overview;
