import styled from "styled-components";

const Container = styled.div`
  height: 100%;
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
        <Text>Error loading page</Text>
        <TextStatus>{children}</TextStatus>
      </Container>
    </>
  );
}
