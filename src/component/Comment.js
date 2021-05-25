import React, {useState} from 'react'

function Comment() {

    const [commentValue, setcommentValue] = useState('');


    const handleChange = (event) => {
        setcommentValue(event.currentTarget.value);
      };

      const onsubmit = (event) => {  // Sumit에서 화면 리프레쉬 안하게
        event.preventDefault();
        };

    return (
      <div>
        <br />
        <hr />
  
        {/* Comment Lists */}
  
        {/* Root Comment Form */}
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