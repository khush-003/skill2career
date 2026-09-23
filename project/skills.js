
/* =====================================================
   SKILL2CAREER - SKILLS PAGE JAVASCRIPT
===================================================== */


/* =====================================================
   1. SKILL DATA
===================================================== */

const careers = {

    "software-development": {

        name: "Software Developer",

        core: [
            "Programming",
            "HTML",
            "CSS",
            "JavaScript",
            "Problem Solving"
        ],

        analytical: [
            "Logical Thinking",
            "Problem Solving",
            "Data Structures"
        ],

        professional: [
            "Communication",
            "Teamwork"
        ],

        tools: [
            "Git",
            "GitHub",
            "VS Code"
        ]

    },


    "data-analyst": {

        name: "Data Analyst",

        core: [
            "Excel",
            "SQL",
            "Data Analysis",
            "Statistics"
        ],

        analytical: [
            "Data Interpretation",
            "Critical Thinking",
            "Problem Solving"
        ],

        professional: [
            "Communication",
            "Presentation"
        ],

        tools: [
            "Excel",
            "Power BI",
            "Python"
        ]

    },


    "digital-marketing": {

        name: "Digital Marketing",

        core: [
            "Digital Marketing",
            "SEO",
            "Content Marketing",
            "Social Media Marketing",
            "Email Marketing"
        ],

        analytical: [
            "Data Analysis",
            "Market Analysis",
            "Performance Analysis"
        ],

        professional: [
            "Communication",
            "Creativity",
            "Presentation"
        ],

        tools: [
            "Analytics Platforms",
            "Content Management Tools",
            "Advertising Platforms"
        ]

    },


    "teacher": {

        name: "Teacher",

        core: [
            "Teaching",
            "Lesson Planning",
            "Subject Knowledge"
        ],

        analytical: [
            "Critical Thinking",
            "Research",
            "Problem Solving"
        ],

        professional: [
            "Communication",
            "Presentation",
            "Leadership"
        ],

        tools: [
            "Digital Learning Tools",
            "Presentation Tools"
        ]

    },


    "graphic-designer": {

        name: "Graphic Designer",

        core: [
            "Graphic Design",
            "Illustration",
            "Visual Design",
            "Typography"
        ],

        analytical: [
            "Creative Thinking",
            "Problem Solving"
        ],

        professional: [
            "Communication",
            "Presentation",
            "Client Management"
        ],

        tools: [
            "Design Software",
            "Image Editing Tools"
        ]

    },


    "accountant": {

        name: "Accountant",

        core: [
            "Accounting",
            "Financial Planning",
            "Bookkeeping",
            "Financial Analysis"
        ],

        analytical: [
            "Data Interpretation",
            "Critical Thinking",
            "Problem Solving"
        ],

        professional: [
            "Communication",
            "Time Management"
        ],

        tools: [
            "Excel",
            "Accounting Software"
        ]

    },


    "hr": {

        name: "Human Resources",

        core: [
            "Recruitment",
            "Employee Relations",
            "HR Management"
        ],

        analytical: [
            "Problem Solving",
            "Data Analysis",
            "Decision Making"
        ],

        professional: [
            "Communication",
            "Leadership",
            "Negotiation"
        ],

        tools: [
            "HR Software",
            "Microsoft Office"
        ]

    },


    "journalist": {

        name: "Journalist",

        core: [
            "Journalism",
            "Writing",
            "Research",
            "Interviewing"
        ],

        analytical: [
            "Critical Thinking",
            "Research",
            "Data Interpretation"
        ],

        professional: [
            "Communication",
            "Presentation",
            "Networking"
        ],

        tools: [
            "Content Management Tools",
            "Digital Media Tools"
        ]

    },


    "researcher": {

        name: "Researcher",

        core: [
            "Research Methods",
            "Data Collection",
            "Academic Writing"
        ],

        analytical: [
            "Critical Thinking",
            "Data Analysis",
            "Data Interpretation"
        ],

        professional: [
            "Communication",
            "Presentation",
            "Time Management"
        ],

        tools: [
            "Research Tools",
            "Data Analysis Tools"
        ]

    }

};


/* =====================================================
   2. SKILL LEVEL VALUES
===================================================== */

const levelValues = {

    beginner: 25,

    learning: 50,

    competent: 75,

    advanced: 100

};


const levelNames = {

    beginner: "Beginner",

    learning: "Learning",

    competent: "Competent",

    advanced: "Advanced"

};


/* =====================================================
   3. USER SKILLS
===================================================== */

let userSkills = JSON.parse(
    localStorage.getItem("skill2careerSkills")
) || [

    {
        name: "HTML",
        level: "competent",
        category: "Technical Skill"
    },

    {
        name: "Communication",
        level: "learning",
        category: "Professional Skill"
    },

    {
        name: "Problem Solving",
        level: "learning",
        category: "Analytical Skill"
    }

];


