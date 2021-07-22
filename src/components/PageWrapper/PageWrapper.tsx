import styled from "styled-components"

const PageWrapper = ({ children }: { children?: React.ReactNode }) => (
  <PageWrapperStyled>
    {children}
  </PageWrapperStyled>
)


const PageWrapperStyled = styled.div`
  min-height: 100vh;
  width: 100%;
  padding: 50px 100px;
`

export default PageWrapper