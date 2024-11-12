import { Container } from '@mui/material';
import { FilterPanel } from '../../components/FilterPanel';
import { usePaginatedImages } from '../../hooks/usePaginatedImages';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export function Review() {
  // TODO: Set defaults
  const [filters, setFilters] = useState({});
  const paginatedImages = usePaginatedImages(filters, 50);

  return (
    <Container maxWidth={'xl'}>
      <Link to='/'> Annotation Mode </Link>
      <FilterPanel setFilters={setFilters} />
    </Container>
  );
}
