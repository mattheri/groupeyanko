import React from 'react';
import { Cart } from '../Context/CartContext';
import ls, {get, set} from 'local-storage';

/**
 * Hook that will add stringified items to the local storage.
 * Provides the object from the local storage.
 */
export function useSetCartStorage() {
    
    const handleSetStorage = (data: { [key: string]: Cart }) => {
        set('cart', JSON.stringify(data));
    }

    return { cart: JSON.parse(get('cart')), handleSetStorage: handleSetStorage }
}