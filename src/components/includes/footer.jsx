import React, { Fragment, useState, useEffect } from 'react'
import { getSiteImages, getServerImage, getData } from "../../helpers/api";
import {
    Link
} from "react-router-dom";

export default function Footer(props) {
    const [loading, setLoading] = useState(false);
    const [state, setState] = useState({

    });
    useEffect(() => {
        getData("home-page").then((data) => {
            setState({
                ...state,
                site_settings: data.site_settings
            });
            setLoading(true);
        });
    }, []);
    if (loading === false) return '';
    return (
        <Fragment>

            <footer>
                <div className="contain">
                    <div className="inside">
                        <div className="logo">
                            <Link to="/"><img src={getServerImage('uploads/images/', state.site_settings.site_footer_logo)} alt={state.site_settings.site_name} /></Link>
                        </div>
                        <ul className="social_links">
                            {
                                (state.site_settings.site_facebook != '') ?
                                    <li><a href={state.site_settings.site_facebook} target="_blank"><img src={getSiteImages("images/social-facebook.svg")} alt="" /></a></li>
                                    :
                                    ''
                            }
                            {
                                (state.site_settings.site_instagram != '') ?
                                    <li><a href={state.site_settings.site_instagram} target="_blank"><img src={getSiteImages("images/social-instagram.svg")} alt="" /></a></li>
                                    :
                                    ''
                            }
                            {
                                (state.site_settings.site_youtube != '') ?
                                    <li><a href={state.site_settings.site_instagram} target="_blank"><img src={getSiteImages("images/social-youtube.svg")} alt="" /></a></li>
                                    :
                                    ''
                            }
                            {
                                (state.site_settings.site_twitter != '') ?
                                    <li><a href={state.site_settings.site_twitter} target="_blank"><img src={getSiteImages("images/social-twitter.svg")} alt="" /></a></li>
                                    :
                                    ''
                            }
                        </ul>
                        <div className="btn_blk drop_down">
                            <button className="site_btn border blank round drop_btn"><img src={getSiteImages("images/icon-union.svg")} alt="" /> English <i className="chevron"></i></button>
                            <ul className="drop_lst drop_cnt">
                                <li><a href="?">English</a></li>
                            </ul>
                        </div>
                        <p className="copyright">{state.site_settings.site_copyright}</p>
                    </div>
                </div>
            </footer>
        </Fragment>
    )
}
