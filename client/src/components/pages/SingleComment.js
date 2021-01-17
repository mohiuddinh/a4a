import React, { useState } from 'react'
import { Comment, Avatar, Button, Input } from 'antd';
import Axios from 'axios';
import LikeDislikes from './LikeDislikes';
import { get, post } from '../../utilities.js'; 
const { TextArea } = Input;


function SingleComment(props) {
    const [CommentValue, setCommentValue] = useState("");
    const [OpenReply, setOpenReply] = useState(false);
    const [Loading, setLoading] = useState(true); 

    let writerId = null; 
    get('/api/whoami').then((res)=>{
      writerId = res.id; 
      setLoading(false);
    })

    const handleChange = (e) => {
        setCommentValue(e.currentTarget.value)
    }

    const openReply = () => {
        setOpenReply(!OpenReply)
    }

    const onSubmit = (e) => {
        e.preventDefault();

        const variables = {
            writer: writerId,
            questionId: props.questionId,
            responseTo: props.comment._id,
            content: CommentValue
        }


        post('/api/saveComment', variables)
            .then((res) => {
                if (res.success) {
                    setCommentValue("")
                    setOpenReply(!OpenReply)
                    props.refreshFunction(res.result)
                } else {
                    alert('Failed to save Comment')
                }
            })
    }

    // let replyText = null; 
    // if (props.displayReplyTo){
    //   replyText = <span onClick={openReply} key="comment-basic-reply-to">Reply to </span> ;
    // }
    const actions = [
      <LikeDislikes comment commentId={props.comment._id} userId={writerId}/>, 
      <span onClick={openReply} key="comment-basic-reply-to">Reply to </span>
    ]
    // if (props.displayReplyTo){
    //   actions.push(<span onClick={openReply} key="comment-basic-reply-to">Reply to </span>);
    // }

    if (Loading){
      return (
        <div>Loading</div>
      );
    };

    return (
        <div>
            <Comment
                actions={actions}
                author={props.comment.writer.fullName}
                content={
                    <p>
                        {props.comment.content}
                    </p>
                }
            ></Comment>


            {OpenReply &&
                <form style={{ display: 'flex' }} onSubmit={onSubmit}>
                    <TextArea
                        style={{ width: '100%', borderRadius: '5px' }}
                        onChange={handleChange}
                        value={CommentValue}
                        placeholder="comments"
                    />
                    <br />
                    <Button style={{ width: '20%', height: '52px' }} onClick={onSubmit}>Submit</Button>
                </form>
            }

        </div>
    )
}

export default SingleComment;