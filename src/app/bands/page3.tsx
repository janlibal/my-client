'use client'

import { useSearchParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

const music = [
  { name: 'Green day', genre: 'rock', location: 'San Francisco' },
  { name: 'Bon Jovi', genre: 'rock', location: 'New Jersey' },
  { name: 'Orianthi', genre: 'blues', location: 'New Orleans' },
  { name: 'Michael Jackson', genre: 'pop', location: 'Los Angeles' },
  { name: 'The Offspring', genre: 'rock', location: 'San Francisco' },
  { name: 'Aerosmith', genre: 'rock', location: 'Boston' },
]

export default function BandsPage() {
  const searchParams = useSearchParams()
  const router = useRouter()

  const query = searchParams.get('q') || ''

  const [searchQuery, setSearchQuery] = useState(query)
  const [filteredBands, setFilteredBands] = useState<any[]>([])
  const [locations, setLocations] = useState<string[]>([])

  useEffect(() => {
    // Split query by commas and filter out empty genres
    const genres =
      searchQuery.trim() !== ''
        ? searchQuery.split(',').map((genre) => genre.trim())
        : []

    // If genres are provided, filter the bands
    if (genres.length > 0) {
      const filteredByGenre = music.filter((item) =>
        genres.includes(item.genre)
      )

      const matchingLocations = Array.from(
        new Set(filteredByGenre.map((item) => item.location))
      )

      const result = filteredByGenre.filter((item) =>
        matchingLocations.includes(item.location)
      )

      setFilteredBands(result)
      setLocations(matchingLocations)
    } else {
      setFilteredBands(music) // If no genres specified, show all bands
      setLocations(Array.from(new Set(music.map((item) => item.location))))
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
      <h3>Filtered Bands:</h3>
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

      <h3>Matching Locations:</h3>
      {locations.length > 0 ? (
        <ul>
          {locations.map((location, index) => (
            <li key={index}>{location}</li>
          ))}
        </ul>
      ) : (
        <b>No locations found for the selected genres</b>
      )}
    </>
  )
}
