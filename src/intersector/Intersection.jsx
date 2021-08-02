import React, { useEffect } from 'react';
import first from "./first.mp4"
import second from "./second.mp4"
import third from "./third.mp4"
import "./inter.css"
function Intersection(props) {

    useEffect(()=>{
        
        const observer = new IntersectionObserver((entries)=>{
            entries.forEach(entry=>{
                let videoelem = entry.target.children[0];
                videoelem.play().then(()=>{
                    if(!entry.isIntersecting){
                        videoelem.pause()
                    }
                })
            })
        },{root:null,threshold:"0.5"})
        
        const videos = document.querySelectorAll(".video-container")
        
        videos.forEach(video=>{
            observer.observe(video);
        })
    },[])


    return (
        <div>
             <div className="video-container">
                <Video 
                    src={first}
                    id="a"
                ></Video>
            </div>
            <div className="video-container">
                <Video
                src = {second}
                id="b"
                ></Video>
            </div>
            <div className="video-container">
                <Video
                src = {third}
                id="c"
                ></Video>
            </div>
        </div>
    );
}

function Video(props){
    
    return (
        <video class="video-styles" controls muted = "true" id = {props.id}>
            <source src = {
                props.src
            } type = "video/mp4" ></source>
        </video>
    )
}

export default Intersection;