/* =====================================================
   4. HELPER FUNCTION
===================================================== */

function saveUserSkills() {

    localStorage.setItem(
        "skill2careerSkills",
        JSON.stringify(userSkills)
    );

}


/* =====================================================
   5. CAREER SELECTOR
===================================================== */

const careerSelect =
    document.getElementById("careerSelect");


if (careerSelect) {

    careerSelect.addEventListener(
        "change",
        function () {

            const selectedCareer =
                careers[this.value];

            if (!selectedCareer) {

                return;

            }

            updateCareerPanel(selectedCareer);

            updateSkillGap(selectedCareer);

        }
    );

}


/* =====================================================
   6. UPDATE CAREER PANEL
===================================================== */

function updateCareerPanel(career) {

    const panel =
        document.querySelector(".career-skill-panel");

    if (!panel) {

        return;

    }


    const title =
        panel.querySelector(".career-title h3");

    if (title) {

        title.textContent =
            career.name;

    }


    const groups =
        panel.querySelectorAll(".skill-group");


    if (groups[0]) {

        groups[0]
            .querySelector(".skill-list")
            .innerHTML =
            createSkillTags(career.core);

    }


    if (groups[1]) {

        groups[1]
            .querySelector(".skill-list")
            .innerHTML =
            createSkillTags(career.analytical);

    }


    if (groups[2]) {

        groups[2]
            .querySelector(".skill-list")
            .innerHTML =
            createSkillTags(career.professional);

    }


    if (groups[3]) {

        groups[3]
            .querySelector(".skill-list")
            .innerHTML =
            createSkillTags(career.tools);

    }

}


function createSkillTags(skills) {

    return skills
        .map(function (skill) {

            return `<span>${skill}</span>`;

        })
        .join("");

}


/* =====================================================
   7. MY SKILLS
===================================================== */

const newSkillInput =
    document.getElementById("newSkill");

const skillLevelSelect =
    document.getElementById("skillLevel");

const addSkillButton =
    document.querySelector(".add-skill-form button");


if (addSkillButton) {

    addSkillButton.addEventListener(
        "click",
        addSkill
    );

}


if (newSkillInput) {

    newSkillInput.addEventListener(
        "keydown",
        function (event) {

            if (event.key === "Enter") {

                addSkill();

            }

        }
    );

}


function addSkill() {

    const skillName =
        newSkillInput.value.trim();

    const level =
        skillLevelSelect.value;


    if (!skillName) {

        alert("Please enter a skill.");

        return;

    }


    if (!level) {

        alert("Please select a skill level.");

        return;

    }


    const exists =
        userSkills.some(function (skill) {

            return skill.name.toLowerCase() ===
                skillName.toLowerCase();

        });


    if (exists) {

        alert("This skill is already in your skills.");

        return;

    }


    userSkills.push({

        name: skillName,

        level: level,

        category: getSkillCategory(skillName)

    });


    saveUserSkills();

    renderUserSkills();

    updateSkillGap(
        careers[careerSelect.value]
    );


    newSkillInput.value = "";

    skillLevelSelect.value = "";

}


/* =====================================================
   8. FIND SKILL CATEGORY
===================================================== */

function getSkillCategory(skillName) {

    const technicalSkills = [

        "Programming",
        "HTML",
        "CSS",
        "JavaScript",
        "SQL",
        "Python",
        "Data Analysis",
        "Excel"

    ];


    const analyticalSkills = [

        "Problem Solving",
        "Critical Thinking",
        "Research",
        "Data Interpretation",
        "Statistics",
        "Logical Thinking"

    ];


    const creativeSkills = [

        "Graphic Design",
        "Illustration",
        "Creativity",
        "Creative Thinking"

    ];


    const communicationSkills = [

        "Communication",
        "Public Speaking",
        "Presentation",
        "Writing",
        "Negotiation"

    ];


    if (
        technicalSkills.some(
            skill =>
                skill.toLowerCase() ===
                skillName.toLowerCase()
        )
    ) {

        return "Technical Skill";

    }


    if (
        analyticalSkills.some(
            skill =>
                skill.toLowerCase() ===
                skillName.toLowerCase()
        )
    ) {

        return "Analytical Skill";

    }


    if (
        creativeSkills.some(
            skill =>
                skill.toLowerCase() ===
                skillName.toLowerCase()
        )
    ) {

        return "Creative Skill";

    }


    if (
        communicationSkills.some(
            skill =>
                skill.toLowerCase() ===
                skillName.toLowerCase()
        )
    ) {

        return "Communication Skill";

    }


    return "Professional Skill";

}


/* =====================================================
   9. RENDER MY SKILLS
===================================================== */

