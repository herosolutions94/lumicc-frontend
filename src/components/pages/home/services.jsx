import React, { Fragment, useState } from 'react'
import { getSiteImages, getServerImage, getServerVideo } from "../../../helpers/api";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../../../../node_modules/video-react/dist/video-react.css";
import { Player } from 'video-react';

import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
const options = {
    margin: 0,
    responsiveClass: true,
    nav: true,
    dots: false,
    items: 4,
    loop: true,

    // touchDrag: false,
    responsive: {
        0: {
            items: 4,
            autoplay: true,
            smartSpeed: 1000,
            autoHeight: true,
            autoplayTimeout: 2000,
            autoplayHoverPause: true,
        },
        1030: {
            items: 4,
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
        },
        375: {
            items: 1,
            autoplay: false,
            autoWidth: true
        }
    },
};
let settings = {
    dots: false,
    arrows: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 4000,
    speed: 4000,
    variableWidth: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    adaptiveHeight: true,
    responsive: [
        {
            breakpoint: 1030,
            settings: {
                slidesToShow: 3,
            },
        },
        {
            breakpoint: 992,
            settings: {
                slidesToShow: 2,
            },
        },
        {
            breakpoint: 580,
            settings: {
                slidesToShow: 1,
            },
        },
    ],
};
export default function Services(props) {

    const [state, setState] = useState({
        videoPopup: false,
        videoId: null,
        service_title: null
    });
    function showVideoPopup(service) {
        // let videoId = getYoutubeVideoId(service.video);
        setState({ ...state, videoId: service.video, videoPopup: true, service_title: service.name });
    }
    function closePopup() {
        setState({ ...state, videoId: null, videoPopup: false, service_title: false });
    }
    return (
        <section id="serve" className={(props.page === 'vendors') ? 'career_serve' : ''}>
            <div className="contain">
                <div className="top_head">
                    <h2 className="heading">{props.heading}</h2>
                    {/* <div className="btn_blk">
                        <button type="button" className="serve-prev slick-arrow"></button>
                        <button type="button" className="serve-next slick-arrow"></button>
                    </div> */}
                </div>
                <div id="slick-serve" className="slick-carousel desktop_services">
                    <OwlCarousel className="owl-theme" {...options}>

                        {
                            (props.services != undefined && props.services.length > 0) ?
                                props.services.map((service, index) => (
                                    <div className="item" key={index}>
                                        <div className="serve_blk" style={{ backgroundImage: "url('" + getServerImage('uploads/services/', service.background, 'thumb_') + "')" }}>
                                            <button type="button" className="play_btn pop_btn" data-popup="video" data-src={service.video} onClick={() => showVideoPopup(service)}><img src={getSiteImages("images/play_icon.svg")} alt="" /></button>
                                            <div className="in_blk">
                                                <div className="ico fill"><img src={getServerImage('uploads/services/', service.image, 'thumb_')} alt={service.name} /></div>
                                                <div className="txt">
                                                    <h5>{service.name}</h5>
                                                    <p className="small">{service.designation}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                                :
                                ''
                        }
                    </OwlCarousel>
                </div>
                <div id="slick-serve" className="slick-carousel mobile_services scrollbar">

                    {
                        (props.services != undefined && props.services.length > 0) ?
                            props.services.map((service, index) => (
                                <div className="item" key={index}>
                                    <div className="serve_blk" style={{ backgroundImage: "url('" + getServerImage('uploads/services/', service.background, 'thumb_') + "')" }}>
                                        <button type="button" className="play_btn pop_btn" data-popup="video" data-src={service.video} onClick={() => showVideoPopup(service)}><img src={getSiteImages("images/play_icon.svg")} alt="" /></button>
                                        <div className="in_blk">
                                            <div className="ico fill"><img src={getServerImage('uploads/services/', service.image, 'thumb_')} alt={service.name} /></div>
                                            <div className="txt">
                                                <h5>{service.name}</h5>
                                                <p className="small">{service.designation}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                            :
                            ''
                    }
                </div>
            </div >
            {
                (state.videoPopup === true && state.videoId != null && state.videoId != undefined && state.videoId != '')
                    ?
                    <section className="popup lg" data-popup="video" style={{ display: "block" }}>
                        <div className="table_dv">
                            <div className="table_cell">
                                <div className="contain">
                                    <div className="_inner">
                                        <button type="button" className="x_btn" onClick={closePopup}></button>
                                        <h4>{state.service_title}</h4>
                                        <div id="vid_blk" className="vid_blk">
                                            {/* <video autoplay="true" muted="true" loop="true" id="bannerVid" className="video_play" controls>
                                                <source src={getServerVideo("uploads/services/videos/", state.videoId)} type="video/mp4" />
                                            </video> */}
                                            <Player
                                                playsInline
                                                autoPlay
                                                poster="/assets/poster.png"
                                                src={getServerVideo("uploads/services/videos/", state.videoId)}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    :
                    ""
            }
        </section >
    )
}
