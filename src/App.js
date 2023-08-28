import React from "react";
import arrow from "./icon-arrow.svg"
import moment from "moment/moment";
require("moment-precise-range-plugin")

function App() {

    const [day, setDay] = React.useState("--")
    const [month, setMonth] = React.useState("--")
    const [year, setYear] = React.useState("--")
    const [formdata, setFormdata] = React.useState({
        day : "",
        month : "",
        year : ""
    })

    const [error, setError] = React.useState({
        day : false,
        month : false,
        year : false
    })
    // console.log(error)

    let dayinput = {
        border : error.day ? "1px solid hsl(0, 100%, 67%)" : "1px solid hsl(0, 0%, 86%)"
    }

    let monthinput = {
        border : error.month ? "1px solid hsl(0, 100%, 67%)" : "1px solid hsl(0, 0%, 86%)"
    }

    let yearinput = {
        border : error.year ? "1px solid hsl(0, 100%, 67%)" : "1px solid hsl(0, 0%, 86%)"
    }

    function updateInput(e) {
        setFormdata(prev => {
            return {
                ...prev,
                [e.target.name] : e.target.value
            }
        })
    }

    function calculateDate(e) {
        e.preventDefault()
        let currentdate = new Date()

        if (error.day || error.month || error.year) {
            setError({
                day : false,
                month : false,
                year : false
            })
        }

        if (parseInt(formdata.day) > 31 || formdata.day === ""){
            setError(prev => {
                return {
                    ...prev,
                    day : true
                }
            })
        }

        if (parseInt(formdata.month) > 12 || formdata.month === ""){
            setError(prev => {
                return {
                    ...prev,
                    month : true
                }
            })
        }

        if (parseInt(formdata.year) > currentdate.getFullYear() || formdata.year === ""){
            setError(prev => {
                return {
                    ...prev,
                    year : true
                }
            })
        }

        if (formdata.day <= 31 && formdata.month <= 12 && formdata.year <= currentdate.getFullYear() && formdata.day !== "" && formdata.month !== "" && formdata.year !== "") {
            let date = formdata.year + "-" + formdata.month + "-" + formdata.day + " 12:00:00"
            let beginning = moment(date, 'YYYY-MM-DD HH:mm:ss')
            let end = moment()
            let difference = moment.preciseDiff(beginning, end, true)
            console.log(difference)
            setDay(difference.days)
            setMonth(difference.months)
            setYear(difference.years)
        }
    }

    return (
        <div className="outer-container">
            <div className="main-container">
                <div className="date-inputs">
                    <div>
                        <p className="input-label" style={{color: error.day ? "hsl(0, 100%, 67%)" : "hsl(0, 1%, 44%)"}}>DAY</p>
                        <input type="text" name="day" maxLength={2} placeholder="DD" value={formdata.day} className="inputs" onChange={updateInput} style={dayinput}/>
                        {error.day && formdata.day !== "" && <p style={{color: "hsl(0, 100%, 67%)", fontSize: "0.72em"}}>Must be a valid day</p>}
                        {error.day && formdata.day === "" && <p style={{color: "hsl(0, 100%, 67%)", fontSize: "0.72em"}}>This field is required</p>}
                    </div>
                    <div>
                        <p className="input-label" style={{color: error.month ? "hsl(0, 100%, 67%)" : "hsl(0, 1%, 44%)"}}>MONTH</p>
                        <input type="text" name="month" maxLength={2} placeholder="MM" value={formdata.month} className="inputs" onChange={updateInput} style={monthinput}/>
                        {error.month && formdata.month !== "" && <p style={{color: "hsl(0, 100%, 67%)", fontSize: "0.72em"}}>Must be a valid month</p>}
                        {error.month && formdata.month === "" && <p style={{color: "hsl(0, 100%, 67%)", fontSize: "0.72em"}}>This field is required</p>}
                    </div>
                    <div>
                        <p className="input-label" style={{color: error.year ? "hsl(0, 100%, 67%)" : "hsl(0, 1%, 44%)"}}>YEAR</p>
                        <input type="text" name="year" maxLength={4} placeholder="YY" value={formdata.year} className="inputs" onChange={updateInput} style={yearinput}/>
                        {error.year && formdata.year !== "" && <p style={{color: "hsl(0, 100%, 67%)", fontSize: "0.72em"}}>Must be in the past</p>}
                        {error.year && formdata.year === "" && <p style={{color: "hsl(0, 100%, 67%)", fontSize: "0.72em"}}>This field is required</p>}
                    </div>
                </div>
                <div className="button-div">
                    <div className="line"></div>
                    <button className="button" onClick={calculateDate}>
                        <img src={arrow} alt="arrow" style={{height: "30px"}}/>
                    </button>
                </div>
                <p className="input-text"><span className="input-result">{year}</span> years</p>
                <p className="input-text"><span className="input-result">{month}</span> months</p>
                <p className="input-text"><span className="input-result">{day}</span> days</p>
            </div>
        </div>
    )
}

export default App