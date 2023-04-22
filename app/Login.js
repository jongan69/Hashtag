import { useEffect } from "react";
import { StyleSheet, Text, View, Button, Alert } from "react-native";
import { useRouter } from 'expo-router';
import { relayInit, generatePrivateKey, getPublicKey } from "nostr-tools";

export default function Page() {
  const router = useRouter();

  useEffect(() => {
    const relay = relayInit('wss://nostr.wine')
    relay.connect();
    relay.on('connect', () => {
      Alert.alert(`connected to ${relay.url}`)
      let sk = generatePrivateKey();
      let pk = getPublicKey(sk);
      console.log(`${sk} ${pk}`);
    })
    relay.on('error', () => {
      console.log(`failed to connect to ${relay.url}`)
    })
  }, [])

  return (
    <View c>
      <View style={styles.main}>
        <Text style={styles.title}>Home</Text>
        <Text style={styles.subtitle}>Login or Create your Web3 Profile</Text>
        <Button
          onPress={() => { }}
          title="Create Profile"
          style={styles.button}
        />
        <Button
          onPress={() => router.back()}
          title="Go back"
          style={styles.button}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 24,
  },
  main: {
    flex: 1,
    justifyContent: "center",
    maxWidth: 960,
    marginHorizontal: "auto",
  },
  title: {
    fontSize: 64,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 36,
    color: "#38434D",
  },
  button: {
    marginVertical: "auto",
  }
});
