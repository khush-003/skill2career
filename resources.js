/* ============================================================
   SKILL2CAREER - RESOURCES.JS
   Works with the provided resources.html
============================================================ */


/* ============================================================
   1. RESOURCE DATA
============================================================ */

const resources = [

    {
        title: "Programming Fundamentals",
        description:
            "Understand variables, operators, conditions, loops, functions and basic programming logic.",
        type: "Notes",
        level: "Beginner",
        course: "BCA",
        subject: "Programming",
        tags: ["C", "C++", "Programming"]
    },

    {
        title: "Data Structures & Algorithms",
        description:
            "Learn arrays, linked lists, stacks, queues, trees, graphs and algorithmic thinking.",
        type: "Notes",
        level: "Intermediate",
        course: "BCA",
        subject: "DSA",
        tags: ["DSA", "Algorithms", "Practice"]
    },

    {
        title: "Database Management Systems",
        description:
            "Learn database concepts, SQL, normalization, transactions and database design.",
        type: "Notes",
        level: "Intermediate",
        course: "BCA",
        subject: "DBMS",
        tags: ["SQL", "Database", "DBMS"]
    },

    {
        title: "Operating Systems",
        description:
            "Explore processes, threads, scheduling, memory management, file systems and security.",
        type: "Notes",
        level: "Intermediate",
        course: "BCA",
        subject: "Operating Systems",
        tags: ["OS", "Processes", "Theory"]
    },

    {
        title: "Computer Networks",
        description:
            "Learn networking fundamentals, protocols, OSI model, TCP/IP and network security.",
        type: "Notes",
        level: "Intermediate",
        course: "BCA",
        subject: "Computer Networks",
        tags: ["Networking", "TCP/IP", "Security"]
    },

    {
        title: "Web Development",
        description:
            "Build your foundation in HTML, CSS and JavaScript and gradually move toward modern web development.",
        type: "Guide",
        level: "Beginner",
        course: "BCA",
        subject: "Web Development",
        tags: ["HTML", "CSS", "JavaScript"]
    },

    {
        title: "Mathematics",
        description:
            "Important mathematical concepts required for computer applications and technical studies.",
        type: "Notes",
        level: "Beginner",
        course: "BCA",
        subject: "Mathematics",
        tags: ["Maths", "Practice"]
    },

    {
        title: "Statistics",
        description:
            "Learn descriptive statistics, probability, distributions and essential data concepts.",
        type: "Notes",
        level: "Beginner",
        course: "BCA",
        subject: "Statistics",
        tags: ["Statistics", "Data"]
    },

    {
        title: "Software Engineering",
        description:
            "Understand software development life cycles, requirements, testing and project management.",
        type: "Notes",
        level: "Intermediate",
        course: "BCA",
        subject: "Software Engineering",
        tags: ["SE", "Testing", "Theory"]
    }

];


/* ============================================================
   2. CAREER PATH → SKILLS
============================================================ */

const careerPaths = {

    "Software Developer": [
        "JavaScript",
        "React",
        "Data Structures",
        "Algorithms",
        "Git",
        "Web Development"
    ],

    "Frontend Developer": [
        "HTML",
        "CSS",
        "JavaScript",
        "React",
        "Responsive Design"
    ],

    "Backend Developer": [
        "Node.js",
        "Express",
        "JavaScript",
        "SQL",
        "MongoDB",
        "APIs"
    ],

    "Full Stack Developer": [
        "HTML",
        "CSS",
        "JavaScript",
        "React",
        "Node.js",
        "Express",
        "SQL",
        "Git"
    ],

    "Data Analyst": [
        "Python",
        "SQL",
        "Statistics",
        "Data Analysis",
        "Excel"
    ],

    "Data Scientist": [
        "Python",
        "SQL",
        "Statistics",
        "Machine Learning",
        "Data Science"
    ],

    "AI / ML Engineer": [
        "Python",
        "Machine Learning",
        "Artificial Intelligence",
        "Data Science",
        "Algorithms"
    ],

    "Cybersecurity Analyst": [
        "Cyber Security",
        "Computer Networks",
        "Linux",
        "Python",
        "Operating Systems"
    ],

    "UI/UX Designer": [
        "UI Design",
        "UX Design",
        "Figma",
        "Design",
        "User Research"
    ],

    "Cloud Engineer": [
        "Cloud Computing",
        "Linux",
        "Networking",
        "Docker",
        "AWS"
    ]

};


