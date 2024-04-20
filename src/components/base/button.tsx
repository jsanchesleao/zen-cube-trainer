import styled from "styled-components";
import { theme } from "./theme";

const Button = styled.button`

  --bg-color: var(--color-primary-600);
  --bg-hover-color: var(--color-primary-700);
  --border-color: var(--color-primary-500);

  padding: var(--padding-md) var(--padding-lg);
  border-radius: ${theme.fontSize.md};
  font-size: ${theme.fontSize.lg};

  background-color: var(--bg-color);
  color: var(--color-fg);
  border: 1px solid var(--border-color);

  cursor: pointer;

  &:hover {
    background-color: var(--bg-hover-color);
  }

  &[data-variant=success] {
    --bg-color: var(--color-success-600);
    --bg-hover-color: var(--color-success-700);
    --border-color: var(--color-success-500); 
  }

  &[data-variant=warning] {
    --bg-color: var(--color-warning-600);
    --bg-hover-color: var(--color-warning-700);
    --border-color: var(--color-warning-500); 
  }

  &[data-variant=danger] {
    --bg-color: var(--color-danger-600);
    --bg-hover-color: var(--color-danger-700);
    --border-color: var(--color-danger-500); 
  }
`

export default Button;