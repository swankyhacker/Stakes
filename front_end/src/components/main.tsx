import React, { useState } from "react";
import { useEthers } from "@usedapp/core";
import { makeStyles, Snackbar } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";

import helperConfig from "../helper-config.json";

import { Header } from "./header";
import { SwiperCard } from "./swiperCard";

export type Token = {
  image: string;
  address: string;
  name: string;
};

export const Main = () => {
  const { chainId, account } = useEthers();
  const classes = useStyles();
  const networkName = chainId ? helperConfig[chainId] : "dev";

  return (
    <div className={classes.container}>
      <Header />
      <h2 className={classes.title}>Stakes</h2>
      <br />
      <br />
      {account !== undefined ? (
        <SwiperCard />
      ) : (
        <div className={classes.warning}>
          <img
            src="https://cdn.consensys.net/uploads/metamask-1.svg"
            alt="metamask_logo"
          />
          <p className={classes.warningText}>
            Please connect your metamask account !!!
          </p>
        </div>
      )}
      <Snackbar
        open={networkName === "kovan" ? false : true}
        autoHideDuration={6000}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert severity="error">Please switch to the Kovan testnet!</Alert>
      </Snackbar>
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  container: {
    height: "100%",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
  },
  title: {
    color: theme.palette.common.white,
    textAlign: "center",
    fontFamily: "Aquire",
    fontSize: "80px",
    letterSpacing: "30px",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    overflow: "hidden",
    marginTop: "0px",
    marginBottom: 0,
    // textShadow: "6px 4px rgba(256,256,256,0.2)",
  },
  warning: {
    margin: "auto auto",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  warningText: {
    color: "white",
    textAlign: "center",
    fontSize: "16px",
    fontWeight: "bold",
  },
}));
