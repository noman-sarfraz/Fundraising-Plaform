import styled from "styled-components";

const StyledFileInput = styled.input.attrs((props) => ({
  type: "file",
}))`
  border: 1px solid #c4c4c4;
  border-radius: 1px;
  /* height: 25px; */
  padding: 4px 4px;
  font-size: 14px;
  width: 98%;
  font-family: Poppins;
`;

export default StyledFileInput;