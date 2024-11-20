import { Container } from '@mui/material';
import { FilterPanel } from '../../components/FilterPanel';
import { usePaginatedImages } from '../../hooks/usePaginatedImages';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FilterOptions } from '../../services/image.service';

const PAGE_SIZE = 12;

export function Review() {
  const [filters, setFilters] = useState<FilterOptions>({
    confidence_min: 0.5,
    confidence_max: 0.95,
    categories: ['not_annotated'],
    // TODO: What should we put as the default order_by?
    order_by: 'upload_time_ASC',
  });
  const paginatedImages = usePaginatedImages(filters, PAGE_SIZE);

  return (
    <Container maxWidth={'xl'}>
      <Link to='/'> Annotation Mode </Link>
      <FilterPanel setFilters={setFilters} />
    </Container>
  );
}
