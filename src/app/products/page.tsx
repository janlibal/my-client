'use client'

import { products } from '@/api/modules/products/data/products.data'
import { Product } from '@/api/modules/products/types/products.types'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function ProductsPage() {
  const searchParams = useSearchParams()
  const router = useRouter()

  const query = searchParams.get('q') || ''

  const [searchQuery, setSearchQuery] = useState(query)
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [stores, setStores] = useState<string[]>([])
  const [groupedProducts, setGroupProducts] = useState<Record<string, any[]>>(
    {}
  )

  useEffect(() => {
    const queriedProducts =
      searchQuery.trim() !== ''
        ? searchQuery.split(',').map((genre) => genre.trim().toLowerCase())
        : []

    if (queriedProducts.length > 0) {
      const filteredByTitle = products.filter((item) =>
        queriedProducts.includes(item.title.trim().toLowerCase())
      )

      const groupedByLocation = filteredByTitle.reduce(
        (acc, product) => {
          if (!acc[product.store]) {
            acc[product.store] = []
          }
          acc[product.store].push(product)
          return acc
        },
        {} as Record<string, any[]>
      )

      const uniqueStores = [
        ...new Set(filteredByTitle.map((item) => item.store)),
      ]

      setFilteredProducts(filteredByTitle)
      setStores(uniqueStores)
      setGroupProducts(groupedByLocation)
    } else {
      setFilteredProducts(products)
      setGroupProducts({})
      setStores(products.map((a) => a.store))
    }
  }, [searchQuery])

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }

  // Function to handle search form submission
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (searchQuery.trim() !== '') {
      router.push(`/products?q=${searchQuery}`) // Update the URL with the new query
    } else {
      router.push('/products') // If search is empty, reset the URL (remove query)
    }
  }

  const totalProducts = filteredProducts.length
  const availableStores = stores.length

  return (
    <>
      <h1>Products Page!</h1>

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

      <h3>Filtered Products {totalProducts}</h3>
      {filteredProducts.length > 0 ? (
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

      <h3>Available Stores: ({availableStores})</h3>
      {stores.length > 0 && Object.keys(groupedProducts).length > 0 ? (
        <ul>
          {stores.map((store, index) => (
            <li key={index}>{store}</li>
          ))}
        </ul>
      ) : (
        <b>No stores found for the selected products</b>
      )}

      <br />
      {/* Display the filtered bands grouped by location */}
      <h3>Filtered Results:</h3>
      {Object.keys(groupedProducts).length > 0 ? (
        Object.keys(groupedProducts).map((store, index) => (
          <div key={index}>
            <h3>{store}</h3>
            <ul>
              {groupedProducts[store].map((product, idx) => (
                <li key={idx}>
                  {product.title}, {product.priceInCents}
                </li>
              ))}
            </ul>
          </div>
        ))
      ) : (
        <b>No products found for the selected titles</b>
      )}
    </>
  )
}
