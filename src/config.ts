import { asset } from "./utils/asset";

export const config = {
    developer: {
        name: "Narendra",
        fullName: "Akula Narendra Kumar",
        title: "B.Tech CSE (AI & ML) Student | Full Stack Developer | AI Enthusiast",
        description: "B.Tech CSE (AI & ML) Student | Full Stack Developer | AI Enthusiast. Passionate about technology, especially full-stack development, cloud computing, and machine learning. Building practical projects using modern web technologies and cloud platforms."
    },
    social: {
        github: "narendrakumar20",
        email: "akulanarendra20042006@gmail.com",
        location: "Visakhapatnam, India"
    },
    about: {
        title: "About Me",
        description: "I am a Computer Science student passionate about technology, especially full-stack development, cloud computing, and machine learning. I am currently pursuing my B.Tech in Computer Science Engineering with a specialization in AI & ML, where I focus on building practical projects using modern web technologies and cloud platforms. I come from Visakhapatnam, a beautiful coastal city. Outside academics, I enjoy playing cricket, video games, and chess, which help me stay active and enhance my strategic thinking. I like watching movies in my free time to relax."
    },
    experiences: [
        {
            position: "Machine Learning Intern",
            company: "CodeTech",
            period: "2025",
            location: "Remote",
            description: "Distinguished performance in Machine Learning Internship at CodeTech, delivering real-world project outcomes. Applied supervised and unsupervised learning models to solve practical engineering problems.",
            responsibilities: [
                "Built and deployed machine learning models for real-world use cases",
                "Applied supervised and unsupervised learning techniques",
                "Worked with Python, Scikit-learn, TensorFlow for model development",
                "Delivered production-ready ML solutions with measurable outcomes"
            ],
            technologies: ["Python", "Scikit-learn", "TensorFlow", "Pandas", "NumPy", "Machine Learning"]
        },
        {
            position: "Code Clash Organizer",
            company: "ANITS College Events",
            period: "2025",
            location: "Visakhapatnam, India",
            description: "Spearheaded 'Code Clash', a high-stakes competitive coding event. Managed participant logistics, coordinated technical infrastructure, and ensured a seamless experience for 100+ contestants.",
            responsibilities: [
                "Organized and managed Code Clash competitive coding event with 100+ participants",
                "Coordinated technical infrastructure and event logistics",
                "Evaluated complex technical problems and managed time-critical scenarios",
                "Led a team to deliver a seamless competitive experience"
            ],
            technologies: ["Event Management", "Leadership", "Technical Coordination", "Problem Setting"]
        },
        {
            position: "Cloud Computing Intern",
            company: "IBM",
            period: "Present",
            location: "Remote",
            description: "Currently working as a Cloud Computing Intern at IBM, gaining hands-on experience with cloud infrastructure, deployment pipelines and enterprise-grade cloud solutions.",
            responsibilities: [
                "Working with IBM Cloud services and cloud infrastructure",
                "Implementing and deploying cloud-native applications",
                "Learning enterprise cloud architecture and DevOps practices",
                "Collaborating with industry professionals on live cloud projects"
            ],
            technologies: ["IBM Cloud", "Cloud Computing", "DevOps", "Containerisation", "CI/CD"]
        },
        {
            position: "Rapid Fire Tech Battle Organizer",
            company: "ANITS College Events",
            period: "2026",
            location: "Visakhapatnam, India",
            description: "Organized and moderated 'Rapid Fire Tech Battle' — an intensive competitive technical quiz event — designing challenging questions, managing rounds, and ensuring a high-energy experience for all participants.",
            responsibilities: [
                "Designed and curated high-speed technical Q&A questions across CS topics",
                "Moderated rounds covering AI, networks, DSA and cloud computing",
                "Coordinated event logistics and time management for smooth execution",
                "Evaluated participant responses and maintained competitive integrity"
            ],
            technologies: ["Event Management", "Leadership", "Technical Coordination", "Quiz Design"]
        },
        {
            position: "B.Tech CSE (AI & ML) Student",
            company: "ANITS — Anil Neerukonda Institute of Technology and Sciences",
            period: "Present",
            location: "Visakhapatnam, India",
            description: "Pursuing B.Tech in Computer Science Engineering with specialization in Artificial Intelligence & Machine Learning. Completed 700+ LeetCode problems, earned NPTEL Elite certifications, and actively built projects applying academic knowledge to real-world problems.",
            responsibilities: [
                "Studying core AI & ML concepts: Deep Learning, NLP, Computer Vision",
                "Completed 700+ problems on LeetCode — sharpening problem-solving skills",
                "Mastered DSA: Arrays, LinkedList, Trees, Graphs, Dynamic Programming",
                "Earned NPTEL Elite certifications in Algorithms and IIoT"
            ],
            technologies: ["Python", "Java", "C", "SQL", "TensorFlow", "PyTorch", "DSA", "NPTEL"]
        }
    ],
    projects: [
        {
            id: 1,
            title: "Steel-Design-Predictor",
            category: "AI / ML",
            technologies: "Streamlit, Scikit-learn, Pandas, NumPy, Python",
            image: "https://raw.githubusercontent.com/narendrakumar20/Portfolio/main/steel-predictor.png",
            description: "A machine learning-based web application that predicts steel design properties and strength using input parameters for quick and accurate engineering decisions.",
            liveUrl: "https://steel-design-predictor.streamlit.app/"
        },
        {
            id: 2,
            title: "InfiGrow",
            category: "Full Stack",
            technologies: "Firebase, React, Firestore, JavaScript",
            image: asset("/images/votechain.png"),
            description: "A comprehensive Firebase-based platform designed to boost college placements at ANITS by providing learners with resources, mentorship, and placement preparation tools.",
            liveUrl: ""
        },
        {
            id: 3,
            title: "Translator",
            category: "AI / ML",
            technologies: "Flask, Transformers, PyTorch, Python",
            image: "https://raw.githubusercontent.com/narendrakumar20/Portfolio/main/Translator.png",
            description: "A platform for translating text between multiple languages using AI-based transformer models with real-time accuracy and automatic language detection.",
            liveUrl: "https://transalator.onrender.com/"
        },
        {
            id: 4,
            title: "Quiz-Master",
            category: "Full Stack",
            technologies: "HTML, CSS, JavaScript, JSON",
            image: asset("/images/quiz-master.png"),
            description: "A comprehensive CS quiz platform with 22 topics and 1,923+ questions. Users can test knowledge across Programming, DSA, AI/ML and more — with category filters and score tracking.",
            liveUrl: "https://quiz-master-phi-nine.vercel.app/"
        },
        {
            id: 5,
            title: "Portfolio Website",
            category: "Full Stack / 3D",
            technologies: "React, TypeScript, Three.js, GSAP, Vite",
            image: asset("/images/portfolio-preview.png"),
            description: "A stunning personal portfolio website featuring a 3D animated character powered by Three.js, smooth scroll effects with GSAP and Lenis, and a fully responsive modern design.",
            liveUrl: "https://narendrakumar20.github.io/Portfolio/"
        }
    ],
    certifications: [
        {
            id: 1,
            title: "GFG 160 Days",
            issuer: "GeeksForGeeks",
            description: "Intensive 160-day challenge focused on advanced problem solving and algorithmic techniques.",
            verifyUrl: "https://drive.google.com/file/d/1bsUklGkMWpMsXJtuK-W9pgYMTgaYCPCv/view"
        },
        {
            id: 2,
            title: "Machine Learning",
            issuer: "CodeTech",
            description: "Deep-dive into supervised and unsupervised learning models with practical implementation.",
            verifyUrl: "https://drive.google.com/file/d/1JKmlWsHdpexZhAJkaoMmtKVxK6mr2zZv/view"
        },
        {
            id: 3,
            title: "Introduction to Industry 4.0 & IIoT",
            issuer: "NPTEL",
            description: "A formal certification in Introduction to Industry 4.0 and Industrial Internet of Things (IIoT) from NPTEL Elite category.",
            verifyUrl: "https://drive.google.com/file/d/1LQ_593SEEo05v4EnUw1sKEv7zIPIc1jD/view?usp=drivesdk"
        },
        {
            id: 4,
            title: "Design And Analysis of Algorithms",
            issuer: "NPTEL",
            description: "Formal certification in Advanced Algorithm Design and Analysis from NPTEL Elite category.",
            verifyUrl: "https://drive.google.com/file/d/16pSGlefsGOeZ9VYOEPJUxTYLNxTUq0kh/view"
        }
    ],
    achievements: [
        {
            title: "ML Excellence",
            description: "Distinguished Performance in Machine Learning Internship at CodeTech, delivering real-world project outcomes."
        },
        {
            title: "LeetCode 700+",
            description: "Completed 700+ problems on LeetCode, refining problem-solving resilience and algorithmic skills."
        },
        {
            title: "GeeksForGeeks DSA",
            description: "Successfully mastered the Comprehensive DSA course with top-tier certification and assessment scores."
        },
        {
            title: "LeetCode T-Shirt",
            description: "Received the exclusive LeetCode T-shirt — motivated to keep learning, coding, and solving more challenges."
        },
        {
            title: "NPTEL Certified",
            description: "Advanced mastery in Design and Analysis of Algorithms, recognized through prestigious NPTEL certification."
        }
    ],
    contact: {
        email: "akulanarendra20042006@gmail.com",
        github: "https://github.com/narendrakumar20",
        linkedin: "https://www.linkedin.com/in/akula-narendra-kumar-45a891353/",
        twitter: "https://x.com/__narendra_20",
        facebook: "https://www.facebook.com/",
        instagram: "https://www.instagram.com/__narendra_20/"
    },
    skills: {
        develop: {
            title: "FULL-STACK DEVELOPER",
            description: "Building modern web apps & scalable systems",
            details: "Developing responsive and performant full-stack web applications using React, Node.js, Firebase and cloud platforms. Experienced in building REST APIs, database design, and deploying production-ready applications on Vercel and Render.",
            tools: ["React", "Node.js", "Java", "JavaScript", "MongoDB", "PostgreSQL", "REST APIs", "HTML/CSS", "Firebase", "Firestore"]
        },
        design: {
            title: "AI & ML SPECIALIST",
            description: "Intelligent systems, data science & DSA",
            details: "Pursuing AI & ML specialization in B.Tech CSE at ANITS. Hands-on experience with machine learning algorithms, deep learning frameworks, and data analysis. Solved 700+ LeetCode problems. Mastered DSA topics including Arrays, LinkedLists, Trees, Graphs, and Dynamic Programming.",
            tools: ["Python", "TensorFlow", "PyTorch", "Scikit-learn", "Pandas", "Jupyter", "Deep Learning", "Data Analysis", "DSA", "Feature Engineering"]
        }
    }
};


