import React, { useState } from 'react'
import { Box, Grid, Paper, TextField, Typography } from '@material-ui/core';
import data from './resources/names';
import NameTable from './nameTable';



export const FrontPage = () => {

    const names = data.names;
    var total = 0;

    const countTotal = () => {
        for (var i = 0; i < names.length; i++) {
            total += names[i].amount;
        }
    }

    countTotal();

    const [amountText, setAmountText] = useState("Total amount: " + total);

    // change amountText to the search result and return back the total amount if search is empty
    const searchName = (search) => {
        if (search !== "") {

            var found = -1;

            for (var i = 0; i < names.length; i++) {
                if (names[i].name.toUpperCase() === search.toUpperCase()) {
                    found = i;
                }
            }
            if (found === -1) {
                setAmountText("Nothing found");
            }
            else {
                setAmountText("Amount: " + names[found].amount);
            }
        }
        else {
            setAmountText("");
        }
        // check if search is empty or contains only spaces
        if (!search.replace(/\s/g, '').length) {
            setAmountText("Total amount: " + total);
        }
    }


    return (
        <Box display="flex" justifyContent="center" p={1}>
            <Box width="35%">
                <Paper>
                    <Box display="flex" justifyContent="center" pt={3}>

                        <Typography variant="h2">Name Application</Typography>
                    </Box>
                    <Box display="flex" justifyContent="center" p={1}>

                        <Grid container>
                            <Grid container item sm={12} align="center">
                                <Box display="flex" p={2}>
                                    <Typography variant="caption">The application is used to view and sort the most popular first names of Solita employees.
                                    The name data is stored in a json file. Click the header titles of the table to choose how the data is sorted.
                                    </Typography>
                                </Box>
                            </Grid>
                            <Grid container item sm={6}>
                                <TextField variant="outlined" label="Search" size="small" onChange={(event) => searchName(event.target.value)} />
                            </Grid>

                            <Grid container item sm={6} alignItems="center" justify="flex-end">
                                <Typography variant="subtitle2">{amountText}</Typography>
                            </Grid>
                        </Grid>
                    </Box>

                    <NameTable
                        names={names}
                    />
                </Paper>
            </Box>
        </Box>

    );
};