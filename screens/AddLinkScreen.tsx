import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function AddLinkScreen({ navigation }) {
  const [title, setTitle] = useState('');
  const [link, setLink] = useState('');

  const saveLink = async () => {
    if (!title || !link) {
      Alert.alert("Error", "Please fill in both fields.");
      return;
    }
    const existing = await AsyncStorage.getItem('links');
    const links = existing ? JSON.parse(existing) : [];
    links.push({ title, link });
    await AsyncStorage.setItem('links', JSON.stringify(links));
    navigation.goBack();
  };

  return (
    <View className="flex-1 bg-gray-50 p-6">
      <Text className="text-2xl font-bold text-gray-800 mb-6">Add a New Link</Text>

      <Text className="text-gray-700 font-medium mb-2">Title</Text>
      <TextInput 
        className="bg-white border border-gray-300 rounded-lg p-3 mb-4 shadow-sm"
        placeholder="Enter title"
        value={title}
        onChangeText={setTitle}
      />

      <Text className="text-gray-700 font-medium mb-2">Link</Text>
      <TextInput 
        className="bg-white border border-gray-300 rounded-lg p-3 mb-6 shadow-sm"
        placeholder="Enter URL"
        value={link}
        onChangeText={setLink}
      />

      <TouchableOpacity 
        className="bg-green-600 rounded-lg p-4 shadow-md"
        onPress={saveLink}
      >
        <Text className="text-white text-center text-lg font-semibold">Save Link</Text>
      </TouchableOpacity>
    </View>
  );
}