function renderUserSkills() {

    const container =
        document.querySelector(".my-skill-list");


    if (!container) {

        return;

    }


    container.innerHTML = "";


    userSkills.forEach(
        function (skill, index) {

            const item =
                document.createElement("div");

            item.className =
                "my-skill-item";


            const percentage =
                levelValues[skill.level];


            item.innerHTML = `

                <div>

                    <h4>
                        ${skill.name}
                    </h4>

                    <span>
                        ${skill.category}
                    </span>

                </div>

                <div class="skill-progress">

                    <span>
                        ${levelNames[skill.level]}
                    </span>

                    <div class="progress-bar">

                        <div
                            class="progress-fill"
                            style="width: ${percentage}%;">
                        </div>

                    </div>

                    <button
                        class="remove-skill"
                        data-index="${index}">
                        Remove
                    </button>

                </div>

            `;


            container.appendChild(item);

        }
    );


    addRemoveEvents();

}


function addRemoveEvents() {

    const buttons =
        document.querySelectorAll(
            ".remove-skill"
        );


    buttons.forEach(
        function (button) {

            button.addEventListener(
                "click",
                function () {

                    const index =
                        Number(
                            this.dataset.index
                        );


                    userSkills.splice(
                        index,
                        1
                    );


                    saveUserSkills();

                    renderUserSkills();

                    updateSkillGap(
                        careers[careerSelect.value]
                    );

                }
            );

        }
    );

}


/* =====================================================
   10. SKILL GAP CALCULATOR
===================================================== */

function updateSkillGap(career) {

    if (!career) {

        return;

    }


    const requiredSkills = [

        ...career.core,
        ...career.analytical,
        ...career.professional,
        ...career.tools

    ];


    const mySkillNames =
        userSkills.map(function (skill) {

            return skill.name.toLowerCase();

        });


    const skillsYouHave =
        requiredSkills.filter(function (skill) {

            return mySkillNames.includes(
                skill.toLowerCase()
            );

        });


    const skillsToDevelop =
        requiredSkills.filter(function (skill) {

            return !mySkillNames.includes(
                skill.toLowerCase()
            );

        });


    renderSkillGap(
        skillsYouHave,
        skillsToDevelop,
        career.name
    );

}


/* =====================================================
   11. RENDER SKILL GAP
===================================================== */

function renderSkillGap(
    skillsYouHave,
    skillsToDevelop,
    careerName
) {

    const container =
        document.querySelector(
            ".skill-gap-container"
        );


    if (!container) {

        return;

    }


    const careerTitle =
        container.querySelector(
            ".gap-header h3"
        );


    if (careerTitle) {

        careerTitle.textContent =
            careerName;

    }


    const summary =
        container.querySelector(
            ".gap-summary strong"
        );


    if (summary) {

        summary.textContent =
            skillsToDevelop.length;

    }


    const columns =
        container.querySelectorAll(
            ".gap-column"
        );


    if (columns.length < 2) {

        return;

    }


    const haveColumn =
        columns[0];

    const developColumn =
        columns[1];


    const haveSkills =
        skillsYouHave
            .map(function (skill) {

                const userSkill =
                    userSkills.find(
                        item =>
                            item.name.toLowerCase() ===
                            skill.toLowerCase()
                    );


                const level =
                    userSkill
                        ? levelNames[userSkill.level]
                        : "Available";


                return `

                    <div class="gap-skill">

                        <span>
                            ${skill}
                        </span>

                        <small>
                            ${level}
                        </small>

                    </div>

                `;

            })
            .join("");


    const developSkills =
        skillsToDevelop
            .map(function (skill) {

                return `

                    <div class="gap-skill">

                        <span>
                            ${skill}
                        </span>

                        <button
                            class="learn-skill"
                            data-skill="${skill}">
                            Learn →
                        </button>

                    </div>

                `;

            })
            .join("");


    haveColumn.innerHTML = `

        <div class="gap-column-title">

            <span class="status-dot available"></span>

            <h3>
                Skills you have
            </h3>

        </div>

        ${haveSkills || "<p>No matching skills yet.</p>"}

    `;


    developColumn.innerHTML = `

        <div class="gap-column-title">

            <span class="status-dot missing"></span>

            <h3>
                Skills to develop
            </h3>

        </div>

        ${developSkills || "<p>You have covered all listed skills.</p>"}

    `;


    addLearnEvents();

}


/* =====================================================
   12. LEARN BUTTONS
===================================================== */

function addLearnEvents() {

    const buttons =
        document.querySelectorAll(
            ".learn-skill"
        );


    buttons.forEach(
        function (button) {

            button.addEventListener(
                "click",
                function () {

                    const skill =
                        this.dataset.skill;


                    alert(
                        `You should learn "${skill}" next.`
                    );

                }
            );

        }
    );

}


/* =====================================================
   13. SKILL SEARCH
===================================================== */

const searchInput =
    document.getElementById("skillSearch");

const searchButton =
    document.querySelector(".hero-search button");


