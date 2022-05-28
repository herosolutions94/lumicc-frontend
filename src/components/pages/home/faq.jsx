import React, { Fragment } from 'react'
import { getSiteImages } from "../../../helpers/api";
import Collapsible from 'react-collapsible';
export default function FAQ(props) {
    function expandFaq(e) {
        e.stopPropagation();
        let elements = document.querySelectorAll(".faq_lst .faq_blk");
        let currentElement = e.currentTarget;
        if (currentElement.classList.contains("active")) {
            for (var i = 0; i < elements.length; i++) {
                elements[i].classList.remove("active");
            }
        } else {
            for (var j = 0; j < elements.length; j++) {
                elements[j].classList.remove("active");
            }
            currentElement.classList.add("active");
        }
    }
    return (
        <section id="faq" className={(props.page === 'vendors') ? 'dark_sec' : ''}>
            <div className="contain">
                <div className="content text-center">
                    <h2>{props.heading}</h2>
                </div>
                <div className="flex_row">
                    <div className="col">
                        <div className="faq_lst">
                            {
                                (props.left_faqs != undefined && props.left_faqs.length > 0) ?
                                    props.left_faqs.map((left_faq, index) => (
                                        <div className="faq_blk" key={index}>

                                            <Collapsible trigger={left_faq.question}>
                                                <div dangerouslySetInnerHTML={{ __html: left_faq.answer }} />
                                            </Collapsible>
                                        </div>
                                    ))
                                    :
                                    ""
                            }
                        </div>
                    </div>
                    <div className="col">
                        <div className="faq_lst">
                            {
                                (props.right_faqs != undefined && props.right_faqs.length > 0) ?
                                    props.right_faqs.map((right_faq, r_index) => (
                                        <div className="faq_blk" key={r_index}>

                                            <Collapsible trigger={right_faq.question}>
                                                <div dangerouslySetInnerHTML={{ __html: right_faq.answer }} />
                                            </Collapsible>
                                        </div>
                                    ))
                                    :
                                    ""
                            }
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
