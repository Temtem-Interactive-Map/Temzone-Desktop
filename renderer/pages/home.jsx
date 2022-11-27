import Grid from "@mui/material/Grid";
import dynamic from "next/dynamic";
import React from "react";

const Map = dynamic(() => import("../components/map/map"), {
  ssr: false,
});

export default function Home() {
  return (
    <Grid container spacing={0}>
      <Grid item xs={1} style={{ background: "#554433" }}>
        Menu
      </Grid>
      <Grid item xs={3} style={{ background: "#334433" }}>
        Accordion
      </Grid>
      <Grid item xs={8} style={{ height: "100vh", background: "#554433" }}>
        <Map />
      </Grid>
    </Grid>
  );
}
