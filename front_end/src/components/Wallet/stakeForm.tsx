import React, { useState, useEffect } from "react";

import { utils } from "ethers";
import { useEthers, useTokenBalance } from "@usedapp/core";
import { formatUnits } from "@ethersproject/units";
import { useNotifications } from "@usedapp/core";
import {
  Button,
  CircularProgress,
  Snackbar,
  Slider,
  makeStyles,
} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import DoneIcon from "@material-ui/icons/Done";

import { Token } from "../main";
import { useStakeTokens } from "../../hooks";

export interface StakeFormProps {
  token: Token;
}

export const StakeForm = ({ token }: StakeFormProps) => {
  const classes = useStyles();
  const [amount, setAmount] = useState<number>(0);
  const [isTokenApproved, setIsTokenApproved] = useState(false);
  const [isTokenStaked, setIsTokenStaked] = useState(false);

  const { address, name } = token;
  const { account } = useEthers();
  const tokenBalance = useTokenBalance(address.toString(), account);
  const formattedTokenBalance: number = tokenBalance
    ? parseFloat(formatUnits(tokenBalance, 18))
    : 0;
  const { notifications } = useNotifications();

  function handleInputChange(
    event: React.ChangeEvent<{}>,
    newValue: number | number[]
  ) {
    setAmount(newValue as number);
  }

  const { approveAndStake, state } = useStakeTokens(address);

  function handleStakeSubmit() {
    const amountAsWei = utils.parseEther(amount.toString());
    return approveAndStake(amountAsWei.toString());
  }

  function onSnackClose() {
    setIsTokenApproved(false);
    setIsTokenStaked(false);
  }

  useEffect(() => {
    if (
      notifications.filter(
        (notification) =>
          notification.type === "transactionSucceed" &&
          notification.transactionName === "Approve ERC20 transfer"
      ).length > 0
    ) {
      setIsTokenApproved(true);
    }
    if (
      notifications.filter(
        (notification) =>
          notification.type === "transactionSucceed" &&
          notification.transactionName === "Stake tokens"
      ).length > 0
    ) {
      setIsTokenStaked(true);
    }
  }, [notifications]);

  useEffect(() => {
    setAmount(0);
  }, [address]);

  const isMining = state.status === "Mining";

  return (
    <div className={classes.container}>
      {amount} / {formattedTokenBalance} {name}s
      <div className={classes.sliderBox}>
        <Slider
          value={amount}
          style={{ width: "12rem" }}
          step={
            formattedTokenBalance < 1
              ? 10 ** (-formattedTokenBalance.toString().length + 2)
              : 1
          }
          aria-label="Temperature"
          defaultValue={0}
          onChange={handleInputChange}
          min={0}
          max={formattedTokenBalance}
        />
        <br />
        <Button
          color="primary"
          size="large"
          onClick={handleStakeSubmit}
          disabled={isMining}
        >
          {isMining ? <CircularProgress size={26} /> : <DoneIcon />}
        </Button>
      </div>
      <Snackbar
        open={isTokenApproved}
        autoHideDuration={3000}
        onClose={onSnackClose}
      >
        <Alert severity="success">
          ERC-20 token transfer approved! Now approving the second
          transaction...
        </Alert>
      </Snackbar>
      <Snackbar
        open={isTokenStaked}
        autoHideDuration={3000}
        onClose={onSnackClose}
      >
        <Alert severity="success">The tokens have been staked!!</Alert>
      </Snackbar>
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
  },
  sliderBox: {
    justifyContent: "space-between",
    alignItems: "center",
    display: "flex",
  },
}));
