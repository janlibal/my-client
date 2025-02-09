import { timeout } from '@/api/core/api.settings'
import { products } from './data/products.data'

export async function getProducts() {
  await wait(timeout)
  return products
}

function wait(duration: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, duration)
  })
}
