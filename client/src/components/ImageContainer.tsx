import { Box, Typography, Button } from '@mui/material';
import { styled } from '@mui/system';
import { useCallback } from 'react';
import { Image } from '../types/Image';
import { Category } from '../types/Image';

interface ImageContainerProps {
  image: Image;
  onAnnotate?: () => void;
}

const MeatyButton = styled(Button)({
  padding: '15px',
  color: 'white',
  fontSize: '1rem',
  fontWeight: 700,
});

export function ImageContainer({
  image,
  onAnnotate = () => {},
}: ImageContainerProps) {
  const backgroundColor =
    image.category === 'porn'
      ? 'red'
      : image.category === 'not_porn'
      ? 'green'
      : image.category === 'uncertain'
      ? 'yellow'
      : 'darkgray';

  const handleAnnotationClick = useCallback(
    (category: Category) => {
      // TODO: `annotationService.postAnnotation` with the category
      onAnnotate();
    },
    [onAnnotate]
  );

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        height: 'calc(100vh - 25vh)',
        backgroundColor,
        padding: 2,
      }}
    >
      <Box
        sx={{
          flex: '3 1 0',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <Typography
          variant='subtitle1'
          sx={{
            alignSelf: 'center',
            color: 'white',
            fontWeight: '700',
            fontSize: '1.25rem',
          }}
          gutterBottom
        >
          ID: {image.id} | Uploaded by: {image.userName} | Category:{' '}
          {(image.category ?? 'UNREVIEWED').toUpperCase()} | Confidence:{' '}
          {(image.confidence * 100).toFixed(2)}%
        </Typography>
        <Box
          component='img'
          src={image.imageUrl}
          alt={`Uploaded by ${image.userName}`}
          sx={{ width: '100%', height: '90%', objectFit: 'contain' }}
        />
      </Box>
      <Box
        sx={{
          flex: '1 1 0',
          backgroundColor: 'white',
          padding: 2,
          paddingLeft: '3%',
          paddingRight: '3%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <MeatyButton
          sx={{
            marginBottom: '15%',
            backgroundColor: 'red',
          }}
          variant='contained'
          color='primary'
          fullWidth
          onClick={() => handleAnnotationClick('porn')}
        >
          Porn
        </MeatyButton>
        <MeatyButton
          sx={{
            marginBottom: '15%',
            backgroundColor: 'green',
          }}
          variant='contained'
          color='secondary'
          fullWidth
          onClick={() => handleAnnotationClick('not_porn')}
        >
          Not Porn
        </MeatyButton>
        <MeatyButton
          sx={{ backgroundColor: 'goldenrod' }}
          variant='contained'
          color='secondary'
          fullWidth
          onClick={() => handleAnnotationClick('uncertain')}
        >
          Uncertain
        </MeatyButton>
      </Box>
    </Box>
  );
}
