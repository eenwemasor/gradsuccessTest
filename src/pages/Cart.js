import React from "react"
import Layout from "./components/layout"
import HomeHero from "./components/homeHero"
import ItemInCart from "./components/itemInCart"

class Contact extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <Layout>

          <div
          css={{
            background: "white",
            padding: "3em 1em",
          }}
        >
          <ItemInCart />
        </div>
      </Layout>
    )
  }
}

export default Contact