/* ============================================================
   3. API FUNCTIONS
============================================================ */


/* -------------------------
   OPEN LIBRARY
------------------------- */

async function getOpenLibraryResources(topic) {

    const url =
        `https://openlibrary.org/search.json?q=${encodeURIComponent(topic)}&limit=5&fields=key,title,author_name,first_publish_year`;

    try {

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("Open Library API failed");
        }

        const data = await response.json();

        return data.docs || [];

    } catch (error) {

        console.error("Open Library error:", error);

        return [];

    }

}


/* -------------------------
   WIKIPEDIA
------------------------- */

async function getWikipediaResource(topic) {

    const url =
        `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(topic)}`;

    try {

        const response = await fetch(url);

        if (!response.ok) {
            return null;
        }

        return await response.json();

    } catch (error) {

        console.error("Wikipedia error:", error);

        return null;

    }

}


/* -------------------------
   GITHUB
------------------------- */

async function getGitHubResources(topic) {

    const url =
        `https://api.github.com/search/repositories?q=${encodeURIComponent(topic + " learning")}&sort=stars&order=desc&per_page=4`;

    try {

        const response = await fetch(url, {
            headers: {
                "Accept": "application/vnd.github+json"
            }
        });

        if (!response.ok) {
            throw new Error("GitHub API failed");
        }

        const data = await response.json();

        return data.items || [];

    } catch (error) {

        console.error("GitHub error:", error);

        return [];

    }

}


/* ============================================================
   4. CREATE CAREER PATH UI
============================================================ */

const librarySection =
    document.querySelector(".library");

const libraryHeader =
    librarySection?.querySelector(".section-header");


if (libraryHeader) {

    const careerBox =
        document.createElement("div");

    careerBox.className =
        "career-path-box";

    careerBox.innerHTML = `

        <div class="career-path-heading">

            <div class="section-label">
                Career Learning Path
            </div>

            <h3>
                Find resources by your career path
            </h3>

            <p>
                Select a career to discover the skills
                and learning resources connected to it.
            </p>

        </div>


        <div class="career-path-selector">

            <select id="careerPathSelect">

                <option value="">
                    Choose a career path
                </option>

                ${Object.keys(careerPaths)
                    .map(career => `
                        <option value="${career}">
                            ${career}
                        </option>
                    `)
                    .join("")}

            </select>

        </div>


        <div id="careerPathResults"></div>

    `;

    libraryHeader.after(careerBox);

}


/* ============================================================
   5. CAREER PATH CSS
============================================================ */

const careerStyles =
    document.createElement("style");

