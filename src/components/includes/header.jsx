import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom';
import { getServerImage, getData } from "../../helpers/api";
import {
    Link
} from "react-router-dom";
export default function Header(props) {
    const location = useLocation();
    const location_path = location.pathname;
    const current_page = location_path.split('/')[1];
    // console.log(current_page);
    const [loading, setLoading] = useState(false);
    const [scroll, setScroll] = useState(false);
    const [menu, setMenu] = useState(false);
    useEffect(() => {
        window.addEventListener("scroll", () => {
            setScroll(window.scrollY > 50);
        });
    }, []);
    function toggleMenu() {
        setMenu(!menu);
    }
    function handleHideMenu() {
        setMenu(false);
    }
    function showContactPopup(e) {
        e.preventDefault();
        setMenu(false);
        props.showContactPopup();
    }
    const [state, setState] = useState({

    });
    const scrollToHashElement = () => {

        let offset = 0;
        const { hash } = window.location;
        const elementToScroll = document.getElementById(hash?.replace("#", ""));

        if (!elementToScroll) return;

        window.scrollTo({
            top: elementToScroll.offsetTop - offset,
            behavior: "smooth"
        });
    };

    useEffect(() => {

        getData("home-page").then((data) => {
            setState({
                ...state,
                site_settings: data.site_settings
            });
            setLoading(true);
            setTimeout(scrollToHashElement, 500);
        });

    }, []);
    if (loading === false) return '';
    return (

        <header className={scroll ? "ease fix" : "ease"}>
            <div className="contain">
                <div className="logo">
                    <Link to="/"><img src={getServerImage('uploads/images/', state.site_settings.site_logo)} alt={state.site_settings.site_name} /></Link>
                </div>
                <button type="button" id='toggleButton' className={(menu) ? "toggle active" : "toggle"} onClick={toggleMenu}></button>
                {
                    (current_page === 'vendors') ?
                        <nav className="ease">
                            <div id="nav" className={(menu) ? 'active' : ''}>
                                <ul id="lst">
                                    <li className="">
                                        <a href="#how_it_work" onClick={handleHideMenu}>How it works</a>
                                    </li>
                                    <li className="">
                                        <a href="#serve" onClick={handleHideMenu}>Services</a>
                                    </li>
                                    <li className="">
                                        <a href="#faq" onClick={handleHideMenu}>FAQ</a>
                                    </li>
                                    <li className="" onClick={handleHideMenu}>
                                        {/* <a href="#become" className="run_btn" onClick={props.showPublisherPopup}>Become a Publisher</a> */}
                                        <Link to="/">Advertisers</Link>
                                    </li>

                                </ul>
                                <ul id="cta">
                                    <li><a href="javascript:void(0)" className="site_btn long pop_btn" data-popup="contact" onClick={showContactPopup}>Contact us</a></li>
                                </ul>
                            </div>
                        </nav>
                        :
                        <nav className="ease">
                            <div id="nav" className={(menu) ? 'active' : ''}>
                                <ul id="lst">
                                    <li className="">
                                        <a href="#serve" onClick={handleHideMenu}>Services</a>
                                    </li>
                                    <li className="">
                                        <a href="#why" onClick={handleHideMenu}>Why us?</a>
                                    </li>
                                    <li className="">
                                        <a href="#faq" onClick={handleHideMenu}>FAQ</a>
                                    </li>
                                    <li className="" onClick={handleHideMenu}>
                                        {/* <a href="#become" className="run_btn" onClick={props.showPublisherPopup}>Become a Publisher</a> */}
                                        <Link to="/vendors">Vendors</Link>
                                    </li>

                                </ul>
                                <ul id="cta">
                                    <li><a href="javascript:void(0)" className="site_btn long pop_btn" data-popup="contact" onClick={showContactPopup}>Contact us</a></li>
                                </ul>
                            </div>
                        </nav>
                }
                <div className="clearfix"></div>
            </div>
        </header>


    )
}
