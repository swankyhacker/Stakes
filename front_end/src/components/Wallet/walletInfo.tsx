import { useState, useEffect } from "react";
import { makeStyles, Tooltip } from "@material-ui/core";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import { useTokenBalance, useEthers } from "@usedapp/core";
import { formatUnits } from "@ethersproject/units";

import { useTokens } from "../../hooks/useTokens";
import { useContract } from "../../hooks";
import { Token } from "../main";

export const WalletInfo = () => {
  const classes = useStyles();
  return (
    <Tooltip
      title={<CustomTooltip />}
      arrow
      classes={{
        tooltip: classes.customTooltip,
        arrow: classes.customArrow,
      }}
      placement="right-start"
    >
      <InfoOutlinedIcon className={classes.infoIcon}></InfoOutlinedIcon>
    </Tooltip>
  );
};

const CustomTooltip = () => {
  const classes = useStyles();
  const tokenList = useTokens();

  return (
    <>
      <div className={classes.container}>
        <p className={classes.assets}>Assets</p>
        {tokenList.map((token) => (
          <AssetTile token={token} />
        ))}
      </div>
      <div className={classes.container}>
        <p className={classes.assets}>Staked</p>
        {tokenList.map((token) => (
          <StakedTile token={token} />
        ))}
      </div>
    </>
  );
};

interface AssetTileProps {
  token: Token;
}

const AssetTile = ({ token }: AssetTileProps) => {
  const classes = useStyles();
  const { useTokenValue } = useContract();
  const { account } = useEthers();
  const tokenValue: number = +useTokenValue(token.address);
  const tokenBalance = useTokenBalance(token.address.toString(), account);
  const formattedTokenBalance: number = tokenBalance
    ? parseFloat(formatUnits(tokenBalance, 18))
    : 0;

  return (
    <>
      <div className={classes.item}>
        <div className={classes.token}>
          <img className={classes.image} src={token.image} alt="" />
          <span className={classes.name}>{token.name}</span>{" "}
        </div>
        <div className={classes.balanceContainer}>
          <span className={classes.tokenBalance}>{formattedTokenBalance}</span>
          <span className={classes.tokenValue}>
            (${(formattedTokenBalance * tokenValue).toFixed(2)})
          </span>
        </div>
      </div>
      <br />
    </>
  );
};

interface StakedTileProps {
  token: Token;
}

const StakedTile = ({ token }: StakedTileProps) => {
  const classes = useStyles();
  const { useTokenValue, useStakedBalance } = useContract();
  const tokenValue: number = +useTokenValue(token.address);
  const tokenBalance = useStakedBalance(token.address.toString());

  return (
    <>
      {tokenBalance > 0 ? (
        <>
          <div className={classes.item}>
            <div className={classes.token}>
              <img className={classes.image} src={token.image} alt="" />
              <span className={classes.name}>{token.name}</span>{" "}
            </div>
            <div className={classes.balanceContainer}>
              <span className={classes.tokenBalance}>{tokenBalance}</span>
              <span className={classes.tokenValue}>
                (${(tokenBalance * tokenValue).toFixed(2)})
              </span>
            </div>
          </div>
          <br />
        </>
      ) : null}
    </>
  );
};

const useStyles = makeStyles((theme) => ({
  infoIcon: {
    height: "15px",
    color: "white",
    "&:hover": {
      color: "black",
    },
  },
  customTooltip: {
    backgroundColor: "rgba(0,0,0,0.9)",
  },
  customArrow: {
    color: "black",
  },
  container: {
    width: 200,
    padding: "0px 5px",
  },
  assets: {
    color: "grey",
    borderBottom: "1px solid grey",
    fontWeight: "bold",
    paddingLeft: "2px",
  },
  item: {
    display: "flex",
    justifyContent: "space-between",
  },
  token: {
    display: "flex",
    width: "35%",
    justifyContent: "start",
    alignItems: "center",
  },
  image: {
    height: 30,
    marginRight: 6,
  },
  name: {
    color: "white",
    fontWeight: "bolder",
    fontSize: 12,
  },
  balanceContainer: {
    display: "flex",
    alignItems: "center",
    width: "45%",
    justifyContent: "flex-end",
  },
  tokenBalance: {
    fontWeight: "bold",
    color: "#158533",
    fontSize: 12,
    marginRight: "4px",
  },
  tokenValue: {
    fontWeight: "bold",
    color: "cyan",
    fontSize: 12,
  },
}));
