// testarea 엔터 키 누를 때 form 제출하기
const postTextArea = document.querySelector('#guestPostTxt');
postTextArea.addEventListener('keyup', e => {
  if (e.keyCode == '13') {
    const postForm = document.querySelector('#guestPostForm');
    postForm.submit(); //form 태그를 가져와서 button type='submit이 아니라도 submit을 실행시킬 수도 있구나
  }
});

// HTTP request with PUT method using fetchAPI to update the post
const postUpdateBtn = document.querySelectorAll('#postUpdateBtn');
postUpdateBtn.forEach(btn => {
  btn.addEventListener('click', e => {
    e.preventDefault();
    const fetchAndUpdate = () => {
      const reqData = {
        content: userInput
      };
      // console.log(e.target.parentElement.href);
      const url = e.target.parentElement.href;
      const postId = url.split('/')[4];
      // console.log(postId);

      fetch(`/visitor/${postId}/update`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(reqData)
      })
        .then(res => {
          console.log(`유저를 찾고 업데이트에 성공하였습니다 : ${res.status}`);
          const updatedDate = new Date();
          const updatedHTML = `${reqData.content}
        <br>
        <span class="published">업데이트 / 작성일자: ${updatedDate.toLocaleString(
          'ko-KR'
        )}</span>
          `;
          e.target.parentElement.parentElement.children[2].innerHTML = updatedHTML;
        })
        .catch(error => {
          console.log('서버 패치오류 :' + error);
        });
    };

    // 사용자 수정값 입력 (이런 구조로 프로그래밍을 짤 수 있는 이유가 궁금하다.)
    let userInput = prompt('수정할 내용을 입력하세요.');

    if (userInput) {
      fetchAndUpdate();
    } else {
      res.render('/visitor');
    }
  });
});
