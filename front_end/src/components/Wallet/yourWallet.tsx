import { makeStyles, Button } from "@material-ui/core";

import { Token } from "../main";
import { WalletHeader } from "./walletHeader";
import { StakeButton } from "./stakeButton";
import { UnstakeButton } from "./unstakeButton";

interface YourWalletProps {
  token: Token;
}

export const YourWallet = ({ token }: YourWalletProps) => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <WalletHeader token={token} />
      <br />
      <img className={classes.bigLogo} alt="token_logo" src={token.image} />
      <p className={classes.tokenName}>{token.name}</p>
      <StakeButton token={token} />
      <br />
      <UnstakeButton name={token.name} address={token.address} />
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "300px",
    margin: "0 auto",
    // backgroundColor: "#485461",
    // backgroundImage: "linear-gradient(315deg, #28313b 00%, #485461 100%)",
    background:
      "linear-gradient(315deg, rgba(40, 49, 59,0.2),rgba(72, 84, 97,0.5))",
    borderRadius: "15px",
    padding: "16px",
  },
  bigLogo: {
    width: "220px",
    height: "220px",
    border: "0.5px solid grey",
    borderRadius: "50%",
  },
  tokenName: {
    color: "white",
    fontSize: "30px",
    fontWeight: "bolder",
  },
}));
