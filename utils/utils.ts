import axios from "axios";

/**
 * Simple get with axios, however, the basic auth is provided. I'm lazy so I did not want to re-type the auth over and over again.
 * 
 * @param url the domain + version of the API endpoint is already indicated ending with '/'. Simply add the rest
 */
export const GET = async (url: string) => axios.get(`${process.env.API_ENDPOINT}${url}`, {
    auth: {
        username: process.env.API_KEY,
        password: process.env.API_SECRET
    }
});

/**
 * Returns an array of arrays. Each sub arrays have, at the maximum, the number in the paginationLenth
 * 
 * @param item array of items. Must be a one dimension array
 * @param paginationLenth the number of items per array that you want defaults to 1
 */
export const paginate = <T>(item: T[], paginationLenth: number = 1) => {
    // Check if the array IS an array
    if (!Array.isArray(item)) {
        // If it is not an array, return nothing;
        return [];
    }
    // Initialize a "master" array;
    const master: T[][] = [];
    // Sanity check, if the array that has been passed has less items than the wanted amount of items per array
    if (item.length <= paginationLenth) {
        // No need to paginate, therefore, push to the master array as is then return the master array
        master.push(item);
        return master;
    }
    // Initialize an external index
    let currentIndex = -1;
    // Get the number of items per array
    let itemsPerArray = parseFloat((item.length / paginationLenth).toFixed(1));
    // Declare a variable to store the items per array left
    let lastArrayLength = 0;
    // If the items per array is not a whole number
    if (itemsPerArray % 1 !== 0) {
        // Get the decimal number and transform it in a whole number
        lastArrayLength = parseInt(`${itemsPerArray}`.split(".")[1]);
    }

    // Map over the items
    item.forEach((o, i) => {
        // add 1 to currentIndex for each number
        currentIndex++;
        // when the current index is at the same number as the items per array
        if (currentIndex >= paginationLenth) {
            // slice the item array and push it to the master array
            master.push(item.slice((i - paginationLenth), i));
            // Reset the current index
            currentIndex = 0;
        }
        // When the index is the same as end of array - lastArrayLength
        if ((item.length - lastArrayLength) === i) {
            // Push the rest to the master array
            master.push(item.slice(i, item.length));
        }
    });

    // Sort the master array from longer array to shorter array
    return master.sort((a, b) => b.length - a.length);
}