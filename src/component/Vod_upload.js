import React from 'react';

class Vod_upload extends React.Component {
    render() {
        return(
            <div>
                <p><input type="file" id="video"/><input type="file" id="image"/></p>
                <p>타이틀 : <input></input></p>
                <p>내용 : <input></input></p>
                <p>장르 : <input></input></p>
                <p><button>업로드</button></p>
            </div>
        );
    }
}

export default Vod_upload;