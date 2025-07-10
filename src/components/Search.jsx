const STOP_WORDS = new Set([
    "about", "above", "after", "again", "against", "almost", "also",
    "although", "always", "among", "and", "another", "any", "are", "around",
    "because", "been", "before", "being", "below", "between", "both",
    "but", "can", "could", "did", "does", "doing", "down", "during",
    "each", "either", "few", "for", "from", "had", "has", "have", "having",
    "her", "here", "hers", "herself", "him", "himself", "his", "how", "however",
    "into", "its", "itself", "just", "less", "may",
    "might", "more", "most", "mostly", "must", "myself", "neither",
    "nor", "not", "now", "off", "once", "only", "other",
    "ought", "our", "ours", "ourselves", "out", "over", "own", "same", "she",
    "should", "some", "such", "than", "that", "the", "their", "theirs",
    "them", "themselves", "then", "there", "these", "they", "this", "those",
    "through", "too", "under", "until", "very", "was", "were",
    "what", "when", "where", "which", "while", "who", "whom", "why", "will",
    "with", "would", "you", "your", "yours", "yourself", "yourselves", "cabin", "view", "views", "stay", "stays", "near",
]);

//   added cabin in STOP_WORDS for now, if we plan to expand app we'll remove it

const Search = ({ onSearch }) => {
    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const searchQuery = formData.get("search");

        const searchParams = searchQuery
            .toLowerCase()
            .split(/\s+/)
            .filter(word => word.length > 2 && !STOP_WORDS.has(word));

        onSearch(searchParams); // this will compute and update UI
    };

    return (
        <form onSubmit={handleSubmit} className="flex justify-center">
            <input type="search" name="search" placeholder="eg: Rustic Forest Cabin" className="w-full max-w-xl shadow-inner p-2 rounded-md bg-white outline outline-gray-300 active:outline-[#3a4932] focus:outline-[#3a4932] focus:outline-2 active:outline-2" />
        </form>
    )
}

export default Search;