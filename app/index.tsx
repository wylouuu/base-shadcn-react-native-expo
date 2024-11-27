import { View } from 'react-native';
import '../global.css';
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import { Text } from '~/components/ui/text';
import { useState } from 'react';
import { Alert } from 'react-native';

export default function Index() {
	const [value, setValue] = useState('');

	const handleSubmit = () => {
		Alert.alert('Input Value', value);
	};

	return (
		<View className='flex-1 bg-background justify-center'>
			<View className='space-y-12 w-full max-w-sm mx-auto'>
				<View className='space-y-4 mb-4'>
					<Text className='text-lg font-medium'>Welcome 👋</Text>
					<Text className='text-muted-foreground'>
						Enter your message below to get started
					</Text>
				</View>
				<View className='space-y-6'>
					<Input
						placeholder='Type your message...'
						value={value}
						onChangeText={setValue}
						className='mb-2'
					/>
					<Button onPress={handleSubmit}>
						<Text>Submit Message</Text>
					</Button>
				</View>
			</View>
		</View>
	);
}