careerStyles.textContent = `

.career-path-box {

    margin-top: 35px;
    padding: 30px;

    border: 1px solid #e2e7ef;

    border-radius: 18px;

    background:
        linear-gradient(
            135deg,
            #ffffff,
            #f7f9fc
        );

}


.career-path-heading h3 {

    margin: 8px 0;

    font-size: 22px;

}


.career-path-heading p {

    margin-bottom: 20px;

    color: #718096;

    font-size: 14px;

}


.career-path-selector select {

    width: 100%;

    max-width: 450px;

    padding: 13px 15px;

    border: 1px solid #d7dee9;

    border-radius: 9px;

    background: white;

    font-size: 14px;

    cursor: pointer;

    outline: none;

}


.career-path-selector select:focus {

    border-color: #315efb;

}


.career-skills {

    display: flex;

    flex-wrap: wrap;

    gap: 8px;

    margin: 25px 0;

}


.career-skill {

    padding: 7px 13px;

    border-radius: 20px;

    background: #edf2ff;

    color: #315efb;

    font-size: 12px;

    font-weight: 600;

}


.career-api-title {

    margin: 25px 0 15px;

}


.career-api-title h4 {

    margin-bottom: 5px;

}


.career-api-title p {

    color: #718096;

    font-size: 13px;

}


.career-api-grid {

    display: grid;

    grid-template-columns:
        repeat(3, 1fr);

    gap: 15px;

}


.career-api-card {

    padding: 20px;

    border: 1px solid #e2e7ef;

    border-radius: 13px;

    background: white;

    transition: .25s ease;

}


.career-api-card:hover {

    transform:
        translateY(-3px);

    box-shadow:
        0 10px 25px
        rgba(0,0,0,.07);

}


.career-api-source {

    display: inline-block;

    margin-bottom: 10px;

    color: #315efb;

    font-size: 10px;

    font-weight: 800;

    text-transform: uppercase;

}


.career-api-card h5 {

    margin-bottom: 8px;

    font-size: 15px;

}


.career-api-card p {

    color: #718096;

    font-size: 12px;

    line-height: 1.6;

}


.career-api-card a {

    display: inline-block;

    margin-top: 8px;

    color: #315efb;

    font-size: 12px;

    font-weight: 700;

    text-decoration: none;

}


.career-api-loading {

    padding: 25px 0;

    color: #718096;

}


@media(max-width: 800px) {

    .career-api-grid {

        grid-template-columns:
            repeat(2, 1fr);

    }

}


@media(max-width: 550px) {

    .career-api-grid {

        grid-template-columns: 1fr;

    }

    .career-path-box {

        padding: 20px;

    }

}

`;

document.head.appendChild(careerStyles);


/* ============================================================
   6. CAREER PATH SELECTION
============================================================ */

const careerSelect =
    document.querySelector("#careerPathSelect");


if (careerSelect) {

    careerSelect.addEventListener(
        "change",
        handleCareerChange
    );

}


/* ============================================================
   7. HANDLE CAREER CHANGE
============================================================ */

async function handleCareerChange() {

    const career =
        careerSelect.value;

    const result =
        document.querySelector("#careerPathResults");


    if (!career) {

        result.innerHTML = "";

        return;

    }


    const skills =
        careerPaths[career];


    /* -------------------------
       SHOW SKILLS
    ------------------------- */

    result.innerHTML = `

        <div class="career-skills">

            ${skills.map(skill => `

                <span class="career-skill">

                    ${skill}

                </span>

            `).join("")}

        </div>


        <div class="career-api-loading">

            Finding learning resources
            for <strong>${career}</strong>...

        </div>

    `;


    /*
       We use the first 3 skills for API
       requests to avoid sending too
       many requests at once.
    */

    const topics =
        skills.slice(0, 3);


    const results = [];


    for (const topic of topics) {

        const [

            books,
            wikipedia,
            github

        ] = await Promise.all([

            getOpenLibraryResources(topic),

            getWikipediaResource(topic),

            getGitHubResources(topic)

        ]);


        results.push({

            topic,
            books,
            wikipedia,
            github

        });

    }


    displayCareerResources(
        career,
        results
    );

}


/* ============================================================
   8. DISPLAY CAREER RESOURCES
============================================================ */

