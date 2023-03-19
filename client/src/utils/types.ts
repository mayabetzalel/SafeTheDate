export type Department = {
    _id: string,
    description:string
  }
  
export type ItemCategory = {
    _id: string,
    description:string
  }

export  type Size = {
    _id: string,
    description:string
  }
  
export  type ItemStock = {
    _id: string,
    item: string,
    size: Size[],
    quantity: number
  }[];

export type Item = {
  _id: string,
  description: string,
  price: number,
  image: string,
  department: string,
  category: string,
}

export type CartItem = {
  item: ItemDetails,
  size: Size,
  quantity: number,
}

export type Cart = {
  _id: string,
  items : CartItem[],
}

export type ItemDetails = {
    _id: string,
    description: string,
    price: number,
    image: string,
    department: Department,
    category: ItemCategory,
    stock?: ItemStock,
  }

  export type Order = {
    _id: string,
    address: string,
    totalPrice: Number,
    items:
      {
        item: Item,
        size: Size,
        quantity: Number
      }[]
    ,
    createdAt: Date,
    updatedAt: Date,
  }

export interface Filter {
  filterSubject: string;
  filterValue: string;
}