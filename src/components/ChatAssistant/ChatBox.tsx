import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageCircle, Send, X, Bot, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Message {
  id: string;
  content: string;
  sender: "user" | "bot";
  timestamp: Date;
}

const ChatBox = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Hello! I'm your AgriAI assistant. How can I help you today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const navigate = useNavigate();

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    const instruct = JSON.stringify({
      instruction:
        "Do not answer anything else that is not about the provided context.",
      expectedResponse: "json(message, functions[])",
      context:
        "You are an assistant to a farmer on every page except '/marketplace' or any other page under marketplace",
      functions: ["navigate(pathname)"],
      prompt: inputValue,
    });
    try {
      const res = await fetch("https://agroapi.netlify.app/v1/ai/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: instruct }),
      });

      const data = await res.json();
      let raw = data.response.trim();

      // strip fences if present
      if (raw.startsWith("```")) {
        raw = raw.replace(/^```json/, "").replace(/```$/, "");
      }

      let parsed;
      try {
        parsed = JSON.parse(raw);
      } catch (err) {
        return;
      }

      const { message, functions } = parsed;

      // validate shape
      if (!Array.isArray(functions)) {
        console.error("Functions not in array format:", functions);
        return;
      }

      // allowed functions
      const toolRegistry = {
        goToBooking: () => {
          navigate("/");
        },
      };

      // run the functions
      for (const func of functions) {
        if (toolRegistry[func.name]) {
          toolRegistry[func.name](func.argument);
        } else {
          console.error("Unknown function:", func.name);
        }
      }

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: message || "Sorry, I did not understand that.",
        sender: "bot",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Chat API Error:", error);
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "Something went wrong. Please try again later.",
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Chat Toggle Button */}
      <div className="fixed bottom-6 right-6 z-50">
        {!isOpen && (
          <Button
            onClick={() => setIsOpen(!isOpen)}
            className="rounded-full w-14 h-14 shadow-lg hover:shadow-xl transition-all duration-300 agri-button"
          >
            <MessageCircle className="h-6 w-6" />
          </Button>
        )}
      </div>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-[400px] h-96 z-40 animate-scale-in">
          <Card className="h-full shadow-xl">
            <CardHeader className="pb-3 flex flex-row justify-between items-center">
              <CardTitle className="flex items-center space-x-2 text-lg">
                <Bot className="h-5 w-5 text-primary" />
                <span>AgriAI Assistant</span>
              </CardTitle>
              <Button variant="destructive" onClick={() => setIsOpen(!isOpen)}>
                <X className="h-6 w-6" />
              </Button>
            </CardHeader>
            <CardContent className="flex flex-col h-full p-0">
              <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex items-start space-x-2 ${
                        message.sender === "user"
                          ? "justify-end"
                          : "justify-start"
                      }`}
                    >
                      {message.sender === "bot" && (
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mt-1">
                          <Bot className="h-4 w-4 text-primary" />
                        </div>
                      )}
                      <div
                        className={`max-w-[80%] p-3 rounded-lg ${
                          message.sender === "user"
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted text-muted-foreground"
                        }`}
                      >
                        <p className="text-sm">{message.content}</p>
                      </div>
                      {message.sender === "user" && (
                        <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center mt-1">
                          <User className="h-4 w-4 text-primary-foreground" />
                        </div>
                      )}
                    </div>
                  ))}
                  {isTyping && (
                    <div className="flex items-start space-x-2">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                        <Bot className="h-4 w-4 text-primary" />
                      </div>
                      <div className="bg-muted p-3 rounded-lg">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce delay-75"></div>
                          <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce delay-150"></div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </ScrollArea>
              <div className="p-4 border-t">
                <div className="flex space-x-2">
                  <Input
                    placeholder="Ask about crops, weather, pricing..."
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="flex-1"
                  />
                  <Button
                    onClick={handleSendMessage}
                    size="icon"
                    className="agri-button"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
};

export default ChatBox;
