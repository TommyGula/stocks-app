import { Button, Modal } from 'react-bootstrap';
import { useHistory } from 'react-router';

const AlertModal = (props) => {
  const history = useHistory();
  const { show, setShow, title, message, acceptPath } = props
  //   const [show, setShow] = useState(false)

  const handleAccept = () => {
    if (acceptPath) {
      history.push(acceptPath)
    }
    handleClose()
  }
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{message}</Modal.Body>
        <Modal.Footer>
          <Button variant="info" onClick={handleAccept}>
            Aceptar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default AlertModal