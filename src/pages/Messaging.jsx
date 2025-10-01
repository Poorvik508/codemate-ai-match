import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Send, Search, Phone, Video, MoreVertical } from "lucide-react";

const Messaging = () => {
  const [selectedConversation, setSelectedConversation] = useState(1);
  const [messageInput, setMessageInput] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const conversations = [
    {
      id: 1,
      name: "Sarah Chen",
      lastMessage: "That sounds like a great project! When would you like to start?",
      timestamp: "2m ago",
      isOnline: true,
      unreadCount: 2,
      avatar: "/placeholder-avatar-1.jpg"
    },
    {
      id: 2,
      name: "Mike Johnson",
      lastMessage: "I have experience with Django REST framework if you need help",
      timestamp: "1h ago",
      isOnline: false,
      unreadCount: 0,
      avatar: "/placeholder-avatar-2.jpg"
    },
    {
      id: 3,
      name: "Alex Rodriguez",
      lastMessage: "Thanks for the code review feedback!",
      timestamp: "3h ago",
      isOnline: true,
      unreadCount: 1,
      avatar: "/placeholder-avatar-3.jpg"
    },
    {
      id: 4,
      name: "Emily Watson",
      lastMessage: "The mobile app mockups look amazing",
      timestamp: "1d ago",
      isOnline: false,
      unreadCount: 0,
      avatar: "/placeholder-avatar-4.jpg"
    }
  ];

  const messages = [
    {
      id: 1,
      content: "Hi! I saw your profile and I think we'd be a great match for the React project I'm working on.",
      isSent: true,
      timestamp: "10:30 AM"
    },
    {
      id: 2,
      content: "Hello! I'd love to hear more about your project. What kind of React application are you building?",
      isSent: false,
      timestamp: "10:32 AM"
    },
    {
      id: 3,
      content: "It's an e-commerce platform with a focus on sustainable products. I need help with the frontend components and state management.",
      isSent: true,
      timestamp: "10:35 AM"
    },
    {
      id: 4,
      content: "That sounds like a great project! I have extensive experience with React and Redux. When would you like to start?",
      isSent: false,
      timestamp: "10:37 AM"
    }
  ];

  const handleSendMessage = () => {
    if (!messageInput.trim()) return;
    setMessageInput("");
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const selectedConv = conversations.find(c => c.id === selectedConversation);
  const filteredConversations = conversations.filter(conv =>
    conv.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen py-8 px-4 bg-gradient-to-br from-background to-secondary">
      <div className="container mx-auto max-w-6xl">
        <h1 className="text-3xl font-bold mb-8">Messages</h1>

        <div className="grid lg:grid-cols-3 gap-6 h-[700px]">
          {/* Conversations List */}
          <Card className="gradient-card border-border/50 flex flex-col">
            <CardContent className="p-4 flex-1 flex flex-col">
              {/* Search */}
              <div className="relative mb-4">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search conversations..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Conversations */}
              <div className="space-y-2 flex-1 overflow-y-auto">
                {filteredConversations.map((conversation) => (
                  <div
                    key={conversation.id}
                    onClick={() => setSelectedConversation(conversation.id)}
                    className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors ${
                      selectedConversation === conversation.id
                        ? 'bg-primary/10 border border-primary/20'
                        : 'hover:bg-muted/50'
                    }`}
                  >
                    <div className="relative">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={conversation.avatar} />
                        <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-white">
                          {conversation.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      {conversation.isOnline && (
                        <div className="absolute bottom-0 right-0 h-3 w-3 bg-success rounded-full border-2 border-background"></div>
                      )}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium truncate">{conversation.name}</h4>
                        <span className="text-xs text-muted-foreground">{conversation.timestamp}</span>
                      </div>
                      <p className="text-sm text-muted-foreground truncate">{conversation.lastMessage}</p>
                    </div>

                    {conversation.unreadCount > 0 && (
                      <Badge className="bg-primary text-primary-foreground">
                        {conversation.unreadCount}
                      </Badge>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Chat Window */}
          <div className="lg:col-span-2">
            <Card className="gradient-card border-border/50 h-full flex flex-col">
              {/* Chat Header */}
              {selectedConv && (
                <div className="p-4 border-b border-border flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={selectedConv.avatar} />
                        <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-white">
                          {selectedConv.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      {selectedConv.isOnline && (
                        <div className="absolute bottom-0 right-0 h-3 w-3 bg-success rounded-full border-2 border-background"></div>
                      )}
                    </div>
                    <div>
                      <h3 className="font-medium">{selectedConv.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {selectedConv.isOnline ? 'Online' : 'Offline'}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm">
                      <Phone className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Video className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}

              {/* Messages */}
              <CardContent className="flex-1 p-4 overflow-y-auto">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.isSent ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className="max-w-[70%]">
                        <div
                          className={`rounded-lg p-3 ${
                            message.isSent
                              ? 'bg-gradient-to-r from-primary to-accent text-white'
                              : 'bg-secondary text-secondary-foreground'
                          }`}
                        >
                          <p>{message.content}</p>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                          {message.timestamp}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>

              {/* Message Input */}
              <div className="p-4 border-t border-border">
                <div className="flex gap-2">
                  <Input
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Type your message..."
                    className="flex-1"
                  />
                  <Button
                    onClick={handleSendMessage}
                    className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messaging;