if (searchButton) {

    searchButton.addEventListener(
        "click",
        performSearch
    );

}


if (searchInput) {

    searchInput.addEventListener(
        "keydown",
        function (event) {

            if (event.key === "Enter") {

                performSearch();

            }

        }
    );

}


function performSearch() {

    if (!searchInput) {

        return;

    }


    const query =
        searchInput.value
            .trim()
            .toLowerCase();


    if (!query) {

        alert(
            "Please enter a skill, career, or category."
        );

        return;

    }


    const allCards =
        document.querySelectorAll(
            ".skill-category-card"
        );


    let found = false;


    allCards.forEach(
        function (card) {

            const text =
                card.textContent.toLowerCase();


            if (text.includes(query)) {

                card.style.display = "";

                card.scrollIntoView({
                    behavior: "smooth",
                    block: "center"
                });

                card.style.transform =
                    "scale(1.03)";

                card.style.boxShadow =
                    "0 0 30px rgba(37, 99, 235, 0.35)";

                found = true;


                setTimeout(
                    function () {

                        card.style.transform = "";

                        card.style.boxShadow = "";

                    },
                    1800
                );

            }

        }
    );


    if (!found) {

        const careerMatch =
            Object.entries(careers)
                .find(function ([key, career]) {

                    return career.name
                        .toLowerCase()
                        .includes(query);

                });


        if (careerMatch) {

            if (careerSelect) {

                careerSelect.value =
                    careerMatch[0];

                careerSelect.dispatchEvent(
                    new Event("change")
                );

            }


            const careerSection =
                document.querySelector(
                    ".career-skills"
                );


            if (careerSection) {

                careerSection.scrollIntoView({
                    behavior: "smooth"
                });

            }

            return;

        }


        alert(
            `No skill, career, or category found for "${searchInput.value}".`
        );

    }

}


/* =====================================================
   14. CATEGORY EXPLORE BUTTONS
===================================================== */

const exploreButtons =
    document.querySelectorAll(
        ".explore-btn"
    );


exploreButtons.forEach(
    function (button) {

        button.addEventListener(
            "click",
            function () {

                const card =
                    this.closest(
                        ".skill-category-card"
                    );


                if (!card) {

                    return;

                }


                const category =
                    card.querySelector("h3")
                        .textContent
                        .trim();


                const skills =
                    Array.from(
                        card.querySelectorAll(
                            ".skill-tags span"
                        )
                    )
                    .map(
                        tag =>
                            tag.textContent.trim()
                    );


                alert(
                    `${category}\n\nSkills:\n• ` +
                    skills.join("\n• ")
                );

            }
        );

    }
);


/* =====================================================
   15. INTEREST DISCOVERY
===================================================== */

const interestButtons =
    document.querySelectorAll(
        ".interest-options button"
    );


let selectedInterests = [];


interestButtons.forEach(
    function (button) {

        button.addEventListener(
            "click",
            function () {

                const interest =
                    this.textContent.trim();


                if (
                    selectedInterests.includes(
                        interest
                    )
                ) {

                    selectedInterests =
                        selectedInterests.filter(
                            item =>
                                item !== interest
                        );


                    this.classList.remove(
                        "selected"
                    );

                } else {

                    selectedInterests.push(
                        interest
                    );

                    this.classList.add(
                        "selected"
                    );

                }

            }
        );

    }
);


/* =====================================================
   16. DISCOVER BUTTON
===================================================== */

const discoverButton =
    document.querySelector(
        ".discover-btn"
    );


if (discoverButton) {

    discoverButton.addEventListener(
        "click",
        function () {

            if (
                selectedInterests.length === 0
            ) {

                alert(
                    "Select at least one interest first."
                );

                return;

            }


            const recommendations =
                getCareerRecommendations(
                    selectedInterests
                );


            alert(

                "Based on your interests:\n\n" +

                recommendations
                    .map(
                        item =>
                            "→ " + item
                    )
                    .join("\n")

            );

        }
    );

}


/* =====================================================
   17. INTEREST → CAREER MATCHING
===================================================== */

function getCareerRecommendations(
    interests
) {

    const matches = [];


    const mapping = {

        "Technology": [
            "Software Developer",
            "Data Analyst"
        ],

        "Business": [
            "Digital Marketing",
            "Human Resources",
            "Accountant"
        ],

        "Creativity": [
            "Graphic Designer",
            "Digital Marketing"
        ],

        "Helping People": [
            "Teacher",
            "Human Resources"
        ],

        "Science": [
            "Researcher",
            "Data Analyst"
        ],

        "Numbers": [
            "Data Analyst",
            "Accountant"
        ],

        "Communication": [
            "Teacher",
            "Journalist",
            "Human Resources"
        ],

        "Research": [
            "Researcher",
            "Journalist",
            "Data Analyst"
        ],

        "Leadership": [
            "Human Resources",
            "Teacher"
        ]

    };


    interests.forEach(
        function (interest) {

            if (mapping[interest]) {

                mapping[interest]
                    .forEach(
                        function (career) {

                            if (
                                !matches.includes(
                                    career
                                )
                            ) {

                                matches.push(
                                    career
                                );

                            }

                        }
                    );

            }

        }
    );


    return matches.slice(0, 5);

}


