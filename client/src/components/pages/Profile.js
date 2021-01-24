import React, {Component} from 'react'; 
import { get } from '../../utilities.js'; 

class Profile extends Component{
  constructor(props){
    super(props)
    console.log(props); 
    this.setState({
      user_info: null,
      loading: true
    })
  }

  componentDidMount() {
    get(`/api/profile_by_id?id=${this.props.userId}`).then((res)=>{
      console.log(res); 
      //do some setting state
    })
  }

  render() {
    if(this.state.loading){
      return (
        <div>Loading...</div>
      )
    }
    return(
      <div>
        <p>Hello world</p>
        {/* Display user info and if user_info_id === userId, then
        display edit button */}
      </div>
    )
  }

}

export default Profile; 