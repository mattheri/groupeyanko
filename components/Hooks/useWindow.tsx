import React from 'react';

/**
 * Utility for nextjs. Because nextjs is ran first in Node.js, it doesn't have a window object, therefore,
 * any calls to window will fail. Doing so returns the window only when it is not undefined. See 
 */
export function useWindow() {
    if (typeof window !== 'undefined') {
        return window;
    }

    return false;
}