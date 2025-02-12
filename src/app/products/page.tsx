'use client'

import { products } from '@/api/modules/products/data/products.data'
import { Product } from '@/api/modules/products/types/products.types'
import { ProductCard } from '@/components/ProductCard'
import { SearchProducts } from '@/components/SearchProducts'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function ProductsPage() {
  // initialize useState for the data
  const [profileData, setProfileData] = useState<Product[]>([])

  // initialise the searchParams hook

  const searchParams = useSearchParams()

  // Now get the query

  const searchQuery = searchParams && searchParams.get('q')

  useEffect(() => {
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
  }, [searchQuery]) // Only rerun the effect if searchQuery changes

  // get total users

  const totalUser = profileData.length

  return (
    <section className="h-[100vh] w-screen px-[2rem] md:px-[6rem] mt-[100px]">
      <p className="mb-10 ">
        Showing {totalUser} {totalUser > 1 ? 'Products' : 'Product'}
      </p>

      <SearchProducts defaultValue={searchQuery} />

      {/* // Conditionally render the profile cards */}

      <div className="mt-8">
        {totalUser === 0 ? (
          <p>No result returned</p>
        ) : (
          // return the profile cards here

          <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-5">
            {profileData.map(({ id, title, priceInCents, store }: Product) => {
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
