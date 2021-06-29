import { useEffect, useState } from 'react';
import ApiService from 'services/ApiService';
import { ApiResponse } from 'services/domain/Api';
import { ClientUser } from 'services/domain/User';
import { useAuth } from './useAuth';

const useUserInformation = () => {
  const [data, setData] = useState<ClientUser | null>(null);
  const { isAuthenticated, userId } = useAuth();
  
  const fetchUser = async () => {
    const response:ApiResponse<ClientUser> = await ApiService.post({
      url: '/api/user',
      data: {
        queryUser: userId
      }
    });

    setData(response.data);
  }

  useEffect(() => {
    if (!isAuthenticated) return;

    fetchUser();
  }, [isAuthenticated]);

  return data;
}

export default useUserInformation;
