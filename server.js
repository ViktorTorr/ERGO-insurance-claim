const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const config = require('./webpack.config');
const compiler = webpack(config);

const PORT = 3000;
const API_PORT = 3004;

const server = new WebpackDevServer(compiler, {
    publicPath: config.output.publicPath,
    stats: { colors: true },
    proxy: {
        '/api/': {
            target: `http://localhost:${API_PORT}`,
            pathRewrite: { '^/api/': '/' },
        }
    }
});

server.listen(PORT, 'localhost', function () {
    console.log(`WebpackDevServer running on port ${PORT}`)
});
