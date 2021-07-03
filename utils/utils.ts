// import { init, send } from "emailjs-com";
import { FormData } from "types";

/**
 * Some of the data passed in the API have HTML Tags in it. This will remove the tags and return a normal
 * string instead.
 *
 * @param value string, the value to remove HTML Tags from
 */
export const sanitizeHTML = (value: string) => value.replace(/(<([^>]+)>)/gi, "");

// /**
//  * Will build the a table containing links to the products. Then it inits emailsjs.
//  * Once the email table is done, it will send the data to emailjs API to send the email to the customer.
//  *
//  * @param customer Object, the customer's data
//  * @param cart Object, the cart information
//  */
// export const sendEmail = (customer: FormData, cart: any) => {
//   init("user_LWfMaXh3RqPoda7HMFMr6");
//   const buildProductTable = ({ name, number, id, sku }) => {
//     return `<tr><td>${
//       sku ? sku : id
//     }</td><td><a href='https://proaxion.vercel.app/product/${id}'>${name.trim()}</a></td><td style='text-align: center'>${number}</td></tr>`;
//   };
//   const productsString = Object.entries(cart).map(([key, value]) =>
//     buildProductTable(value as any)
//   );
//   const products = `
//         <table>
//             <tbody>
//                 <tr>
//                     <th>
//                         SKU
//                     </th>
//                     <th>
//                         Produit
//                     </th>
//                     <th>
//                         Quantité
//                     </th>
//                 </tr>
//                 ${productsString.join("")}
//             </tbdoy>
//         </table>
//     `;

//   const name = `${customer.firstname} ${customer.lastname}`;
//   const address = `   ${customer.address} ${customer.city}
//                         ${customer.province}, ${customer.postalCode}`;
//   const company = `${customer.company ? customer.company : "Aucune"}`;
//   const phoneNumber = `${customer.phoneNumber}`;
//   const message = `${customer.message ? customer.message : "Aucun"}`;
//   const email = `${customer.email}`;

//   return send("proaxion_shop", "template_05et95x", {
//     from_name: name,
//     from_email: email,
//     from_phone: phoneNumber,
//     from_company: company,
//     from_address: address,
//     from_message: message,
//     produits: products,
//   });
// };
