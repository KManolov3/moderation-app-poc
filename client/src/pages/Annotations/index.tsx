import { Container } from '@mui/material';
import { Link } from 'react-router-dom';
import FilterPanel from '../../components/FilterPanel';

export function Annotations() {
  return (
    <Container maxWidth={'xl'}>
      <Link to='/review'> Review Mode </Link>
      <FilterPanel />
    </Container>
  );
}
