import { Funnel, Heart } from 'lucide-react';

const SortAndFilter = ({
  filteredProperties,
  sortBy,
  onSortChange,
  toggleFilter,
  toggleSaved
}) => {
  return (
    <div className="flex flex-col-reverse sm:flex-row gap-2 sm:items-center justify-between py-2 mb-2">

      <p className="text-sm text-gray-600">
        {filteredProperties.length} results
      </p>

      <div className="flex items-center gap-4 justify-between">

        {/* save for later -flex items-center gap-4 fixed bottom-0 left-0 right-0 flex justify-around sm:static sm:justify-between items-center py-4 bg-[#E6EAE0] shadow-inner rounded-t-xl border-t border-[#D0D0D0] z-10 */}
        {/* Sort dropdown */}
        <div className="flex items-center gap-2">
          <label htmlFor="sort" className="text-sm text-[#3B2F2F] font-medium">
            Sort:
          </label>
          <select
            id="sort"
            name="sort"
            value={sortBy}
            onChange={onSortChange}
            className="bg-white border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#4A5A40]"
          >
            <option value="highest-price">Highest Price</option>
            <option value="lowest-price">Lowest Price</option>
            <option value="recommended">Recommended</option>
          </select>
        </div>

        {/* Filter button */}
        <div className='flex gap-2'>
          <button
            className="flex items-center gap-2 border text-sm px-4 py-2 rounded-md cursor-pointer hover:bg-black/20 transition"
            onClick={toggleFilter} // Add this if you're using a modal
          >
            <span className='hidden sm:revert'>Filter</span>
            <Funnel className="w-4 h-4" />
          </button>

          <button
            className="flex items-center gap-2 border text-sm px-4 py-2 rounded-md cursor-pointer hover:bg-black/20 transition"
            onClick={toggleSaved} // Add this if you're using a modal
          >
            <span className='hidden sm:revert'>Saved</span>
            <Heart className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SortAndFilter;
