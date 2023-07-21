import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from 'react-native';

interface ChatMessage {
  id: number;
  message: string;
  isSentByUser: boolean;
}

const ChatPage: React.FC = () => {
  const [inputMessage, setInputMessage] = useState<string>('');
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);

  const handleSendMessage = () => {
    if (inputMessage.trim() !== '') {
      const newMessage: ChatMessage = {
        id: Date.now(),
        message: inputMessage.trim(),
        isSentByUser: true,
      };

      setChatMessages((prevMessages) => [...prevMessages, newMessage]);
      setInputMessage('');
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={chatMessages}
        // keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={item.isSentByUser ? styles.userMessage : styles.otherUserMessage}>
            <Text style={styles.messageText}>
                {item.message}
            </Text>
          </View>
        )}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={inputMessage}
          onChangeText={setInputMessage}
          placeholder="Type your message..."
          multiline
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSendMessage}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  userMessage: {
    backgroundColor: '#DCF8C6',
    alignSelf: 'flex-end',
    padding: 8,
    borderRadius: 8,
    marginBottom: 8,
  },
  otherUserMessage: {
    backgroundColor: '#EAEAEA',
    alignSelf: 'flex-start',
    padding: 8,
    borderRadius: 8,
    marginBottom: 8,
  },
  messageText: {
    fontSize: 16,
    color: 'black',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    borderColor: '#CCCCCC',
    borderWidth: 1,
    borderRadius: 8,
    padding: 8,
    marginRight: 8,
    maxHeight: 100,
  },
  sendButton: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  sendButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});

export default ChatPage;
