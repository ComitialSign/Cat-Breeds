import styled from "styled-components";

const Container = styled.div`
  height: 62vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Text = styled.p`
  font-size: 1.5rem;
`;

const TextStatus = styled.p`
  font-size: 3rem;
`;

export default function ErrorStatusMsg({ children }) {
  return (
    <>
      <Container>
        <Text>erro ao carregar a página</Text>
        <TextStatus>Status code: {children}</TextStatus>
      </Container>
    </>
  );
}
