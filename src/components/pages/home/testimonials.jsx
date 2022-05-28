import React, { Fragment, useState } from 'react'
import ReactStars from "react-rating-stars-component";
import { getSiteImages, getServerImage } from "../../../helpers/api";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../../../../node_modules/video-react/dist/video-react.css";

import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
const options = {
    autoplay: false,
    nav: true,
    navText: ['<div className="arrow_left"></div>', '<div className="arrow_right"></div>'],
    loop: true,
    dots: false,
    margin: 20,
    smartSpeed: 1000,
    autoplayTimeout: 8000,
    autoplayHoverPause: true,
    items: 1
};

export default function Testimonials(props) {
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
        <section className="testimonial_sec">
            <div className="contain">
                <div className="flex">
                    <div className="colL">
                        <div className="image_small">
                            <img src={getServerImage('uploads/images/', props.image1, 'thumb_')} alt={props.heading} />
                        </div>

                    </div>
                    <div className="colM">
                        <div className="content text-center">
                            <h2>{props.heading}</h2>
                            <p>{props.details}</p>
                        </div>
                        {/* <div id="testimonial" className="owl-carousel owl-theme"> */}
                        <OwlCarousel className="owl-theme" id="testimonial"  {...options}>
                            {
                                (props.testimonials != undefined && props.testimonials.length > 0) ?
                                    props.testimonials.map((testimonial, index) => (
                                        <div className="item" key={index}>
                                            <div className="item_inner">
                                                <div className="image_testi_icon">
                                                    <img src={getServerImage('uploads/testimonials/', testimonial.image, 'thumb_')} alt={testimonial.name} />
                                                </div>
                                                <div className="cntnt">
                                                    <div dangerouslySetInnerHTML={{ __html: testimonial.detail }} />
                                                    <h5>{testimonial.name}</h5>
                                                    <div className="review_start">
                                                        <ReactStars
                                                            count={5}
                                                            value={parseFloat(testimonial.ratings)}
                                                            size={14}
                                                            activeColor="#fe7e21"
                                                            edit={false}
                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                    ))
                                    :
                                    ''
                            }
                        </OwlCarousel>
                        {/* </div> */}
                    </div>
                    <div className="colR">
                        <div className="image_small">
                            <img src={getServerImage('uploads/images/', props.image2, 'thumb_')} alt={props.heading} />
                        </div>
                    </div>
                </div>
                <div className="btn_blk text-center">
                    <a href={props.link_url} className="site_btn lg long purple">{props.link_text}</a>
                </div>
            </div>
        </section>
    )
}