function displayCareerResources(
    career,
    results
) {

    const result =
        document.querySelector("#careerPathResults");


    let html = `

        <div class="career-api-title">

            <h4>
                Learning resources for ${career}
            </h4>

            <p>
                Resources discovered from public
                learning APIs.
            </p>

        </div>


        <div class="career-api-grid">

    `;


    results.forEach(item => {


        /* ====================================================
           WIKIPEDIA
        ==================================================== */

        if (item.wikipedia) {

            const wiki =
                item.wikipedia;

            const wikiURL =
                wiki
                    .content_urls
                    ?.desktop
                    ?.page;


            if (wikiURL) {

                html += `

                    <div class="career-api-card">

                        <span class="career-api-source">
                            Wikipedia
                        </span>

                        <h5>
                            ${wiki.title}
                        </h5>

                        <p>
                            ${
                                wiki.extract
                                    ? wiki.extract.substring(
                                        0,
                                        170
                                    )
                                    : `Learn about ${item.topic}.`
                            }
                        </p>

                        <a
                            href="${wikiURL}"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Read topic →
                        </a>

                    </div>

                `;

            }

        }


        /* ====================================================
           OPEN LIBRARY
        ==================================================== */

        item.books
            .slice(0, 2)
            .forEach(book => {

                const author =
                    book.author_name
                        ?.slice(0, 2)
                        .join(", ")
                        ||
                        "Unknown author";


                const bookURL =
                    book.key
                        ? `https://openlibrary.org${book.key}`
                        : `https://openlibrary.org/search?q=${encodeURIComponent(
                            item.topic
                        )}`;


                html += `

                    <div class="career-api-card">

                        <span class="career-api-source">
                            Open Library
                        </span>

                        <h5>
                            ${book.title || "Learning Book"}
                        </h5>

                        <p>
                            Author:
                            ${author}

                            <br>

                            Topic:
                            ${item.topic}
                        </p>

                        <a
                            href="${bookURL}"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Open resource →
                        </a>

                    </div>

                `;

            });


        /* ====================================================
           GITHUB
        ==================================================== */

        item.github
            .slice(0, 2)
            .forEach(repo => {

                html += `

                    <div class="career-api-card">

                        <span class="career-api-source">
                            GitHub
                        </span>

                        <h5>
                            ${repo.name}
                        </h5>

                        <p>
                            ${
                                repo.description
                                    ? repo.description.substring(
                                        0,
                                        160
                                    )
                                    : `Learning repository related to ${item.topic}.`
                            }
                        </p>

                        <a
                            href="${repo.html_url}"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Explore repository →
                        </a>

                    </div>

                `;

            });

    });


    html += `
        </div>
    `;


    result.innerHTML = html;

}


/* ============================================================
   9. EXISTING RESOURCE FILTERS
============================================================ */

const filterBar =
    document.querySelector(".filter-bar");


const selects =
    filterBar
        ? filterBar.querySelectorAll("select")
        : [];


const resourceGrid =
    document.querySelector(".resource-grid");


/* ============================================================
   10. ADD DATA ATTRIBUTES TO EXISTING CARDS
============================================================ */

const resourceCards =
    document.querySelectorAll(
        ".resource-card"
    );


resourceCards.forEach((card, index) => {

    const resource =
        resources[index];

    if (!resource) {
        return;
    }


    card.dataset.course =
        resource.course;

    card.dataset.subject =
        resource.subject;

    card.dataset.level =
        resource.level;

    card.dataset.type =
        resource.type;

    card.dataset.title =
        resource.title.toLowerCase();

});


/* ============================================================
   11. FILTER FUNCTION
============================================================ */

function filterResources() {

    if (!selects.length) {
        return;
    }


    const course =
        selects[0].value;


    const subject =
        selects[1].value;


    const level =
        selects[2].value;


    resourceCards.forEach(card => {

        const cardCourse =
            card.dataset.course;


        const cardSubject =
            card.dataset.subject;


        const cardLevel =
            card.dataset.level;


        const courseMatch =
            course === "All Courses" ||
            cardCourse === course;


        const subjectMatch =
            subject === "All Subjects" ||
            cardSubject === subject;


        const levelMatch =
            level === "All Levels" ||
            cardLevel === level;


        if (
            courseMatch &&
            subjectMatch &&
            levelMatch
        ) {

            card.style.display = "";

        } else {

            card.style.display = "none";

        }

    });

}


