import React, { Fragment, useState } from 'react'
import { getSiteImages, getServerImage, getData, short_text } from "../../../helpers/api";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';

const options = {
    margin: 0,
    responsiveClass: true,
    nav: true,
    dots: false,

    items: 3,
    loop: true,

    // touchDrag: false,
    // mouseDrag:true,
    responsive: {
        0: {
            items: 3,
            autoplay: true,
            smartSpeed: 1000,
            autoHeight: true,
            autoplayTimeout: 2000,
            autoplayHoverPause: true,
        },
        1030: {
            items: 3,
            autoplay: true,
            smartSpeed: 1000,
            autoHeight: true,
            autoplayTimeout: 2000,
            autoplayHoverPause: true,
        },
        992: {
            items: 2,
            autoplay: true,
            smartSpeed: 1000,
            autoHeight: true,
            autoplayTimeout: 2000,
            autoplayHoverPause: true,
        },
        580: {
            items: 1,
            autoplay: false,
            autoWidth: true,
        },
        390: {
            items: 1,
            autoplay: false,
            autoWidth: true
        }
        ,
        375: {
            items: 1,
            autoplay: false,
            autoWidth: true
        }
    },
};

let settings = {
    dots: false,
    arrows: false,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 4000,
    speed: 4000,
    variableWidth: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    adaptiveHeight: true,
    responsive: [
        {
            breakpoint: 1030,
            settings: {
                slidesToShow: 2,
            },
        },
        {
            breakpoint: 767,
            settings: {
                slidesToShow: 1,
            },
        },
    ],
};
export default function CaseStudies(props) {
    // console.log(props.casestudies);
    const [state, setState] = useState({
        casestudies: props.casestudies,
        c_id: null,
        casePopup: false,
        case_study: null,
        link_copy: false,
        loading: false
    });
    function getCaseStudies(c_id) {
        setState({ ...state, loading: true });
        getData("get-case-studies", c_id).then((data) => {
            console.log(data);
            setState({ ...state, c_id: c_id, casestudies: data.casestudies, loading: false });
        });
    }
    function showPopup(case_study) {
        setState({ ...state, casePopup: true, case_study: case_study });
    }
    function closePopup() {
        setState({ ...state, casePopup: false, case_study: null });
    }
    function copyLink(link) {
        navigator.clipboard.writeText(link);
        setState({ ...state, link_copy: true });
    }
    return (
        <section id="case">
            <div className="wrapper">
                <div className="contain">
                    <div className="top_head">
                        <h2 className="heading">{props.heading} </h2>
                        <ul className="tab_list scrollbar">
                            {
                                (props.categories != undefined && props.categories.length > 0) ?
                                    props.categories.map((category, index) => (
                                        <li className={(index == 0 && state.c_id == null) ? "active" : (state.c_id === category.id) ? 'active' : ''} key={index} onClick={() => getCaseStudies(category.id)}><a href="javascript:void(0)">{category.name}</a></li>
                                    ))
                                    :
                                    ""
                            }

                        </ul>
                    </div>
                    <div id="slick-case" className="slick-carousel desktop_services">

                        {
                            (state.loading === true) ? <div className="appLoad"><div className="appLoader"><span className="spiner"></span></div></div>
                                :
                                (state.casestudies != undefined && state.casestudies.length > 0) ?
                                    <OwlCarousel className="owl-theme" {...options}>
                                        {
                                            state.casestudies.map((case_study, c_index) => (
                                                <div className="item" key={c_index}>
                                                    <div className="case_blk">
                                                        <button className="expand pop_btn" data-popup="case" onClick={() => showPopup(case_study)}><img src={getSiteImages("images/icon-expand.svg")} alt="" /></button>
                                                        <div className="fig" style={{ backgroundImage: "url('" + getServerImage('uploads/casestudies/', case_study.image, 'thumb_') + "')" }} onClick={() => showPopup(case_study)}></div>
                                                        <div className="txt" onClick={() => showPopup(case_study)}>
                                                            <h5>{case_study.title}</h5>
                                                            <div dangerouslySetInnerHTML={{ __html: short_text(case_study.details, 130) }} />
                                                        </div>
                                                    </div>
                                                </div>
                                            ))
                                        }

                                    </OwlCarousel>
                                    :
                                    <div className='alert alert-danger'>No case studies found yet!</div>
                        }
                    </div>
                    <div id="slick-case" className="slick-carousel mobile_services scrollbar">

                        {
                            (state.loading === true) ? <div className="appLoad"><div className="appLoader"><span className="spiner"></span></div></div>
                                :
                                (state.casestudies != undefined && state.casestudies.length > 0) ?
                                    state.casestudies.map((case_study, c_index) => (
                                        <div className="item" key={c_index}>
                                            <div className="case_blk" onClick={() => showPopup(case_study)}>
                                                <button className="expand pop_btn" data-popup="case" onClick={() => showPopup(case_study)}><img src={getSiteImages("images/icon-expand.svg")} alt="" /></button>
                                                <div className="fig" style={{ backgroundImage: "url('" + getServerImage('uploads/casestudies/', case_study.image, 'thumb_') + "')" }} onClick={() => showPopup(case_study)}></div>
                                                <div className="txt">
                                                    <h5>{case_study.title}</h5>
                                                    <div dangerouslySetInnerHTML={{ __html: short_text(case_study.details, 130) }} />
                                                </div>
                                            </div>
                                        </div>
                                    ))

                                    :
                                    <div className='alert alert-danger'>No case studies found yet!</div>
                        }
                    </div>
                </div>
            </div>
            <img src={getSiteImages("images/Painting Paine Ill  1.png")} alt="" />

            {
                (state.casePopup === true && state.case_study !== null) ?
                    <div className="popup lg" data-popup="case" style={{ display: "block" }}>
                        <div className="table_dv">
                            <div className="table_cell">
                                <div className="contain">
                                    <div className="_inner">
                                        <button type="button" className="x_btn" onClick={closePopup}></button>
                                        <div className="img_blk">
                                            <img src={getServerImage('uploads/casestudies/', state.case_study.image, 'large_')} alt={state.case_study.title} />
                                        </div>
                                        <div className="data">
                                            <h5>{props.case_study_heading1}</h5>
                                            <span className="site_btn md simple round">{state.case_study.type}</span>
                                            <div className="br"></div>
                                            {
                                                (state.case_study.services.length > 0) ?
                                                    <Fragment>
                                                        <h5>{props.case_study_heading2}</h5>
                                                        <div className="btn_blk">
                                                            {
                                                                state.case_study.services.map((service, s_index) => (
                                                                    <span className="site_btn md simple round" key={s_index}>{service.service}</span>
                                                                ))
                                                            }
                                                        </div>
                                                    </Fragment>
                                                    :
                                                    ""
                                            }
                                            <div className="br"></div>
                                            <h5>{props.case_study_heading3}</h5>
                                            <div dangerouslySetInnerHTML={{ __html: state.case_study.details }} />
                                            <hr />
                                            <div className="btm_blk">
                                                <div className="txt">
                                                    <h5>{props.case_study_heading4}</h5>
                                                    <p>{state.case_study.date}</p>
                                                </div>
                                                <div className="btn_blk">
                                                    {/* <button class={(state.link_copy === true) ? "site_btn simple border active" : "site_btn simple border"} onClick={() => copyLink(state.case_study.link)}><img src={getSiteImages("images/icon-link.svg")} alt="" /></button> */}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    :
                    ""
            }
        </section>
    )
}
