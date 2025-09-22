"use client";

import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
} from "@mui/material";
import axios from "axios";

const EnergySalesTable = () => {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await axios.get("http://localhost:4000/energysales");

      const formattedData = response.data.energysold.map((item) => ({
        id: item.id,
        energy: item.energy,
        unit_price: item.unit_price,
        total_cost: item.total_cost,
        timestamp: new Date(item.timestamp).toLocaleDateString(),
      }));

      setRows(formattedData);
    } catch (err) {
      setError("Failed to fetch data");
      console.error("Fetch error:", err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleChangePage = (_event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Paper sx={{ width: 400, overflow: "hidden" }}>
      <TableContainer sx={{ width: '80%', margin: 'auto' }}>
        <Table aria-label="energy sales table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell align="right">Energy (kWh)</TableCell>
              <TableCell align="right">Unit Price ($/kWh)</TableCell>
              <TableCell align="right">Total Cost ($)</TableCell>
              <TableCell align="right">Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  Loading...
                </TableCell>
              </TableRow>
            ) : error ? (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  {error}
                </TableCell>
              </TableRow>
            ) : (
              rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => (
                  <TableRow key={row.id}>
                    <TableCell>{row.id}</TableCell>
                    <TableCell align="right">{row.energy}</TableCell>
                    <TableCell align="right">
                      {row.unit_price != null
                        ? row.unit_price.toFixed(2)
                        : "N/A"}
                    </TableCell>
                    <TableCell align="right">
                      {row.total_cost != null
                        ? row.total_cost.toFixed(2)
                        : "N/A"}
                    </TableCell>
                    <TableCell align="right">{row.timestamp}</TableCell>
                  </TableRow>
                ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        count={rows.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[5, 10, 15]}
      />
    </Paper>
  );
};

export default EnergySalesTable;
