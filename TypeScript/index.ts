// html 조작시 narrowing 방법 5개

let title  = document.querySelector('#title');
if (title != null) {
    title.innerHTML = '반가워요';
}

// let title = document.querySelector('#title');
// if (title instanceof Element) {
//     title.innerHTML = '반가워요'
// }

// let title = document.querySelector('#title') as Element;
// title?.innerHTML = '반가워요'

// let title = document.querySelector('#title');
// if (title?.innerHTML != undefined) {         //제목에 innerHTML 있으면 출력, 없으면 undefined 옵셔널체인징
//     title.innerHTML = '반가워요'
// }

// strict 모드 끄던지...

let link = document.querySelector('.link');
    if (link instanceof HTMLAnchorElement ) {
    link.href = 'https://gentlepie.com' 
    }


