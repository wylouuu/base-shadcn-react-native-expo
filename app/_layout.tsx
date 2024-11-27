import '~/global.css';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { Theme, ThemeProvider } from '@react-navigation/native';
import { SplashScreen, Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { Platform, View } from 'react-native';
import { NAV_THEME } from '~/lib/constants';
import { useColorScheme } from '~/lib/useColorScheme';
import {
	useFonts,
	Inter_400Regular,
	Inter_500Medium,
	Inter_700Bold,
	Inter_900Black,
} from '@expo-google-fonts/inter';

const LIGHT_THEME: Theme = {
	dark: false,
	colors: NAV_THEME.light,
	fonts: {
		regular: {
			fontFamily: 'Inter_400Regular',
			fontWeight: '400',
		},
		medium: {
			fontFamily: 'Inter_500Medium',
			fontWeight: '500',
		},
		bold: {
			fontFamily: 'Inter_700Bold',
			fontWeight: '700',
		},
		heavy: {
			fontFamily: 'Inter_900Black',
			fontWeight: '900',
		},
	},
};
const DARK_THEME: Theme = {
	dark: true,
	colors: NAV_THEME.dark,
	fonts: {
		regular: {
			fontFamily: 'Inter_400Regular',
			fontWeight: '400',
		},
		medium: {
			fontFamily: 'Inter_500Medium',
			fontWeight: '500',
		},
		bold: {
			fontFamily: 'Inter_700Bold',
			fontWeight: '700',
		},
		heavy: {
			fontFamily: 'Inter_900Black',
			fontWeight: '900',
		},
	},
};

export {
	// Catch any errors thrown by the Layout component.
	ErrorBoundary,
} from 'expo-router';

// Prevent the splash screen from auto-hiding before getting the color scheme.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
	const { colorScheme, setColorScheme, isDarkColorScheme } = useColorScheme();
	const [isColorSchemeLoaded, setIsColorSchemeLoaded] = React.useState(false);
	const [fontsLoaded] = useFonts({
		Inter_400Regular,
		Inter_500Medium,
		Inter_700Bold,
		Inter_900Black,
	});

	React.useEffect(() => {
		(async () => {
			const theme = await AsyncStorage.getItem('theme');

			if (Platform.OS === 'web') {
				// Adds the background color to the html element to prevent white background on overscroll.
				document.documentElement.classList.add('bg-background');
			}

			if (!theme) {
				// Set the default theme to 'light' if no theme is stored
				const defaultTheme = 'light';
				await AsyncStorage.setItem('theme', defaultTheme);
				setColorScheme(defaultTheme);
				setIsColorSchemeLoaded(true);
				return;
			}

			const colorTheme = theme === 'dark' ? 'dark' : 'light';
			if (colorTheme !== colorScheme) {
				setColorScheme(colorTheme);
			}
			setIsColorSchemeLoaded(true);
		})().finally(() => {
			SplashScreen.hideAsync();
		});
	}, []);

	if (!fontsLoaded || !isColorSchemeLoaded) {
		return null;
	}

	return (
		<ThemeProvider value={isDarkColorScheme ? DARK_THEME : LIGHT_THEME}>
			<StatusBar style={isDarkColorScheme ? 'light' : 'dark'} />
			<View className='p-8 flex-1'>
				<Stack screenOptions={{ headerShown: false }} />
			</View>
		</ThemeProvider>
	);
}
