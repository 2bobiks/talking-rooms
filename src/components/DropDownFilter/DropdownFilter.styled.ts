import styled from "@emotion/styled";
import { AppTheme } from "../../theme/theme.ts";

export const dropdownFilterStyled = (theme: AppTheme) => {
  return {
    gap: "26px",
    fontWeight: 400,
    fontSize: "0.84em",
    color: theme.palette.colors.textColor.secondary,
    border: `1px solid ${theme.palette.colors.borderColor}`,
    borderRadius: "10px",
    padding: "8px",
    paddingRight: "12px",
  };
};

export const dropdownAllElements = "color: #222222 backgroundColor: #FFFFFF";

export const DropdownWrapper = styled.div`
  gap: 6px;
  font-weight: 400;
  color: ${({ theme }) => theme.palette.colors.textColor.primary};
  font-size: 0.86em;
  padding: 8px;
  background-color: ${({ theme }) => theme.palette.colors.dropdownBackground};

  &:hover {
    border: 1px solid #64acff;
  }
`;
