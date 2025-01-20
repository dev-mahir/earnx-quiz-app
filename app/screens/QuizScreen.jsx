import AdBanner from "@/components/ads/AdBanner";
import React, { useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";

const quizData = [
	{
		question: "What is the capital of France?",
		options: ["Paris", "London", "Berlin", "Madrid"],
		answer: "Paris",
	},
	{
		question: "What is 2 + 2?",
		options: ["3", "4", "5", "6"],
		answer: "4",
	},
];

const QuizScreen = ({ navigation }) => {
	const [currentQuestion, setCurrentQuestion] = useState(0);
	const [score, setScore] = useState(0);

	const handleAnswer = (selected) => {
		if (quizData[currentQuestion].answer === selected) setScore(score + 1);
		if (currentQuestion + 1 < quizData.length) {
			setCurrentQuestion(currentQuestion + 1);
		} else {
			navigation.navigate("Result", { score });
		}
	};

	return (
		<>
			<AdBanner />
			<View style={styles.container}>
				<Text style={styles.question}>
					{quizData[currentQuestion].question}
				</Text>
				{quizData[currentQuestion].options.map((option, index) => (
					<Button
						key={index}
						title={option}
						onPress={() => handleAnswer(option)}
					/>
				))}
			</View>
			<AdBanner />
		</>
	);
};

const styles = StyleSheet.create({
	container: { flex: 1, justifyContent: "center", padding: 20 },
	question: { fontSize: 18, marginBottom: 20 },
});

export default QuizScreen;
