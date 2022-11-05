import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import DefaultUserPic from '../../assets/img/team-male.jpg';
import './index.css';
import { getAccountProfileRequest } from '../../api/requests';

const UserProfile = () => {
    const { id } = useParams();
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        getAccountProfileRequest(id)
            .then(({ data }) => {
                setLoading(false);
                setUser(data);
            })
            .catch((error) => {
                setLoading(false);
                console.log(error);
            });
    }, [id]);

    const Loading = () => {
        return <>Loading.....</>;
    };

    const ShowProfile = () => {
        return (
            <>
                <Container className="body-profile">
                    <Row>
                        <>
                            <Col>
                                <img src={DefaultUserPic} alt="profils pic" />
                                <Form.Control className="profileImage" type="file" name="profileImage" />
                                <Button className="btn-profile" variant="primary">
                                    Update Profile
                                </Button>
                            </Col>

                            <Col className="col-profile" key={user.profileId}>
                                <h1 className="text-title">User Profile</h1>
                                <div className="txt-profile">Name: {user.name}</div>
                                <div className="txt-profile">Email: {user.email}</div>
                                <div className="txt-profile">Date Of Birth : {user.dob}</div>
                                <div className="txt-profile">Số diện thoại: {user.phone}</div>
                                <div className="txt-profile">Địa chỉ: {user.address}</div>
                                <div className="txt-profile">Chiều cao: {user.high}</div>
                            </Col>
                        </>
                    </Row>
                </Container>
            </>
        );
    };

    return (
        <>
            <div className="container">
                <div className="row">{loading ? <Loading /> : <ShowProfile />}</div>
            </div>
        </>
    );
};

export default UserProfile;
