import api from './axios';

// Mock messages data
let mockMessages = [
  {
    id: '1',
    user: {
      name: 'John Doe',
      email: 'john@example.com'
    },
    messages: [
      {
        id: '1',
        content: "Hi, I'm interested in your web development service",
        timestamp: new Date(Date.now() - 3600000).toISOString(),
        isSender: false
      },
      {
        id: '2',
        content: "Hello! Thanks for reaching out. What kind of website are you looking to build?",
        timestamp: new Date(Date.now() - 3000000).toISOString(),
        isSender: true
      }
    ],
    lastMessage: {
      content: "Hello! Thanks for reaching out. What kind of website are you looking to build?",
      timestamp: new Date(Date.now() - 3000000).toISOString()
    }
  },
  {
    id: '2',
    user: {
      name: 'Sarah Wilson',
      email: 'sarah@example.com'
    },
    messages: [
      {
        id: '1',
        content: "Can you help me with UI/UX design?",
        timestamp: new Date(Date.now() - 86400000).toISOString(),
        isSender: false
      }
    ],
    lastMessage: {
      content: "Can you help me with UI/UX design?",
      timestamp: new Date(Date.now() - 86400000).toISOString()
    }
  },
  {
    id: '3',
    user: {
      name: 'Mike Johnson',
      email: 'mike@example.com'
    },
    messages: [],
    lastMessage: {
      content: "New conversation",
      timestamp: new Date(Date.now() - 172800000).toISOString()
    }
  }
];

export const getMessages = async () => {
  await new Promise(resolve => setTimeout(resolve, 500));
  return [...mockMessages];
};
