import { useEffect, useState } from 'react';
import PropertyCardDetail from './components/PropertyCardDetail';
import ModalContainer from './components/ModalContainer';
import Filters from './components/Filter';
import SortAndFilter from './components/SortAndFilter';
import { applyFilters, bayesianSort } from './utils';
import FavouriteProperties from './components/FavouriteProperties';
import PropertyListingShimmer from './components/PropertyListingShimmer';
import { RotateCcw } from 'lucide-react';
import Search from './components/Search';

const DEFAULT_FILTERS = {
  bedrooms: 'any',
  bathrooms: 'any',
  price: '0-Infinity',
  superhost: false,
  wifi: false,
  petAllowed: false,
  location: [],
};

const FAV_KEY = 'favorites';

const PropertyListing = () => {
  const [status, setStatus] = useState('idle');
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [sortBy, setSortBy] = useState('recommended');
  const [modalOpen, setModalOpen] = useState('main');
  const [filtersApplied, setFiltersApplied] = useState(DEFAULT_FILTERS);
  const [favourites, setFavourites] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(FAV_KEY)) ?? [];
    } catch {
      return [];
    }
  });

  const updateFilteredProperties = (
    baseProperties = properties,
    filters = filtersApplied,
    sort = sortBy
  ) => {
    const updated = applyFilters(sort, baseProperties, filters);
    setFilteredProperties(updated);
  };

  const handleResetFilter = () => {
    setFiltersApplied(DEFAULT_FILTERS);
    updateFilteredProperties(properties, DEFAULT_FILTERS);
  };

  const handleWishlist = (property) => {
    const stored = JSON.parse(localStorage.getItem(FAV_KEY)) || [];
    const alreadySaved = stored.find((fav) => fav.id === property.id);

    const updatedFavorites = alreadySaved
      ? stored.filter((fav) => fav.id !== property.id)
      : [...stored, property];

    localStorage.setItem(FAV_KEY, JSON.stringify(updatedFavorites));
    setFavourites(updatedFavorites);
  };

  const onSortChange = (e) => {
    const newSort = e.target.value;
    setSortBy(newSort);
    updateFilteredProperties(filteredProperties, filtersApplied, newSort);
  };

  const handleFilters = (newFilters) => {
    setStatus('loading');
    setFiltersApplied(newFilters);
    updateFilteredProperties(filteredProperties, newFilters, sortBy);
    setModalOpen('main');
    setStatus('loaded');
  };

  const handleSearch = (searchParams) => {
    setStatus("loading");
    if (searchParams.length > 0) {
      const searchResults = properties.map(property => {
        const searchInString = `${property.title} ${property.location} ${property.description} ${property.amenities.join(" ")}`.toLowerCase();
        const power = searchParams.filter(word => searchInString.includes(word));
        if (power.length > 0) {
          return { ...property, power: power.length };
        }
      }).filter(p => p);
      console.log(searchResults)
      const updated = applyFilters(sortBy, searchResults, filtersApplied);
      // updated.sort((a,b) => b.power - a.power);
      setFilteredProperties(updated);
    } else {
      setFilteredProperties(properties)
    }
    setStatus("loaded");

  }

  const toggleFilter = () => setModalOpen('filter');
  const toggleSaved = () => setModalOpen('favourites');

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setStatus('loading');
        const res = await fetch(
          'https://mocki.io/v1/93d7a88b-4db4-419e-9709-90e1d7427567'
        );
        const data = await res.json();
        setProperties(data);
        const sorted = bayesianSort(data);
        setFilteredProperties(sorted);
        setStatus('loaded');
      } catch (err) {
        console.error('Failed to fetch properties:', err);
        setStatus('error');
      }
    };

    fetchProperties();
  }, []);

  const isLoading = status === 'idle' || status === 'loading';
  const noResults = status === 'loaded' && filteredProperties.length === 0;
  const hasResults = status === 'loaded' && filteredProperties.length > 0;

  return (
    <div className="bg-[#F9F6F1] text-[#4B3E3E] font-body">
      {modalOpen === 'filter' && (
        <ModalContainer onClose={() => setModalOpen('main')}>
          <h2 className="text-xl py-4 text-[#3B2F2F] font-medium">
            Filter your results
          </h2>
          <Filters
            onFilter={handleFilters}
            filtersApplied={filtersApplied}
          />
        </ModalContainer>
      )}

      {modalOpen === 'favourites' && (
        <ModalContainer onClose={() => setModalOpen('main')}>
          <h2 className="text-xl py-4 text-[#3B2F2F] font-medium">
            You have {favourites.length} saved{' '}
            {favourites.length === 1 ? 'property' : 'properties'} ❤️
          </h2>
          <FavouriteProperties
            savedProperties={favourites}
            handleWishlist={handleWishlist}
          />
        </ModalContainer>
      )}


      <section className="py-12 px-4 max-w-3xl mx-auto">
        <Search onSearch={handleSearch} />
        <SortAndFilter
          filteredProperties={filteredProperties}
          sortBy={sortBy}
          onSortChange={onSortChange}
          toggleFilter={toggleFilter}
          toggleSaved={toggleSaved}
        />

        {isLoading && <PropertyListingShimmer />}

        {noResults && (
          <div>
            <h2 className="text-lg italic">
              No results 😢 — try resetting your filters.
            </h2>
            <button
              onClick={handleResetFilter}
              className="mt-4 border border-[#3a4932] cursor-pointer transition p-2 rounded hover:bg-black/20 flex gap-2 items-center"
            >
              <RotateCcw /> Reset
            </button>
          </div>
        )}

        {hasResults && (
          <div className="flex flex-col gap-6">
            {filteredProperties.map((property) => (
              <PropertyCardDetail
                key={property.id}
                property={property}
                isFavorite={!!favourites.find((p) => p.id === property.id)}
                handleWishlist={handleWishlist}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default PropertyListing;


// const res = await fetch(
//   'https://nordicnest.free.beeceptor.com/properties'
// );