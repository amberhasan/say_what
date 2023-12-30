import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {StyleProp, TextProps, TextStyle} from 'react-native';

export type DiscoverStackParams = {
  CategoriesScreen: undefined; //we are not passing anything so we don't need RouteProp
  SubcategoriesScreen: {
    category: string;
  };
  CaptionsScreen: {
    selectedCategory: string;
    title: string;
    searchedCaption?: string;
  };
};

export type GettingStartedStackParams = {
  GettingStarted: undefined; //we are not passing anything so we don't need RouteProp
};

export type ScreenProps = StackNavigationProp<
  DiscoverStackParams,
  'CategoriesScreen' | 'SubcategoriesScreen' | 'CaptionsScreen'
>;

export type SubcategoriesScreenRoute = RouteProp<
  DiscoverStackParams,
  'SubcategoriesScreen'
>;

export type CaptionsScreenRoute = RouteProp<
  DiscoverStackParams,
  'CaptionsScreen'
>;

export type SearchStackParams = {
  SearchScreen: undefined;
  CaptionsScreen: {
    selectedCategory: string;
    title: string;
    searchedCaption?: string;
  };
};

export type SearchScreenProps = StackNavigationProp<
  SearchStackParams,
  'SearchScreen' | 'CaptionsScreen'
>;

export type SearchScreenRoute = RouteProp<SearchStackParams, 'SearchScreen'>;

export type CategoryBoxProps = {
  category: {
    label: string;
    icon: string;
  };
  onPress: () => void;
};

export type DropdownMenuProps = {
  caption: string;
  copyToClipboard: (caption: string) => void;
  toggleFavorite: (caption: string) => void;
  isFavorite: boolean;
};

export type GrayButtonProps = {
  item: string;
  onPress: (item: string) => void;
  buttonText?: object;
  buttonContainer?: object;
  buttonImageContainer?: object;
};

export type HeaderProps = {
  title: string;
  showBackButton?: boolean;
};

export interface customTextProps extends TextProps {
  // Include any additional props your CustomText component might need.
  // For example, a prop for custom styling:
  customStyle?: StyleProp<TextStyle>;
  // If you have other specific props, you can define them here.
}
