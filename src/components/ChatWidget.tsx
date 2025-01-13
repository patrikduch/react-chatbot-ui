import { useState, useRef, useEffect } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  IconButton,
  TextField,
  List,
  ListItem,
  Typography,
  Avatar,
} from "@mui/material";
import { Send as SendIcon } from "lucide-react";
import CloseIcon from "@mui/icons-material/Close";
import ChatIcon from "@mui/icons-material/Chat";

const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ text: string; sender: "User" | "AI" }[]>([]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const togglePopup = () => setIsOpen(!isOpen);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (input.trim()) {
      const userMessage = input;
      setMessages((prev) => [...prev, { text: userMessage, sender: "User" }]);
      setInput("");

      setTimeout(() => {
        setMessages((prev) => [...prev, { text: "This is a sample response from AI.", sender: "AI" }]);
      }, 1000);
    }
  };

  return (
    <Box
      sx={{
        position: "fixed",
        bottom: 20,
        right: 20,
        zIndex: 1000,
        maxWidth: "100%",
      }}
    >
      {isOpen ? (
        <Card
          sx={{
            width: 400,
            height: 600,
            display: "flex",
            flexDirection: "column",
            borderRadius: 2,
            boxShadow: 3,
          }}
        >
          {/* Header */}
          <CardHeader
            avatar={<Avatar sx={{ bgcolor: "#007bff" }}>PD</Avatar>}
            title="Chatbot"
            action={
              <IconButton onClick={togglePopup}>
                <CloseIcon sx={{ color: "white" }} />
              </IconButton>
            }
            sx={{ bgcolor: "#007bff", color: "white" }}
          />

          {/* Messages */}
          <CardContent sx={{ flexGrow: 1, overflowY: "auto", p: 2 }}>
            <List>
              {messages.map((msg, index) => (
                <ListItem
                  key={index}
                  sx={{
                    justifyContent: msg.sender === "User" ? "flex-end" : "flex-start",
                    mb: 1,
                  }}
                >
                  <Box
                    sx={{
                      bgcolor: msg.sender === "User" ? "#e1f5fe" : "#f1f8e9",
                      p: 1.5,
                      borderRadius: 2,
                      maxWidth: "70%",
                    }}
                  >
                    <Typography variant="body2" color="textPrimary">
                      {msg.text}
                    </Typography>
                  </Box>
                </ListItem>
              ))}
              <div ref={messagesEndRef} />
            </List>
          </CardContent>

          {/* Input */}
          <Box
            sx={{
              display: "flex",
              p: 2,
              borderTop: "1px solid #ccc",
            }}
          >
            <TextField
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
              fullWidth
              placeholder="Type a message..."
              size="small"
            />
            <Button
              onClick={handleSendMessage}
              variant="contained"
              color="primary"
              sx={{ ml: 1 }}
            >
              <SendIcon />
            </Button>
          </Box>
        </Card>
      ) : (
        <Button
          variant="contained"
          startIcon={<ChatIcon />}
          onClick={togglePopup}
          sx={{
            borderRadius: 4,
            bgcolor: "#007bff",
            color: "white",
            p: 1.5,
            "&:hover": { bgcolor: "#005bb5" },
          }}
        >
          Need Help?
        </Button>
      )}
    </Box>
  );
};

export default ChatWidget;
