fetch('https://services.api.no/api/acpcomposer/v1.1/search/content/?publicationDomain=www.ba.no&sort=lastPublishedDate&types=story')
    .then((response) => response.json())
    .then((data) => {
        render(data)
    }
)

function render(data) {
    const issues = data._embedded
    const content = document.getElementById("frontpage");

    issues.forEach(issue => {
        content.innerHTML += renderIssue(issue)
    });
}

function renderIssue(issue){
    console.log(issue)
    const imageUrlFromApi = issue._embedded.relations[0].fields.versions.large.url
    const linkUrl = issue._embedded.relations[1].fields.relativeUrl
    return `<div class="issueContent">
                <a href="https://www.ba.no${linkUrl}">
                    <h1>${issue.title}</h1>
                    <img src=${imageUrlFromApi}>
                </a>
            </div>`;
}

function getTitle(dataTitle, title){
    for (let i = 0; i <dataTitle.length; i++){
        let titleName = ""
        titleName += JSON.stringify(dataTitle[i].title);
        console.log(titleName)
        title.innerHTML = titleName;
        console.log(title)
    }
}


