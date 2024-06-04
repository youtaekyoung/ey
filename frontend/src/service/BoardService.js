import axios from "axios";

//const USER_API_BASE_URL = 'https://183.101.134.54:8073/api/v1';
//const USER_API_BASE_URL = 'https://14.54.176.241:8073/api/v1';

const USER_API_BASE_URL = 'https://a323-183-101-134-54.ngrok-free.app/api/v1';

class BoardService{
    //메인화면에서 보이는 게시판의 경우
    //총 3개, 5개이지만 갯수가 적어서 3개 5개가 아닐 수 있음
    //좋아요는 like로 묶어서 보냈고, 최신은 latest로 묶어서 보냈음

    /* 메인 게시판 */
    //메인화면 댓글 게시판
    mainReplyBoard(){
        return axios.get(USER_API_BASE_URL+"/main/board/reply",{headers : {'ngrok-skip-browser-warning':'69420'}});
    }

    //메인화면 파일 게시판
    mainFileBoard(){
        return axios.get(USER_API_BASE_URL+"/main/board/file",{headers : {'ngrok-skip-browser-warning':'69420'}});
    }


    /* 게시판 */
    //댓글 게시판
    //게시글 전체 조회
    getReplyBoardAll(){
        return axios.get(USER_API_BASE_URL+"/board/reply",{headers : {'ngrok-skip-browser-warning':'69420'}});
    }

    //게시판 상세 조회
    //게시글의 글번호(boardSeq)와 로그인되어있는 아이디(id)를 보내주셔야 합니다
    //로그인된 아이디가 없을땐 "null" 값으로 보내주세요
    //게시글은 boardVo에 담아보내고, (공통)
    //댓글은 replyVos에 담았고, (댓글 게시판)
    //파일은 fileVos에 담아서 보냈습니다 (파일 게시판)

    //댓글의 경우 groupnum은 하나의 댓글(+답글이 포함된) 묶음입니다
    //depthnum은 댓글의 깊이를 뜻합니다(depth => 0(본 댓글) ,1,2,.. (답글이 달리는 순서))

    //로그인된 아이디가 게시글 혹은 댓글에 좋아요가 들어있는지 확인할 수 있게 Y와 N으로 보냈습니다
    //만약 좋아요나 싫어요가 눌린 상태라면 Y 아니라면 N입니다
    //게시글 좋아요(boardLikes)
    //게시글 싫어요(boardDislikes)
    //댓글 좋아요(replyVos.replyLikes)
    //댓글 싫어요(replyVos.replyDislikes)
    getBoardOne(boardSeq,id){
        return axios.get(USER_API_BASE_URL+"/board/"+boardSeq+"/"+id,{headers : {'ngrok-skip-browser-warning':'69420'}});
    }

    //댓글 게시판 글 작성
    //게시글의 제목(title), 내용(content), 작성자(id)를 json으로 보내주세요
    insertReplyBoard(boardVo){
        return axios.post(USER_API_BASE_URL+"/board/reply",boardVo,{headers : {'ngrok-skip-browser-warning':'69420'}});
    }

    /* 댓글 */
    //댓글의 성공 return은 ok입니다
    //삭제의 경우 성공시 ok, 실패시 경우에 따라 return 값이 다릅니다
    //댓글 작성
    //댓글의 내용(content), 작성자(id), 댓글을 작성하는 글의 번호(boardseq)를 json으로 보내주세요
    insertReply(replyVo){
        return axios.post(USER_API_BASE_URL+"/reply",replyVo,{headers : {'ngrok-skip-browser-warning':'69420'}});
    }

    //답글 작성
    //답글의 내용(content), 작성자(id), 답글을 작성하는 댓글의 번호(replyseq)를 json으로 보내주세요
    insertReplyReply(replyVo){
        return axios.post(USER_API_BASE_URL+"/replyReply",replyVo,{headers : {'ngrok-skip-browser-warning':'69420'}});
    }

