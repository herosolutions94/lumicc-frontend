import React, { useEffect, Fragment, useState } from "react";
import { getSiteImages, getData, metaTags, getServerImage } from "../../helpers/api";
import Services from './home/services';
import FAQ from './home/faq';
import Collapsible from 'react-collapsible';
import Testimonials from "./home/testimonials";
import Careers from "../popups/careers";
export default function Vendors(props) {
    const [loading, setLoading] = useState(false);
    const [state, setState] = useState({
        careerPopup: false,
        publisherPopup: false,
        contactPopup: false,

    });
    useEffect(() => {
        window.scrollTo(0, 3)
        getData("vendors-page").then((data) => {
            setState({
                ...state,
                content: data.content,
                metatags: data.metatags,
                services: data.services,
                right_faqs: data.right_faqs,
                left_faqs: data.left_faqs,
                site_settings: data.site_settings,
                testimonials: data.testimonials,
                skills: data.skills,
            });
            setLoading(true);
        });
    }, []);
    if (loading === false) return <div id="loading"> <img src={getSiteImages('/images/loading.gif')} alt="Loading" /></div>;
    // console.log(state.content);
    return (
        <main>

            {metaTags(state.metatags)}
            <section id="banner" style={{ backgroundImage: "url('" + getSiteImages('images/hero_banner.png') + "')" }}>
                <div className="contain">
                    <div className="flex_box">
                        <div className="content">
                            <div dangerouslySetInnerHTML={{ __html: state.content.banner_detail }} />
                            <div className="abt_icons_group">
                                <div className="inner_group">
                                    <div className="listing_group flex">
                                        <div className="icon_list">
                                            <img src={getServerImage('uploads/images/', state.content.image12, 'thumb_')} alt={state.content.banner_heading12} />
                                        </div>
                                        <div className="cntnt_listing">
                                            {state.content.banner_heading12}
                                        </div>
                                    </div>
                                    <div className="listing_group flex">
                                        <div className="icon_list">
                                            <img src={getServerImage('uploads/images/', state.content.image13, 'thumb_')} alt={state.content.banner_heading13} />
                                        </div>
                                        <div className="cntnt_listing">
                                            {state.content.banner_heading13}
                                        </div>
                                        <div className="abt_small_text abt_small_text1">
                                            {state.content.banner_text13}
                                        </div>
                                    </div>
                                    <div className="listing_group flex">
                                        <div className="icon_list">
                                            <img src={getServerImage('uploads/images/', state.content.image14, 'thumb_')} alt={state.content.banner_heading14} />
                                        </div>
                                        <div className="cntnt_listing">
                                            {state.content.banner_heading14}
                                        </div>
                                    </div>
                                    <div className="listing_group flex">
                                        <div className="icon_list">
                                            <img src={getServerImage('uploads/images/', state.content.image15, 'thumb_')} alt={state.content.banner_heading15} />
                                        </div>
                                        <div className="cntnt_listing">
                                            {state.content.banner_heading15}
                                        </div>
                                        <div className="abt_small_text abt_small_text2">
                                            {state.content.banner_text15}
                                        </div>
                                    </div>
                                    <div className="listing_group flex">
                                        <div className="icon_list">
                                            <img src={getServerImage('uploads/images/', state.content.image16, 'thumb_')} alt={state.content.banner_heading16} />
                                        </div>
                                        <div className="cntnt_listing">
                                            {state.content.banner_heading16}
                                        </div>
                                        <div className="abt_small_text abt_small_text3">
                                            {state.content.banner_text16}
                                        </div>
                                    </div>
                                    <div className="listing_group flex">
                                        <div className="icon_list">
                                            <img src={getServerImage('uploads/images/', state.content.image17, 'thumb_')} alt={state.content.banner_heading17} />
                                        </div>
                                        <div className="cntnt_listing">
                                            {state.content.banner_heading17}
                                        </div>
                                        <div className="abt_small_text abt_small_text4">
                                            {state.content.banner_text17}
                                        </div>
                                    </div>
                                    <div className="listing_group flex">
                                        <div className="icon_list">
                                            <img src={getServerImage('uploads/images/', state.content.image18, 'thumb_')} alt={state.content.banner_heading18} />
                                        </div>
                                        <div className="cntnt_listing">
                                            {state.content.banner_heading18}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="img_blk career_blk">
                            <div className="blk">
                                <h3>{state.content.banner_form_text} </h3>
                                <Careers skills={state.skills} />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="mini_label">
                <div className="contain">
                    <div className="flex">
                        <div className="col">
                            <div className="mini_icon_lbl">
                                <img src={getServerImage('uploads/images/', state.content.image1)} alt={state.content.section1_heading1} />
                            </div>
                            <h4>{state.content.section1_heading1}</h4>
                            <p>{state.content.section1_text1}</p>
                        </div>
                        <div className="col">
                            <div className="mini_icon_lbl">
                                <img src={getServerImage('uploads/images/', state.content.image2)} alt={state.content.section1_heading2} />
                            </div>
                            <h4>{state.content.section1_heading2}</h4>
                            <p>{state.content.section1_text2}</p>
                        </div>
                        <div className="col">
                            <div className="mini_icon_lbl">
                                <img src={getServerImage('uploads/images/', state.content.image3)} alt={state.content.section1_heading3} />
                            </div>
                            <h4>{state.content.section1_heading3}</h4>
                            <p>{state.content.section1_text3}</p>
                        </div>
                    </div>
                </div>
            </section>
            <section className="img_blk_banner">
                <div className="contain contain_full_wide">
                    <div className="flex">
                        <div className="colL">
                            <div className="image_sktech">
                                <img src={getSiteImages("images/sketch1.png")} alt="" />
                            </div>
                        </div>
                        <div className="colR">
                            <div className="image">
                                <img src={getServerImage('uploads/images/', state.content.image4, 'thumb_')} alt={state.content.section2_title} />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="outer_small_blk">
                    <div className="contain">
                        <div className="small_blk">
                            <h1 className="heading">{state.content.section2_title}</h1>
                            <p>{state.content.section2_details}</p>
                        </div>
                    </div>
                </div>

            </section>
            <section className="how_it_work" id="how_it_work">
                <div className="contain">
                    <div className="content text-center">
                        <h1 className="heading">{state.content.section3_heading}</h1>
                        <p>{state.content.section3_detail}</p>
                    </div>
                    <div className="flex">
                        <div className="colL">
                            <div className="image1">
                                <img src={getServerImage('uploads/images/', state.content.image5, 'thumb_')} alt="" />
                            </div>
                            <div className="image2">
                                <img src={getServerImage('uploads/images/', state.content.image6, 'thumb_')} alt="" />
                            </div>
                        </div>
                        <div className="colR">
                            <div className="inner">
                                <div className="icon_left">
                                    <img src={getServerImage('uploads/images/', state.content.image7)} alt={state.content.section3_heading7} />
                                </div>
                                <div className="cntnt">
                                    <h4>{state.content.section3_heading7}</h4>
                                    <p>{state.content.section3_text7}</p>
                                </div>
                            </div>

                            <div className="inner">
                                <div className="icon_left">
                                    <img src={getServerImage('uploads/images/', state.content.image8)} alt={state.content.section3_heading8} />
                                </div>
                                <div className="cntnt">
                                    <h4>{state.content.section3_heading8}</h4>
                                    <p>{state.content.section3_text8}</p>
                                </div>
                            </div>
                            <div className="inner">
                                <div className="icon_left">
                                    <img src={getServerImage('uploads/images/', state.content.image9)} alt={state.content.section3_heading9} />
                                </div>
                                <div className="cntnt">
                                    <h4>{state.content.section3_heading9}</h4>
                                    <p>{state.content.section3_text9}</p>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div className="btn_blk text-center">
                        <a href={state.content.section3_link_url} className="site_btn lg long purple">{state.content.section3_link_text}</a>
                    </div>
                </div>
            </section>
            <Services heading={state.content.section4_heading} services={state.services} page="vendors" />



            <FAQ heading={state.content.section5_heading} left_faqs={state.left_faqs} right_faqs={state.right_faqs} page="vendors" />

            <Testimonials heading={state.content.section6_heading} testimonials={state.testimonials} image1={state.content.image10} image2={state.content.image11} link_text={state.content.section6_link_text} link_url={state.content.section6_link_url} details={state.content.section6_detail} />
        </main>
    )
}
