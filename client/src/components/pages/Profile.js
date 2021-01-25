import React, { Component } from "react";
import { get } from "../../utilities.js";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { navigate } from "@reach/router";

import EditProfile from "./EditProfile.js";

import "../../css/Profile.css";

class Profile extends Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      id: "",
      loading: true,
      description: "",
      username: "",
      iconColor: "",
      major: "",
      occupation: "",
      email: "",
    };
  }

  componentDidMount() {
    get(`/api/profile_by_id/${this.props.id}`).then((res) => {
      console.log(res.user);
      const { description, username, iconColor, major, occupation, email, _id } = res.user[0];
      this.setState(
        {
          id: _id,
          loading: false,
          description: description,
          username: username,
          iconColor: iconColor,
          major: major,
          occupation: occupation,
          email: email,
        },
        () => {
          console.log(this.state.id);
        }
      );
    });
  }

  newPage = () => {
    console.log(this.state.id);
    navigate(`/profile/edit/${this.state.id}`).then(() => {
      return (
        <EditProfile
          userId={this.props.id}
          description={this.state.description}
          iconColor={this.state.iconColor}
          major={this.state.major}
          occupation={this.state.occupation}
          email={this.state.email}
        />
      );
    });
  };

  render() {
    if (this.state.loading) {
      return <div>Loading...</div>;
    }
    return (
      <div className="profile">
        <div className="profile__container">
          <div className="profile__info">
            <div className="profile__infoSub">
              <AccountCircleIcon style={{ color: this.state.iconColor }} fontSize="large" />
            </div>
            <div className="profile__infoSub">{this.state.username}</div>
            <div className="profile__infoSub">
              <span>Major:</span>
              {this.state.major}
            </div>
            <div className="profile__infoSub">
              <span>Year:</span>
              {this.state.occupation}
            </div>
            <div className="profile__infoSub">{this.state.email}</div>
            <div className="profile__infoSub">
              {this.props.userId === this.props.id ? (
                <button className="btn-userActions btn-slide-edit" onClick={this.newPage}>
                  Edit
                </button>
              ) : null}
            </div>
          </div>
          <div className="profile__main">
            <div className="profile__mainBio">
              <span>Bio:</span>
              <p>{this.state.description}</p>
            </div>
            <div className="profile__mainPosts">
              <span>Posts</span>
              <p>
                ALL THE POSTS WILL GO HERE Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Quidem voluptates quod illo, ab quas modi, repellendus deleniti error, aliquid ut
                dignissimos hic provident! Fugit ut repellendus eos eius numquam sequi, molestiae
                necessitatibus praesentium minima enim possimus iure debitis dicta blanditiis, modi
                quod, ex laudantium molestias nostrum ipsa? Corporis officiis dolore reiciendis aut
                atque alias est eos magni suscipit debitis sint, voluptatum veniam ipsum repudiandae
                iure vel aliquam nobis illum tenetur expedita non labore, similique magnam aperiam!
                Possimus voluptates error repudiandae fuga sequi, ipsa excepturi inventore incidunt
                deleniti eum quaerat quod illum dolore tempore, eaque corporis aut explicabo
                aspernatur? Culpa, reiciendis? Lorem ipsum dolor sit amet consectetur adipisicing
                elit. Cum est sint magni natus vitae, nihil officia aut officiis eligendi dolorum
                nemo autem reiciendis totam sapiente culpa ipsa hic enim quis, architecto pariatur
                libero accusamus! Adipisci quasi dolor aut repudiandae quos nam ex explicabo quis
                deserunt necessitatibus expedita ipsam, incidunt doloribus animi placeat dolorem
                quibusdam maxime in quaerat eius sit facilis? Animi, neque quidem adipisci aliquam
                vel quos accusamus pariatur laudantium sint consequatur deserunt exercitationem
                nesciunt voluptatum a consequuntur laboriosam eligendi nisi mollitia numquam
                repudiandae possimus ipsa eum aliquid earum? Nihil debitis sequi quod necessitatibus
                impedit quaerat, beatae est dolore! Voluptatibus ad minus nihil. Ullam consectetur
                dolore exercitationem deserunt, amet facilis necessitatibus veritatis rem, ad illo
                perspiciatis dolorem provident omnis autem delectus neque nisi. Rem voluptas illum
                totam molestias voluptatum, repellendus quisquam delectus ad voluptates modi alias
                reiciendis nisi nam illo distinctio voluptate saepe excepturi id animi ullam
                laudantium adipisci exercitationem. Magni, ex at. Quod expedita ratione ipsum
                aperiam eos in, debitis, recusandae ducimus harum minus atque, error suscipit
                quibusdam dolorem qui molestias deleniti optio dicta maxime modi facere eveniet
                doloremque beatae iste! Libero quae exercitationem corrupti et officia eos
                architecto animi aspernatur corporis quaerat? Libero tenetur dolorum assumenda
                eaque, facilis reiciendis esse at, possimus blanditiis cupiditate praesentium culpa
                iure odio, repellat laudantium ex eum id! Rerum aspernatur fugiat harum excepturi
                praesentium facere, soluta velit vitae aliquid nisi veniam suscipit consequuntur
                cupiditate nulla! Nihil excepturi aliquid ad provident illo alias tempora illum
                neque amet vel odit, animi ratione modi quam repudiandae perferendis non incidunt,
                voluptatem obcaecati, a quibusdam eligendi! Velit voluptatum sapiente assumenda
                adipisci possimus rem nisi, quae consectetur at expedita, iure doloribus odio ad,
                voluptatem voluptatibus! Ab repellat explicabo obcaecati deserunt harum fugiat
                necessitatibus error quaerat ullam ex quas quos consectetur doloribus enim illo,
                rem, ipsa numquam ratione cumque nihil excepturi accusamus aliquam ut sapiente? At
                velit praesentium omnis consequuntur fugiat nemo, ut distinctio soluta. Quaerat
                excepturi nemo nulla rem voluptatem exercitationem similique esse tempora sit
                accusamus tenetur sequi impedit vitae odio velit magnam voluptates deleniti enim
                minus hic praesentium dolor, doloremque necessitatibus optio. Similique, minus.
                Dolorum culpa, quasi neque nesciunt recusandae praesentium suscipit porro
                distinctio, repellat aspernatur quam odit dicta? Modi quod, aliquid officia illo
                provident harum consequatur sequi saepe culpa? Vitae, quod ad? Eaque quis laboriosam
                molestiae, deleniti placeat omnis laudantium, sit ipsa alias perferendis ipsum id et
                ullam eum natus eveniet porro ut molestias iure aspernatur distinctio temporibus
                veniam aut. Dicta, porro! Sapiente est expedita dolorum dolor accusantium aliquam
                impedit reiciendis explicabo quidem architecto quia facilis assumenda magnam culpa
                qui nihil ab blanditiis sequi aperiam numquam saepe, recusandae cupiditate aut
                provident. Eius repudiandae reiciendis quisquam libero mollitia voluptatum ipsam,
                ullam eos voluptas illo nesciunt at blanditiis aspernatur, adipisci voluptate maxime
                cum autem sint alias fugiat fuga voluptatibus perferendis optio! Temporibus est
                molestias rem! Quo, ducimus. Corrupti consequatur eius corporis. Atque asperiores
                officia ratione natus cupiditate eveniet deserunt rerum voluptatibus culpa voluptate
                ipsum qui, quis, fugit sint odit delectus pariatur commodi minus obcaecati. Minima
                exercitationem temporibus fuga cum.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Profile;
