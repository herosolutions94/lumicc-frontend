
import { Helmet } from "react-helmet";
import axios from "axios";
let project_url = '';
let project_ap_url = '';
let hostname = window.location.hostname;
if (hostname === 'localhost') {
    project_url = 'http://localhost:3000/';
    // project_ap_url = process.env.REACT_APP_SITE_API_DOMAIN;
    project_ap_url = "http://localhost/lumicc/";
}
else if (hostname === 'lumicc.herosolutions.com.pk') {
    project_url = "https://lumicc.herosolutions.com.pk/";
    project_ap_url = "https://lumicc.herosolutions.com.pk/lumicc-api/";
}
else if (hostname === 'lumicc.com' || hostname === 'www.lumicc.com') {
    project_url = "https://lumicc.com/";
    project_ap_url = "https://lumicc.com/lumicApi/";
}
else {
    project_url = "https://lumicc.herosolutions.com.pk/";
    project_ap_url = "https://www.lumicc.com/lumicc-api/";
}
const headers = {
    "Content-Type": "application/json",
    // Authorization: token,
};
export function metaTags(page) {
    return (
        <Helmet>
            <title>{page.page_name}</title>
            <meta name="title" content={page.meta_title} />
            <meta name="description" content={page.meta_description} />
            <link rel="canonical" href={project_url + page.page_url} />
            <meta property="og:url" content={project_url + page.page_url} />
            <meta property="og:title" content={page.meta_title} />
            <meta property="og:description" content={page.meta_description} />
            <meta property="og:type" content="website" />
            <meta property="og:site_name" content={page.site_name} />
            <meta property="og:image" content={page.site_thumbnail} />

        </Helmet>
    )
}
export function getSiteImages(path) {
    return project_url + path;
}
export function checkPattern(string, pattern) {
    // Allow A-Z, a-z, 0-9 and underscore. Min 1 char.
    var re = /^[a-zA-Z0-9_]+$/;

    return pattern.test(string);
}
export async function postData(method, data, parameters = null) {
    let u;
    parameters === null
        ? (u = project_ap_url + method)
        : (u = project_ap_url + method + "/" + parameters);

    return axios
        .post(u, data, {
            headers: headers,
        })
        .then((res) => {
            return res.data;
        });
}
export function getYoutubeVideoId(url) {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);

    return (match && match[2].length === 11)
        ? match[2]
        : null;
}
export function short_text(text, length = 25) {
    if (text.length > length) {
        let str = text.substring(0, length);
        return str + "...";
    }
    else {
        return text
    }

}
export function checkUrl(url) {
    if (!/^https?:\/\//i.test(url)) {
        url = 'http://' + url;
    }
    return url;
}
export function getServerImage(path, image = null, type = null) {

    if (image === null || image === '') {
        return project_ap_url + "assets/images/no-image.svg";
    }
    else {
        if (type == null || type === '') {
            return project_ap_url + path + image;
        }
        else {
            if (fileExtension(image) === 'svg') {
                return project_ap_url + path + image;
            }
            else {
                return project_ap_url + path + type + image;
            }
            // console.log(type);

        }

    }

}
export function getServerVideo(path, image = null, type = null) {

    if (image === null || image === '') {
        return project_url + "videos/404.mp4";
    }
    else {
        if (type == null || type === '') {
            return project_ap_url + path + image;
        }
        else {
            if (fileExtension(image) === 'svg') {
                return project_ap_url + path + image;
            }
            else {
                return project_ap_url + path + type + image;
            }
            // console.log(type);

        }

    }

}
export function fileExtension(filename) {
    return filename.split('.').pop();
}
export async function getData(method, parameters = null) {
    let u;
    parameters === null
        ? (u = project_ap_url + method)
        : (u = project_ap_url + method + "/" + parameters);

    const token = localStorage.getItem("token");
    let result;

    const response = await fetch(u, {
        method: "get", // or 'PUT'
        headers: {
            "Content-Type": "application/json",
            Authorization: token,
        },
    });

    const data = await response.json();
    return data;
}
