import { Container, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

export function Annotations() {
  return (
    <Container>
      <Link to='/review'> Review Mode </Link>
      <Typography> Annotations Page</Typography>
    </Container>
  );
}
