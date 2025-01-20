import React, { useState, useEffect } from "react";
import { View, Text, FlatList, Image, StyleSheet } from "react-native";


const LeaderboardScreen = () => {
	

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Leaderboard</Text>
			
		
		</View>
	);
};

const styles = StyleSheet.create({
	container: { flex: 1, padding: 20 },
	title: {
		fontSize: 24,
		fontWeight: "bold",
		marginBottom: 20,
		textAlign: "center",
	},
	row: { flexDirection: "row", alignItems: "center", marginBottom: 10 },
	rank: { fontWeight: "bold", fontSize: 18, marginRight: 10 },
	avatar: { width: 40, height: 40, borderRadius: 20, marginRight: 10 },
	name: { fontSize: 16, flex: 1 },
	level: { fontSize: 16, color: "blue", marginRight: 10 },
	score: { fontSize: 16, fontWeight: "bold" },
});

export default LeaderboardScreen;
