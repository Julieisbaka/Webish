import { Octokit } from '@octokit/rest';

export class GitHubService {
  private octokit: Octokit;
  private owner: string;
  private repo: string;

  constructor() {
    this.octokit = new Octokit({
      auth: localStorage.getItem('github_token'),
    });
    this.owner = process.env.REACT_APP_REPO_OWNER!;
    this.repo = process.env.REACT_APP_REPO_NAME!;
  }

  async uploadTool(file: File, description: string) {
    const content = await this.fileToBase64(file);
    return this.octokit.repos.createOrUpdateFileContents({
      owner: this.owner,
      repo: this.repo,
      path: `tools/${file.name}`,
      message: `Upload tool: ${file.name}`,
      content,
    });
  }

  async getTools() {
    const { data } = await this.octokit.repos.getContent({
      owner: this.owner,
      repo: this.repo,
      path: 'tools',
    });
    return Array.isArray(data) ? data : [];
  }

  private async fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          resolve(reader.result.split(',')[1]);
        }
      };
      reader.onerror = reject;
    });
  }
}

export const githubService = new GitHubService();
