# Starting the application 

Make sure you have completed the [React Native - Environment Setup](https://reactnative.dev/docs/environment-setup) instructions till "Creating a new application" step, before proceeding.

## Step 1: Start the Metro Server

First, you will need to start **Metro**, the JavaScript _bundler_ that ships _with_ React Native.

To start Metro, run the following command from the _root_ of your React Native project:

```bash
yarn start
```

## Step 2: Start your Application

Let Metro Bundler run in its _own_ terminal. Open a _new_ terminal from the _root_ of your React Native project. Run the following command to start your _iOS_ app:

### For iOS

```bash
yarn ios
```

You can also run it by opening the iOS folder of the app in XCode, and then clicking the Play button
If everything is set up _correctly_, you should see your new app running in your _iOS Simulator_ shortly provided you have set up your emulator/simulator correctly.


# About the application 
* `App.tsx` is the first thing that the program runs. It holds the bottom tab navigator as well as all the screens and overview.

## Screens
There's a folder called "screens" which holds all of the screens of the application. For the 4 bottom tabs, we have:
1. "HomeScreen"
2. "CategoriesScreen" -> "SubcategoriesScreen" -> "CaptionsScreen" is the order of screens when you click into each button
3. "FavoritesScreen"
4. "SearchScreen"
  
The first tab has the info button, which takes the user to the "InfoScreen". 
There is a very similar screen that the user sees when they launch the app for the very first time, called the "OverviewScreen". 

## Components
In React Native, instead of having huge files, you break things into components that you can plug in to different places. So, I have made these reusable components:
* 
