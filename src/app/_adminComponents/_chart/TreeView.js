'use client'
import React, { useEffect, useState } from 'react'
import Tree from 'react-d3-tree';
import { useCenteredTree } from "./helpers";
import { categoryApi } from '@/app/lib/apiService';
import { hideLoader } from '@/app/lib/common';

const containerStyles = {
    width: '100%',
    height: "100vh"
};

// Here we're using `renderCustomNodeElement` to bind event handlers
// to the DOM nodes of our choice.
// In this case, we only want the node to toggle if the *label* is clicked.
// Additionally we've replaced the circle's `onClick` with a custom event,
// which differentiates between branch and leaf nodes.
const renderNodeWithCustomEvents = ({ nodeDatum, toggleNode }) => {
    var MainItems = [
        "On Premise",
        "Cloud",
        "Micro",
        "Small",
        "Medium",
        "Large",
        "Extra Large",
        "Location"
    ];
    if (MainItems.includes(nodeDatum.name)) {
        return (
            <g className="rectClass">
                <rect rx="10px" ry="10px" width="180" height="30" x="-90" />
                <text fill="black" x="-85" y="+20" onClick={toggleNode}>
                    {nodeDatum.name}
                </text>
            </g>
        );
    }
    return (
        <g className="rectClass">
            <rect rx="10px" ry="10px" width="180" height="30" x="-60" />
            <text fill="black" x="-55" y="+20" onClick={toggleNode}>
                {nodeDatum.name}
            </text>
        </g>
    );
};
const straightPathFunc = (linkDatum, orientation) => {
    const { source, target } = linkDatum;
    if (source.children.length === 1) {
        return `M${source.y},${source.x + 15}L${target.y - 60},${target.x + 15}`;
    }
    return `M${source.y + 20},${source.x + 15}C${source.y + 100},${source.x},${target.y - 150
        },${target.x},${target.y - 60},${target.x + 15}`;
};

export default function TreeView() {
    const [translate, containerRef] = useCenteredTree();

    const [dataValue,setDataValue]=useState([{"name": "Category"}])
    useEffect(()=>{
        getData()
    },[])
    const getData = async () =>{
        let data = {tree:true}
        let response = await categoryApi(data)
        console.log("response",response.result[0]);
        if(response.success){
            hideLoader()
            setDataValue(response.result[0])
        }else{
            setDataValue([])
        }
    }



    return (
        <div style={containerStyles} ref={containerRef}>
                    <Tree
                        data={dataValue}
                        translate={translate}
                        renderCustomNodeElement={(rd3tProps) =>
                            renderNodeWithCustomEvents({ ...rd3tProps })
                        }
                        pathFunc={straightPathFunc}
                        orientation="horizontal"
                        separation={{ siblings: 0.8, nonSiblings: 0.8 }}
                        nodeSize={{ x: 300, y: 100 }}
                    />
        </div>
    );
}
