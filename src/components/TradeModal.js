import { Button, Modal, Form } from 'react-bootstrap';
import { useHistory } from 'react-router';
import { useState, useContext } from 'react';
import firebase from '../Config/Firebase';
import UserContext from '../Context/UserContext';
import AlertModal from './AlertModal';

const footerStyle = {
  display:"flex",
  justifyContent:"center"
}

const TradeModal = (props) => {
  const history = useHistory();
  const [showReport, setShowReport] = useState(false);
  const { price, ticker, show, setShow, title } = props;
  const context = useContext(UserContext);
  const [form, setForm] = useState({ticker:ticker, price:price, quantity:0, total:0});
  const [user, setUser] = useState(context.userInfo);
  const [message, setMessage] = useState({});
  const [loading, setLoading] = useState(false);

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)
  
  const handleChange = (e) => {
    setForm({...form, quantity:e.target.value, total:form.price * e.target.value})
    setUser({...user, cash:user.cash - form.total});
  }

  const handleBuy = async () => {
    setLoading(true);
    try {
      await firebase.db.doc('users/' + context.userInfo.userId)
      .set(user, {merge: true})
      await firebase.db.collection('trades')
      .add({
        userId:context.userInfo.userId,
        operation:"buy",
        ticker:ticker,
        price:price,
        quantity:form.quantity,
        total:form.total
      });
      setMessage({title:"Successfull trade", text:`You have just bougth ${form.quantity} ${ticker} stocks!`});
      setLoading(false);
      handleClose();
      setShowReport(true);
    } catch (e) {
      console.log(e);
      setMessage({title:"Error", text:"An error ocurred during the operation"});
      setLoading(false);
      handleClose();
      setShowReport(true);
    }
  }

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <div className="up">
              <Form.Group className="mb-3">
                <Form.Label>Ticker</Form.Label>
                <Form.Select aria-label="Default select example">
                  <option value={ticker}>{ticker}</option>
                </Form.Select>
              </Form.Group>
              <Form.Group>
                <Form.Label>Price</Form.Label>
                <Form.Control type="number" disabled value={price} placeholder={price} />
              </Form.Group>
              <Form.Group>
                <Form.Label>Quantity</Form.Label>
                <Form.Control type="number" onChange={handleChange}/>
              </Form.Group>
              <Form.Group>
                <Form.Label>Total</Form.Label>
                <Form.Control type="number" disabled value={price * (form.quantity || 0)} placeholder={price * (form.quantity || 0)} />
              </Form.Group>
            </div>
          </Form>
        </Modal.Body>
        <Modal.Footer style={footerStyle}>
          <Button variant="success" onClick={handleBuy}>
            BUY
          </Button>
          <Button variant="danger" onClick={handleClose}>
            SELL
          </Button>
        </Modal.Footer>
        <AlertModal
          show={showReport}
          setShow={setShowReport}
          title={message.title}
          message={message.text}
        />
      </Modal>
    </>
  )
}

export default TradeModal;