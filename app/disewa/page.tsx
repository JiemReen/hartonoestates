'use client';

import { useEffect, useState } from 'react';
import PropertyCard from '@/components/PropertyCard';
import SearchFilterBar from '@/components/SearchFilterBar';
import type { Property } from '@/types/Property';

export default function DijualPage() {
  const [allProperties, setAllProperties] = useState<Property[]>([]);
  const [filtered, setFiltered] = useState<Property[]>([]);

  useEffect(() => {
    fetch('https://6873e6cac75558e2735597fd.mockapi.io/properties')
      .then((res) => res.json())
      .then((data) => {
        const salesOnly = data.filter(
          (item: Property) => item.type === 'rent'
        );
        setAllProperties(salesOnly);
        setFiltered(salesOnly);
      });
  }, []);

  const handleSearch = ({
    searchTerm,
    location,
    property,
    sort,
  }: {
    searchTerm: string;
    location: string;
    property: string;
    sort: 'asc' | 'desc' | '';
  }) => {
    let result = [...allProperties];

    if (searchTerm) {
      result = result.filter((item) =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (location) {
      result = result.filter(
        (item) => item.location.toLowerCase() === location.toLowerCase()
      );
    }

    if (property) {
      result = result.filter(
        (item) => item.property.toLowerCase() === property.toLowerCase()
      );
    }

    if (sort === 'asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (sort === 'desc') {
      result.sort((a, b) => b.price - a.price);
    }

    setFiltered(result);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2 style={{ marginBottom: '10px' }}>Properti Disewa</h2>
      <SearchFilterBar onSearch={handleSearch} />
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
        {filtered.length > 0 ? (
          filtered.map((item, index) => (
            <PropertyCard key={index} data={item} />
          ))
        ) : (
          <p>Tidak ada properti ditemukan.</p>
        )}
      </div>
    </div>
  );
}
