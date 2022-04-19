import styled from 'styled-components';
import { LazyBlurImage } from '@manualengineering/react-lazyblur';
import SlippinCarousel from './components/SlippinCarousel/SlippinCarousel';
import './App.css';

const Item = styled.div` 
  margin: 0 0 0 30px;
`

const Image = styled(LazyBlurImage)` 
  display: block;
  pointer-events: none;
  width: 100%;
`

const ControlsComponent = styled.div` 
  font-size: 50px;
`

function App() {
  return (
    <div className="App">
      <SlippinCarousel clickable clickableNextLabel={<ControlsComponent>Next</ControlsComponent>} clickablePrevLabel={<ControlsComponent>Prev</ControlsComponent>} itemSize={'55%'}>
        <Item>
          <Image src={'https://images.prismic.io/dave-reid/ac9eebda-1f4d-4218-8ded-e85ff84af95b_Found_2_DT_Caro_1.jpg?auto=compress%2Cformat'} placeholder={{
            src: 'https://images.prismic.io/dave-reid/ac9eebda-1f4d-4218-8ded-e85ff84af95b_Found_2_DT_Caro_1.jpg?auto=compress%2Cformat&w=50&blur=50&q=10',
            width: 947,
            height: 947
          }} />
        </Item>
        <Item>
          <Image src={'https://images.prismic.io/dave-reid/81a03a2a-4d04-4446-a3d5-35eb395bfedd_Found_2_DT_Caro_2.jpg?auto=compress%2Cformat'} placeholder={{
            src: 'https://images.prismic.io/dave-reid/81a03a2a-4d04-4446-a3d5-35eb395bfedd_Found_2_DT_Caro_2.jpg?auto=compress%2Cformat&w=50&blur=50&q=10',
            width: 947,
            height: 947
          }} />
        </Item>
        <Item>
          <Image src={'https://images.prismic.io/dave-reid/dd3bf56e-7a66-4271-baf5-b2f35d4d1a9c_Found_2_DT_Caro_3.jpg?auto=compress%2Cformat'} placeholder={{
            src: 'https://images.prismic.io/dave-reid/dd3bf56e-7a66-4271-baf5-b2f35d4d1a9c_Found_2_DT_Caro_3.jpg?auto=compress%2Cformat&w=50&blur=50&q=10',
            width: 947,
            height: 947
          }} />
        </Item>
        <Item>
          <Image src={'https://images.prismic.io/dave-reid/ea296f65-0451-4a2e-89a8-7e6d09089182_Found_2_DT_Caro_4.jpg?auto=compress%2Cformat'} placeholder={{
            src: 'https://images.prismic.io/dave-reid/ea296f65-0451-4a2e-89a8-7e6d09089182_Found_2_DT_Caro_4.jpg?auto=compress%2Cformat&w=50&blur=50&q=10',
            width: 947,
            height: 947
          }} />
        </Item>
        <Item>
          <Image src={'https://images.prismic.io/dave-reid/77d5d8e2-8220-4203-a255-76392e42d31f_Found_2_DT_Caro_5.jpg?auto=compress%2Cformat'} placeholder={{
            src: 'https://images.prismic.io/dave-reid/77d5d8e2-8220-4203-a255-76392e42d31f_Found_2_DT_Caro_5.jpg?auto=compress%2Cformat&w=50&blur=50&q=10',
            width: 947,
            height: 947
          }} />
        </Item>
        <Item>
          <Image src={'https://images.prismic.io/dave-reid/9f778dda-0164-4ef8-9101-2310549e14a4_Found_2_DT_Caro_6.jpg?auto=compress%2Cformat'} placeholder={{
            src: 'https://images.prismic.io/dave-reid/9f778dda-0164-4ef8-9101-2310549e14a4_Found_2_DT_Caro_6.jpg?auto=compress%2Cformat&w=50&blur=50&q=10',
            width: 947,
            height: 947
          }} />
        </Item>
      </SlippinCarousel>
    </div>
  );
}

export default App;
