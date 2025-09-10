import React, { useState, useRef } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { WebView } from 'react-native-webview';
import { RefreshControl, ScrollView } from 'react-native';

export default function Index() {
  const [refreshing, setRefreshing] = useState(false);
  const webviewRef = useRef(null);

  const onRefresh = () => {
    setRefreshing(true);
    // Reload the WebView content
    webviewRef.current?.reload();
    setTimeout(() => {
      setRefreshing(false);
    }, 1000); // Adjust based on loading time
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <WebView
        ref={webviewRef}
        source={{ uri: 'https://en.wikipedia.org/wiki/Cooch_Behar' }}
        style={{ flex: 1 }}
        // Android-specific
        pullToRefreshEnabled={true}
        // iOS-specific: wrap WebView inside ScrollView with RefreshControl if needed
      />
    </SafeAreaView>
  );
}
