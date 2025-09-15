import fs from 'fs/promises';
import path from 'path';

interface ResumeData {
  name: string;
  headline: string;
  location: string;
  email: string;
  phone: string;
  linkedin: string;
  github: string;
  summary: string;
  experience: any[];
  education: any[];
  skills: string[];
  certifications: string[];
  awards: string[];
}

async function generateResume() {
  try {
    // Read profile data
    const profilePath = path.join(process.cwd(), 'data', 'profile.json');
    const profileData: ResumeData = JSON.parse(await fs.readFile(profilePath, 'utf-8'));
    
    // Generate HTML resume
    const htmlResume = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${profileData.name} - Resume</title>
    <style>
        body {
            font-family: 'Arial', sans-serif;
            line-height: 1.6;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
            color: #333;
        }
        .header {
            text-align: center;
            border-bottom: 2px solid #3b82f6;
            padding-bottom: 20px;
            margin-bottom: 30px;
        }
        .name {
            font-size: 2.5em;
            font-weight: bold;
            color: #1e40af;
            margin: 0;
        }
        .title {
            font-size: 1.2em;
            color: #64748b;
            margin: 10px 0;
        }
        .contact {
            display: flex;
            justify-content: center;
            gap: 20px;
            flex-wrap: wrap;
            margin: 10px 0;
        }
        .contact-item {
            color: #64748b;
        }
        .section {
            margin: 30px 0;
        }
        .section-title {
            font-size: 1.4em;
            font-weight: bold;
            color: #1e40af;
            border-bottom: 1px solid #e2e8f0;
            padding-bottom: 5px;
            margin-bottom: 15px;
        }
        .experience-item {
            margin: 20px 0;
        }
        .job-title {
            font-weight: bold;
            font-size: 1.1em;
            color: #1e40af;
        }
        .company {
            font-weight: bold;
            color: #374151;
        }
        .dates {
            color: #64748b;
            font-style: italic;
        }
        .achievements {
            margin: 10px 0;
        }
        .achievements li {
            margin: 5px 0;
        }
        .skills {
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
        }
        .skill-tag {
            background: #dbeafe;
            color: #1e40af;
            padding: 5px 10px;
            border-radius: 15px;
            font-size: 0.9em;
        }
        .education-item {
            margin: 15px 0;
        }
        .degree {
            font-weight: bold;
            color: #1e40af;
        }
        .institution {
            font-weight: bold;
            color: #374151;
        }
        @media print {
            body { margin: 0; }
        }
    </style>
</head>
<body>
    <div class="header">
        <h1 class="name">${profileData.name}</h1>
        <p class="title">${profileData.headline}</p>
        <div class="contact">
            <span class="contact-item">📧 ${profileData.email}</span>
            <span class="contact-item">📱 ${profileData.phone}</span>
            <span class="contact-item">📍 ${profileData.location}</span>
            <span class="contact-item">🔗 <a href="${profileData.linkedin}">LinkedIn</a></span>
            <span class="contact-item">💻 <a href="${profileData.github}">GitHub</a></span>
        </div>
    </div>

    <div class="section">
        <h2 class="section-title">Professional Summary</h2>
        <p>${profileData.summary}</p>
    </div>

    <div class="section">
        <h2 class="section-title">Professional Experience</h2>
        ${profileData.experience.map(exp => `
            <div class="experience-item">
                <div class="job-title">${exp.position}</div>
                <div class="company">${exp.company}</div>
                <div class="dates">${exp.startDate} - ${exp.endDate} | ${exp.location}</div>
                <p>${exp.description}</p>
                <div class="achievements">
                    <ul>
                        ${exp.achievements.map((achievement: string) => `<li>${achievement}</li>`).join('')}
                    </ul>
                </div>
                <div class="skills">
                    ${exp.technologies.map((tech: string) => `<span class="skill-tag">${tech}</span>`).join('')}
                </div>
            </div>
        `).join('')}
    </div>

    <div class="section">
        <h2 class="section-title">Education</h2>
        ${profileData.education.map(edu => `
            <div class="education-item">
                <div class="degree">${edu.degree} in ${edu.field}</div>
                <div class="institution">${edu.institution}</div>
                <div class="dates">${edu.startDate} - ${edu.endDate} | ${edu.location}</div>
                ${edu.achievements ? `
                    <ul>
                        ${edu.achievements.map((achievement: string) => `<li>${achievement}</li>`).join('')}
                    </ul>
                ` : ''}
            </div>
        `).join('')}
    </div>

    <div class="section">
        <h2 class="section-title">Technical Skills</h2>
        <div class="skills">
            ${profileData.skills.map((skill: string) => `<span class="skill-tag">${skill}</span>`).join('')}
        </div>
    </div>

    <div class="section">
        <h2 class="section-title">Certifications</h2>
        <ul>
            ${profileData.certifications.map((cert: string) => `<li>${cert}</li>`).join('')}
        </ul>
    </div>

    ${profileData.awards.length > 0 ? `
    <div class="section">
        <h2 class="section-title">Awards & Recognition</h2>
        <ul>
            ${profileData.awards.map((award: string) => `<li>${award}</li>`).join('')}
        </ul>
    </div>
    ` : ''}
</body>
</html>
    `;
    
    // Save HTML resume
    const htmlPath = path.join(process.cwd(), 'public', 'Jai_Bhatia_Resume.html');
    await fs.writeFile(htmlPath, htmlResume);
    
    console.log('✅ Resume HTML generated successfully!');
    console.log('📄 Resume available at: /Jai_Bhatia_Resume.html');
    
  } catch (error) {
    console.error('❌ Error generating resume:', error);
  }
}

generateResume();
