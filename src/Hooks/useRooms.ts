import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export const useRooms = () => {
  return useQuery({    
    queryKey:['rooms'], 
    queryFn:async () => {
    const { data } = await axios.get('http://localhost:8800/api/rooms');
    return data;
  }}
);
};
