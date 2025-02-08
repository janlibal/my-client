'use client'

import { data } from '@/api/modules/search/data/search.data'
import { iProfile } from '@/api/modules/search/interfaces/search.interface'
import { ProfileCard } from '@/components/ProfileCard'
import { SearchInput } from '@/components/SearchBar'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function SearchPage() {
  const [profileData, setProfileData] = useState<iProfile[]>([])

  useEffect(() => {
    // will be updated soon

    setProfileData(data)
  }, [])

  // get total users

  const totalUser = profileData.length

  const searchParams = useSearchParams()

  const searchQuery = searchParams && searchParams.get('q') // we use `q` to set the query to the browser, it could be anything

  useEffect(() => {
    const handleSearch = () => {
      // Filter the data based on search query

      //const findUsersByNames = data.filter(user => searchQuery?.includes(user.name))
      const findUsersByNames = data.filter((user) => {
        if (searchQuery) {
          return searchQuery
            .toLowerCase()
            .includes(
              user.name.toLowerCase() ||
                user.username.toLowerCase() ||
                user.email.toLowerCase()
            )
        } else {
          return true
        }
      })

      const findUser = data.filter((user) => {
        if (searchQuery) {
          return (
            user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.email.toLowerCase().includes(searchQuery.toLowerCase())
          )
        } else {
          // If no search query, return the original data

          return true
        }
      })

      // Update profileData based on search results

      setProfileData(findUsersByNames)
    }

    // Call handleSearch when searchQuery changes

    handleSearch()
  }, [searchQuery])

  return (
    <section className="h-[100vh] w-screen px-[2rem] md:px-[6rem] mt-[100px]">
      <p className="mb-10 ">
        Showing {totalUser} {totalUser > 1 ? 'Users' : 'User'}
      </p>

      <SearchInput defaultValue={searchQuery} />

      {/* // Conditionally render the profile cards */}

      <div className="mt-8">
        <h5>query: (content): {searchQuery}</h5>
        {totalUser === 0 ? (
          <p>No result returned</p>
        ) : (
          // return the profile cards here

          <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-5">
            {profileData.map(
              ({ username, role, name, photo, email }: iProfile) => {
                return (
                  <div key={username}>
                    <ProfileCard
                      name={name}
                      role={role}
                      photo={photo}
                      email={email}
                      username={username}
                    />
                  </div>
                )
              }
            )}
          </div>

          // End of profile data UI
        )}
      </div>
    </section>
  )
}