/* ============================================================
   12. FILTER EVENTS
============================================================ */

selects.forEach(select => {

    select.addEventListener(
        "change",
        filterResources
    );

});


/* ============================================================
   13. SEARCH
============================================================ */

const searchBox =
    document.querySelector(
        ".search-box"
    );


const searchInput =
    searchBox?.querySelector(
        "input"
    );


const searchButton =
    searchBox?.querySelector(
        ".search-btn"
    );


/* ============================================================
   14. CREATE SEARCH RESULT AREA
============================================================ */

const library =
    document.querySelector(
        ".library"
    );


const resourceGridOriginal =
    document.querySelector(
        ".resource-grid"
    );


let searchResultsContainer =
    document.querySelector(
        "#search-results"
    );


if (
    library &&
    !searchResultsContainer
) {

    searchResultsContainer =
        document.createElement(
            "div"
        );

    searchResultsContainer.id =
        "search-results";

    searchResultsContainer.style.display =
        "none";

    searchResultsContainer.innerHTML = `

        <div class="search-results-heading">

            <h3>
                Search Results
            </h3>

            <p id="search-result-text"></p>

        </div>

        <div
            id="search-results-grid"
            class="resource-grid"
        ></div>

    `;


    library.appendChild(
        searchResultsContainer
    );

}


/* ============================================================
   15. SEARCH CSS
============================================================ */

const searchStyles =
    document.createElement(
        "style"
    );


searchStyles.textContent = `

#search-results {

    margin-top: 40px;

}


.search-results-heading {

    margin-bottom: 20px;

}


.search-results-heading h3 {

    margin-bottom: 5px;

}


.search-results-heading p {

    color: #718096;

    font-size: 13px;

}


.search-empty {

    padding: 35px;

    border: 1px solid #e2e7ef;

    border-radius: 14px;

    text-align: center;

    color: #718096;

}

`;


document.head.appendChild(
    searchStyles
);


/* ============================================================
   16. SEARCH FUNCTION
============================================================ */

async function performSearch() {

    if (!searchInput) {
        return;
    }


    const query =
        searchInput.value
            .trim()
            .toLowerCase();


    if (!query) {

        clearSearch();

        return;

    }


    /*
       Hide normal resource cards while
       displaying search results.
    */

    if (resourceGridOriginal) {

        resourceGridOriginal.style.display =
            "none";

    }


    searchResultsContainer.style.display =
        "block";


    const resultText =
        document.querySelector(
            "#search-result-text"
        );


    const resultsGrid =
        document.querySelector(
            "#search-results-grid"
        );


    resultText.textContent =
        `Results related to "${searchInput.value.trim()}"`;


    resultsGrid.innerHTML = `

        <div class="search-empty">

            Searching your resource library...

        </div>

    `;


    /* ========================================================
       LOCAL RESULTS
    ======================================================== */

    const localResults =
        resources.filter(resource => {

            const searchableText = [

                resource.title,

                resource.description,

                resource.type,

                resource.level,

                resource.course,

                resource.subject,

                ...resource.tags

            ]
                .join(" ")
                .toLowerCase();


            return searchableText.includes(
                query
            );

        });


    renderLocalSearchResults(
        localResults
    );


    /* ========================================================
       API RESULTS
    ======================================================== */

    await searchLearningAPIs(
        searchInput.value.trim()
    );

}


/* ============================================================
   17. RENDER LOCAL SEARCH RESULTS
============================================================ */

