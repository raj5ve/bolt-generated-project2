import { useEffect, useRef } from 'react';
import { io } from 'socket.io-client';
import useAuthStore from '../store/useAuthStore';

export function useSocket() {
  const socket = useRef(null);
  const { user } = useAuthStore();

  useEffect(() => {
    if (user) {
      socket.current = io('/', {
        auth: {
          token: localStorage.getItem('token')
        }
      });

      socket.current.on('connect', () => {
        console.log('Connected to WebSocket');
      });

      socket.current.on('disconnect', () => {
        console.log('Disconnected from WebSocket');
      });
    }

    return () => {
      if (socket.current) {
        socket.current.disconnect();
      }
    };
  }, [user]);

  return socket.current;
}
