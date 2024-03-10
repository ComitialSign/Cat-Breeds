import styled from "styled-components";
import catImg from "../../data/img/cat-FirstInterface-img.png";

const Container = styled.div`
  width: 100%;
  height: 62vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const Image = styled.img`
  width: 300px;
  height: 300px;
  margin-bottom: 180px;
`;

const Text = styled.p`
  font-size: 1.5rem;
  position: absolute;
  padding: 0 50px;
  margin: 40px 0 0 0;
`;

export default function FirstInterface({}) {
  return (
    <>
      <Container>
        <Image src={catImg} alt="drawing of a cat" />
        <Text>Explore and discover more about the various cat breeds</Text>
      </Container>
    </>
  );
}
