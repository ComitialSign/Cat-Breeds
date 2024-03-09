import styled from "styled-components";
import catImg from "../../data/img/cat-FirstInterface.png";

const Container = styled.div`
  width: 100%;
  height: 62vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Image = styled.img`
  width: 300px;
  height: 300px;
  position: relative;
  margin-bottom: 180px;
`;

const Text = styled.p`
  font-size: 1.5rem;
  position: absolute;
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
