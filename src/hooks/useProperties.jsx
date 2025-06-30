import { useEffect, useState } from 'react';
import { bayesianSort } from '../utils';

export const useProperties = () => {
  const [properties, setProperties] = useState([]);
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
      // const updatedProperties = bayesianSort(data);
      // setFilteredProperties(updatedProperties);
    }
    fetchProperties();
  }, []);
  return properties;
};
