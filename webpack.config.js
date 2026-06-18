//# PGS THEME
/// per eseguirlo premi Ctrl+Shift+B

const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const RemoveEmptyScriptsPlugin = require('webpack-remove-empty-scripts');


//- ENTRY
const entryJs = {
    index: "./assets/javascript/index.js",
};

const entryScss = {
    index: "./assets/scss/index.scss",
};




//= SETTINGS

//== CONFIG
const config = {
    watch: true,
    stats: {
        all: false,
        errors: true,
        errorDetails: false,
        modules: false,
        colors: true
    },
};

//== MESSAGE SUCCESS
const successMessagePluginJs = {
    apply: (compiler) => {
        compiler.hooks.done.tap('SuccessMessagePlugin', (stats) => {
            if (!stats.hasErrors()) {
                console.clear();
                console.log("-");
                console.log('\x1b[32m%s\x1b[0m', '✅ Success js! ' + new Date().toLocaleTimeString());            }
        });
    }
};
//== MESSAGE SUCCESS
const successMessagePluginScss = {
    apply: (compiler) => {
        compiler.hooks.done.tap('SuccessMessagePlugin', (stats) => {
            if (!stats.hasErrors()) {
                // console.clear();
                console.log("-");
                console.log('\x1b[32m%s\x1b[0m', '✅ Success scss! ' + new Date().toLocaleTimeString());
            }
        });
    }
};

//== JS
const js = {
    ...config,
    name: 'theme:js',
    mode: 'development',
    devtool: 'source-map',
    entry: entryJs,
    output: {
        path: path.resolve(__dirname, "dist/javascript"),
        filename: "[name].js",
    },
    module: {
        rules: [{
            test: /\.css$/i,
            use: ['style-loader', 'css-loader'],
        }],
    },
    plugins: [successMessagePluginJs],
};

const jsMin = {
    ...config,
    name: 'theme:js:min',
    mode: 'production',
    devtool: false,
    entry: entryJs,
    output: {
        path: path.resolve(__dirname, "dist/javascript"),
        filename: "[name].min.js",
    },
    module: js.module,
    plugins: [successMessagePluginScss],
};

//== SCSS
const scss = {
    ...config,
    name: 'theme:scss',
    mode: 'development',
    devtool: 'source-map',
    entry: entryScss,
    output: {
        path: path.resolve(__dirname, "dist/css"),
    },
    module: {
        rules: [{
            test: /\.scss$/,
            use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
        }],
    },
    plugins: [
        new MiniCssExtractPlugin({ filename: "[name].css" }),
        new RemoveEmptyScriptsPlugin(),
        successMessagePluginJs
    ],
};

const scssMin = {
    ...config,
    name: 'theme:scss:min',
    mode: 'production',
    devtool: false,
    entry: entryScss,
    output: scss.output,
    module: scss.module,
    plugins: [
        new MiniCssExtractPlugin({ filename: "[name].min.css" }),
        new RemoveEmptyScriptsPlugin(),
        successMessagePluginScss
    ],
};

//= EXPORT
module.exports = [js, jsMin, scss, scssMin];
