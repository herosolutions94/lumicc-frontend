import React, { useEffect, Fragment, useState } from "react";
import { getData, getSiteImages, checkPattern, postData } from "../../helpers/api";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Publisher(props) {
    const [loading, setLoading] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [state, setState] = useState({

    });
    const [publisher, setPublisher] = useState({
        name: '',
        email: '',
        phone: '',
        comments: ''
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
    function onPublisherSubmit() {

        if (publisher.name_error === true || publisher.name === '') {
            setPublisher({ ...publisher, name_error: true, name_msg: "Required" });
        }
        else if (publisher.email_error === true || publisher.email === '') {
            setPublisher({ ...publisher, email_error: true, email_error_msg: "Enter a valid email address" });
        }
        else if (publisher.phone_error === true || publisher.phone === '') {
            setPublisher({ ...publisher, phone_error: true, phone_msg: "Enter a valid phone number" });
        }
        else if (publisher.comment_error === true || publisher.comments === '') {
            setPublisher({ ...publisher, comment_error: true, comment_msg: "Required" });
        }
        else {
            setPublisher({ ...publisher, btn_loading: true });
            var form_data = new FormData();

            for (var key in publisher) {
                form_data.append(key, publisher[key]);
            }
            postData("publisher", form_data).then((data) => {
                console.log(data);
                if (data.status == 1) {
                    document.getElementById("frmPublisher").reset();
                    setPublisher({ ...publisher, btn_loading: false, email: "", name: '', phone: '', comments: null });
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
                    setPublisher({ ...publisher, btn_loading: false });
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


    function handlePublisherChange(e) {
        if (e.target.name === 'name') {
            if (e.target.value === "") {
                setPublisher({ ...publisher, [e.target.name]: e.target.value, name_error: true, name_msg: "Required" });
            }
            else {
                setPublisher({ ...publisher, [e.target.name]: e.target.value, name_error: false, name_msg: "" });
            }
        }
        if (e.target.name === 'phone') {
            if (e.target.value === "") {
                setPublisher({ ...publisher, [e.target.name]: e.target.value, phone_error: true, phone_msg: "Required" });
            }
            else {
                if (e.target.value != null || e.target.value != 'null') {
                    let mobile_chk = checkPattern(e.target.value, /^[0-9\b]+$/);
                    if (mobile_chk === false) {
                        setPublisher({ ...publisher, [e.target.name]: e.target.value, phone_error: true, phone_msg: "Invalid phone number" });
                    }
                    else {
                        setPublisher({ ...publisher, [e.target.name]: e.target.value, phone_error: false, phone_msg: "" });
                    }
                }

            }
        }
        if (e.target.name === 'email') {

            let email_chk = checkPattern(e.target.value, /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/);

            if (email_chk === false) {
                if (e.target.value === '') {
                    setPublisher({ ...publisher, email_error: false });
                }
                else {
                    setPublisher({ ...publisher, [e.target.name]: e.target.value, email_error: true, email_error_msg: "Invalid e-mail address" });
                }

            }
            else {
                setPublisher({ ...publisher, [e.target.name]: e.target.value, email_error: false, email_error_msg: "" });
            }

        }
        if (e.target.name === 'comments') {
            if (e.target.value === "") {
                setPublisher({ ...publisher, [e.target.name]: e.target.value, comment_error: true, comment_msg: "Required" });
            }
            else {
                setPublisher({ ...publisher, [e.target.name]: e.target.value, comment_error: false, comment_msg: "" });
            }
        }
    }
    if (loading === false) return '';
    return (
        <section className="popup" data-popup="become" style={{ display: "block" }}>
            <ToastContainer />
            <div className="table_dv">
                <div className="table_cell">
                    <div className="contain">
                        <div className="_inner">
                            <button type="button" className="x_btn" onClick={props.closePublisherPopup}></button>
                            <div dangerouslySetInnerHTML={{ __html: state.content.publisher_detail }} />
                            <form method="post" onSubmit={handleSubmit(onPublisherSubmit)} id="frmPublisher">
                                <div className="form_row row">
                                    <div className="col-xs-12">
                                        <h6 className="require">Full Name</h6>
                                        <div className="form_blk">
                                            <input type="text" name="name" id="name" className="input" placeholder="eg: John Wick" onChange={handlePublisherChange} />
                                            {
                                                (publisher.name_error === true) ?
                                                    <p className="error">
                                                        <i className="fi-warning"></i> {publisher.name_msg}
                                                    </p>
                                                    :
                                                    ""

                                            }
                                        </div>
                                    </div>
                                    <div className="col-xs-12">
                                        <h6 className="require">Email Address</h6>
                                        <div className="form_blk">
                                            <input type="text" name="email" id="email" className="input" placeholder="eg: sample@gmail.com" onChange={handlePublisherChange} />
                                            {
                                                (publisher.email_error === true) ?
                                                    <p className="error">
                                                        <i className="fi-warning"></i> {publisher.email_error_msg}
                                                    </p>
                                                    :
                                                    ""

                                            }
                                        </div>
                                    </div>
                                    <div className="col-xs-12">
                                        <h6 className="require">Phone Number</h6>
                                        <div className="form_blk">
                                            <input type="text" name="phone" id="phone" className="input" placeholder="eg: 092 1234 567" onChange={handlePublisherChange} />
                                            {
                                                (publisher.phone_error === true) ?
                                                    <p className="error">
                                                        <i className="fi-warning"></i> {publisher.phone_msg}
                                                    </p>
                                                    :
                                                    ""

                                            }
                                        </div>
                                    </div>
                                    <div className="col-xs-12">
                                        <h6>Comments</h6>
                                        <div className="form_blk">
                                            <textarea name="comments" id="comments" className="input" placeholder="How can we help?" onChange={handlePublisherChange}></textarea>
                                            {
                                                (publisher.comment_error === true) ?
                                                    <p className="error">
                                                        <i className="fi-warning"></i> {publisher.comment_msg}
                                                    </p>
                                                    :
                                                    ""

                                            }
                                        </div>
                                    </div>
                                </div>
                                <div className="btn_blk form_btn text-center">
                                    <button className="site_btn lg long purple" disabled={(publisher.btn_loading === true) ? 'disabled' : ''}>Submit {(publisher.btn_loading === true) ? <i className="spinner"></i> : ''}</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