    //댓글 삭제
    //삭제하려는 댓글의 번호(replyseq)를 보내주세요
    deleteReply(replySeq){
        return axios.patch(USER_API_BASE_URL+"/reply/"+replySeq,{headers : {'ngrok-skip-browser-warning':'69420'}});
    }


    //파일 게시판
    //게시글 전체 조회
    getFileBoardAll(){
        return axios.get(USER_API_BASE_URL+"/board/file",{headers : {'ngrok-skip-browser-warning':'69420'}});
    }

    //파일 게시판 글 작성
    //게시글의 제목(title), 내용(content), 작성자(id), 파일들(files)을 form-data로 보내주세요
    //파일이 없을경우 form-data에 담지 말아주세요
    //파일의 경우 최대 16MB입니다
    //form header에 multipart/form-data 담아서 보내주세요
    insertFileBoard(formData){
        return axios.post(USER_API_BASE_URL+"/board/file",formData,{headers : {'ngrok-skip-browser-warning':'69420'}});
    }

    //파일 다운로드
    //파일번호을 담아서 보내주세요
    downloadFile(fileSeq){
        return axios.get(USER_API_BASE_URL+"/download/"+fileSeq,{headers : {'ngrok-skip-browser-warning':'69420'}})
    }

    //게시글 삭제
    deleteboard(boardSeq){
        return axios.patch(USER_API_BASE_URL+"/board/delete/"+boardSeq,{headers : {'ngrok-skip-browser-warning':'69420'}});
    }


    //게시글 및 댓글의 좋아요나 싫어요는 해당 메서드 성공시 ok, 실패시 no라는 답변으로 return 됩니다
    //게시글은 boardSeq와 id 값을 보내주시고
    //댓글의 경우 replySeq와 id 값을 보내주시면 됩니다

    //게시글 좋아요
    boardLikes(boardSeq, id){
        return axios.get(USER_API_BASE_URL+"/board/likes/"+boardSeq+"/"+id,{headers : {'ngrok-skip-browser-warning':'69420'}});
    }
    //게시글 좋아요 취소
    cancelBoardLikes(boardSeq, id){
        return axios.delete(USER_API_BASE_URL+"/board/cancelLikes/"+boardSeq+"/"+id,{headers : {'ngrok-skip-browser-warning':'69420'}});
    }
    //게시글 싫어요
    boardDislikes(boardSeq, id){
        return axios.get(USER_API_BASE_URL+"/board/dislikes/"+boardSeq+"/"+id,{headers : {'ngrok-skip-browser-warning':'69420'}});
    }
    //게시글 싫어요 취소
    cancelboardDislikes(boardSeq, id){
        return axios.delete(USER_API_BASE_URL+"/board/cancelDislikes/"+boardSeq+"/"+id,{headers : {'ngrok-skip-browser-warning':'69420'}});
    }

    //댓글 좋아요
    replyLikes(replySeq, id){
        return axios.get(USER_API_BASE_URL+"/reply/likes/"+replySeq+"/"+id,{headers : {'ngrok-skip-browser-warning':'69420'}});
    }
    //댓글 좋아요 취소
    cancelReplyLikes(replySeq, id){
        return axios.delete(USER_API_BASE_URL+"/reply/cancelLikes/"+replySeq+"/"+id,{headers : {'ngrok-skip-browser-warning':'69420'}});
    }
    //댓글 싫어요
    replyDislikes(replySeq, id){
        return axios.get(USER_API_BASE_URL+"/reply/dislikes/"+replySeq+"/"+id,{headers : {'ngrok-skip-browser-warning':'69420'}});
    }
    //댓글 싫어요 취소
    cancelReplyDislikes(replySeq, id){
        return axios.delete(USER_API_BASE_URL+"/reply/cancelDislikes/"+replySeq+"/"+id,{headers : {'ngrok-skip-browser-warning':'69420'}});
    }
}

export default new BoardService();