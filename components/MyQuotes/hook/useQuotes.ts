import { AxiosResponse } from 'axios';
import useLogger from 'components/Hooks/useLogger';
import { useState, useEffect } from 'react';
import ApiService from 'services/ApiService';
import { Quote, Quotes } from 'services/domain/Quote';

const useQuotes = (userId:string) => {
  const [error, setError] = useState('');
  const [quotes, setQuotes] = useState<Quote[]>([]);

  const fetchQuotes = async () => {
    try {
      const response:AxiosResponse<Quotes[]> = await ApiService.fetch({
        url: `/api/quote/${userId}`
      });

      if (response.status === 200 && Object.keys(response.data).length) {
        const quotes = response.data.flatMap((quote) => quote.quotes.sort((a, b) => b.submittedOn - a.submittedOn));
        return setQuotes((state) => [...state, ...quotes]);
      }
    } catch (e) {
      setError(e);
    }
  }

  useEffect(() => {
    fetchQuotes();
  }, [userId]);

  return { quotes, error };
};

export default useQuotes;
