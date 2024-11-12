import { Container } from '@mui/material';
import { Link } from 'react-router-dom';
import { FilterPanel } from '../../components/FilterPanel';
import { usePaginatedImages } from '../../hooks/usePaginatedImages';
import { useState } from 'react';

export function Annotations() {
  // TODO: Set defaults
  const [filters, setFilters] = useState({});
  const paginatedImages = usePaginatedImages(filters, 50);

  return (
    <Container maxWidth={'xl'}>
      <Link to='/review'> Review Mode </Link>
      <FilterPanel setFilters={setFilters} />
    </Container>
  );
}
