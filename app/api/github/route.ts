import { NextResponse } from 'next/server';
import { Octokit } from '@octokit/rest';

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});

export async function GET() {
  try {
    const username = 'JaiBhatia19';
    
    // Fetch user's repositories
    const { data: repos } = await octokit.rest.repos.listForUser({
      username,
      sort: 'updated',
      per_page: 6,
    });

    // Fetch user's recent activity
    const { data: events } = await octokit.rest.activity.listPublicEventsForUser({
      username,
      per_page: 5,
    });

    const projects = repos.map((repo) => ({
      name: repo.name,
      description: repo.description || 'No description available',
      url: repo.html_url,
      homepage: repo.homepage || '',
      stars: repo.stargazers_count,
      forks: repo.forks_count,
      lastUpdated: repo.updated_at,
      topics: repo.topics || [],
      language: repo.language || 'Other',
    }));

    const recentActivity = events
      .filter(event => event.type === 'PushEvent')
      .slice(0, 1)
      .map(event => ({
        type: 'commit',
        message: (event.payload as any)?.commits?.[0]?.message || 'Code update',
        url: `https://github.com/${username}/${event.repo?.name}`,
        timestamp: event.created_at,
      }));

    return NextResponse.json({
      projects,
      recentActivity,
      lastUpdated: new Date().toISOString(),
    });
  } catch (error) {
    console.error('GitHub API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch GitHub data' },
      { status: 500 }
    );
  }
}