/* =====================================================
   18. TRANSFERABLE SKILLS
===================================================== */

const transferButtons =
    document.querySelectorAll(
        ".transfer-card button"
    );


transferButtons.forEach(
    function (button) {

        button.addEventListener(
            "click",
            function () {

                const card =
                    this.closest(
                        ".transfer-card"
                    );


                if (!card) {

                    return;

                }


                const skill =
                    card.querySelector("h3")
                        .textContent
                        .trim();


                const description =
                    card.querySelector("p")
                        .textContent
                        .trim();


                const careers =
                    Array.from(
                        card.querySelectorAll(
                            ".career-tags span"
                        )
                    )
                    .map(
                        tag =>
                            tag.textContent.trim()
                    );


                showSkillDetails(
                    skill,
                    description,
                    careers
                );

            }
        );

    }
);


/* =====================================================
   19. SKILL DETAILS
===================================================== */

function showSkillDetails(
    skill,
    description,
    relatedCareers
) {

    const detailCard =
        document.querySelector(
            ".skill-detail-card"
        );


    if (!detailCard) {

        return;

    }


    const title =
        detailCard.querySelector(
            ".detail-header h3"
        );


    const detailDescription =
        detailCard.querySelector(
            ".detail-header p"
        );


    const tags =
        detailCard.querySelector(
            ".detail-tags"
        );


    if (title) {

        title.textContent =
            skill;

    }


    if (detailDescription) {

        detailDescription.textContent =
            description;

    }


    if (tags) {

        tags.innerHTML =
            relatedCareers
                .map(
                    career =>
                        `<span>${career}</span>`
                )
                .join("");

    }


    detailCard.scrollIntoView({
        behavior: "smooth",
        block: "center"
    });

}


/* =====================================================
   20. SKILL LEVEL CARDS
===================================================== */

const levelCards =
    document.querySelectorAll(
        ".level-card"
    );


levelCards.forEach(
    function (card) {

        card.addEventListener(
            "click",
            function () {

                const level =
                    this.querySelector("h3")
                        .textContent
                        .trim();


                alert(
                    `Skill Level: ${level}\n\n` +
                    this.querySelector("p")
                        .textContent
                        .trim()
                );

            }
        );

    }
);


/* =====================================================
   21. INITIALIZE USER SKILLS
===================================================== */

renderUserSkills();


/* =====================================================
   22. INITIALIZE CAREER
===================================================== */

if (careerSelect) {

    careerSelect.value =
        "data-analyst";

    updateCareerPanel(
        careers["data-analyst"]
    );

    updateSkillGap(
        careers["data-analyst"]
    );

}


/* =====================================================
   23. EXPLORE UPDATES DATA
===================================================== */

const updatesData = [

    {
        title: "Latest Software Development Trends",
        category: "Computer & IT",
        type: "Technology",
        description: "Explore current software development technologies, tools and programming trends.",
        tags: [
            "Software",
            "Programming",
            "Technology"
        ]
    },

    {
        title: "AI and Machine Learning Career Opportunities",
        category: "Computer & IT",
        type: "Career",
        description: "Explore career paths and skills related to Artificial Intelligence and Machine Learning.",
        tags: [
            "AI",
            "Machine Learning",
            "Career"
        ]
    },

    {
        title: "Engineering Industry Innovations",
        category: "Engineering",
        type: "Industry",
        description: "Discover new technologies, engineering fields and industry developments.",
        tags: [
            "Engineering",
            "Innovation",
            "Technology"
        ]
    },

    {
        title: "Startup and Business Opportunities",
        category: "Business",
        type: "Business",
        description: "Explore startup trends, management skills and business opportunities.",
        tags: [
            "Startups",
            "Business",
            "Management"
        ]
    },

    {
        title: "Finance and Accounting Updates",
        category: "Commerce",
        type: "Career",
        description: "Learn about finance, accounting, banking and related career opportunities.",
        tags: [
            "Finance",
            "Accounting",
            "Banking"
        ]
    },

    {
        title: "Latest Scientific Discoveries",
        category: "Science",
        type: "Research",
        description: "Explore scientific research, discoveries and opportunities in science.",
        tags: [
            "Science",
            "Research",
            "Discovery"
        ]
    },

    {
        title: "Arts and Humanities Career Paths",
        category: "Arts & Humanities",
        type: "Career",
        description: "Discover career opportunities in humanities, culture, history and social sciences.",
        tags: [
            "Humanities",
            "Culture",
            "Social Science"
        ]
    },

    {
        title: "UI/UX and Design Career Trends",
        category: "Design",
        type: "Career",
        description: "Explore UI/UX design, creative tools and modern design career opportunities.",
        tags: [
            "UI/UX",
            "Design",
            "Creative"
        ]
    },

    {
        title: "Healthcare Career Opportunities",
        category: "Health",
        type: "Career",
        description: "Explore healthcare, medical and life-science related career paths.",
        tags: [
            "Healthcare",
            "Medical",
            "Life Science"
        ]
    },

    {
        title: "Legal Education and Career Updates",
        category: "Law",
        type: "Career",
        description: "Explore legal education, professional skills and career opportunities in law.",
        tags: [
            "Law",
            "Legal",
            "Education"
        ]
    },

    {
        title: "Internships and Hackathons for Students",
        category: "Student Activities",
        type: "Student",
        description: "Find opportunities related to internships, hackathons, scholarships and student events.",
        tags: [
            "Internships",
            "Hackathons",
            "Scholarships"
        ]
    }

];


