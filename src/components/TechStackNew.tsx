import "./styles/TechStackNew.css";
import { asset } from "../utils/asset";

interface TechItem {
  name: string;
  icon: string;
  url: string;
}

// All tech stack items — exactly what Narendra Kumar uses
// Perfect descending pyramid: 8 → 7 → 6 → 5 → 4 → 3
const techStack: TechItem[][] = [
  // Row 1 — Full-Stack (8 items — widest)
  [
    { name: "React",       icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",           url: "https://react.dev" },
    { name: "Node.js",     icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",         url: "https://nodejs.org" },
    { name: "Java",        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",             url: "https://www.java.com" },
    { name: "JavaScript",  icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript" },
    { name: "MongoDB",     icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",       url: "https://mongodb.com" },
    { name: "PostgreSQL",  icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg", url: "https://postgresql.org" },
    { name: "HTML/CSS",    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",           url: "https://developer.mozilla.org/en-US/docs/Web/HTML" },
    { name: "REST APIs",   icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg",       url: "https://restfulapi.net" },
  ],
  // Row 2 — ML & AI (7 items)
  [
    { name: "TensorFlow",    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg",   url: "https://tensorflow.org" },
    { name: "PyTorch",       icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg",         url: "https://pytorch.org" },
    { name: "Scikit-learn",  icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/scikitlearn/scikitlearn-original.svg", url: "https://scikit-learn.org" },
    { name: "Pandas",        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg",           url: "https://pandas.pydata.org" },
    { name: "Jupyter",       icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jupyter/jupyter-original.svg",         url: "https://jupyter.org" },
    { name: "Deep Learning", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg",   url: "https://deeplearning.ai" },
    { name: "Data Analysis", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/numpy/numpy-original.svg",             url: "https://numpy.org" },
  ],
  // Row 3 — ML Techniques (6 items)
  [
    { name: "Feature Eng.",       icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",  url: "https://python.org" },
    { name: "Data Preprocessing", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg",  url: "https://pandas.pydata.org" },
    { name: "Strings",            icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",      url: "https://www.java.com" },
    { name: "Array",              icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg",            url: "https://en.cppreference.com/w/c" },
    { name: "Array List",         icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",      url: "https://www.java.com" },
    { name: "Linked List",        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg",            url: "https://en.cppreference.com/w/c" },
  ],
  // Row 4 — DSA (5 items)
  [
    { name: "Stack",         icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg", url: "https://isocpp.org" },
    { name: "Queue",         icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",          url: "https://www.java.com" },
    { name: "Trees",         icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",      url: "https://python.org" },
    { name: "Graphs",        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",      url: "https://python.org" },
    { name: "Dynamic Prog.", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg",url: "https://isocpp.org" },
  ],
  // Row 5 — Languages (4 items)
  [
    { name: "C",    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg",             url: "https://en.cppreference.com/w/c" },
    { name: "SQL",  icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",     url: "https://www.mysql.com" },
    { name: "Git",  icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",         url: "https://git-scm.com" },
    { name: "GitHub",icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg", url: "https://github.com" },
  ],
  // Row 6 — Tools tip (3 items — narrowest)
  [
    { name: "VS Code",    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg", url: "https://code.visualstudio.com" },
    { name: "Fusion 360", icon: "https://img.icons8.com/color/96/autodesk-fusion-360.png",                      url: "https://www.autodesk.com/products/fusion-360" },
    { name: "AutoCAD",    icon: "https://img.icons8.com/color/96/autodesk-autocad.png",                         url: "https://www.autodesk.com/products/autocad" },
  ],
];

const TechStackNew = () => {
  return (
    <div className="techstack-new" id="skills">
      {/* Video Background */}
      <div className="techstack-video-container">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="techstack-video"
        >
          <source src={asset("/video/video.webm")} type="video/webm" />
        </video>
        {/* Dark Overlay */}
        <div className="techstack-overlay"></div>
      </div>

      {/* Content */}
      <div className="techstack-content">
        <h2>Tech Stack</h2>
        
        <div className="techstack-pyramid">
          {techStack.map((row, rowIndex) => (
            <div key={rowIndex} className="techstack-row">
              {row.map((tech, techIndex) => (
                <a
                  key={techIndex}
                  href={tech.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="techstack-item"
                  title={tech.name}
                  data-cursor="disable"
                >
                  <img src={tech.icon} alt={tech.name} />
                  <span>{tech.name}</span>
                </a>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TechStackNew;
