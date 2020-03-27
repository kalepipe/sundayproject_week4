import axios from 'axios';

// testarea 엔터 키 누를 때 form 제출하기
const postTextArea = document.querySelector('#guestPostTxt');
postTextArea.addEventListener('keyup', e => {
  if (e.keyCode == 13) {
    const postForm = document.querySelector('#guestPostForm');
    postForm.submit();
  }
});

// HTTP request with PUT method using fetchAPI to update the post
const postUpdateBtn = document.querySelectorAll('#postUpdateBtn');
postUpdateBtn.forEach(btn => {
  btn.addEventListener('click', e => {
    e.preventDefault();
    let userInput = prompt('수정할 내용을 입력하세요.');
    if (userInput) {
      const url = e.target.parentElement.href;
      const postId = url.split('/')[4];
      fetch(`/visitor/${postId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: userInput
      })
        .then(res => {
          console.log('fetch 업데이트에 성공 했습니다.');
          const updatedDate = new Date();
          const updateHTML = `${userInput}
          <br>
          <span class="published">업데이트 / 작성일자: ${updatedDate.toLocaleString('ko-KR')}</span>
          `;
          e.target.parentElement.parentElement.children[1].innerHTML = updateHTML;
        })
        .catch(error => {
          console.log('fetch error :' + error);
        });
    } else {
      res.render('/visitor');
    }
  });
});
