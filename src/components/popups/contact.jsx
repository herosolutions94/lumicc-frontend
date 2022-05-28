import React, { useEffect, Fragment, useState } from "react";
import { useLocation } from 'react-router-dom';
import { getData, getSiteImages, checkPattern, postData } from "../../helpers/api";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Contact(props) {
    const location = useLocation();
    const location_path = location.pathname;
    const current_page = location_path.split('/')[1];

    const [loading, setLoading] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [contact, setContact] = useState({
        name: '',
        email: '',
        phone: '',
        comments: ''
    });
    const [state, setState] = useState({

    });
    useEffect(() => {
        getData("home-page").then((data) => {
            setState({
                ...state,
                content: data.content,
            });
            setLoading(true);
        });
    }, []);
    function onSubmit() {

        if (contact.name_error === true || contact.name === '') {
            setContact({ ...contact, name_error: true, name_msg: "Required" });
        }
        else if (contact.email_error === true || contact.email === '') {
            setContact({ ...contact, email_error: true, email_error_msg: "Enter a valid email address" });
        }
        else if (contact.phone_error === true || contact.phone === '') {
            setContact({ ...contact, phone_error: true, phone_msg: "Enter a valid phone number" });
        }
        else if (contact.comment_error === true || contact.comments === '') {
            setContact({ ...contact, comment_error: true, comment_msg: "Required" });
        }
        else {
            setContact({ ...contact, btn_loading: true });
            var form_data = new FormData();

            for (var key in contact) {
                form_data.append('page_name', current_page);
                form_data.append(key, contact[key]);
            }
            postData("contact", form_data).then((data) => {
                console.log(data);
                if (data.status == 1) {
                    // document.getElementById("frmContact").reset();
                    setContact({ ...contact, btn_loading: false, email: "", name: '', phone: '', comments: '' });

                    document.getElementById("name").value = "";
                    document.getElementById("email").value = "";
                    document.getElementById("phone").value = "";
                    document.getElementById("comments").value = "";
                    toast.success(`${data.msg}`, {
                        position: "top-right",
                        autoClose: 1000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                }
                else {
                    setContact({ ...contact, btn_loading: false });
                    toast.error(`${data.msg}`, {
                        position: "top-right",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                }
            });
        }
    }
    function handleContactChange(e) {
        if (e.target.name === 'name') {
            if (e.target.value === "") {
                setContact({ ...contact, [e.target.name]: e.target.value, name_error: true, name_msg: "Required" });
            }
            else {
                setContact({ ...contact, [e.target.name]: e.target.value, name_error: false, name_msg: "" });
            }
        }
        if (e.target.name === 'phone') {
            if (e.target.value === "") {
                setContact({ ...contact, [e.target.name]: e.target.value, phone_error: true, phone_msg: "Required" });
            }
            else {
                if (e.target.value != null || e.target.value != 'null') {
                    let mobile_chk = checkPattern(e.target.value, /^[0-9\b]+$/);
                    if (mobile_chk === false) {
                        setContact({ ...contact, [e.target.name]: e.target.value, phone_error: true, phone_msg: "Invalid phone number" });
                    }
                    else {
                        setContact({ ...contact, [e.target.name]: e.target.value, phone_error: false, phone_msg: "" });
                    }
                }

            }
        }
        if (e.target.name === 'email') {

            let email_chk = checkPattern(e.target.value, /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/);

            if (email_chk === false) {
                if (e.target.value === '') {
                    setContact({ ...contact, email_error: false });
                }
                else {
                    setContact({ ...contact, [e.target.name]: e.target.value, email_error: true, email_error_msg: "Invalid e-mail address" });
                }

            }
            else {
                setContact({ ...contact, [e.target.name]: e.target.value, email_error: false, email_error_msg: "" });
            }

        }
        if (e.target.name === 'comments') {
            if (e.target.value === "") {
                setContact({ ...contact, [e.target.name]: e.target.value, comment_error: true, comment_msg: "Required" });
            }
            else {
                setContact({ ...contact, [e.target.name]: e.target.value, comment_error: false, comment_msg: "" });
            }
        }
    }
    if (loading === false) return <div id="loading" className="loadingFixed"> <img src={getSiteImages('/images/loading.gif')} alt="Loading" /></div>;
    return (
        <section className="popup" data-popup="contact" style={{ display: "block" }}>
            <ToastContainer />
            <div className="table_dv">
                <div className="table_cell">
                    <div className="contain">
                        <div className="_inner">
                            <button type="button" className="x_btn" onClick={props.closeContactPopup}></button>
                            <div dangerouslySetInnerHTML={{ __html: state.content.contact_detail }} />
                            <form method="post" onSubmit={handleSubmit(onSubmit)} id="frmContact">
                                <div className="form_row row">
                                    <div className="col-xs-12">
                                        <h6 className="require">Full Name</h6>
                                        <div className="form_blk">
                                            <input type="text" name="name" id="name" className="input" placeholder="eg: John Wick" onChange={handleContactChange} value={contact.name} />
                                            {
                                                (contact.name_error === true) ?
                                                    <p className="error">
                                                        <i className="fi-warning"></i> {contact.name_msg}
                                                    </p>
                                                    :
                                                    ""

                                            }
                                        </div>
                                    </div>
                                    <div className="col-xs-12">
                                        <h6 className="require">Email Address</h6>
                                        <div className="form_blk">
                                            <input type="text" name="email" id="email" className="input" placeholder="eg: sample@gmail.com" onChange={handleContactChange} value={contact.email} />
                                            {
                                                (contact.email_error === true) ?
                                                    <p className="error">
                                                        <i className="fi-warning"></i> {contact.email_error_msg}
                                                    </p>
                                                    :
                                                    ""

                                            }
                                        </div>
                                    </div>
                                    <div className="col-xs-12">
                                        <h6 className="require">Phone Number</h6>
                                        <div className="form_blk">
                                            <input type="text" name="phone" id="phone" className="input" placeholder="eg: 092 1234 567" onChange={handleContactChange} value={contact.phone} />
                                            {
                                                (contact.phone_error === true) ?
                                                    <p className="error">
                                                        <i className="fi-warning"></i> {contact.phone_msg}
                                                    </p>
                                                    :
                                                    ""

                                            }
                                        </div>
                                    </div>
                                    <div className="col-xs-12">
                                        <h6>Comments</h6>
                                        <div className="form_blk">
                                            <textarea name="comments" id="comments" className="input" placeholder="How can we help?" onChange={handleContactChange}></textarea>
                                            {
                                                (contact.comment_error === true) ?
                                                    <p className="error">
                                                        <i className="fi-warning"></i> {contact.comment_msg}
                                                    </p>
                                                    :
                                                    ""

                                            }
                                        </div>
                                    </div>
                                </div>
                                <div className="btn_blk form_btn text-center">
                                    <button className="site_btn lg long purple" disabled={(contact.btn_loading === true) ? 'disabled' : ''}>Submit {(contact.btn_loading === true) ? <i className="spinner"></i> : ''}</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
