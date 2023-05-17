import classes from "./Modal.module.css";
import ReactDOM from "react-dom";
const portalElement = document.getElementById("overlays");

function Backdrop(params) {
  return <div className={classes.backdrop} onClick={params.onClose}></div>;
}
function ModalOverlay(params) {
  return (
    <div className={classes.modal}>
      <div className={classes.content}>{params.children}</div>
    </div>
  );
}
export default function Modal(params) {
  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop onClose={params.onClose} />,
        portalElement
      )}
      {ReactDOM.createPortal(
        <ModalOverlay>{params.children}</ModalOverlay>,
        portalElement
      )}
    </>
  );
}