/* =====================================================
   24. EXPLORE UPDATES ELEMENTS
===================================================== */

const updateSearchInput =
    document.querySelector(
        'input[placeholder*="Search updates"]'
    );


const categoryCards =
    document.querySelectorAll(
        ".update-card, .category-card, .update-category"
    );


/* =====================================================
   25. CREATE RESULT SECTION
===================================================== */

let updateResults = null;


if (updateSearchInput) {

    updateResults =
        document.createElement("div");

    updateResults.className =
        "update-results";

    updateSearchInput.parentElement.insertAdjacentElement(
        "afterend",
        updateResults
    );

}


/* =====================================================
   26. SHOW UPDATES
===================================================== */

function showUpdates(searchValue = "") {

    if (!updateResults) {

        return;

    }


    const value =
        searchValue
            .toLowerCase()
            .trim();


    const results =
        updatesData.filter(function (update) {

            const searchableText = `

                ${update.title}

                ${update.category}

                ${update.type}

                ${update.description}

                ${update.tags.join(" ")}

            `.toLowerCase();


            return searchableText.includes(
                value
            );

        });


    updateResults.innerHTML = "";


    if (results.length === 0) {

        updateResults.innerHTML = `

            <div class="no-results">

                <h3>
                    No updates found
                </h3>

                <p>
                    Try searching for another career,
                    field or technology.
                </p>

            </div>

        `;

        return;

    }


    results.forEach(function (update) {

        const card =
            document.createElement("div");


        card.className =
            "result-card";


        card.innerHTML = `

            <span class="result-type">
                ${update.type}
            </span>

            <h3>
                ${update.title}
            </h3>

            <p class="result-category">
                ${update.category}
            </p>

            <p>
                ${update.description}
            </p>

            <div class="result-tags">

                ${update.tags
                    .map(
                        tag =>
                            `<span>${tag}</span>`
                    )
                    .join("")}

            </div>

        `;


        updateResults.appendChild(card);

    });

}


/* =====================================================
   27. EXPLORE UPDATES SEARCH
===================================================== */

if (updateSearchInput) {

    updateSearchInput.addEventListener(
        "input",
        function () {

            showUpdates(
                updateSearchInput.value
            );

        }
    );

}


/* =====================================================
   28. CATEGORY CARD CLICK
===================================================== */

categoryCards.forEach(function (card) {

    card.addEventListener(
        "click",
        function () {

            const categoryName =
                card
                    .querySelector(
                        "h3, h4, strong"
                    )
                    ?.textContent
                    .trim();


            if (
                !categoryName ||
                !updateSearchInput ||
                !updateResults
            ) {

                return;

            }


            updateSearchInput.value =
                categoryName;


            showUpdates(
                categoryName
            );


            updateResults.scrollIntoView({

                behavior: "smooth",

                block: "start"

            });


            categoryCards.forEach(
                function (item) {

                    item.classList.remove(
                        "selected"
                    );

                }
            );


            card.classList.add(
                "selected"
            );

        }
    );

});


/* =====================================================
   29. INITIAL UPDATES
===================================================== */

showUpdates();


/* =====================================================
   30. SNOWFALL + PARTICLES CANVAS
===================================================== */

const canvas =
    document.getElementById(
        "snowCanvas"
    );


