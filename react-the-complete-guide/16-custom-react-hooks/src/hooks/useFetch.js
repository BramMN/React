export function useFetch(url) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchPlaces() {
      setIsFetching(true)
      try {
        const places = await fetchUserPlaces()
        setUserPlaces(places)
      } catch (error) {
        setError({ message: error.message || "Failed to fetch user places." })
      }

      setIsFetching(false)
    }

    fetchPlaces()
  }, [])

  return { data, loading }
}
