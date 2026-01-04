import { Card, CardContent, Typography, Grid } from "@mui/material";
import React from 'react'

function Destination() {
  return (
   <Grid container spacing={3} padding={20}>
      <Grid >
        <Card elevation={3}>
          <CardContent>
            <Typography variant="h6">Total Destinations</Typography>
            <Typography variant="h4">128</Typography>
          </CardContent>
        </Card>
      </Grid>

      <Grid >
        <Card elevation={3}>
          <CardContent>
            <Typography variant="h6">Hotels</Typography>
            <Typography variant="h4">76</Typography>
          </CardContent>
        </Card>
      </Grid>

      <Grid >
        <Card elevation={3}>
          <CardContent>
            <Typography variant="h6">Bookings</Typography>
            <Typography variant="h4">342</Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

export default Destination
