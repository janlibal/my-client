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

  const query = searchParams.get('q') || '' // genres passed in 'q'

  const [searchQuery, setSearchQuery] = useState(query)
  const [filteredBands, setFilteredBands] = useState<any[]>([])

  useEffect(() => {
    // Split query by commas and filter out empty genres
    const genres =
      searchQuery.trim() !== ''
        ? searchQuery.split(',').map((genre) => genre.trim())
        : []

    if (genres.length > 0) {
      // Filter the bands based on the selected genres
      const filteredByGenre = music.filter((item) => genres.includes(item.genre))

      // Count the occurrences of each location
      const locationCount = filteredByGenre.reduce((acc, item) => {
        acc[item.location] = (acc[item.location] || 0) + 1
        return acc
      }, {} as Record<string, number>)

      // Sort locations by frequency in descending order
      const sortedLocations = Object.entries(locationCount)
        .sort((a, b) => b[1] - a[1]) // Sort by count (highest first)
        .map((entry) => entry[0]) // Extract only the locations (not the count)

      // Filter bands by sorted locations
      const result = filteredByGenre.filter((item) =>
        sortedLocations.includes(item.location)
      )

      setFilteredBands(result)
    } else {
      setFilteredBands(music) // If no genres specified, show all bands
    }
  }, [searchQuery])

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }

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
