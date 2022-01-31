import React from "react";
import { useEthers } from "@usedapp/core";
import { Button, makeStyles } from "@material-ui/core";

export const Header = () => {
  const classes = useStyles();
  const { account, activateBrowserWallet, deactivate } = useEthers();
  const isConnected = account !== undefined;
  return (
    <div className={classes.container}>
      <div>
        {isConnected ? (
          <Button color="secondary" variant="outlined" onClick={deactivate}>
            Disconnect
          </Button>
        ) : (
          <Button
            color="secondary"
            variant="outlined"
            onClick={() => activateBrowserWallet()}
          >
            Connect
          </Button>
        )}
      </div>
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(2),
    display: "flex",
    justifyContent: "flex-end",
  },
}));
