import React, { useState } from 'react'
import {
    withStyles, Table, TableBody, TableCell,
    TableContainer, TableHead, TableRow, TableSortLabel,
    TablePagination
} from '@material-ui/core';



const NameTable = (props) => {

    const { names } = props;

    const StyledTableCell = withStyles((theme) => ({
        head: {
            backgroundColor: '#0f9dc3',
            color: theme.palette.common.white,
        },
    }))(TableCell);

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [orderBy, setOrderBy] = useState("amount");

    // sort list in alphabetical order or by amount depending on the state of orderBy
    const sortNames = () => {
        if (orderBy === "name") {
            names.sort((a, b) => (a.name.localeCompare(b.name)));
        }
        else {
            names.sort((a, b) => (b.amount - a.amount || a.name.localeCompare(b.name)));
        }
    }

    // switch orderBy when user wants to sort the table
    const handleSort = () => {
        if (orderBy === "name") {
            setOrderBy("amount");
        }
        else {
            setOrderBy("name");
        }
    }

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(event.target.value);
        setPage(0);
    };

    sortNames();


    return (
        <div>
            <TableContainer>
                <Table stickyHeader>
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>
                                <TableSortLabel
                                    active={orderBy === "name"}
                                    onClick={handleSort}>
                                    Name
                                </TableSortLabel>
                            </StyledTableCell>
                            <StyledTableCell align="right">
                                <TableSortLabel
                                    active={orderBy === "amount"}
                                    onClick={handleSort}>
                                    Amount
                                </TableSortLabel>
                            </StyledTableCell>
                        </TableRow>

                    </TableHead>
                    <TableBody>
                        {names
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((s, i) => (
                                <TableRow key={i}>
                                    <TableCell component="th" scope="row">
                                        {s.name}
                                    </TableCell>
                                    <TableCell align="right">{s.amount}</TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10, 20]}
                component="div"
                count={names.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
            />
        </div>
    );
};

export default NameTable;
