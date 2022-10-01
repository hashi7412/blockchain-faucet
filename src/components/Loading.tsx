import React from 'react';

interface LoadingProps {
    type : 'blank'|'balls'|'bars'|'bubbles'|'cubes'|'cylon'|'spin'|'spinningBubbles'|'spokes'
    width : number
    height : number
    color : string
    opacity : number
}

const Loading = ({type="blank", width=100, height=100, color="#eee", opacity=0.5}:LoadingProps) => {
	return (
        <div style={{position:"fixed", left:0, top:0, width:'100%', height:'100%', backgroundColor:'rgba(0,0,0, '+opacity+")", zIndex:1111}}>
            <div style={{position:'absolute', top:'calc(50vh - '+height/2+'px)', left:'calc(50vw - '+width/2+'px)'}}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width={width} height={height} fill={color}>
                    <path transform="translate(2)" d="M0 12 V20 H4 V12z"> 
                        <animate attributeName="d" values="M0 12 V20 H4 V12z; M0 4 V28 H4 V4z; M0 12 V20 H4 V12z; M0 12 V20 H4 V12z" dur="1.2s" repeatCount="indefinite" begin="0" keyTimes="0;.2;.5;1" keySplines="0.2 0.2 0.4 0.8;0.2 0.6 0.4 0.8;0.2 0.8 0.4 0.8" calcMode="spline"  />
                    </path>
                    <path transform="translate(8)" d="M0 12 V20 H4 V12z">
                        <animate attributeName="d" values="M0 12 V20 H4 V12z; M0 4 V28 H4 V4z; M0 12 V20 H4 V12z; M0 12 V20 H4 V12z" dur="1.2s" repeatCount="indefinite" begin="0.2" keyTimes="0;.2;.5;1" keySplines="0.2 0.2 0.4 0.8;0.2 0.6 0.4 0.8;0.2 0.8 0.4 0.8" calcMode="spline"  />
                    </path>
                    <path transform="translate(14)" d="M0 12 V20 H4 V12z">
                        <animate attributeName="d" values="M0 12 V20 H4 V12z; M0 4 V28 H4 V4z; M0 12 V20 H4 V12z; M0 12 V20 H4 V12z" dur="1.2s" repeatCount="indefinite" begin="0.4" keyTimes="0;.2;.5;1" keySplines="0.2 0.2 0.4 0.8;0.2 0.6 0.4 0.8;0.2 0.8 0.4 0.8" calcMode="spline" />
                    </path>
                    <path transform="translate(20)" d="M0 12 V20 H4 V12z">
                        <animate attributeName="d" values="M0 12 V20 H4 V12z; M0 4 V28 H4 V4z; M0 12 V20 H4 V12z; M0 12 V20 H4 V12z" dur="1.2s" repeatCount="indefinite" begin="0.6" keyTimes="0;.2;.5;1" keySplines="0.2 0.2 0.4 0.8;0.2 0.6 0.4 0.8;0.2 0.8 0.4 0.8" calcMode="spline" />
                    </path>
                    <path transform="translate(26)" d="M0 12 V20 H4 V12z">
                        <animate attributeName="d" values="M0 12 V20 H4 V12z; M0 4 V28 H4 V4z; M0 12 V20 H4 V12z; M0 12 V20 H4 V12z" dur="1.2s" repeatCount="indefinite" begin="0.8" keyTimes="0;.2;.5;1" keySplines="0.2 0.2 0.4 0.8;0.2 0.6 0.4 0.8;0.2 0.8 0.4 0.8" calcMode="spline" />
                    </path>
                </svg>
            </div>
        </div>
	)
}

export default Loading