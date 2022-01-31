import {
  makeStyles,
  Button,
  CircularProgress,
  Snackbar,
} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";

import { useUnstakeTokens } from "../../hooks";

interface UnstakeButtonProps {
  name: string;
  address: string;
}
export const UnstakeButton = ({ name, address }: UnstakeButtonProps) => {
  const { unstakeSend, unstakeState } = useUnstakeTokens();
  const classes = useStyles();

  const isMining = unstakeState.status === "Mining";

  return (
    <>
      <Button
        variant="contained"
        color="secondary"
        className={classes.unstakeButton}
        onClick={() => unstakeSend(address)}
      >
        {isMining ? (
          <CircularProgress className={classes.circular} size={26} />
        ) : (
          "Unstake"
        )}
      </Button>
      <Snackbar
        open={unstakeState.status === "Success"}
        autoHideDuration={3000}
      >
        <Alert severity="success">
          All the {name} tokens have been unstaked! Please check your balance in
          your metamask wallet.
        </Alert>
      </Snackbar>
    </>
  );
};

const useStyles = makeStyles((theme) => ({
  unstakeButton: {
    width: "100%",
  },
  circular: {
    color: "white",
  },
}));
