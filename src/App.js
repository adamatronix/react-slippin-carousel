import logo from './logo.svg';
import styled from 'styled-components';
import { LazyBlurImage } from '@manualengineering/react-lazyblur';
import SlippinCarousel from './components/SlippinCarousel/SlippinCarousel';
import Image1 from './components/SlippinCarousel/assets/Found_2_DT_Caro_1.avif';
import Image2 from './components/SlippinCarousel/assets/Found_2_DT_Caro_2.avif';
import Image3 from './components/SlippinCarousel/assets/Found_2_DT_Caro_3.avif';
import Image4 from './components/SlippinCarousel/assets/Found_2_DT_Caro_4.avif';
import Image5 from './components/SlippinCarousel/assets/Found_2_DT_Caro_5.avif';
import Image6 from './components/SlippinCarousel/assets/Found_2_DT_Caro_6.avif';
import Image7 from './components/SlippinCarousel/assets/Found_2_DT_Caro_7.avif';
import './App.css';

const Item = styled.div` 
  margin: 0 0 0 30px;
`

const Image = styled.img` 
  display: block;
  pointer-events: none;
  width: 100%;
`

function App() {
  return (
    <div className="App">
      <SlippinCarousel itemSize={'55%'}>
        <Item>
          <Image src={Image1} />
        </Item>
        <Item>
          <Image src={Image2} />
        </Item>
        <Item>
          <Image src={Image3} />
        </Item>
        <Item>
          <Image src={Image4} />
        </Item>
        <Item>
          <Image src={Image5} />
        </Item>
        <Item>
          <Image src={Image6} />
        </Item>
        <Item>
          <Image src={Image7} />
        </Item>
      </SlippinCarousel>
    </div>
  );
}

export default App;
