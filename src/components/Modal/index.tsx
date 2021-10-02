import * as React from "react";
//components
import Button from "@mui/material/Button";
import Dialog, { DialogProps } from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
//types
import { CartItemType } from "../FetchQueryAndTypes/Types";
//styles
import { Wrapper, StyledButton } from "./Modal.styles";

type Props = {
  item: CartItemType;
};

const ScrollDialog: React.FC<Props> = ({ item }) => {
  const [open, setOpen] = React.useState(false);
  const [scroll, setScroll] = React.useState<DialogProps["scroll"]>("paper");

  const handleClickOpen = (scrollType: DialogProps["scroll"]) => () => {
    setOpen(true);
    setScroll(scrollType);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const descriptionElementRef = React.useRef<HTMLElement>(null);
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  return (
    <div>
      <StyledButton>
        <Button onClick={handleClickOpen("paper")}>Подробнее</Button>
      </StyledButton>
      <Dialog
        open={open}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">{item.title}</DialogTitle>
        <DialogContent dividers={scroll === "paper"}>
          <DialogContentText
            id="scroll-dialog-description"
            ref={descriptionElementRef}
            tabIndex={-1}
          >
            <Wrapper>
              <div className="image_product">
                <img src={item.image} alt={item.title} />
              </div>
              <div className="tittle">
                <h3>{item.title}</h3>
              </div>
              <div className="description">
                <p>{item.description}</p>
              </div>
              <div className="price">
                <h3>${item.price}</h3>
              </div>
            </Wrapper>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Закрыть</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ScrollDialog;
