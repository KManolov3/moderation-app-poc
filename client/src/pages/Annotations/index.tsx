import { Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { Container } from '../../components/Container';

export function Annotations() {
  return (
    <Container>
      <Link to='/review'> Review Mode </Link>
      <Typography> Annotations Page</Typography>
    </Container>
  );
}
