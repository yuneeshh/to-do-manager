import React, { useEffect } from "react";
import "./cards.css"
import { AiFillEdit } from "react-icons/ai";
import { MdDelete } from "react-icons/md";


const Cards = (props) => {

    function showHideHandler(params) {
        let elem = document.getElementById("dot-box")
        elem.classList.toggle("hide")
    }

    return (
        <>
            {
                props.data ?
                    <div class="card card-body2 mt-3" style={{ height: "9.5rem" }}>
                        <div class="card-body">
                            <h5 class="card-title">{props.data.title}</h5>

                            <div style={{ display: "flex", justifyContent: "space-between" }}>
                                <span className="tags" style={{
                                    backgroundColor:
                                        (props.data.priority == "Medium")
                                            ? "#336699"
                                            : (props.data.priority == "High") ? "#FF0000" : "#999999"
                                }}
                                >{props.data.priority}</span>


                            </div>

                            <p class="card-text des">
                                {props.data.description}
                            </p>
                            <div>
                                <p className="date">Due date <br /> 12-12-2024</p>
                            </div>
                        </div>
                    </div >
                    : "null"
            }
        </>
    )
}

export default Cards;
