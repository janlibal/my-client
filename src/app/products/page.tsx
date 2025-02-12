'use client'

import { products, stock } from '@/api/modules/products/data/products.data'
import { Product } from '@/api/modules/products/types/products.types'
import { ProductCard } from '@/components/ProductCard'
import { SearchProducts } from '@/components/SearchProducts'
import { useSearchParams } from 'next/navigation'
import router from 'next/router'
import { useEffect, useState } from 'react'

export default function ProductsPage() {
  // initialize useState for the data
  const [productData, setProductData] = useState<Product[]>([])

  // initialise the searchParams hook

  const searchParams = useSearchParams()

  // Now get the query

  const searchQuery = searchParams && searchParams.get('q')

  /*useEffect(() => {
    (async () => {
      const filteredResults: Product[] = await new Promise<Product[]>((resolve) => {

        const filteredProducts: Product[] = stock.map((data) => {
          const filteredByTitle = data.filter((item) => searchQuery?.includes(item.title))
          if(filteredByTitle.length === searchQuery?.length) {
            const store = filteredByTitle[0].store
            const allMatches = filteredByTitle.every((product) => product.store === store)
            return allMatches ? filteredByTitle : []
          }
          return []
        }).filter((filteredData) => filteredData.length > 0).flat()
        resolve(filteredProducts)
      })
    }) ()
  }, [searchQuery])*/

  /*useEffect(() => {
    const handleSearch = async () => {
      const filteredResults: Product[] = await new Promise<Product[]>((resolve) => {

        const filteredProducts: Product[] = stock.map((data) => {
          const filteredByTitle = data.filter((item) => searchQuery?.includes(item.title))
          if(filteredByTitle.length === searchQuery?.length) {
            const store = filteredByTitle[0].store
            const allMatches = filteredByTitle.every((product) => product.store === store)
            return allMatches ? filteredByTitle : []
          }
          return []
        })
        .filter((filteredData) => filteredData.length > 0)
        .flat()
        setProfileData(filteredProducts)
        resolve(filteredProducts)
      })
      // Update profileData based on search results
      setProfileData(filteredResults)
    }

    // Call handleSearch when searchQuery changes
    handleSearch()
  }, [searchQuery])*/

  useEffect(() => {
    if (searchQuery) {
      const productsWithTitles = products.filter((prod) =>
        searchQuery.toLowerCase().includes(prod.title.toLowerCase())
      )

      if (productsWithTitles.length === searchQuery.length) {
        const firstProductStore = productsWithTitles[0].store
        const sameStore = productsWithTitles.filter(
          (product) => product.store === firstProductStore
        )
        const data = sameStore ? productsWithTitles : []
        setProductData(data)
      } else {
        setProductData(productsWithTitles)
      }
    } else {
      setProductData(products)
    }
  }, [searchQuery])

  /*useEffect(() => {
    const handleSearch = () => {
      // Filter the data based on search query

      const filteredByName = products.filter((product) => {
        if (searchQuery) {
          return searchQuery.toLowerCase().includes(product.title.toLowerCase())
        } else {
          return true
        }
      })

      // Update profileData based on search results
      setProfileData(filteredByName)
    }

    // Call handleSearch when searchQuery changes
    handleSearch()
  }, [searchQuery])*/ // Only rerun the effect if searchQuery changes

  // get total users

  const showingProducts = productData.length
  //const sorted = productData.sort(a => a.store)
  //https://dev.to/ramonak/react-how-to-dynamically-sort-an-array-of-objects-using-the-dropdown-with-react-hooks-195p
  return (
    <section className="h-[100vh] w-screen px-[2rem] md:px-[6rem] mt-[100px]">
      <p className="mb-10 ">
        Showing {showingProducts} {showingProducts > 1 ? 'Products' : 'Product'}
      </p>

      <SearchProducts defaultValue={searchQuery} />

      {/* // Conditionally render the profile cards */}

      <div className="mt-8">
        {showingProducts === 0 ? (
          <p>No result returned</p>
        ) : (
          // return the profile cards here

          <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-5">
            {productData.map(({ id, title, priceInCents, store }: Product) => {
              return (
                <div key={id}>
                  <ProductCard
                    id={id}
                    title={title}
                    priceInCents={priceInCents}
                    store={store}
                  />
                </div>
              )
            })}
          </div>

          // End of profile data UI
        )}
      </div>
    </section>
  )
}
