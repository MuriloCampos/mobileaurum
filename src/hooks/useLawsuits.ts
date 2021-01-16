import { useQuery } from 'react-query';
import api from '../services/api';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import Lawsuit from '../interfaces/Lawsuit';

interface ApiResponse {
  cases: Lawsuit[];
}

const getAllLawsuits = async () => {
  const { data } = await api.get('/lawsuit/all');

  return data;
};

export default function useProfile() {
  return useQuery<ApiResponse, Error>('lawsuits', getAllLawsuits);
}
