'use client'

import { useSearchParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

const bands = [
  { name: 'Green day', genre: 'rock', location: 'San Francisco' },
  { name: 'Bon Jovi', genre: 'rock', location: 'New Jersey' },
  { name: 'Orianthi', genre: 'blues', location: 'New Orleans' },
  { name: 'Michael Jackson', genre: 'pop', location: 'Los Angeles' },
  { name: 'The Offspring', genre: 'rock', location: 'San Francisco' },
]

export default function BandsPage() {
  const searchParams = useSearchParams()
  const router = useRouter()

  const query = searchParams.get('q') || ''

  const [searchQuery, setSearchQuery] = useState(query)
  const [filteredBands, setFilteredBands] = useState<any[]>([])

  useEffect(() => {
    // Split query by commas and filter out empty genres
    const genres =
      searchQuery.trim() !== ''
        ? searchQuery.split(',').map((genre) => genre.trim())
        : []

    // If genres are provided, filter the bands
    if (genres.length > 0) {
      const result = bands.filter((band) => genres.includes(band.genre))
      setFilteredBands(result)
    } else {
      setFilteredBands(bands) // If no genres specified, show all bands
    }
  }, [searchQuery])

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }

  // Function to handle search form submission
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (searchQuery.trim() !== '') {
      router.push(`/bands?q=${searchQuery}`) // Update the URL with the new query
    } else {
      router.push('/bands') // If search is empty, reset the URL (remove query)
    }
  }

  /*const genres = searchQuery.trim() !== '' ? searchQuery.split(',') : [];

  const filteredBands = genres.length > 0
    ? bands.filter((band) => genres.includes(band.genre))
    : bands; // If no genres specified, show all bands*/

  return (
    <>
      <h1>Welcome to Coding Beauty</h1>

      {/* Search bar */}
      <form onSubmit={handleSearchSubmit}>
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search genres (e.g., rock, pop)"
        />
        <button type="submit">Search</button>
      </form>

      <br />

      {/* Display the filtered bands */}
      {filteredBands.length > 0 ? (
        <ul>
          {filteredBands.map((band, index) => (
            <li key={index}>
              {band.name}, {band.genre}, {band.location}
            </li>
          ))}
        </ul>
      ) : (
        <b>No bands found for the selected genres</b>
      )}
    </>
  )
}
