# loader : a role of a loader is to tell webpack to process some differents files as we start to import them into our project

# const { merge } = require('webpack-merge') : Allow us to merge multiple webpack files

# const HtmlWebpackPlugin = require('html-webpack-plugin') : Take some king of html file in our project and inject different scripts into in it.

# import('./bootstrap') in the indd give to webpack when it's running in the browser a litle bit of time to load up all the appropriate dependencies in our bootstrap.js file

# In webpack.dev.js in the container (remotes), the name "marketing" in 'marketing@http://localhost:8081/remoteEntry.js' matches the the "name" property with value 'marketing' in webpack.dev.js in the marketing project (exposes)

# remotes : { (1)marketing : '(2)marketing@http://localhost:8081/remoteEntry.js'} : the (1)marketing key means whenever we write an import statement in our container  and ask for smthing call marketing we are going to load that remoteEntry file @http://localhost:8081/remoteEntry.js. ex : To import the {mount} function that we export in the "marketing project" in the webpack.dev.js file we do it like this import  { mount } from 'marketing/MarketingApp'. This "MarketingApp" comes from the "marketing project" in webpack.dev.js file

# To share packages accross micro frontend we use "shared" key in webpack file.There is two ways to share packages accrose micro frontend. we can do shared = ["react" , "react-dom" , "otherPackages"] to share a specific version or if we dont don't care we can import the package.json file, and do "shared : packageJson.dependencies"

# [name].[contenthash].js insure that whenever we build some file for production all the differents that are built will use [name].[contenthash].js as a template to figure out how to name them. it will use [name] as the name of the file and [contenthash] as a hash. It will help us in caching.