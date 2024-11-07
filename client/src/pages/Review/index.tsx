import { Container } from '@mui/material';
import FilterPanel from '../../components/FilterPanel';
import { Link } from 'react-router-dom';

export function Review() {
  return (
    <Container maxWidth={'xl'}>
      <Link to='/'> Annotation Mode </Link>
      <FilterPanel />
    </Container>
  );
}
