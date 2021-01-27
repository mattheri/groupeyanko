import axios from "axios";
import { Agent } from 'http';
import { Agent as SecureAgent } from 'https';
import { Cart } from "../components/Context/CartContext";
import { init, send } from 'emailjs-com'
import { FormData } from '../components/SignupForm/SignupForm';

/**
 * Simple get with axios, however, the basic auth is provided. I'm lazy so I did not want to re-type the auth over and over again.
 * 
 * @param url the domain + version of the API endpoint is already indicated ending with '/'. Simply add the rest
 */
export const GET = async (url: string) => {
    const httpsAgent = new SecureAgent({ keepAlive: true });
    const httpAgent = new Agent({ keepAlive: true });
    
    return axios.get(`${process.env.API_ENDPOINT}${url}`, {
        auth: {
            username: process.env.API_KEY,
            password: process.env.API_SECRET
        },
        httpAgent: httpAgent,
        httpsAgent: httpsAgent
    })
};

/**
 * Returns an array of arrays. Each sub arrays have, at the maximum, the number in the paginationLenth
 * 
 * @param item array of items. Must be a one dimension array
 * @param paginationLenth the number of items per array that you want defaults to 1
 */
export const paginate = <T>(item: T[], paginationLenth: number = 1) => {
    // Check if the array IS an array
    if (!Array.isArray(item)) {
        // If it is not an array, return an empty array;
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
    // Find the number of items to iterate through before slicing the last array
    const numberOfItemsBeforeLastArray = (paginationLenth * (~~(item.length / paginationLenth)));
    // Find the number of even arrays there should be
    const numberOfEvenArrays = ~~(item.length / paginationLenth); // https://stackoverflow.com/questions/14494413/javascript-find-out-how-many-times-a-number-goes-into-another-number-evenly
    // Declare a variable to store which array index you're at
    let currentArrayIndex = 0;
    // Declare a variable to store the items per array left
    let lastArrayLength = item.length - numberOfItemsBeforeLastArray;
    // Map over the items
    for (let i = 0; i < item.length; i++) {
        // Increment the currentIndex to at least 0
        currentIndex++;
        // If the current index is at the same value as paginationLenth
        if (currentIndex === paginationLenth) {
            // slice the item array and push it to the master array
            master.push(item.slice((i - paginationLenth), i));
            // Reset the current index
            currentIndex = 1;
            // Increment the array index
            currentArrayIndex++;
        }
        // If the array index is at the same value as the number of even arrays
        if (currentArrayIndex === numberOfEvenArrays) {
            // If slicing the array will add any values
            if (item.slice(item.length - lastArrayLength, item.length).length) {
                // Push the rest to the master array
                master.push(item.slice(item.length - lastArrayLength, item.length));
            }
            // Reset the current array index to 0
            currentArrayIndex = 0;
            // Break out of the loop
            break;
        }
    }

    // Sort the master array from longer array to shorter array
    return master.sort((a, b) => b.length - a.length);
}

/**
 * Some of the data passed in the API have HTML Tags in it. This will remove the tags and return a normal
 * string instead.
 * 
 * @param value string, the value to remove HTML Tags from
 */
export const sanitizeHTML = (value: string) => value.replace(/(<([^>]+)>)/gi, "");

export const delayPrefetch = (timer: number, index: number = 0) => {
    setTimeout(() => {
        return true
    }, timer * index);

    return false;
}

export const sendEmail = (customer: FormData, cart: any) => {
    console.log(process.env.EMAIL_JS_USER_ID);
    init('user_LWfMaXh3RqPoda7HMFMr6');
    const buildProductTable = ({ name, number, id}) => {
        return `<tr><td><a href='https://proaxion.vercel.app/product/${id}'>${name.trim()}</a></td><td style='text-align: center'>${number}</td></tr>`;
    }
    const productsString = Object.entries(cart).map(([key, value]) => buildProductTable((value as any)));
    const products = `
        <table>
            <tbody>
                <tr>
                    <th>
                        Produit
                    </th>
                    <th>
                        Quantité
                    </th>
                </tr>
                ${productsString.join('')}
            </tbdoy>
        </table>
    `;

    const name = `${customer.firstname} ${customer.lastname}`;
    const address = `   ${customer.address} ${customer.city}
                        ${customer.province}, ${customer.postalCode}`;
    const company = `${customer.company ? customer.company : 'Aucune'}`;
    const message = `${customer.message ? customer.message : 'Aucun'}`;
    const email = `${customer.email}`;

    return send("proaxion_shop", "template_05et95x", {
        from_name: name,
        from_email: email,
        from_company: company,
        from_address: address,
        from_message: message,
        produits: products
    });
}