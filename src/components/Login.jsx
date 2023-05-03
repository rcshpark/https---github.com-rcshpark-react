import styled from 'styled-components';

const Home = () => {

    return ( 
    <div>
        <div>
        <Head>TodoList</Head>
        </div>
        <div>
        <DivideLine/>
        <Background>
        </Background>
        </div>
        
     </div>
    );
         };

const Head = styled.h4`
    background:black;
    width: 100%;
    display: flex;
    color: white;
    padding: 20px;
    font-size: 20px;
    font-weight: 600;
`;

const DivideLine = styled.div`
    border-top: 2px solid #eee;
`;

const Background = styled.div`
    position: absolute;
    width: 1920px;
    height: 1080px;
    background: white;
`;
 

export default Home;