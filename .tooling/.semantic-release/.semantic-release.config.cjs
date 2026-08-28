const parserOpts = {
  headerPattern: /^(\w*)(!)?(?:\((.*)\))?: (.*)$/,
  headerCorrespondence: ['type', 'rupture', 'scope', 'subject']
};

module.exports = {
  branches: ['+([0-9])?(.{+([0-9]),x}).x', 'main'],
  plugins: [
    ['@semantic-release/commit-analyzer', { parserOpts, releaseRules: [{ rupture: '!', release: 'major' }] }],
    ['@semantic-release/release-notes-generator', { parserOpts }],
    '@semantic-release/npm',
    '@semantic-release/github'
  ]
};
