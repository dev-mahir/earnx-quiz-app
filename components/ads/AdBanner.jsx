import React from "react";
import {
	BannerAd,
	BannerAdSize,
	TestIds,
} from "react-native-google-mobile-ads";

// Define a helper function to get the appropriate Ad Unit ID based on the environment
const getAdUnitId = () => {
	// Check if the app is in development or production environment
	if (__DEV__) {
		// Return the Test Ad Unit ID in development
		return TestIds.BANNER;
	} else {
		// Replace this with your actual Ad Unit ID for production
		return "ca-app-pub-4204160329524961/8418965975"; // Your real Ad Unit ID here
	}
};

const AdBanner = () => (
	<BannerAd
		unitId={getAdUnitId()} // Dynamically assign the unitId based on the environment
		size={BannerAdSize.FULL_BANNER}
		requestOptions={{
			requestNonPersonalizedAdsOnly: true,
		}}
	/>
);

export default AdBanner;
