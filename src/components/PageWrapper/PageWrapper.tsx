import styled from "styled-components"
import img from './mainscren.jpg'

const PageWrapper = ({ children }: { children?: React.ReactNode }) => {
  console.log(img)
  return (
    <PageWrapperStyled>
      {children}
    </PageWrapperStyled>
  )
}


const PageWrapperStyled = styled.div`
  min-height: 100vh;
  width: 100%;
  padding: 50px 100px;
  background-image: url(${img});
  background-size: cover;
`

export default PageWrapper