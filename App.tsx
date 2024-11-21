import React, { useState } from "react";
import {
  Button,
  Dimensions,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View
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
  const [windowWidth, setWindowWidth] = useState(Dimensions.get('window').width);

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

  const columnWidth = windowWidth < 600 ? '100%' : '23%';


  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Galeria de Gatinhos</Text>
      <Button title="Carregar Fotos de Gatos" onPress={fetchPhotos} />
      <ScrollView style={styles.scrollContainer}>
        {photos.length === 0 ? (
          <Text style={styles.placeholderText}>Clique no botão para carregar as fotos!</Text>
        ) : (
          <View style={styles.gridContainer}>
            {photos.map((url, index) => (
              <View key={index} style={[styles.card, { width: columnWidth }]}>
                <Image source={{ uri: url }} style={styles.image} />
              </View>
            ))}
          </View>
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
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    width: '100%',
    padding: 8,
  },
  card: {
    marginBottom: 10,
    marginHorizontal: '1%',
    borderRadius: 10,
    backgroundColor: '#fff',
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
