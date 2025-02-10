import { Product } from '../types/products.types'

export const products: Product[] = [
  { id: 1, title: 'iPhone 12', priceInCents: 400, store: 'bestbuy' },
  { id: 2, title: 'iPhone 12 Mini', priceInCents: 400, store: 'bestbuy' },
  { id: 3, title: 'iPhone 12 Pro', priceInCents: 400, store: 'bestbuy' },
  { id: 4, title: 'iPhone 12 Pro Max', priceInCents: 400, store: 'bestbuy' },
  { id: 5, title: 'iPhone 13', priceInCents: 400, store: 'bestbuy' },
  { id: 6, title: 'iPhone 13 Mini', priceInCents: 400, store: 'bestbuy' },
  { id: 7, title: 'iPhone 13 Pro', priceInCents: 400, store: 'bestbuy' },
  { id: 8, title: 'iPhone 13 Pro Max', priceInCents: 400, store: 'bestbuy' },
  { id: 9, title: 'iPhone 14', priceInCents: 400, store: 'bestbuy' },
  { id: 10, title: 'iPhone 14 Plus', priceInCents: 400, store: 'bestbuy' },
  { id: 11, title: 'iPhone 14 Pro', priceInCents: 400, store: 'bestbuy' },
  { id: 12, title: 'iPhone 14 Pro Max', priceInCents: 400, store: 'bestbuy' },
  { id: 13, title: 'iPhone 20', priceInCents: 400, store: 'bestbuy' },
  { id: 14, title: 'Macbook Pro', priceInCents: 4000, store: 'bestbuy' },
  { id: 15, title: 'iPhone 12', priceInCents: 1900, store: 'walmart' },
  { id: 16, title: 'iPhone 12 Mini', priceInCents: 100, store: 'walmart' },
  { id: 17, title: 'iPhone 20', priceInCents: 100, store: 'walmart' },
  { id: 18, title: 'Macbook Air', priceInCents: 100, store: 'walmart' },
  { id: 19, title: 'iPhone 12', priceInCents: 800, store: 'amazon' },
  { id: 20, title: 'iPhone 12 Mini', priceInCents: 800, store: 'amazon' },
  { id: 21, title: 'iPhone 20', priceInCents: 800, store: 'amazon' },
  { id: 22, title: 'Macbook Air', priceInCents: 800, store: 'amazon' },
]

const bestbuy: Product[] = [
  { id: 1, title: 'iPhone 12', priceInCents: 4, store: 'bestbuy' },
  { id: 2, title: 'iPhone 12 Mini', priceInCents: 4, store: 'bestbuy' },
  { id: 3, title: 'iPhone 12 Pro', priceInCents: 4, store: 'bestbuy' },
  { id: 4, title: 'iPhone 12 Pro Max', priceInCents: 4, store: 'bestbuy' },
  { id: 5, title: 'iPhone 13', priceInCents: 4, store: 'bestbuy' },
  { id: 6, title: 'iPhone 13 Mini', priceInCents: 4, store: 'bestbuy' },
  { id: 7, title: 'iPhone 13 Pro', priceInCents: 4, store: 'bestbuy' },
  { id: 8, title: 'iPhone 13 Pro Max', priceInCents: 4, store: 'bestbuy' },
  { id: 9, title: 'iPhone 14', priceInCents: 4, store: 'bestbuy' },
  { id: 10, title: 'iPhone 14 Plus', priceInCents: 4, store: 'bestbuy' },
  { id: 11, title: 'iPhone 14 Pro', priceInCents: 4, store: 'bestbuy' },
  { id: 12, title: 'iPhone 14 Pro Max', priceInCents: 4, store: 'bestbuy' },
  { id: 13, title: 'iPhone 20', priceInCents: 4, store: 'bestbuy' },
  { id: 14, title: 'Macbook Pro', priceInCents: 40, store: 'bestbuy' }
]

const walmart: Product[] = [
  { id: 15, title: 'iPhone 12', priceInCents: 19, store: 'walmart' },
  { id: 16, title: 'iPhone 12 Mini', priceInCents: 1, store: 'walmart' },
  { id: 17, title: 'iPhone 20', priceInCents: 1, store: 'walmart' },
  { id: 18, title: 'Macbook Air', priceInCents: 1, store: 'walmart' }
]

const amazon: Product[] = [
  { id: 19, title: 'iPhone 12', priceInCents: 8, store: 'amazon' },
  { id: 20, title: 'iPhone 12 Mini', priceInCents: 8, store: 'amazon' },
  { id: 21, title: 'iPhone 20', priceInCents: 8, store: 'amazon' },
  { id: 22, title: 'Macbook Air', priceInCents: 8, store: 'amazon' }
]

export const stock = [bestbuy, walmart, amazon]
