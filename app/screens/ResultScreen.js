import AdBanner from '@/components/ads/AdBanner';
import React from 'react'
import { Button } from 'react-native'

const ResultScreen = () => {
  return (
		<>
			<Button
				title="Go to Home"
				onPress={() => navigation.navigate("Home")}
		  />
		  
		  <AdBanner/>
		</>
  );
}

export default ResultScreen