import React from 'react';

class Vod_upload extends React.Component {

    handleSubmit(event) {
        event.preventDefault();
        
        const TITLE = event.target.TITLE.value;
        const CATEGORY = event.target.CATEGORY.value;
        const CONTENT = event.target.CONTENT.value;
        const IMAGEPATH = 'c:\\vod\\' + TITLE + '\\' + 'Thumbnail.jpg'

        fetch('http://localhost:3001/vod/upload', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            TITLE: TITLE,
            CATEGORY: CATEGORY,
            CONTENT: CONTENT,
            IMAGEPATH: IMAGEPATH,
          })
        })
        .then(res=>res.json())
        .then(res=>{
            if (res.success === 1) {
                alert('성공');
            }
            else {
                alert('실패');
            }
        })
      }

    render() {
        return(
            <div hidden={(localStorage.getItem('id') !== 'admin')}>
                <form onSubmit={this.handleSubmit}>
                    <p>타이틀 : <input id="TITLE"></input></p>
                    <p>내용 : <input id="CONTENT"></input></p>
                    <p>장르 : <input id="CATEGORY"></input></p>
                    <p><button type="submit">업로드</button></p>
                </form>
            </div>
        );
    }
}

export default Vod_upload;