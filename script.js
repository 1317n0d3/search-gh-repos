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
      reposWrapper.innerHTML = ``;
      data.items.forEach((item) => {
        reposWrapper.insertAdjacentHTML('beforeend', `
          <div class="repo">
            <div>
              <a class="repo-link" href="${item.html_url}" target="_blank">${item.full_name}</a>
            </div>
            <span class="repo-description">${item.description}</span>
            <span class="repo-stars">${item.stargazers_count} ☆</span>
          </div>
        `)
      })

      if(!data.items.length) {
        reposWrapper.innerHTML = `
          <span class="not-found">Ничего не найдено</span>
        `;
      }
    })
})