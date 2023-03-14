const searchForm = document.querySelector('#searchForm');
const searchFormText = document.querySelector('#searchFormText');
const reposWrapper = document.querySelector('#reposWrapper');


searchForm.addEventListener('submit', (e) => {
  e.preventDefault();


  fetch('https://api.github.com/search/repositories?q=' + encodeURIComponent(searchFormText.value) + '&per_page=10')
    .then((response) => {
      if(response.ok) return response.json();
    })
    .then((data) => {
      console.log(data);
      reposWrapper.innerHTML = ``;
      data.items.forEach((item) => {
        reposWrapper.insertAdjacentHTML('beforeend', `
          <div>
            <a href="${item.html_url}" target="_blank">${item.full_name}</a>
            <span>${item.description}</span>
            <span>Stars: ${item.stargazers_count}</span>
          </div>
        `)
      })

      if(!data.items.length) {
        reposWrapper.innerHTML = `
          <span>Ничего не найдено</span>
        `;
      }
    })
})