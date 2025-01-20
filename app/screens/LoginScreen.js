import React, { useState, useEffect } from "react";
import {
	View,
	Text,
	TextInput,
	Button,
	StyleSheet,
	Image,
	TouchableOpacity,
	Alert,
} from "react-native";
import { signInWithPhoneNumber } from "firebase/auth";
import { auth } from "../../firebase";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AdBanner from "../../components/ads/AdBanner";

const avatars = [
	"https://example.com/avatar1.png",
	"https://example.com/avatar2.png",
	"https://example.com/avatar3.png",
];

const LoginScreen = ({ navigation }) => {
	const [phone, setPhone] = useState("");
	const [otp, setOtp] = useState("");
	const [confirm, setConfirm] = useState(null);
	const [selectedAvatar, setSelectedAvatar] = useState(avatars[0]);

	useEffect(() => {
		const checkUserLoggedIn = async () => {
			const storedPhone = await AsyncStorage.getItem("phone");
			const storedAvatar = await AsyncStorage.getItem("avatar");

			if (storedPhone && storedAvatar) {
				navigation.navigate("Quiz", { avatar: storedAvatar });
			}
		};

		checkUserLoggedIn();
	}, [navigation]);

	const sendOtp = async () => {
		if (!phone) {
			Alert.alert("Please enter a phone number");
			return;
		}

		try {
			const confirmation = await signInWithPhoneNumber(auth, phone);
			setConfirm(confirmation);
		} catch (error) {
			Alert.alert("Error sending OTP", error.message);
		}
	};

	const verifyOtp = async () => {
		try {
			await confirm.confirm(otp);
			await AsyncStorage.setItem("phone", phone);
			await AsyncStorage.setItem("avatar", selectedAvatar);

			navigation.navigate("Quiz", { avatar: selectedAvatar });
		} catch (error) {
			Alert.alert("Invalid OTP", error.message);
		}
	};

	return (
		<>
			<AdBanner />
			<View style={styles.container}>
				{!confirm ? (
					<>
						<Text>Select an Avatar</Text>
						<View style={styles.avatarContainer}>
							{avatars.map((avatar, index) => (
								<TouchableOpacity
									key={index}
									onPress={() => setSelectedAvatar(avatar)}>
									<Image
										source={{ uri: avatar }}
										style={[
											styles.avatar,
											{
												borderColor:
													selectedAvatar === avatar
														? "blue"
														: "gray",
											},
										]}
									/>
								</TouchableOpacity>
							))}
						</View>
						<TextInput
							style={styles.input}
							placeholder="Phone Number"
							onChangeText={setPhone}
							keyboardType="phone-pad"
							value={phone}
						/>
						<Button title="Send OTP" onPress={sendOtp} />
					</>
				) : (
					<>
						<TextInput
							style={styles.input}
							placeholder="OTP"
							onChangeText={setOtp}
							keyboardType="numeric"
							value={otp}
						/>
						<Button title="Verify OTP" onPress={verifyOtp} />
						<Button
							title="Go to Home"
							onPress={() => navigation.navigate("Home")}
						/>
					</>
				)}
			</View>
		</>
	);
};

const styles = StyleSheet.create({
	container: { flex: 1, justifyContent: "center", padding: 20 },
	input: {
		borderWidth: 1,
		padding: 10,
		marginVertical: 10,
		borderRadius: 5,
	},
	avatarContainer: {
		flexDirection: "row",
		justifyContent: "center",
		marginVertical: 20,
	},
	avatar: {
		width: 50,
		height: 50,
		borderRadius: 25,
		marginHorizontal: 5,
		borderWidth: 2,
	},
});

export default LoginScreen;
