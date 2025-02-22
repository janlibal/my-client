'use client'

import { products } from '@/api/modules/products/data/products.data'
import { Product } from '@/api/modules/products/types/products.types'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

declare global {
  interface Array<T> {
    hasMin(attrib: string): Product | null
  }
}

Array.prototype.hasMin = function (
  this: Product[],
  attrib: string
): Product | null {
  const checker = (o: any, i: string) => typeof o === 'object' && i in o

  return (
    (this.length &&
      this.reduce((prev: any, curr: any) => {
        const prevOk = checker(prev, attrib)
        const currOk = checker(curr, attrib)

        if (!prevOk && !currOk) return {} // No valid attributes
        if (!prevOk) return curr // If prev is invalid, return curr
        if (!currOk) return prev // If curr is invalid, return prev

        return prev[attrib] < curr[attrib] ? prev : curr // Return the object with the lower cost
      })) ||
    null
  )
}

type GroupedProducts = Record<string, Record<string, Record<string, Product[]>>>

export default function ProductsPage() {
  const searchParams = useSearchParams()
  const router = useRouter()

  const query = searchParams.get('q') || ''

  const [searchQuery, setSearchQuery] = useState(query)
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [groupedByRetailer, setGroupRetailer] = useState<GroupedProducts>({})
  const [groupedByLocation, setGroupLocation] = useState<GroupedProducts>({})
  const [groupedByPrice, setGroupPrice] = useState<GroupedProducts>({})

  useEffect(() => {
    const queriedProducts =
      searchQuery.trim() !== ''
        ? searchQuery.split(',').map((genre) => genre.trim().toLowerCase())
        : []

    const allProducts = products.flat()

    if (queriedProducts.length > 0) {
      const filteredByTitle = allProducts.filter((item) =>
        queriedProducts.includes(item.title.trim().toLowerCase())
      )

      const sortedByPrice = filteredByTitle.sort(
        (a, b) => a.priceInCents - b.priceInCents
      )

      const groupedByPrice: GroupedProducts = sortedByPrice.reduce(
        (acc, product) => {
          const { id, title, priceInCents, store, location } = product
          const { state, city } = location

          if (!acc[store]) {
            acc[store] = {}
          }

          if (!acc[store][state]) {
            acc[store][state] = {}
          }

          if (!acc[store][state][city]) {
            acc[store][state][city] = []
          }

          acc[store][state][city].push(product)

          return acc
        },
        {} as GroupedProducts
      )

      const groupedByRetailer: GroupedProducts = filteredByTitle.reduce(
        (acc, product) => {
          const { id, title, priceInCents, store, location } = product
          const { state, city } = location

          if (!acc[store]) {
            acc[store] = {}
          }

          if (!acc[store][state]) {
            acc[store][state] = {}
          }

          if (!acc[store][state][city]) {
            acc[store][state][city] = []
          }

          acc[store][state][city].push(product)

          return acc
        },
        {} as GroupedProducts
      )

      const groupedByLocation: GroupedProducts = filteredByTitle.reduce(
        (acc, product) => {
          const { id, title, priceInCents, store, location } = product
          const { state, city } = location

          if (!acc[state]) {
            acc[state] = {}
          }

          if (!acc[state][city]) {
            acc[state][city] = {}
          }

          if (!acc[state][city][store]) {
            acc[state][city][store] = []
          }

          acc[state][city][store].push(product)

          return acc
        },
        {} as GroupedProducts
      )

      setFilteredProducts(filteredByTitle)
      setGroupRetailer(groupedByRetailer)
      setGroupLocation(groupedByLocation)
      setGroupPrice(groupedByPrice)
    } else {
      setFilteredProducts(allProducts)
      setGroupRetailer({})
      setGroupLocation({})
      setGroupPrice({})
    }
  }, [searchQuery])

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }

  // Function to handle search form submission
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (searchQuery.trim() !== '') {
      router.push(`/products?q=${searchQuery}`)
    } else {
      router.push('/products')
    }
  }

  const totalProducts = filteredProducts.length

  return (
    <>
      <h1>Products Page</h1>

      {/* Search bar */}
      <form onSubmit={handleSearchSubmit}>
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search products (e.g., iPhone, Macbook)"
        />
        <button type="submit">Search</button>
      </form>

      <h3>Filtered Products ({filteredProducts.length > 0 && filteredProducts.length !== products.flat().length ? (filteredProducts.length) : (0)})</h3>
      {filteredProducts.length > 0 &&
      filteredProducts.length !== products.flat().length ? (
        <ul>
          {filteredProducts.map((prd, index) => (
            <li key={index}>
              {prd.title} | {prd.store} | ${prd.priceInCents}
            </li>
          ))}
        </ul>
      ) : (
        <b>No product found</b>
      )}


      <br />

      <h3>Retailers availability: ({Object.keys(groupedByRetailer).length})</h3>
      {Object.keys(groupedByRetailer).length > 0 ? (
        <ul>
          {Object.keys(groupedByRetailer).map((retailer, index) => (
            <li key={index}>{retailer}</li>
          ))}
        </ul>
      ) : (
        <b>No availability found for the searched products</b>
      )}

      <br />

      <h3>Filtered Results by Price:</h3>
      {Object.keys(groupedByPrice).length > 0 ? (
        Object.keys(groupedByPrice).map((store, storeIndex) => (
          <div key={storeIndex}>
            <h3>{store}</h3>
            <ul>
              {Object.keys(groupedByPrice[store]).map((state, stateIndex) => (
                <li key={stateIndex}>
                  <strong>{state}</strong>
                  <ul>
                    {Object.keys(groupedByPrice[store][state]).map(
                      (city, cityIndex) => (
                        <li key={cityIndex}>
                          <strong>{city}</strong>:
                          <ul>
                            {groupedByPrice[store][state][city].map(
                              (product, productIndex) => (
                                <li key={productIndex}>
                                  {product.title}, ${product.priceInCents}
                                </li>
                              )
                            )}
                          </ul>
                        </li>
                      )
                    )}
                  </ul>
                </li>
              ))}
            </ul>
          </div>
        ))
      ) : (
        <b>No available products found</b>
      )}

      <br />

      <h3>Filtered products by retailer:</h3>
      {Object.keys(groupedByRetailer).length > 0 ? (
        Object.keys(groupedByRetailer).map((store, storeIndex) => (
          <div key={storeIndex}>
            <h3>{store}</h3>
            <ul>
              {Object.keys(groupedByRetailer[store]).map(
                (state, stateIndex) => (
                  <li key={stateIndex}>
                    <strong>{state}</strong>
                    <ul>
                      {Object.keys(groupedByRetailer[store][state]).map(
                        (city, cityIndex) => (
                          <li key={cityIndex}>
                            <strong>{city}</strong>:
                            <ul>
                              {groupedByRetailer[store][state][city].map(
                                (product, productIndex) => (
                                  <li key={productIndex}>
                                    {product.title}, ${product.priceInCents}
                                  </li>
                                )
                              )}
                            </ul>
                          </li>
                        )
                      )}
                    </ul>
                  </li>
                )
              )}
            </ul>
          </div>
        ))
      ) : (
        <b>No availability found for the searched products</b>
      )}

      <br />

      <h3>Filtered products by location:</h3>
      {Object.keys(groupedByLocation).length > 0 ? (
        Object.keys(groupedByLocation).map((state, stateIndex) => (
          <div key={stateIndex}>
            <h3>{state}</h3>
            <ul>
              {Object.keys(groupedByLocation[state]).map((city, cityIndex) => (
                <li key={cityIndex}>
                  <strong>{city}</strong>
                  <ul>
                    {Object.keys(groupedByLocation[state][city]).map(
                      (store, storeIndex) => (
                        <li key={storeIndex}>
                          <strong>{store}</strong>:
                          <ul>
                            {groupedByLocation[state][city][store].map(
                              (product, productIndex) => (
                                <li key={productIndex}>
                                  {product.title}, ${product.priceInCents}
                                </li>
                              )
                            )}
                          </ul>
                        </li>
                      )
                    )}
                  </ul>
                </li>
              ))}
            </ul>
          </div>
        ))
      ) : (
        <b>No availability found for the searched products</b>
      )}
    </>
  )
}
