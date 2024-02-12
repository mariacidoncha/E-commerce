/** In this file, we will export all the utility functions that we will use in our application.
 * These are functions that are not directly related to the application's business logic,
 * but are used to help us to keep our code clean and organized.
 * For example, functions to format dates, to format currency, to extract data from an object, etc. */

export function setErrorInput(input: Element) {
  input.classList.add('error');
  input.classList.remove('success');
  input.nextElementSibling?.classList.remove('hide');
}

export function setSuccessInput(input: Element) {
  input.classList.remove('error');
  input.classList.add('success');
  input.nextElementSibling?.classList.add('hide');
}

export function resetInput(input: Element) {
  input.classList.remove('error');
  input.classList.remove('success');
  input.nextElementSibling?.classList.add('hide');
}

export function resetForm(inputs: Element[]) {
  inputs.forEach((input) => {
    input.value = '';
    resetInput(input);
  });
}

// export async function getUsers() {
//   try {
//     const response = await fetch('../data/users.json');
//     const JSONResponse = await response.json();
//     return JSONResponse;
//   } catch (error) {
//     throw new Error(`Something is wrong in f APIFetch: ${error}`);
//   }
// }

export async function getUsers() {
  return [
    {
      id: 1,
      name: 'Maria Cidoncha',
      password: 'maria123',
      email: 'mariacidoncha@gmail.com',
      cart: [],
      wishlist: [1, 5],
    },
    {
      id: 2,
      name: 'Jane Smith',
      password: 'pass456',
      email: 'janesmith@gmail.com',
      cart: [],
      wishlist: [5],
    },
    {
      id: 3,
      name: 'Mike Johnson',
      password: 'mikepass',
      email: 'mikejohnson@gmail.com',
      cart: [],
      wishlist: [3, 9, 10],
    },
  ];
}
