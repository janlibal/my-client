'use client'

import { useSearchParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

const music = [
  { name: 'Green day', genre: 'Punk', location: 'San Francisco' },
  { name: 'Bon Jovi', genre: 'rock', location: 'New Jersey' },
  { name: 'Orianthi', genre: 'blues', location: 'New Orleans' },
  { name: 'Michael Jackson', genre: 'pop', location: 'Los Angeles' },
  { name: 'The Offspring', genre: 'Punk', location: 'San Francisco' },
  { name: 'Aerosmith', genre: 'rock', location: 'Boston' },
]

export default function BandsPage() {
  const searchParams = useSearchParams()
  const router = useRouter()

  const query = searchParams.get('q') || ''

  const [searchQuery, setSearchQuery] = useState(query)
  const [filteredBands, setFilteredBands] = useState<any[]>([])
  const [locations, setLocations] = useState<string[]>([])
  const [groupedBands, setGroupedBands] = useState<Record<string, any[]>>({}) // State for grouped bands

  useEffect(() => {
    // Split query by commas and filter out empty genres
    const genres =
      searchQuery.trim() !== ''
        ? searchQuery.split(',').map((genre) => genre.trim().toLowerCase()) // Clean and lowercase genres
        : []

    if (genres.length > 0) {
      // Filter the bands based on the selected genres
      const filteredByGenre = music.filter(
        (item) => genres.includes(item.genre.trim().toLowerCase()) // Clean and lowercase item genre
      )

      // Count the occurrences of each location
      const locationCount = filteredByGenre.reduce(
        (acc, item) => {
          acc[item.location] = (acc[item.location] || 0) + 1
          return acc
        },
        {} as Record<string, number>
      )

      // Set the filtered bands to be sorted by location count (keeping as array)
      setFilteredBands(filteredByGenre)

      // Group the filtered bands by location and update the state
      const groupedByLocation = filteredByGenre.reduce(
        (acc, band) => {
          if (!acc[band.location]) {
            acc[band.location] = []
          }
          acc[band.location].push(band)
          return acc
        },
        {} as Record<string, any[]>
      )

      const matchingLocations = Array.from(
        new Set(
          filteredByGenre.map((item) => {
            return item.location
          })
        )
      )

      const uniqueLocations = [
        ...new Set(filteredByGenre.map((item) => item.location)),
      ]

      /*const s = new Set(matchingLocations)
      const uniqueLocations = [...s]*/

      setGroupedBands(groupedByLocation) // Set grouped bands state
      setLocations(uniqueLocations)
    } else {
      setFilteredBands(music) // If no genres specified, show all bands
      setGroupedBands({})
      setLocations(music.map((a) => a.location))
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

  const totalBands = filteredBands.length
  const availableLocations = locations.length

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
      <h3>Filtered Bands: ({totalBands})</h3>
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

      <br />

      <h3>Available Locations: ({availableLocations})</h3>
      {locations.length > 0 ? (
        <ul>
          {locations.map((location, index) => (
            <li key={index}>{location}</li>
          ))}
        </ul>
      ) : (
        <b>No locations found for the selected genres</b>
      )}

      <br />

      {/* Display the filtered bands grouped by location */}
      <h3>Filtered Results:</h3>
      {Object.keys(groupedBands).length > 0 ? (
        Object.keys(groupedBands).map((location, index) => (
          <div key={index}>
            <h3>{location}</h3>
            <ul>
              {groupedBands[location].map((band, idx) => (
                <li key={idx}>
                  {band.name}, {band.genre}
                </li>
              ))}
            </ul>
          </div>
        ))
      ) : (
        <b>No bands found for the selected genres</b>
      )}
    </>
  )
}
