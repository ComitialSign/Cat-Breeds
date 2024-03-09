import styled, { keyframes } from "styled-components";

const Container = styled.div`
  height: 62vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const Spinner = styled.div`
  width: 100px;
  height: 100px;
  border: 3px solid;
  border-color: black transparent transparent transparent;
  border-radius: 50%;
  animation: ${rotate} 1s linear infinite;
`;

export default function Loading() {
  return (
    <>
      <Container>
        <Spinner />
      </Container>
    </>
  );
}
