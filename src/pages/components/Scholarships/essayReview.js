import React from "react"
import PriceBox from "../../components/priceBox"
// this comment tells babel to convert jsx to calls to a function called jsx instead of React.createElement
/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import { Component } from "react"
import { connect } from "react-redux"


const breakpoints = [375, 576, 768 ]

const mq = breakpoints.map(
    bp => `@media (max-width: ${bp}px)`
)

 class EssayReview extends Component {

    constructor(props){
        super(props)
    }


    handleAddfunc(item){
        console.log('products',item);
    }


    render() {
      return (
        <div>
            <div css={{
                width: '70%',
                margin: '0px auto',
                padding: '50px 0px'
            }}>
            {/* TEXT */}
                <h2 css={{
                    color: '#19a99d'
                }}> Essay Review Plans </h2>
                <p> We are here to help at any stage of your essay writing process. The EssayReview service is best suited if you already have an essay that’s set to go and just needs some fine-tuning.</p>
                <br/>
                <p> Who is this service for? You, if you already have anEssay draft for:</p>
                <ul>
                <li>	Admission Statements </li>
                <li>	Cover Letters </li>
                <li>	Reference Letters. </li>
                
                </ul>
                <br/> <br/>
                <h2 css={{
                    color: '#19a99d'
                }}> A Quick Glance at Our Essay Review Plans </h2>
                <p > On this plan, we critically access the bigger story–Your assigned associate will assess your essays and check them for overall engagement. They will check if you have: </p>
                <ul>
                <li>	Satisfied the question. </li>
                <li>	Outlined your thoughts clearly. </li>
                <li>	Structured your essays in a logical flow. </li>
                <li>	Used captivating openings and aligned conclusions. </li>
                </ul>
                <br/>
                <p> The associate then gives feedback and recommends areas of improvement. You take it from here by implementing suggestions and sending a revised draft back. </p>
                <p> Evaluating between the Lines–Whilst our associates are keenly looking to see that your story connects on the surface, they also go deeper, focusing on the smaller details like clarity, spelling, formatting, sentence construction and variability. After this stage, the Associate sends you a final draft.</p>
                <p> Your submission is now ready! </p>
                <br/>
                <h2 css={{
                    color: '#19a99d'
                }}> Price </h2>
                <p> *Regular turnaround is two business-days on each submission. Flash turnaround is one business-day on each submission.*</p>
                <br/> <br/>

                <div css={{
                    display: 'flex',
                    width: '100%',
                    justifyContent: 'center',
                    margin: '0px auto',
                    [mq[2]]: {
                        flexDirection: 'column'
                    }
                }}>
                <PriceBox   text="STANDARD" price="N7,500"  form="coverLetterReviewForm" itemDescription = 'Essay Review (Graduate School Essay - STANDARD)'/>     
                <div css={{ width: '50px'}}> </div>
                <PriceBox text="FLASH PRICE" form="coverLetterReviewForm" price="N15,000"  itemDescription = 'Essay Review (Graduate School Essay - FLASH PRICE)' />
                </div>
            </div>
            {/* End  */}
            </div>
      )
    }
  
  
  }

export default EssayReview;