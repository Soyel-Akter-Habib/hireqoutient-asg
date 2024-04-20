import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from '@mui/material';


function App() {
  const API_URL = 'https://canopy-frontend-task.now.sh/api/holdings';

  const fetchHoldings = async () => {
    try {
      const response = await axios.get(API_URL);
      return response.data.payload;
    } catch (error) {
      console.error('Error fetching holdings:', error);
      return [];
    }
  };

  const [holdings, setHoldings] = useState([]);

  useEffect(() => {
    const getHoldings = async () => {
      const data = await fetchHoldings();
      setHoldings(data);
    };
    getHoldings();
  }, []);

  const holdingTypes = [...new Set(holdings.map((holding) => holding.asset_class))];

  return (
    <div className="root">
      <Typography variant="h1" style={{ marginBottom: '16px', textAlign: 'center' }}>
        Holdings Table
      </Typography>
      {holdingTypes.map((type, index) => (
        <Accordion key={index} style={{ border:'1px solid rgba(0,0,0,0.1)', boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)' }}>
          <AccordionSummary>
            <Typography >{type}</Typography>
          </AccordionSummary>
          <AccordionDetails style={{borderRadius:'10px', boxShadow:'0px 2px 4px grey', margin:'0px 15px 15px 15px'}}>
            <Table style={{ minWidth: '650px' }}>
              <TableHead >
                <TableRow>
                  <TableCell>NAME OF THE HOLDING</TableCell>
                  <TableCell>TICKER</TableCell>
                  <TableCell>AVERAGE PRICE</TableCell>
                  <TableCell>MARKET PRICE</TableCell>
                  <TableCell>LATEST CHANGE PERCENTAGE</TableCell>
                  <TableCell>MARKET VALUE IN BASE CCY</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {holdings
                  .filter((holding) => holding.asset_class === type)
                  .map((holding, index) => (
                    <TableRow key={index}>
                      <TableCell>{holding.name}</TableCell>
                      <TableCell>{holding.ticker}</TableCell>
                      <TableCell>{holding.avg_price}</TableCell>
                      <TableCell>{holding.market_price}</TableCell>
                      <TableCell>{holding.latest_chg_pct}</TableCell>
                      <TableCell>{holding.market_value_ccy}</TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
}

export default App;
