import React from 'react'
import Add from './Add'
import { Container, InputBase, Stack, styled } from '@mui/material'

function Searchbar() {

    const Search = styled("div")(({ theme }) => ({
        backgroundColor: "white",
        padding: "0 10px",
        borderRadius: theme.shape.borderRadius,
        width: "70%",
      }));
    return (
      <Container sx={{ position: "sticky" }}> 
        <Stack
            direction="row"
            spacing={2}
            justifyContent="space-evenly"
            alignItems="center"
            bgcolor={"background.primary"}
            >
            <Search sx={{ border: "1px solid #cccccc" }}>
              <InputBase sx={{ width: "100%" }} placeholder="search..." />
            </Search>
            <Add />
        </Stack>
     </Container>
  )
}

export default Searchbar