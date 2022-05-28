import React, { Component, useState, useEffect, Fragment } from "react";
import { getSiteImages, metaTags, getServerImage, getServerVideo, getData } from "../../helpers/api";
import CaseStudies from './home/case-studies';
import FAQ from './home/faq';
import Services from './home/services';
export default function Home(props) {
    const [loading, setLoading] = useState(false);
    // console.log(props);
    function showVideoPopup(video) {
        setState({ ...state, video: video, videoPopup: true });
    }
    const [state, setState] = useState({
        videoPopup: false,
        video: null
    });
    function closePopup() {
        setState({ ...state, video: null, videoPopup: false });
    }
    useEffect(() => {
        window.scrollTo(0, 3)
        getData("home-page").then((data) => {
            setState({
                ...state,
                content: data.content,
                metatags: data.metatags,
                services: data.services,
                casestudies: data.casestudies,
                right_faqs: data.right_faqs,
                left_faqs: data.left_faqs,
                categories: data.categories,
                site_settings: data.site_settings
            });
            setLoading(true);
        });
    }, []);
    if (loading === false) return <div id="loading"> <img src={getSiteImages('/images/loading.gif')} alt="Loading" /></div>;
    return (
        <Fragment>
            <main>
                {metaTags(state.metatags)}

                <section id="banner" style={{ backgroundImage: "url('" + getSiteImages("images/hero_banner.png") + "')" }}>
                    <div className="contain">
                        <div className="flex_box">
                            <div className="content">
                                <div dangerouslySetInnerHTML={{ __html: state.content.banner_detail }} />
                                <div className="btn_blk">
                                    <button type="button" className="site_btn lg purple pop_btn" data-popup="contact" onClick={props.showContactPopup}>{state.content.banner_button_text}</button>
                                    {/* <button type="button" className="site_btn lg text blank play pop_btn" data-popup="video" data-src={state.content.banner_video} onClick={() => showVideoPopup(state.content.video1)}><img src={getSiteImages("images/play_icon_02.svg")} alt="" /> {state.content.banner_button_text2}</button> */}
                                </div>
                            </div>
                            <div className="img_blk">
                                <div className="fig_01">
                                    <figure>
                                        <img src={getServerImage('uploads/images/', state.content.image1, 'thumb_')} alt="" />
                                    </figure>
                                </div>
                                <div className="fig_02">
                                    <figure>
                                        <img src={getServerImage('uploads/images/', state.content.image2, 'thumb_')} alt="" />
                                    </figure>
                                </div>
                                <div className="fig_03">
                                    <figure>
                                        <img src={getServerImage('uploads/images/', state.content.image3, 'thumb_')} alt="" />
                                    </figure>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>


                <Services heading={state.content.section1_heading} services={state.services} />


                <CaseStudies heading={state.content.section2_heading} case_study_heading1={state.content.case_study_heading1} case_study_heading2={state.content.case_study_heading2} case_study_heading3={state.content.case_study_heading3} case_study_heading4={state.content.case_study_heading4} casestudies={state.casestudies} categories={state.categories} />


                <section id="become">
                    <div className="contain">
                        <div className="inside" style={{ backgroundImage: "url('" + getServerImage('uploads/images/', state.content.image4, 'thumb_') + "')" }}>
                            <div className="content">
                                <div className="txt">
                                    <h2>{state.content.section3_heading}</h2>
                                    <p>{state.content.section3_detail}</p>
                                    <div className="btn_blk">
                                        <button type="button" className="site_btn lg pop_btn" data-popup="become" onClick={props.showPublisherPopup}>{state.content.section3_link_text}</button>
                                    </div>
                                </div>
                            </div>
                            <div className="side_blk text-center">
                                <figure><img src={getServerImage('uploads/images/', state.content.image5)} alt={state.content.section3_heading1} /></figure>
                                <div className="txt">
                                    <h4>{state.content.section3_heading1} </h4>
                                    <p>{state.content.section3_detail1}</p>
                                    <div className="btn_blk">
                                        <a href="javascript:void(0)" onClick={props.showPublisherPopup} className="site_btn lg run_btn">{state.content.section3_link_text1}</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>


                <section id="why">
                    <div className="contain text-center">
                        <div className="content">
                            <h2>{state.content.section4_heading}</h2>
                        </div>
                        <div className="flex_row">
                            <div className="col">
                                <div className="inner">
                                    <figure><img src={getServerImage('uploads/images/', state.content.image6)} alt={state.content.section4_heading6} /></figure>
                                    <div className="txt">
                                        <h4>{state.content.section4_heading6}</h4>
                                        <div dangerouslySetInnerHTML={{ __html: state.content.section4_text6 }} />
                                    </div>
                                </div>
                            </div>
                            <div className="col">
                                <div className="inner">
                                    <figure><img src={getServerImage('uploads/images/', state.content.image7)} alt={state.content.section4_heading7} /></figure>
                                    <div className="txt">
                                        <h4>{state.content.section4_heading7}</h4>
                                        <div dangerouslySetInnerHTML={{ __html: state.content.section4_text7 }} />
                                    </div>
                                </div>
                            </div>
                            <div className="col">
                                <div className="inner">
                                    <figure><img src={getServerImage('uploads/images/', state.content.image8)} alt={state.content.section4_heading8} /></figure>
                                    <div className="txt">
                                        <h4>{state.content.section4_heading8}</h4>
                                        <div dangerouslySetInnerHTML={{ __html: state.content.section4_text8 }} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="btn_blk">
                            <button type="button" className="site_btn lg long purple pop_btn" data-popup="contact" onClick={props.showContactPopup}>{state.content.section4_link_text}</button>
                        </div>
                    </div>
                </section>


                <FAQ heading={state.content.section5_heading} left_faqs={state.left_faqs} right_faqs={state.right_faqs} />

                {
                    (state.videoPopup === true && state.video != null && state.video != undefined && state.video != '')
                        ?
                        <section className="popup lg" data-popup="video" style={{ display: "block" }}>
                            <div className="table_dv">
                                <div className="table_cell">
                                    <div className="contain">
                                        <div className="_inner">
                                            <button type="button" className="x_btn" onClick={closePopup}></button>
                                            <h4>{state.content.banner_video_text}</h4>
                                            <div id="vid_blk" className="vid_blk">
                                                <video autoplay="true" muted="true" loop="true" id="bannerVid" className="video_play" controls>
                                                    <source src={getServerVideo("uploads/videos/", state.video)} type="video/mp4" />
                                                </video>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                        :
                        ""
                }
            </main>
        </Fragment >
    )
}
