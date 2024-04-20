import styled from "styled-components";



const StyledHeader = styled.header`
  padding: var(--padding-sm);
  text-align: center;
  background-color: var(--color-bg-stronger);
  display: flex;
  flex-direction: column;
  justify-content: center;
`
export type HeaderProps = React.PropsWithChildren<{
  
}>

export const Header: React.FC<HeaderProps> = ({ children }) => {
  return (
    <StyledHeader>
      <h1>{children}</h1>
    </StyledHeader>
  )
}