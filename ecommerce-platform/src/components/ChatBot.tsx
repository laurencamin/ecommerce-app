import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { products } from '../data/products';

interface ChatBotProps {
  onSendMessage: (message: string) => void;
}

export const ChatBot: React.FC<ChatBotProps> = ({ onSendMessage }) => {
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState<{ role: string; content: string }[]>([
    { role: 'assistant', content: "Hi! I'm your shopping assistant. How can I help you today?" }
  ]);

  const handleSendMessage = async () => {
    if (!message.trim()) return;
    
    // Add user message to chat history
    const userMessage = { role: 'user', content: message };
    setChatHistory(prev => [...prev, userMessage]);
    setMessage('');
    
    try {
      // Call AI API for recommendations
      const response = await fetch('https://oi-server.onrender.com/chat/completions', {
        method: 'POST',
        headers: {
          'CustomerId': 'cus_T7IkLS9uCV5nlW',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer xxx'
        },
        body: JSON.stringify({
          model: 'openrouter/claude-sonnet-4',
          messages: [
            {
              role: 'system',
              content: 'You are a helpful shopping assistant for an ecommerce store. Provide friendly, helpful advice about products and make recommendations based on user preferences. Keep responses concise and focused on shopping assistance.'
            },
            {
              role: 'user',
              content: `I need help with: ${message}. Our products include: ${products.map(p => p.name).join(', ')}.`
            }
          ]
        })
      });
      
      const data = await response.json();
      const aiResponse = data.choices[0].message.content;
      
      // Add AI response to chat history
      setChatHistory(prev => [...prev, { role: 'assistant', content: aiResponse }]);
      
      // Pass the message to parent component for potential recommendations
      onSendMessage(message);
    } catch (error) {
      console.error('Error calling AI API:', error);
      setChatHistory(prev => [...prev, { 
        role: 'assistant', 
        content: "I'm having trouble connecting to my recommendation system right now. Please try again later." 
      }]);
    }
  };

  return (
    <Card className="mt-8">
      <CardHeader>
        <CardTitle>AI Shopping Assistant</CardTitle>
        <CardDescription>Ask for product recommendations or help with your order</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-64 overflow-y-auto mb-4 space-y-2 p-2 bg-muted rounded-md">
          {chatHistory.map((msg, index) => (
            <div key={index} className={`p-2 rounded-md ${msg.role === 'user' ? 'bg-primary text-primary-foreground ml-8' : 'bg-background border mr-8'}`}>
              <p>{msg.content}</p>
            </div>
          ))}
        </div>
        <div className="flex space-x-2">
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your question here..."
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          />
          <Button onClick={handleSendMessage}>Send</Button>
        </div>
      </CardContent>
    </Card>
  );
};


