import { useState } from "react";
import { makeStyles, Button } from "@material-ui/core";
import Collapse from "@material-ui/core/Collapse";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";

import { Token } from "../main";
import { StakeForm } from "./stakeForm";

interface StakeButtonProps {
  token: Token;
}
export const StakeButton = ({ token }: StakeButtonProps) => {
  const [expanded, setExpanded] = useState(false);
  const classes = useStyles();

  function handleExpandClick() {
    setExpanded(!expanded);
  }

  return (
    <>
      <Button
        variant="contained"
        className={classes.stakeButton}
        onClick={handleExpandClick}
      >
        Stake
        {expanded ? (
          <ExpandLessIcon className={classes.expandIcon} />
        ) : (
          <ExpandMoreIcon className={classes.expandIcon} />
        )}
      </Button>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <br />
        <StakeForm token={token} />
      </Collapse>
    </>
  );
};

const useStyles = makeStyles((theme) => ({
  stakeButton: {
    width: "100%",
    background: "green",
    borderColor: "green",
    color: "white",
    position: "relative",
    justifyContent: "center",
    "&:hover": {
      background: "#1B5E20",
    },
  },
  expandIcon: {
    marginLeft: "auto",
    position: "absolute",
    top: "auto",
    right: 0,
  },
}));
