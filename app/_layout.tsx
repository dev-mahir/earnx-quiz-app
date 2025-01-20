import { DarkTheme, DefaultTheme, NavigationContainer, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { createStackNavigator } from "@react-navigation/stack";

import QuizScreen from "./screens/QuizScreen";
import LoginScreen from "./screens/LoginScreen";
import ResultScreen from "./screens/ResultScreen";
import ProfileScreen from "./screens/ProfileScreen";
import LeaderboardScreen from "./screens/LeaderboardScreen";

import { useColorScheme } from '@/hooks/useColorScheme';
import HomeScreen from './(tabs)';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

const Stack = createStackNavigator();
  return (
		<ThemeProvider
			value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
			<NavigationContainer>
				<Stack.Navigator
					initialRouteName="Login"
					screenOptions={{ headerShown: false }}>
					<Stack.Screen name="Home" component={HomeScreen} />
					<Stack.Screen
						name="Leaderboard"
						component={LeaderboardScreen}
					/>
					<Stack.Screen name="Login" component={LoginScreen} />
					<Stack.Screen name="Quiz" component={QuizScreen} />
					<Stack.Screen name="Result" component={ResultScreen} />
					<Stack.Screen name="Profile" component={ProfileScreen} />
				</Stack.Navigator>
			</NavigationContainer>
		</ThemeProvider>
  );
}
