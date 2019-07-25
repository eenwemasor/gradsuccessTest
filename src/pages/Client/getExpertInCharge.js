import { React, Component } from "react"
import { Query } from "react-apollo";
import { GET_EXPERT_IN_CHARGE } from "../graphql/queries"

class getExpertInCharge extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }
    componentDidMount(){
        
    }

    handleDisplayComponent(event){
    }

  

    render() {
        return (

            <Query 
        query={GET_EXPERT_IN_CHARGE}
        variables={{ id:this.props.id }}
        >
            {({ loading, error, data }) => {
             if (loading) return (
                <div className = "loader">
                    <div className="loader_main_content">
                        <h1>loading...</h1>
                    </div>
                </div>
                )
              if (error) return <div>failed to load data</div>
              return (
                <div className = "expert_in_charge_board">
                    {data.getExpertInCharge.length != 0?
                    <div>
                    <h4>Assigned Expert</h4>
                    <p><span>Name:</span> {data.getExpertInCharge[0].first_name  + " " + data.getExpertInCharge[0].last_name}</p>
                    <p><span>Email:</span> {data.getExpertInCharge[0].email}</p>
                    </div>:
                    <div>
                        <p>Your Application<br /> 
                            is no Assigned yet</p>
                    </div>
                    }
                </div>
              );
            }}
        </Query>
        );
    }
}
export default getExpertInCharge