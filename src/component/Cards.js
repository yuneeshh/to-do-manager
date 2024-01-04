import React from "react";
import "./cards.css"


const Cards = (props) => {
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
                                        (props.data.priority === "Medium")
                                            ? "#336699"
                                            : (props.data.priority === "High") ? "#FF0000" : "#999999"
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
