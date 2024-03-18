import Carousel from 'react-bootstrap/Carousel';

import b1 from '../pics/main/banner1.png';
import b2 from '../pics/main/banner2.png';
import b3 from '../pics/main/banner3.png';
import b4 from '../pics/main/banner4.png';
import b5 from '../pics/main/banner5.jpg';
import b6 from '../pics/main/banner6.png';
import b7 from '../pics/main/banner7.png';
import b8 from '../pics/main/banner8.png';
import b9 from '../pics/main/banner9.png';
import b10 from '../pics/main/banner10.png';
import b11 from '../pics/main/banner11.png';
import b12 from '../pics/main/banner12.png';

function Carusel() {
  return (
    <Carousel>
      <Carousel.Item>
        <img src={b1}/>
      </Carousel.Item>
      <Carousel.Item>
        <img src={b2}/>
      </Carousel.Item>
      <Carousel.Item>
        <img src={b3}/>
      </Carousel.Item>
      <Carousel.Item>
        <img src={b4}/>
      </Carousel.Item>
      <Carousel.Item>
        <img src={b5}/>
      </Carousel.Item>
      <Carousel.Item>
        <img src={b6}/>
      </Carousel.Item>
      <Carousel.Item>
        <img src={b7}/>
      </Carousel.Item>
      <Carousel.Item>
        <img src={b8}/>
      </Carousel.Item>
      <Carousel.Item>
        <img src={b9}/>
      </Carousel.Item>
      <Carousel.Item>
        <img src={b10}/>
      </Carousel.Item>
      <Carousel.Item>
        <img src={b11}/>
      </Carousel.Item>
      <Carousel.Item>
        <img src={b12}/>
      </Carousel.Item>
    </Carousel>
  );
}

export default Carusel;