import React from 'react';
import { Link } from "react-router-dom";
import { getSiteImages, getData } from "../../helpers/api";
export default function Error() {
    return (
        <section id="oops">
            <div className="logoDv">
                <Link to="/"><img src={getSiteImages('/images/logo.png')} alt="" /></Link>
            </div>
            <div className="contain text-center">
                <div className="icon">404</div>
                <div className="inner">
                    <h4>Page Not Found</h4>
                    <p>Let's pretend ..... !! You never saw that. Go back to the Homepage to find out more.</p>
                    <div className="bTn"><Link to="/" className="site_btn">Back to the website</Link></div>
                </div>
            </div>
        </section>
    );
}
