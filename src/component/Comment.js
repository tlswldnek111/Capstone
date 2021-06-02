import React, {useState} from 'react'

function Comment(props) {
    const [commentValue, setcommentValue] = useState('');

    const handleChange = (event) => {
        setcommentValue(event.currentTarget.value);
    };

    const onsubmit = (event) => {
      event.preventDefault();
      if(localStorage.getItem('id') === null) {
        props.history.push('login');
      } else {
        fetch('http://localhost:3001/board/write_reply', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            B_IDX: props.B_IDX,
            ID: localStorage.getItem('id'),
            CONTENT: commentValue
          })
        })
        .then(res=>res.json())
        .then(res=>{
          if(res.success === 1) {
            window.location.reload();
          } else {
            alert('댓글을 입력해주세요');
          }
        })
      }
    };

    return (
      <div>
        <br />
        <hr />
          <form style={{ display: 'flex' }} onSubmit={onsubmit}>
          <textarea
              style={{ width: 700, borderRadius: '5px' }}
              onChange={handleChange}
              value={commentValue}
              placeholder="코멘트를 작성해 주세요"
          />
          <br />
          <button style={{ width: '20%', height: '52px' }} onClick={onsubmit}>
              등록
          </button>
          </form>
      </div>
    );
  }

export default Comment