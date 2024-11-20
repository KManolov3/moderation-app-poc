import { Container } from '@mui/material';
import { Link } from 'react-router-dom';
import { FilterPanel } from '../../components/FilterPanel';
import { ImageContainer } from '../../components/ImageContainer';
import { usePaginatedImages } from '../../hooks/usePaginatedImages';
import { useState } from 'react';
import { FilterOptions } from '../../services/image.service';

const PAGE_SIZE = 12;

export function Annotations() {
  const [filters, setFilters] = useState<FilterOptions>({
    confidence_min: 0.5,
    confidence_max: 0.95,
    categories: ['not_annotated'],
    // TODO: What should we put as the default order_by?
    order_by: 'upload_time_ASC',
  });
  const { currentImage, getNextImage } = usePaginatedImages(filters, PAGE_SIZE);

  return (
    <Container maxWidth={'xl'}>
      <Link to='/review'> Review Mode </Link>
      <FilterPanel setFilters={setFilters} />
      {currentImage && (
        <ImageContainer image={currentImage} onAnnotate={getNextImage} />
      )}
    </Container>
  );
}