function renderLocalSearchResults(
    results
) {

    const resultsGrid =
        document.querySelector(
            "#search-results-grid"
        );


    if (!results.length) {

        resultsGrid.innerHTML = `

            <div class="search-empty">

                No matching resources in
                the Skill2Career library.

            </div>

        `;

        return;

    }


    resultsGrid.innerHTML = "";


    results.forEach(resource => {

        resultsGrid.innerHTML += `

            <div class="resource-card">

                <div class="resource-top">

                    <span class="resource-type">
                        ${resource.type}
                    </span>

                    <span class="resource-level">
                        ${resource.level}
                    </span>

                </div>


                <h3>
                    ${resource.title}
                </h3>


                <p>
                    ${resource.description}
                </p>


                <div class="resource-meta">

                    <span class="meta">
                        ${resource.course}
                    </span>

                    <span class="meta">
                        ${resource.subject}
                    </span>

                    ${resource.tags
                        .slice(0, 2)
                        .map(tag =>
                            `<span class="meta">${tag}</span>`
                        )
                        .join("")}

                </div>


                <div class="resource-footer">

                    <span class="source">
                        SKILL2CAREER
                    </span>

                    <a
                        href="#"
                        class="view-btn"
                        onclick="return false;"
                    >
                        Resource Available →
                    </a>

                </div>

            </div>

        `;

    });

}


/* ============================================================
   18. API SEARCH RESULTS
============================================================ */

async function searchLearningAPIs(
    query
) {

    const resultsGrid =
        document.querySelector(
            "#search-results-grid"
        );


    const [

        books,
        wikipedia,
        github

    ] = await Promise.all([

        getOpenLibraryResources(
            query
        ),

        getWikipediaResource(
            query
        ),

        getGitHubResources(
            query
        )

    ]);


    let apiHTML = `

        <div
            class="api-search-section"
            style="grid-column:1/-1;margin-top:25px;"
        >

            <div class="section-label">
                External Learning Resources
            </div>

            <h3 style="margin:8px 0;">
                More resources for "${query}"
            </h3>

        </div>

    `;


    /* ========================================================
       WIKIPEDIA
    ======================================================== */

    if (wikipedia) {

        const wikiURL =
            wikipedia
                .content_urls
                ?.desktop
                ?.page;


        if (wikiURL) {

            apiHTML += `

                <div class="resource-card">

                    <div class="resource-top">

                        <span class="resource-type">
                            Wikipedia
                        </span>

                    </div>


                    <h3>
                        ${wikipedia.title}
                    </h3>


                    <p>

                        ${
                            wikipedia.extract
                                ? wikipedia.extract.substring(
                                    0,
                                    220
                                )
                                : "Topic information."
                        }

                    </p>


                    <div class="resource-footer">

                        <span class="source">
                            API RESOURCE
                        </span>

                        <a
                            href="${wikiURL}"
                            target="_blank"
                            rel="noopener noreferrer"
                            class="view-btn"
                        >
                            Read Resource →
                        </a>

                    </div>

                </div>

            `;

        }

    }


    /* ========================================================
       OPEN LIBRARY
    ======================================================== */

    books
        .slice(0, 3)
        .forEach(book => {

            const bookURL =
                book.key
                    ? `https://openlibrary.org${book.key}`
                    : `https://openlibrary.org/search?q=${encodeURIComponent(
                        query
                    )}`;


            apiHTML += `

                <div class="resource-card">

                    <div class="resource-top">

                        <span class="resource-type">
                            Book
                        </span>

                    </div>


                    <h3>
                        ${book.title || "Learning Book"}
                    </h3>


                    <p>

                        ${
                            book.author_name
                                ? book.author_name
                                    .slice(0, 2)
                                    .join(", ")
                                : "Unknown author"
                        }

                    </p>


                    <div class="resource-footer">

                        <span class="source">
                            OPEN LIBRARY API
                        </span>

                        <a
                            href="${bookURL}"
                            target="_blank"
                            rel="noopener noreferrer"
                            class="view-btn"
                        >
                            Open Book →
                        </a>

                    </div>

                </div>

            `;

        });


    /* ========================================================
       GITHUB
    ======================================================== */

    github
        .slice(0, 3)
        .forEach(repo => {

            apiHTML += `

                <div class="resource-card">

                    <div class="resource-top">

                        <span class="resource-type">
                            Repository
                        </span>

                    </div>


                    <h3>
                        ${repo.name}
                    </h3>


                    <p>

                        ${
                            repo.description
                                ? repo.description.substring(
                                    0,
                                    200
                                )
                                : "Learning repository."
                        }

                    </p>


                    <div class="resource-footer">

                        <span class="source">
                            GITHUB API
                        </span>

                        <a
                            href="${repo.html_url}"
                            target="_blank"
                            rel="noopener noreferrer"
                            class="view-btn"
                        >
                            Explore Repository →
                        </a>

                    </div>

                </div>

            `;

        });


    if (
        apiHTML.trim()
    ) {

        resultsGrid.insertAdjacentHTML(
            "beforeend",
            apiHTML
        );

    }

}


