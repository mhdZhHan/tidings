# Tidings

**Tidings** is a real-time messaging application designed to provide seamless and efficient communication between users. Built with modern web technologies, it features user-friendly interfaces, secure connections, and robust message handling.

## Features

- **Real-Time Messaging:** Instantly send and receive messages with your contacts.
- **User Authentication:** Securely sign up, log in, and manage your account.
- **Friend Requests:** Easily send, receive, and manage friend requests.
- **Direct Messaging:** Connect with friends through direct messages with reliable delivery.
- **Message History:** Access your previous conversations at any time.
- **Responsive Design:** Optimized for both mobile and desktop platforms.
- **Scalable Architecture:** Built with scalability in mind to handle large volumes of users and messages.

## Tech Stack

- **Frontend:** `React Native` for a smooth and native-like user experience.
- **Backend:** Node.js with `Express.js` for robust API development.
- **Real-Time Communication:** `Socket.IO` for real-time messaging and event handling.
- **Database:** `MongoDB` for storing user data, messages, and friend requests.
- **Authentication:** `JWT` for secure and scalable user authentication.
- **Hosting:** Deployed on Vercel for fast and reliable hosting.

## Setup and Installation

### Prerequisites

- Node.js (v14+)
- Yarn or npm
- MongoDB instance

### Installation Steps

1. **Clone the Repository:**

```bash
  git clone https://github.com/mhdZhHan/tidings.git
  cd tidings
```
   
2. **Install Dependencies:**

```bash
  npm install
```

3. **Set Up Environment Variables:**

Create a .env file in the `server` directory and add the following:

```env
DATABASE_URL="<db_url>"
SECRET_KEY="<a_secret_key>"
```

4. **Run Server**

```bash
  npm run dev
```

5. **Run the Application:**

Navigate to the `App` directory and start React Native metro bundler:

```bash
  cd ..
  cd App
  npm run start
```

## Usage

- Sign Up/Log In: Create an account or log in with your existing credentials.
- Manage Friends: Send and accept friend requests to connect with others.
- Send Messages: Start chatting with your friends in real-time.
- Message Notifications: Receive notifications for new messages even when you're not in the app.
- View Message History: Scroll through your conversation history to see past messages.
