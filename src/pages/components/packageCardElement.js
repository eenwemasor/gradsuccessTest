import React from "react"
import{ jsx, css } from "@emotion/core"
import PryButton from "./pryButton"
import {Link} from 'gatsby'

const PackageCardElement = ({ imgUrl, title, text, buttonUrl,custom }) => (
  <div
    css={{
      background: "#19a99d",
      width: "250px",
      borderRadius: '5px',
      boxShadow: '0px 5px 10px rgba(59,132,117,0.5)',
      marginBottom: '50px'
    }}
  >
    <img src={imgUrl} alt="image for package" css={{marginBottom: '5px'}}/>
    <div
      css={{
        color: "white",
      padding: '0 1em 1em'
      }}
    >
      <h4 css={{marginBottom: '5px'}}>{title}</h4>
      <p css={{ fontSize: "13px", lineHeight: 1.2 }}>{text}</p>
      <Link to={buttonUrl}>
      <PryButton small={true} text="Get Started" /></Link>
    </div>
  </div>
)

export default PackageCardElement
