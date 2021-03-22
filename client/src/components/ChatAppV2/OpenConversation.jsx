import React, { useState, useCallback } from "react";
import { Form, InputGroup, Button } from "react-bootstrap";
import { useConversations } from "./Contexts/ConversationsProvider";
import BottomNav from "../BottomNav/BottomNav";
export default function OpenConversation() {
  // the message state
  const [text, setText] = useState("");

  // smooth scroll to the bottom
  const setRef = useCallback((node) => {
    if (node) {
      node.scrollIntoView({ smooth: true });
    }
  }, []);
  const { sendMessage, selectedConversation } = useConversations();

  //this is sending the message to the websocket
  const handleSubmit = (e) => {
    e.preventDefault();

    sendMessage(
      selectedConversation.recipients.map((r) => r.id),
      text
    );
    setText("");
  };

  return (
    <div className="d-flex flex-column flex-grow-1">
      <div className="flex-grow-1 overflow-auto">
        <div className="d-flex flex-column align-items-start justify-content-end px-3">
          {/* map the selected messages to the container  */}

          {selectedConversation &&
            selectedConversation.messages.map((message, index) => {
              console.log(selectedConversation);
              const lastMessage =
                selectedConversation.messages.length - 1 === index;

              return (
                <div
                  ref={lastMessage ? setRef : null}
                  key={index}
                  className={`my-1 d-flex flex-column ${
                    message.fromMe
                      ? "align-self-end align-items-end"
                      : "align-items-start"
                  }`}
                >
                  <div
                    className={`rounded px-2 py-1 ${
                      message.fromMe ? "bg-primary text-white" : "border"
                    }`}
                  >
                    {message.text}
                  </div>
                  <div
                    className={`text-muted small ${
                      message.fromMe ? "text-right" : ""
                    }`}
                  >
                    {message.fromMe ? "You" : message.senderName}
                  </div>
                </div>
              );
            })}
        </div>
      </div>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="m-2">
          <InputGroup>
            <Form.Control
              as="textarea"
              required
              value={text}
              onChange={(e) => setText(e.target.value)}
              style={{
                height: "60px",
                resize: "none",
                "margin-bottom": "0px",
              }}
            />
            <InputGroup.Append>
              <Button
                type="submit"
                class="btn btn-success"
                style={{ "background-color": "#28a745" }}
              >
                Send
              </Button>
            </InputGroup.Append>
          </InputGroup>
        </Form.Group>
      </Form>
      <BottomNav />
    </div>
  );
}
