import React, { useState } from 'react'
import ImageGrid from "./ImageGrid";
import UploadForm from "./UploadForm";
import Modal from "./Modal";
import firebase from "firebase";
import Intro from './Intro';

export default function HomePage() {
    const [selectedImg, setSelectedImg] = useState(null);

    const handleClick = () => {
        firebase.auth().signOut();
    }
    return (
        <>
            <nav className="navbar  navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <a className="navbar-brand" href="/">Photos Drive App</a>
                    <button className="btn btn-primary me-md-2" onClick={handleClick}>Logout</button>
                </div>
            </nav>
            <div className="container">
                <Intro />
                <UploadForm />
                <ImageGrid setSelectedImg={setSelectedImg} />
                {selectedImg && <Modal selectedImg={selectedImg} setSelectedImg={setSelectedImg} />}
            </div>
        </>
    )
}