if (canvas) {

    const ctx =
        canvas.getContext("2d");


    let snowflakes = [];

    let particles = [];

    let orbs = [];


    const mouse = {

        x: null,

        y: null,

        radius: 120

    };


    window.addEventListener(
        "mousemove",
        function (event) {

            mouse.x =
                event.clientX;

            mouse.y =
                event.clientY;

        }
    );


    window.addEventListener(
        "mouseleave",
        function () {

            mouse.x = null;

            mouse.y = null;

        }
    );


    function resizeCanvas() {

        canvas.width =
            window.innerWidth;

        canvas.height =
            window.innerHeight;

        createSnowflakes();

        createParticles();

        createOrbs();

    }


    function createSnowflakes() {

        snowflakes = [];


        const amount =
            Math.min(
                140,
                Math.floor(
                    window.innerWidth / 9
                )
            );


        for (
            let i = 0;
            i < amount;
            i++
        ) {

            snowflakes.push({

                x:
                    Math.random()
                    * canvas.width,

                y:
                    Math.random()
                    * canvas.height,

                radius:
                    Math.random()
                    * 3.5 + 1,

                speed:
                    Math.random()
                    * 1.2 + 0.5,

                wind:
                    Math.random()
                    * 0.6 - 0.3,

                opacity:
                    Math.random()
                    * 0.6 + 0.25,

                drift:
                    Math.random()
                    * Math.PI * 2,

                driftSpeed:
                    Math.random()
                    * 0.02 + 0.01

            });

        }

    }


    function createParticles() {

        particles = [];


        const amount =
            Math.min(
                70,
                Math.floor(
                    window.innerWidth / 20
                )
            );


        for (
            let i = 0;
            i < amount;
            i++
        ) {

            particles.push({

                x:
                    Math.random()
                    * canvas.width,

                y:
                    Math.random()
                    * canvas.height,

                radius:
                    Math.random()
                    * 2 + 0.5,

                speedX:
                    Math.random()
                    * 0.4 - 0.2,

                speedY:
                    Math.random()
                    * 0.4 - 0.2,

                opacity:
                    Math.random()
                    * 0.5 + 0.2,

                pulse:
                    Math.random()
                    * Math.PI * 2,

                pulseSpeed:
                    Math.random()
                    * 0.03 + 0.01

            });

        }

    }


    function createOrbs() {

        orbs = [];


        for (
            let i = 0;
            i < 7;
            i++
        ) {

            orbs.push({

                x:
                    Math.random()
                    * canvas.width,

                y:
                    Math.random()
                    * canvas.height,

                radius:
                    Math.random()
                    * 80 + 40,

                speedX:
                    Math.random()
                    * 0.3 - 0.15,

                speedY:
                    Math.random()
                    * 0.2 - 0.1,

                opacity:
                    Math.random()
                    * 0.035 + 0.015

            });

        }

    }


    function drawSnow() {

        snowflakes.forEach(
            function (snow) {

                ctx.beginPath();


                ctx.arc(
                    snow.x,
                    snow.y,
                    snow.radius,
                    0,
                    Math.PI * 2
                );


                ctx.fillStyle =
                    `rgba(
                        37,
                        99,
                        235,
                        ${snow.opacity}
                    )`;


                ctx.shadowBlur = 8;

                ctx.shadowColor =
                    "rgba(37, 99, 235, 0.35)";


                ctx.fill();

                ctx.shadowBlur = 0;

            }
        );

    }


    function drawParticles() {

        particles.forEach(
            function (particle) {

                const pulse =
                    Math.sin(
                        particle.pulse
                    ) * 0.4 + 0.6;


                ctx.beginPath();


                ctx.arc(
                    particle.x,
                    particle.y,
                    particle.radius,
                    0,
                    Math.PI * 2
                );


                ctx.fillStyle =
                    `rgba(
                        96,
                        165,
                        250,
                        ${
                            particle.opacity
                            * pulse
                        }
                    )`;


                ctx.shadowBlur = 10;

                ctx.shadowColor =
                    "rgba(96, 165, 250, 0.5)";


                ctx.fill();

                ctx.shadowBlur = 0;

            }
        );

    }


    function drawOrbs() {

        orbs.forEach(
            function (orb) {

                const gradient =
                    ctx.createRadialGradient(
                        orb.x,
                        orb.y,
                        0,
                        orb.x,
                        orb.y,
                        orb.radius
                    );


                gradient.addColorStop(
                    0,
                    `rgba(
                        37,
                        99,
                        235,
                        ${orb.opacity}
                    )`
                );


                gradient.addColorStop(
                    1,
                    "rgba(37, 99, 235, 0)"
                );


                ctx.beginPath();


                ctx.arc(
                    orb.x,
                    orb.y,
                    orb.radius,
                    0,
                    Math.PI * 2
                );


                ctx.fillStyle =
                    gradient;


                ctx.fill();

            }
        );

    }


    function drawConnections() {

        const maxDistance = 130;


        for (
            let i = 0;
            i < particles.length;
            i++
        ) {

            for (
                let j = i + 1;
                j < particles.length;
                j++
            ) {

                const p1 =
                    particles[i];

                const p2 =
                    particles[j];


                const dx =
                    p1.x - p2.x;

                const dy =
                    p1.y - p2.y;


                const distance =
                    Math.sqrt(
                        dx * dx +
                        dy * dy
                    );


                if (
                    distance <
                    maxDistance
                ) {

                    const opacity =
                        (
                            1 -
                            distance /
                            maxDistance
                        ) * 0.12;


                    ctx.beginPath();


                    ctx.moveTo(
                        p1.x,
                        p1.y
                    );


                    ctx.lineTo(
                        p2.x,
                        p2.y
                    );


                    ctx.strokeStyle =
                        `rgba(
                            37,
                            99,
                            235,
                            ${opacity}
                        )`;


                    ctx.lineWidth = 1;

                    ctx.stroke();

                }

            }

        }

    }


    function drawMouseConnections() {

        if (
            mouse.x === null ||
            mouse.y === null
        ) {

            return;

        }


        particles.forEach(
            function (particle) {

                const dx =
                    particle.x -
                    mouse.x;

                const dy =
                    particle.y -
                    mouse.y;


                const distance =
                    Math.sqrt(
                        dx * dx +
                        dy * dy
                    );


                if (
                    distance <
                    mouse.radius
                ) {

                    const opacity =
                        (
                            1 -
                            distance /
                            mouse.radius
                        ) * 0.25;


                    ctx.beginPath();


                    ctx.moveTo(
                        mouse.x,
                        mouse.y
                    );


                    ctx.lineTo(
                        particle.x,
                        particle.y
                    );


                    ctx.strokeStyle =
                        `rgba(
                            37,
                            99,
                            235,
                            ${opacity}
                        )`;


                    ctx.lineWidth = 1;

                    ctx.stroke();

                }

            }
        );

    }


    function updateSnow() {

        snowflakes.forEach(
            function (snow) {

                snow.y +=
                    snow.speed;


                snow.drift +=
                    snow.driftSpeed;


                snow.x +=
                    snow.wind +
                    Math.sin(
                        snow.drift
                    ) * 0.35;


                if (
                    snow.y >
                    canvas.height + 10
                ) {

                    snow.y = -10;

                    snow.x =
                        Math.random()
                        * canvas.width;

                }


                if (
                    snow.x >
                    canvas.width + 10
                ) {

                    snow.x = -10;

                }


                if (
                    snow.x < -10
                ) {

                    snow.x =
                        canvas.width + 10;

                }

            }
        );

    }


    function updateParticles() {

        particles.forEach(
            function (particle) {

                particle.x +=
                    particle.speedX;

                particle.y +=
                    particle.speedY;


                particle.pulse +=
                    particle.pulseSpeed;


                if (
                    mouse.x !== null &&
                    mouse.y !== null
                ) {

                    const dx =
                        particle.x -
                        mouse.x;

                    const dy =
                        particle.y -
                        mouse.y;


                    const distance =
                        Math.sqrt(
                            dx * dx +
                            dy * dy
                        );


                    if (
                        distance <
                        mouse.radius &&
                        distance > 0
                    ) {

                        const force =
                            (
                                mouse.radius -
                                distance
                            ) /
                            mouse.radius;


                        particle.x +=
                            (
                                dx /
                                distance
                            ) *
                            force *
                            0.7;


                        particle.y +=
                            (
                                dy /
                                distance
                            ) *
                            force *
                            0.7;

                    }

                }


                if (
                    particle.x < -10
                ) {

                    particle.x =
                        canvas.width + 10;

                }


                if (
                    particle.x >
                    canvas.width + 10
                ) {

                    particle.x = -10;

                }


                if (
                    particle.y < -10
                ) {

                    particle.y =
                        canvas.height + 10;

                }


                if (
                    particle.y >
                    canvas.height + 10
                ) {

                    particle.y = -10;

                }

            }
        );

    }


    function updateOrbs() {

        orbs.forEach(
            function (orb) {

                orb.x +=
                    orb.speedX;

                orb.y +=
                    orb.speedY;


                if (
                    orb.x <
                    -orb.radius
                ) {

                    orb.x =
                        canvas.width +
                        orb.radius;

                }


                if (
                    orb.x >
                    canvas.width +
                    orb.radius
                ) {

                    orb.x =
                        -orb.radius;

                }


                if (
                    orb.y <
                    -orb.radius
                ) {

                    orb.y =
                        canvas.height +
                        orb.radius;

                }


                if (
                    orb.y >
                    canvas.height +
                    orb.radius
                ) {

                    orb.y =
                        -orb.radius;

                }

            }
        );

    }


    function animate() {

        ctx.clearRect(
            0,
            0,
            canvas.width,
            canvas.height
        );


        drawOrbs();

        drawConnections();

        drawMouseConnections();

        drawSnow();

        drawParticles();


        updateSnow();

        updateParticles();

        updateOrbs();


        requestAnimationFrame(
            animate
        );

    }


    resizeCanvas();

    animate();


    window.addEventListener(
        "resize",
        resizeCanvas
    );

}


/* =====================================================
   END OF SKILLS.JS
===================================================== */
