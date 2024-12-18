import { Stack } from 'expo-router';

export default function ArticlesLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen
        name="[id]"
        options={{ headerBackTitle: 'Back', headerTitle: '' }}
      />
    </Stack>
  );
}
