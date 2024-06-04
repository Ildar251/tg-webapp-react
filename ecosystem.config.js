module.exports = {
    apps: [
      {
        name: 'react-app',
        script: 'serve',
        args: '-s build -l 3000', // -s для указания папки build, -l для указания порта
        env: {
          NODE_ENV: 'production'
        }
      }
    ]
  };