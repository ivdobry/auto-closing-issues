const core = require('@actions/core');
const github = require('@actions/github');

const autoCLosingIssues = async () => {
  try {
    const repo = core.getInput('repo', { required: true });
    const prName = core.getInput('prName', { required: true });
    const token = core.getInput('token', { required: true });

    const octokit = new github.getOctokit(token);

    const prNameSplited = prName.split('/');

    if (!prNameSplited[0] === 'issue') return;

    octokit.rest.issues.closeIssue(repo, prNameSplited[1].split('-')[0]);
  } catch (error) {
    core.setFailed(error.message);
  }
};

autoCLosingIssues();
