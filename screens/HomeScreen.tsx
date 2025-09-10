import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';

export default function HomeScreen({ navigation }) {
  const [links, setLinks] = useState([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    loadLinks();
  }, [isFocused]);

  const loadLinks = async () => {
    const json = await AsyncStorage.getItem('links');
    setLinks(json ? JSON.parse(json) : []);
  };

  const deleteLink = async (index) => {
    const updatedLinks = [...links];
    updatedLinks.splice(index, 1);
    await AsyncStorage.setItem('links', JSON.stringify(updatedLinks));
    loadLinks();
  };

  return (
    <View className="flex-1 bg-gray-50 p-6">
      <Text className="text-2xl font-bold text-gray-800 mb-6">My Links</Text>

      <TouchableOpacity 
        className="bg-blue-600 rounded-lg p-4 mb-6 shadow-md"
        onPress={() => navigation.navigate('AddLink')}
      >
        <Text className="text-white text-center text-lg font-semibold">Add New Link</Text>
      </TouchableOpacity>

      {links.length === 0 ? (
        <View className="items-center justify-center flex-1">
          <Text className="text-gray-400 text-lg">No links added yet.</Text>
        </View>
      ) : (
        <FlatList
          data={links}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({ item, index }) => (
            <View className="bg-white rounded-xl p-4 mb-4 shadow-sm border border-gray-200">
              <Text className="text-lg font-semibold text-gray-800 mb-1">{item.title}</Text>
              <Text className="text-blue-600 mb-3">{item.link}</Text>
              <TouchableOpacity
                className="bg-red-500 rounded-md p-2 items-center"
                onPress={() => deleteLink(index)}
              >
                <Text className="text-white font-medium">Delete</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      )}
    </View>
  );
}
