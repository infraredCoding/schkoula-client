export const dateParser = (date: String) => {
    return new Date(date).toLocaleDateString("en-US", {weekday: 'short', day: 'numeric', month: 'short', year: 'numeric'})
}