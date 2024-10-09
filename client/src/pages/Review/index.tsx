import { Container, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

export function Review() {
  return (
    <Container>
      <Link to='/'> Annotation Mode </Link>
      <Typography> Review Page</Typography>
    </Container>
  );
}