/* ============================================================
   19. ENTER KEY SEARCH
============================================================ */

if (searchInput) {

    searchInput.addEventListener(
        "keydown",
        event => {

            if (
                event.key === "Enter"
            ) {

                event.preventDefault();

                performSearch();

            }

        }
    );

}


/* ============================================================
   20. SEARCH BUTTON
============================================================ */

if (searchButton) {

    searchButton.addEventListener(
        "click",
        performSearch
    );

}


/* ============================================================
   21. CLEAR SEARCH WHEN INPUT IS EMPTY
============================================================ */

if (searchInput) {

    searchInput.addEventListener(
        "input",
        () => {

            if (
                searchInput.value.trim() === ""
            ) {

                clearSearch();

            }

        }
    );

}


/* ============================================================
   22. CLEAR SEARCH
============================================================ */

function clearSearch() {

    if (resourceGridOriginal) {

        resourceGridOriginal.style.display =
            "";

    }


    if (searchResultsContainer) {

        searchResultsContainer.style.display =
            "none";

    }

}


/* ============================================================
   23. SUBJECT CLICK
============================================================ */

const subjects =
    document.querySelectorAll(
        ".subject"
    );


subjects.forEach(subject => {

    subject.style.cursor =
        "pointer";


    subject.addEventListener(
        "click",
        () => {

            const subjectName =
                subject
                    .querySelector(
                        ".subject-name"
                    )
                    ?.textContent
                    .trim();


            if (!subjectName) {
                return;
            }


            if (searchInput) {

                searchInput.value =
                    subjectName;

            }


            performSearch();


            const libraryTop =
                library
                    ?.getBoundingClientRect()
                    .top +
                window.scrollY -
                80;


            if (library) {

                window.scrollTo({

                    top:
                        libraryTop,

                    behavior:
                        "smooth"

                });

            }

        }
    );

});


/* ============================================================
   24. RESOURCE TYPE CARDS
============================================================ */

const typeCards =
    document.querySelectorAll(
        ".type-card"
    );


typeCards.forEach(card => {

    card.style.cursor =
        "pointer";


    card.addEventListener(
        "click",
        () => {

            const title =
                card
                    .querySelector("h3")
                    ?.textContent
                    .trim();


            if (!title) {
                return;
            }


            let searchTerm =
                title;


            if (
                title === "Study Notes"
            ) {

                searchTerm =
                    "notes";

            }


            if (
                title === "Course Material"
            ) {

                searchTerm =
                    "course";

            }


            if (
                title === "Career Guides"
            ) {

                searchTerm =
                    "career";

            }


            if (
                title === "Roadmaps"
            ) {

                searchTerm =
                    "roadmap";

            }


            if (searchInput) {

                searchInput.value =
                    searchTerm;

            }


            performSearch();

        }
    );

});


/* ============================================================
   25. INITIAL FILTER STATE
============================================================ */

filterResources();


/* ============================================================
   END
============================================================ */