import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bot, Send, User, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const AIChat = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      content: "Hello! I'm your AI coding partner finder. Tell me what kind of project you're working on, your skill level, and what you're looking for in a coding partner. I'll help you find the perfect match!",
      isBot: true,
      timestamp: new Date(),
    }
  ]);
  const [inputValue, setInputValue] = useState("");

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      content: inputValue,
      isBot: false,
      timestamp: new Date(),
    };

    const botResponse = {
      id: messages.length + 2,
      content: "Based on your requirements, I found some great potential partners! Here are my top recommendations:",
      isBot: true,
      timestamp: new Date(),
      suggestions: ["Sarah Chen - React/TypeScript Expert", "Mike Johnson - Python Backend Developer", "Alex Rodriguez - Full-Stack Developer"]
    };

    setMessages([...messages, userMessage, botResponse]);
    setInputValue("");
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="min-h-screen py-8 px-4 bg-gradient-to-br from-background to-secondary">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="p-3 rounded-lg bg-gradient-to-br from-primary to-accent animate-glow">
              <Bot className="h-8 w-8 text-primary-foreground" />
            </div>
          </div>
          <h1 className="text-3xl font-bold mb-2">AI Partner Finder</h1>
          <p className="text-muted-foreground">
            Describe your project and preferences to get personalized partner recommendations
          </p>
        </div>

        <Card className="gradient-card border-border/50 h-[600px] flex flex-col">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              Chat with AI Assistant
            </CardTitle>
          </CardHeader>
          
          <CardContent className="flex-1 flex flex-col">
            {/* Messages */}
            <div className="flex-1 overflow-y-auto space-y-4 mb-4 pr-2">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-3 ${message.isBot ? 'justify-start' : 'justify-end'}`}
                >
                  {message.isBot && (
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-white">
                        <Bot className="h-4 w-4" />
                      </AvatarFallback>
                    </Avatar>
                  )}
                  
                  <div className={`max-w-[70%] ${message.isBot ? 'order-1' : 'order-2'}`}>
                    <div
                      className={`rounded-lg p-3 ${
                        message.isBot
                          ? 'bg-secondary text-secondary-foreground'
                          : 'bg-gradient-to-r from-primary to-accent text-white'
                      }`}
                    >
                      <p>{message.content}</p>
                      
                      {message.suggestions && (
                        <div className="mt-3 space-y-2">
                          {message.suggestions.map((suggestion, index) => (
                            <Badge 
                              key={index} 
                              variant="outline" 
                              className="block w-fit cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                            >
                              {suggestion}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      {message.timestamp.toLocaleTimeString()}
                    </p>
                  </div>
                  
                  {!message.isBot && (
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-gradient-to-br from-secondary to-muted">
                        <User className="h-4 w-4" />
                      </AvatarFallback>
                    </Avatar>
                  )}
                </div>
              ))}
            </div>

            {/* Input */}
            <div className="flex gap-2">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Describe your project, skills, and what you're looking for..."
                className="flex-1"
              />
              <Button 
                onClick={handleSendMessage}
                className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Quick Suggestions */}
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-3">Quick Start Examples</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
            {[
              "I'm building a React e-commerce app and need a backend developer",
              "Looking for a Python mentor to help with machine learning",
              "Need a design-minded frontend developer for my startup idea",
              "Want to contribute to open source projects with other beginners",
              "Building a mobile app with React Native, need iOS expert",
              "Looking for someone to practice coding interviews with"
            ].map((example, index) => (
              <Button
                key={index}
                variant="outline"
                className="h-auto p-3 text-left justify-start text-wrap hover:bg-muted/50"
                onClick={() => setInputValue(example)}
              >
                {example}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIChat;
