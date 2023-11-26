import React from 'react'
import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { AddShoppingCart } from '@mui/icons-material';
import accounting from 'accounting';
import { Button } from '@mui/material';

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
})); 

function DetalleDeProducto(props) {
  
  
    const {id, titulo, autor, precio_$, editorial, categoria, año_publicacion, url_imagen, sinopsis} = props;
    const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <div>
    <Card sx={{ maxWidth: 300 }}>
      
      <CardMedia
        component="img"
        height="400"
        width="700"
        image={url_imagen}
        alt="Portada"
      />
      <CardHeader
     
        action={
          <Typography
           
           variant='h5'
           color='textSecondary'
           >
            {accounting.formatMoney (precio_$)}
            </Typography>
        }
       title={titulo}
        subheader={autor}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
       
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to Card">
          <AddShoppingCart fontSize='large' />
        </IconButton>
     

        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
        <Button>
          <Link to={`/detail/${id}`}> Ver detalle </Link>
        </Button>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>Argumento:</Typography>
          <Typography paragraph>
          </Typography>
          <Typography paragraph>
             {sinopsis}
          </Typography>
         
        </CardContent>
      </Collapse>
    </Card>

    </div>
  )
}

export default DetalleDeProducto