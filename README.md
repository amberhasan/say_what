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

## General
* `App.tsx` is the first thing that the program runs. It holds the bottom tab navigator as well as all the screens and overview.
* The "assets" folder holds all the fonts used and the images used throughout the application like the bottom tab images, back button, icons
* The "theme" folder holds the colors and fonts used in the app
* The "types" folder holds the different data types (something that is important in Typescript)
* The "reducers" and "store" folders/files are to handle the device ID of users so that we can store each user's Favorites individually
* The "utils" folder and file inside handle the formatting when retrieving data from the backend, converting it to a readable front-end text

## Screens
There's a folder called "screens" which holds all of the screens of the application. For the 4 bottom tabs, we have:
1. "HomeScreen.tsx"
2. "CategoriesScreen.tsx" -> "SubcategoriesScreen.tsx" -> "CaptionsScreen.tsx" is the order of screens when you click into each button
3. "FavoritesScreen.tsx"
4. "SearchScreen.tsx"
  
The first tab has the info button, which takes the user to the "InfoScreen". 
There is a very similar screen that the user sees when they launch the app for the very first time, called the "OverviewScreen". 

## Components
In React Native, instead of having huge files, you break things into components that you can plug in to different places. So, I have made these reusable components:
* Button.tsx is currently a light pink button - it's used in CategoriesScreen.tsx file mainly and also in the FavoritesScreen.tsx
* CategoryBox.tsx is what is used in the SubcategoriesScreen.txt for each item
* CustomText.txt is a file that holds some default text style I wanted to use throughout the app
* DropdownMenu.tsx is the component that is used when a caption is selected and there is a "Copy to clipboard" and "Add to favorites"
* Header.tsx holds all of the very top bar text and sometimes the back button.
* Overview.tsx is a component I used to create the InfoScreen and OverviewScreen
