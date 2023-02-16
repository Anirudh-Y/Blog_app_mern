import React from "react";
import {
  Button,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Table,
  styled,
} from "@mui/material";
import { Link, useSearchParams } from "react-router-dom";

import { categories } from "../../constants/data";

const StyledTable = styled(Table)`
  border: 1px solid rgba(224, 224, 224, 1);
`;

const StyledButton = styled(Button)`
  margin: 20px;
  width: 85%;
  background-color: #2b3a55;
  color: #fff;

  &:hover {
    background-color: #2b3a55cc;
  }
`;

const Categories = () => {
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category");

  return (
    <>
      <Link to={`/create/?category=${category || ""}`}>
        <StyledButton variant="contained">Create a Blog</StyledButton>
      </Link>
      <StyledTable>
        <TableHead>
          <TableRow>
            <TableCell>
              <Link to="/" style={{textDecoration: 'none', color: 'black'}}>All Categories</Link>
            </TableCell>
          </TableRow>
        </TableHead>

        {categories.map((category) => (
          <TableBody key={category.id}>
            <TableRow>
              <TableCell>
                <Link to={`/?category=${category.type}`} style={{textDecoration: 'none', color: 'black'}} >{category.type}</Link>
              </TableCell>
            </TableRow>
          </TableBody>
        ))}
      </StyledTable>
    </>
  );
};

export default Categories;
