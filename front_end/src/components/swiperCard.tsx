import { useState } from "react";
import { makeStyles, IconButton } from "@material-ui/core";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";

import { YourWallet } from "./Wallet/yourWallet";
import { useTokens } from "../hooks/useTokens";

export const SwiperCard = () => {
  const [selectedToken, setSelectedToken] = useState<number>(0);
  const classes = useStyles();
  const supportedTokens = useTokens();

  return (
    <div className={classes.wrapper}>
      <IconButton
        onClick={() => {
          setSelectedToken((token) => {
            return (token - 1) % 3;
          });
        }}
      >
        <ArrowBackIosIcon className={classes.icon} />
      </IconButton>
      <YourWallet token={supportedTokens[Math.abs(selectedToken)]} />
      <IconButton
        onClick={() => {
          setSelectedToken((token) => {
            return (token + 1) % 3;
          });
        }}
      >
        <ArrowForwardIosIcon className={classes.icon} />
      </IconButton>
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  wrapper: {
    width: "80%",
    margin: "0 auto",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  icon: {
    width: "62px",
    color: "white",
    height: "50px",
  },
}));
