// Client-safe content loading
export async function getProfileDataClient() {
  try {
    const response = await fetch('/api/profile');
    if (!response.ok) {
      throw new Error('Failed to fetch profile data');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching profile data:', error);
    // Return fallback data (aligned with data/profile.json; resume.pdf is canonical for accomplishments)
    return {
      name: 'Jai Bhatia',
      headline: 'Customer-facing technologist specializing in technical sales and applied AI',
      location: 'Los Angeles, CA',
      email: 'jaibhatia1906@gmail.com',
      phone: '(619) 866-5632',
      linkedin: 'https://www.linkedin.com/in/jaibhatia19/',
      github: 'https://github.com/JaiBhatia19',
      summary: 'Customer-facing technologist specializing in technical sales and applied AI, with experience designing enterprise solutions and delivering over 30 virtual demos for banking and insurance clients. Skilled at leveraging automation and AI-enabled workflows to advance sales opportunities and generate qualified meetings across digital channels.',
      experience: [],
      education: [],
      skills: [],
      certifications: [],
      awards: []
    };
  }
}

export async function getProjectsDataClient() {
  try {
    const response = await fetch('/api/github?username=JaiBhatia19');
    if (!response.ok) {
      throw new Error('Failed to fetch projects data');
    }
    const data = await response.json();
    return data.projects || [];
  } catch (error) {
    console.error('Error fetching projects data:', error);
    // Return fallback data
    return [
      {
        name: 'sample-project-1',
        description: 'AI-powered test automation platform',
        url: 'https://github.com/JaiBhatia19/sample-project-1',
        language: 'Python',
        stars: 15,
        forks: 3,
        topics: ['ai', 'testing', 'automation'],
        updatedAt: new Date().toISOString(),
        createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()
      }
    ];
  }
}
