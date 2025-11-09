import streamlit as st

st.set_page_config(page_title="🤖 Simple Chatbot", page_icon="🤖")
st.title("🤖 Simple Rule-Based Chatbot")

# Simple conversation rules
responses = {
    "hi": "Hello! How are you?",
    "hello": "Hi there! How can I help you?",
    "how are you": "I'm just a bot, but I'm doing great!",
    "bye": "Goodbye! Have a nice day!",
    "default": "Sorry, I didn't understand that.",
    "hii": "Hello! How are you?",
    "hiii": "Hello! How are you?",
    "hiiii": "Hello! How are you?",
}

# User input
user_input = st.text_input("You:", "")

if user_input:
    user_input_lower = user_input.lower()
    response = responses.get(user_input_lower, responses["default"])
    st.text_area("Bot:", value=response, height=150)
