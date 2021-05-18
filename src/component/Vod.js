import React from 'react';

class Vod extends React.Component {

    isAdmin() {
        if(localStorage.getItem('id') === 'admin') {
            return(
                <div>
                    <p><input type="file" id="video"/><input type="file" id="image"/></p>
                    <p>타이틀 : <input></input></p>
                    <p>내용 : <input></input></p>
                    <p>장르 : <input></input></p>
                    <p><button>업로드</button></p>
                </div>
            );
        } else {
            return(
                <div>

                </div>
            );
        }
    }

    render() {
        return(
            this.isAdmin()
        );
    }
}

export default Vod;