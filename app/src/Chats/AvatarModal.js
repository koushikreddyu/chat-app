import React from 'react'
import { Modal, Container, Row, Col, Image } from 'react-bootstrap';

import img1 from '../assets/1.png'
import img2 from '../assets/2.png'
import img3 from '../assets/3.png'
import img4 from '../assets/4.png'
import img5 from '../assets/5.png'

const imagesArr = [img1, img2, img3, img4, img5]

function AvatarModal(props) {
    // const [show, setShow] = useState(false);

    // const handleClose = () => setShow(false);

    const handleClick = (i) => {
        props.avatarClicked(i+1)
    }

    return (
        <>
            <Modal show={props.showModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Choose Avatar</Modal.Title>
                </Modal.Header>

                <Container>
                    <Row>
                        {imagesArr.map((img, i) => {
                            return (
                                <div className="image-container" onClick={() => handleClick(i)} key={i}>
                                    <img className="rounded-image" src={img} />
                                </div>
                            )
                        })}
                        
                    </Row>
                </Container>
            </Modal>
        </>
    );
}

export default AvatarModal