const API_KEY = "20ca5ee6"

export async function searchMovies({ search }) {
    if (search === "") return null

    try {
        const response = await fetch(`http://www.omdbapi.com/?apikey=${API_KEY}&s=${search}`)
        const json = await response.json()
    
        const movies = json.Search
    
        const mappedMovies = movies?.map(movie => ({
            title: movie.Title,
            year: movie.Year,
            poster: movie.Poster,
            id: movie.imdbID
        }))

        return mappedMovies
    } catch (e) {
        throw new Error("Error searching movies")
    }
}