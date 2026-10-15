import type { NextApiRequest, NextApiResponse } from 'next';

const GITHUB_API = 'https://api.github.com';
const GITHUB_API_VERSION = '2022-11-28';

function githubHeaders(): HeadersInit {
  const token = process.env.GITHUB_TOKEN;

  return {
    Accept: 'application/vnd.github+json',
    'X-GitHub-Api-Version': GITHUB_API_VERSION,
    'User-Agent': 'CryptechServices',

    ...(token
      ? {
          Authorization: `Bearer ${token}`
        }
      : {})
  };
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');

    return res.status(405).json({
      error: 'Method not allowed'
    });
  }

  const repository = process.env.GITHUB_REPOSITORY;

  if (!repository) {
    return res.status(500).json({
      error: 'GITHUB_REPOSITORY is not configured.'
    });
  }

  const [owner, repo] = repository.split('/');

  if (!owner || !repo) {
    return res.status(500).json({
      error: 'GITHUB_REPOSITORY must use the format owner/repository.'
    });
  }

  try {
    const response = await fetch(
      `${GITHUB_API}/repos/${encodeURIComponent(
        owner
      )}/${encodeURIComponent(repo)}`,
      {
        headers: githubHeaders()
      }
    );

    const data = await response.json();

    if (!response.ok) {
      if (response.status === 403) {
        return res.status(403).json({
          error: data?.message || 'GitHub API rate limit exceeded.',
          status: 403,
          rateLimited: true
        });
      }

      return res.status(response.status).json({
        error:
          data?.message || `GitHub API returned status ${response.status}.`,
        status: response.status
      });
    }

    res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate=300');

    res.setHeader(
      'X-GitHub-Authenticated',
      process.env.GITHUB_TOKEN ? 'true' : 'false'
    );

    return res.status(200).json(data);
  } catch (error) {
    console.error('GitHub repository error:', error);

    return res.status(500).json({
      error: 'Unable to fetch GitHub repository.'
    });
  }
}
