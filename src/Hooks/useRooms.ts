import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export const useRooms = () => {
  return useQuery({    
    queryKey:['rooms'], 
    queryFn:async () => {
    const { data } = await axios.get('https://meetinghub-backend.onrender.com/api/rooms');
    return data;
  }}
);
};
