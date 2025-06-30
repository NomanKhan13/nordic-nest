import { useEffect, useState } from 'react';
import PropertyCard from './components/PropertyCard';
import ModalContainer from './components/ModalContainer';
import Filters from './components/Filter';
import SortAndFilter from './components/SortAndFilter';
import { applyFilters, bayesianSort } from './utils';
import { useProperties } from './hooks/useProperties';

const PropertyListing = () => {
  const [properties, setProperties] = useState([]);
  console.log(properties);
  const [filteredProperties, setFilteredProperties] = useState(properties);
  const [sortBy, setSortBy] = useState('recommended');
  const [modalOpen, setModalOpen] = useState(false);
  const [filtersApplied, setFiltersApplied] = useState({
    bedrooms: 'any',
    bathrooms: 'any',
    price: '0-Infinity',
    superhost: false,
    wifi: false,
    petAllowed: false,
    location: [],
  });

  const toggleFilter = () => setModalOpen(true);

  function onSortChange(e) {
    const sort = e.target.value;
    setSortBy(sort);
    const sortedProperties = applyFilters(sort, properties, filtersApplied);
    setFilteredProperties(sortedProperties);
  }

  const handleFilters = (appliedFils) => {
    setFiltersApplied(appliedFils);
    const updatedProperties = applyFilters(sortBy, properties, appliedFils);
    setModalOpen(false);
    setFilteredProperties(updatedProperties);
    console.log('success');
  };

  useEffect(() => {
    async function fetchProperties() {
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
    }
    fetchProperties();
  }, []);

  return (
    <div className="bg-[#F9F6F1] text-[#4B3E3E] font-body">
      {modalOpen && (
        <ModalContainer onClose={() => setModalOpen(false)}>
          <h2 className="text-xl py-4 text-[#3B2F2F] font-medium">
            Filter your results
          </h2>
          <Filters onFilter={handleFilters} filtersApplied={filtersApplied} />
        </ModalContainer>
      )}
      <section className="py-12 px-4 max-w-3xl mx-auto">
        {/* Header Row */}
        <SortAndFilter
          filteredProperties={filteredProperties}
          sortBy={sortBy}
          onSortChange={onSortChange}
          toggleFilter={toggleFilter}
        />

        {/* Property List */}
        <div className="flex flex-col gap-6">
          {filteredProperties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default PropertyListing;
