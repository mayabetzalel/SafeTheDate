import AxiosInstance from "./utils/axiosInstance";
import { CartItem, Filter, ItemDetails, Size } from "./utils/types";

// items

// export const getAllItems = async (
//   activePage: number,
//   activeFilters: Filter[],
//   maxPriceFilter: number | number[]
// ) => {
//   const filtersQuery: string = activeFilters.reduce(
//     (acc: string, filter: Filter) =>
//       acc.concat(`&${filter.filterSubject}=${filter.filterValue}`),
//     ""
//   );

//   return AxiosInstance.get(
//     `/items?page=${activePage}${filtersQuery}&maxPrice=${maxPriceFilter}`
//   )
//     .then((itemsRes) => itemsRes.data)
//     .catch(() => []);
// };

// export const getNumOfPages = async (
//   activeFilters: Filter[],
//   maxPriceFilter: number | number[]
// ) => {
//   const filtersQuery: string = activeFilters.reduce(
//     (acc: string, filter: Filter) =>
//       acc.concat(`${filter.filterSubject}=${filter.filterValue}&`),
//     ""
//   );

//   return AxiosInstance.get(
//     `/items/numOfPages?${filtersQuery}&maxPrice=${maxPriceFilter}`
//   )
//     .then((numOfPagesRes) => numOfPagesRes.data)
//     .catch(() => []);
// };

// export const getAllItemsDesc = async (searchStr: string) => {
//   const { data } = await AxiosInstance.get(`/items/desc?search=` + searchStr);
//   return data;
// };

// export const getItemQuery = async (id: string): Promise<ItemDetails> =>
//   await AxiosInstance.get(`/items/${id}`)
//     .then((itemData) => itemData.data)
//     .catch(() => new Error("something went wrong"));

// // cart

// export const getItemsFromCart = () =>
//   AxiosInstance.get(`/carts/items/`)
//     .then((itemData) => itemData.data)
//     .catch(() => []);

// export const addItemToCart = async (cartItem: CartItem) =>
//   await AxiosInstance.post(`/carts/addItem`, { ...cartItem }).catch(
//     () => new Error("something went wrong")
//   );

// export const removeItemFromCart = async (
//   itemId: ItemDetails["_id"],
//   sizeId: Size["_id"]
// ) =>
//   await AxiosInstance.post(`/carts/removeItem`, { itemId, sizeId }).catch(
//     () => new Error("something went wrong")
//   );

// // wishlist

// export const getItemsFromWishlist = (): Promise<ItemDetails[]> =>
//   AxiosInstance.get(`/wish-lists/items/`)
//     .then((itemData) => itemData.data)
//     .catch(() => []);

// export const addItemToWishlist = (wishlistItem: wishlistItem) =>
//   AxiosInstance.post(`/wish-lists/addItem`, { ...wishlistItem });

// export const removeItemFromWishlist = (itemId: ItemDetails["_id"]) =>
//   AxiosInstance.post(`/wish-lists/removeItem`, { itemId });

// // departments

// export const getAllDepartments = async () =>
//   await AxiosInstance.get("/departments")
//     .then((departmentsRes) => departmentsRes.data)
//     .catch(() => []);

// // categories

// export const getAllCategories = async () =>
//   await AxiosInstance.get("/categories")
//     .then((categoriesRes) => categoriesRes.data)
//     .catch(() => []);

// // orders
// export const getAllUserOrders = async () =>
//   await AxiosInstance.get("/orders")
//     .then((ordersRes) => ordersRes.data)
//     .catch(() => []);

// export const saveOrder = async (address: string) =>
//   await AxiosInstance.post("/orders", { address }).catch((error) => {
//     console.log(error);
//     throw new Error(error.response.data.errMessage || "Couldnt save order");
//   });
