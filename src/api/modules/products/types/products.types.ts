export type Product = {
  id: number
  title: string
  priceInCents: number
  store: string
  location: {
    city: string,
    state: string
  }
}
