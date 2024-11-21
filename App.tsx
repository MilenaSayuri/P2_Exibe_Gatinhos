import React, { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  Image,
  Button,
  Text,
  StyleSheet,
} from "react-native";
import axios from "axios";
import { API_KEY } from "@env";

const getCatPhotos = async (limit: number = 5) => {
  try {
    const response = await axios.get("https://api.thecatapi.com/v1/images/search", {
      params: { limit },
      headers: {
        "x-api-key": API_KEY,
      },
    });
    console.log("Resposta da API:", response.data);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar fotos:", error);
    throw error;
  }
};


const App = () => {
  const [photos, setPhotos] = useState<string[]>([]);

  const fetchPhotos = async () => {
    try {
      const data = await getCatPhotos();
      console.log("Fotos recebidas:", data);
      const urls = data.map((item: any) => item.url);
      setPhotos(urls);
    } catch (error) {
      console.error("Erro ao carregar fotos:", error);
    }
  };
  

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Galeria de Gatinhos</Text>
      <Button title="Carregar Fotos de Gatos" onPress={fetchPhotos} />
      <ScrollView style={styles.scrollContainer}>
        {photos.length === 0 ? (
          <Text style={styles.placeholderText}>
            Clique no botão para carregar as fotos!
          </Text>
        ) : (
          photos.map((url, index) => (
            <Image key={index} source={{ uri: url }} style={styles.image} />
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  scrollContainer: {
    flex: 1,
    width: "100%",
  },
  image: {
    width: "100%",
    height: 200,
    marginBottom: 10,
    borderRadius: 10,
  },
  placeholderText: {
    fontSize: 18,
    textAlign: "center",
    marginTop: 20,
  },
});

export default App;
