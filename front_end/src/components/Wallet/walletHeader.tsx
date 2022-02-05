import { makeStyles, Tooltip } from "@material-ui/core";
import { useTokenBalance, useEthers } from "@usedapp/core";
import { formatUnits } from "@ethersproject/units";

import Lock from "../../images/lock.png";
import { Token } from "../main";
import { useContract } from "../../hooks";
import { WalletInfo } from "./walletInfo";

interface WalletHeaderProps {
  token: Token;
}
export const WalletHeader = ({ token }: WalletHeaderProps) => {
  const classes = useStyles();
  const { account } = useEthers();
  const { useStakedBalance } = useContract();

  const stakedBalance = useStakedBalance(token.address);
  const tokenBalance = useTokenBalance(token.address.toString(), account);
  const formattedTokenBalance: number = tokenBalance
    ? parseFloat(formatUnits(tokenBalance, 18))
    : 0;

  return (
    <div className={classes.header}>
      <div className={classes.walletInfo}>
        <span className={classes.headerTitle}>Wallet Balance</span>
        <WalletInfo />
      </div>
      <div className={classes.balances}>
        <div className={classes.balanceContainer}>
          <img src={token.image} alt="Eth" className={classes.logo} />
          <span className={classes.balance}>{formattedTokenBalance}</span>
        </div>
        <div
          className={`${classes.balanceContainer} ${classes.balanceContainer2}`}
        >
          <img src={Lock} alt="Eth" className={classes.lockLogo} />
          <span className={classes.balance}>
            {stakedBalance ? stakedBalance : 0}
          </span>
        </div>
      </div>
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    borderBottom: "0.5px solid grey",
    borderRadius: "2px",
    paddingBottom: "5px",
  },
  walletInfo: {
    display: "flex",
    alignItems: "center",
  },
  headerTitle: {
    color: "white",
    marginRight: "3px",
  },
  balances: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    width: "50%",
  },
  balanceContainer: {
    display: "flex",
    alignItems: "center",
    marginRight: "18px",
  },
  balanceContainer2: {
    marginRight: 0,
  },
  balance: {
    color: "white",
    fontWeight: "bolder",
  },
  logo: {
    width: "30px",
    marginRight: "5px",
  },
  lockLogo: {
    width: "20px",
    marginRight: "10px",
  },
}));
