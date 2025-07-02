import { useEffect, useState } from 'react';
import PropertyCard from './components/PropertyCard';
import ModalContainer from './components/ModalContainer';
import Filters from './components/Filter';
import SortAndFilter from './components/SortAndFilter';
import { applyFilters, bayesianSort } from './utils';
import { useProperties } from './hooks/useProperties';
import FavouriteProperties from './components/FavouriteProperties';
import PropertyListingShimmer from './components/PropertyListingShimmer';
import { RotateCcw } from 'lucide-react';

const PropertyListing = () => {
  const [status, setStatus] = useState("idle");
  const [properties, setProperties] = useState([]);
  console.log(properties);
  const [filteredProperties, setFilteredProperties] = useState(properties);
  const [sortBy, setSortBy] = useState('recommended');
  const [modalOpen, setModalOpen] = useState("main");
  const [filtersApplied, setFiltersApplied] = useState({
    bedrooms: 'any',
    bathrooms: 'any',
    price: '0-Infinity',
    superhost: false,
    wifi: false,
    petAllowed: false,
    location: [],
  });

  const [favourites, setFavourites] = useState(JSON.parse(localStorage.getItem("favorites")) ?? []);
  console.log(favourites)

  const handleResetFilter = () => {
    const defaultFilters = {
      location: [],
      superhost: false,
      wifi: false,
      petAllowed: false,
      bedrooms: 'any',
      bathrooms: 'any',
      price: '0-Infinity',
    };
    setFiltersApplied(defaultFilters);
    setFilteredProperties(properties)
  }

  const handleWishlist = (property) => {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    const updatedFavorites = favorites.find(fav => fav.id == property.id) ? favorites.filter(fav => fav.id != property.id) : [...favorites, property];
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    setFavourites(updatedFavorites);
  }

  const toggleFilter = () => setModalOpen("filter");
  const toggleSaved = () => setModalOpen("favourites");


  function onSortChange(e) {
    const sort = e.target.value;
    setSortBy(sort);
    const sortedProperties = applyFilters(sort, properties, filtersApplied);
    setFilteredProperties(sortedProperties);
  }

  const handleFilters = (appliedFils) => {
    setStatus("loading");
    setFiltersApplied(appliedFils);
    const updatedProperties = applyFilters(sortBy, properties, appliedFils);
    setModalOpen("main");
    setFilteredProperties(updatedProperties);
    setStatus('loaded');
  };

  useEffect(() => {
    async function fetchProperties() {
      try {

        setStatus("loading");
        // const res = await fetch(
        //   'https://nordicnest.free.beeceptor.com/properties'
        // );
        const res = await fetch(
          'https://mocki.io/v1/788553e5-c995-4c65-9f16-d92f7d91d11c'
        );
        const data = await res.json();
        setProperties(data);
        const updatedProperties = bayesianSort(data);
        setFilteredProperties(updatedProperties);
        setStatus("loaded");
      } catch (err) {
        setStatus("error");
      }
    }
    fetchProperties();
  }, []);

  return (
    <div className="bg-[#F9F6F1] text-[#4B3E3E] font-body">
      {modalOpen == "filter" && (
        <ModalContainer onClose={() => setModalOpen(false)}>
          <h2 className="text-xl py-4 text-[#3B2F2F] font-medium">
            Filter your results
          </h2>
          <Filters onFilter={handleFilters} filtersApplied={filtersApplied} />
        </ModalContainer>
      )}
      {modalOpen == "favourites" && (
        <ModalContainer onClose={() => setModalOpen("main")}>
          <h2 className="text-xl py-4 text-[#3B2F2F] font-medium">
            You have {favourites.length} saved {favourites.length === 1 ? "property" : "properties"} ❤️
          </h2>
          <FavouriteProperties savedProperties={favourites} handleWishlist={handleWishlist} />
        </ModalContainer>
      )}
      <section className="py-12 px-4 max-w-3xl mx-auto">
        {/* Header Row */}
        <SortAndFilter
          filteredProperties={filteredProperties}
          sortBy={sortBy}
          onSortChange={onSortChange}
          toggleFilter={toggleFilter}
          toggleSaved={toggleSaved}
        />
  
        {status == "idle" || status == "loading" && <PropertyListingShimmer />}
        {status == "loaded" && filteredProperties.length == 0 &&
          <div className=''> 
            <h2 className="text-lg italic">No results 😢 — go reset your filters and try again.</h2>
            <button onClick={() => handleResetFilter()} className='mt-4 border border[-#3a4932] cursor-pointer transition p-2 rounded hover:bg-black/20 flex gap-2 items-center'>
              <RotateCcw /> Reset 
            </button>
          </div>
        }


        {/* Property List */}
        {status == "loaded" && <div className="flex flex-col gap-6">
          {filteredProperties.map((property) => (
            <PropertyCard key={property.id} property={property} isFavorite={favourites.find(p => p.id === property.id) ? true : false} handleWishlist={handleWishlist} />
          ))}
        </div>}
      </section>
    </div>
  );
};

export default PropertyListing;
