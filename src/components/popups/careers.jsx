import React, { useEffect, Fragment, useState } from "react";
import { checkPattern, postData } from "../../helpers/api";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Careers(props) {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [career, setCareer] = useState({
        name: '',
        email: '',
        phone: '',
        skills: ''
    });
    function onCareersSubmit() {
        if (career.name_error === true || career.name === '') {
            setCareer({ ...career, name_error: true, name_msg: "Required" });
        }
        else if (career.email_error === true || career.email === '') {
            setCareer({ ...career, email_error: true, email_error_msg: "Enter a valid email address" });
        }
        else if (career.phone_error === true || career.phone === '') {
            setCareer({ ...career, phone_error: true, phone_msg: "Enter a valid phone number" });
        }
        else if (career.skill_error === true || career.skills === '') {
            setCareer({ ...career, skill_error: true, skill_msg: "Required" });
        }
        else {
            setCareer({ ...career, btn_loading: true });
            var form_data = new FormData();

            for (var key in career) {
                form_data.append(key, career[key]);
            }
            postData("vendors-post", form_data).then((data) => {
                console.log(data);
                if (data.status == 1) {
                    document.getElementById("frmCareer").reset();
                    setCareer({ ...career, email: "", name: '', phone: '', skills: null });
                    setCareer({ ...career, btn_loading: false });
                    document.getElementById("skills").value = "";
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
                    setCareer({ ...career, btn_loading: false });
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
    function handleCareerChange(e) {
        if (e.target.name === 'name') {
            if (e.target.value === "") {
                setCareer({ ...career, [e.target.name]: e.target.value, name_error: true, name_msg: "Required" });
            }
            else {
                setCareer({ ...career, [e.target.name]: e.target.value, name_error: false, name_msg: "" });
            }
        }
        if (e.target.name === 'phone') {
            if (e.target.value === "") {
                setCareer({ ...career, [e.target.name]: e.target.value, phone_error: true, phone_msg: "Required" });
            }
            else {
                if (e.target.value != null || e.target.value != 'null') {
                    let mobile_chk = checkPattern(e.target.value, /^[0-9\b]+$/);
                    if (mobile_chk === false) {
                        setCareer({ ...career, [e.target.name]: e.target.value, phone_error: true, phone_msg: "Invalid phone number" });
                    }
                    else {
                        setCareer({ ...career, [e.target.name]: e.target.value, phone_error: false, phone_msg: "" });
                    }
                }

            }
        }
        if (e.target.name === 'email') {

            let email_chk = checkPattern(e.target.value, /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/);

            if (email_chk === false) {
                if (e.target.value === '') {
                    setCareer({ ...career, email_error: false });
                }
                else {
                    setCareer({ ...career, [e.target.name]: e.target.value, email_error: true, email_error_msg: "Invalid e-mail address" });
                }

            }
            else {
                setCareer({ ...career, [e.target.name]: e.target.value, email_error: false, email_error_msg: "" });
            }

        }
        if (e.target.name === 'skills') {
            if (e.target.value === "") {
                setCareer({ ...career, [e.target.name]: e.target.value, skill_error: true, skill_msg: "Required" });
            }
            else {
                setCareer({ ...career, [e.target.name]: e.target.value, skill_error: false, skill_msg: "" });
            }
        }
    }
    return (


        <form method="post" onSubmit={handleSubmit(onCareersSubmit)} id="frmCareer">
            <ToastContainer />
            <div className="form_row row">
                <div className="col-xs-12">
                    <div className="form_blk">
                        <input type="text" name="name" id="name" className="input" placeholder="eg: John Wick" onChange={handleCareerChange} />
                        {
                            (career.name_error === true) ?
                                <p className="error">
                                    <i className="fi-warning"></i> {career.name_msg}
                                </p>
                                :
                                ""

                        }
                    </div>
                </div>
                <div className="col-xs-12">
                    <div className="form_blk">
                        <input type="text" name="email" id="email" className="input" placeholder="eg: sample@gmail.com" onChange={handleCareerChange} />
                        {
                            (career.email_error === true) ?
                                <p className="error">
                                    <i className="fi-warning"></i> {career.email_error_msg}
                                </p>
                                :
                                ""

                        }
                    </div>
                </div>
                <div className="col-xs-12">
                    <div className="form_blk">
                        <input type="text" name="phone" id="phone" className="input" placeholder="eg: 092 1234 567" onChange={handleCareerChange} />
                        {
                            (career.phone_error === true) ?
                                <p className="error">
                                    <i className="fi-warning"></i> {career.phone_msg}
                                </p>
                                :
                                ""

                        }
                    </div>
                </div>
                <div className="col-xs-12">
                    <div className="form_blk">
                        <select className="input" name="skills" id="skills" onChange={handleCareerChange}>
                            <option value=''>What's your skill?</option>
                            {
                                (props.skills != undefined && props.skills.length > 0) ?
                                    props.skills.map((skill, index) => (
                                        <option value={skill.name} key={index}>{skill.name}</option>
                                    ))
                                    :
                                    ""
                            }
                        </select>
                        {
                            (career.skill_error === true) ?
                                <p className="error">
                                    <i className="fi-warning"></i> {career.skill_msg}
                                </p>
                                :
                                ""

                        }
                    </div>
                </div>

            </div>
            <div className="btn_blk form_btn text-center">
                <button className="site_btn lg long purple" disabled={(career.btn_loading === true) ? 'disabled' : ''}>Submit {(career.btn_loading === true) ? <i className="spinner"></i> : ''}</button>
            </div>
        </form>

    )
}
