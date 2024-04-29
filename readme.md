# loader : a role of a loader is to tell webpack to process some differents files as we start to import them into our project

# const { merge } = require('webpack-merge') : Allow us to merge multiple webpack files

# const HtmlWebpackPlugin = require('html-webpack-plugin') : Take some king of html file in our project and inject different scripts into in it.

# import('./bootstrap') in the indd give to webpack when it's running in the browser a litle bit of time to load up all the appropriate dependencies in our bootstrap.js file

# In webpack.dev.js in the container (remotes), the name "marketing" in 'marketing@http://localhost:8081/remoteEntry.js' matches the the "name" property with value 'marketing' in webpack.dev.js in the marketing project (exposes)

# remotes : { (1)marketing : '(2)marketing@http://localhost:8081/remoteEntry.js'} : the (1)marketing key means whenever we write an import statement in our container  and ask for smthing call marketing we are going to load that remoteEntry file @http://localhost:8081/remoteEntry.js. ex : To import the {mount} function that we export in the "marketing project" in the webpack.dev.js file we do it like this import  { mount } from 'marketing/MarketingApp'. This "MarketingApp" comes from the "marketing project" in webpack.dev.js file

# To share packages accross micro frontend we use "shared" key in webpack file.There is two ways to share packages accrose micro frontend. we can do shared = ["react" , "react-dom" , "otherPackages"] to share a specific version or if we dont don't care we can import the package.json file, and do "shared : packageJson.dependencies"

# [name].[contenthash].js insure that whenever we build some file for production all the differents that are built will use [name].[contenthash].js as a template to figure out how to name them. it will use [name] as the name of the file and [contenthash] as a hash. It will help us in caching.


# DEPLOYMENT WORKFLOW
 - Each team develops feature on git branches names like 'container-dev'
 - Features completes and ready to deploy for deployment ? Push branch to github 
 - Create a pull request to merge into master/main
 - Other engineers review the pull request
 - When ready to deploy, merge the PR
 - Workflow detect a change to the master/main branch, deployment runs

 * git checkout -b container-dev
 * make some changes to the container
 * git add .
 * git commit -m "some message"
 * git push origin container-dev
 * Create a pull request to merge into master
 * and after merge pull request deployment will be triggered


 # Handling CSS in Micro Frontend Applications
    ## ISSUES
    We have Pricing page and Sign In page. Those two pages are part of 2 different projects (micro-frontend)
    So when both projects are developed by different teams the might decides to use different approch how handling and writing CSS. Both project might look different.

    One possible way is that Pricing page can decided to have an h1 with black color and Sign In page can decide to have an h1 with green color

    So when the user start navigating into different pages we load some CSS. Image loading h1 in Sign In page with green color. Since we are in SPA (single Page Application) we are not loading the entire page. we are just loading content on the screen. So as soon as user renavigate to Pricing page we will have the h1 with green color because we have the same rule in the browser for this h1.

    The css from one project is going to impact the css for another project. So this is where the issue comes from

    ## Solutions : CSS Scooping Techniques

     1- Custom CSS you are writing for your project
        * Use a CSS-in-JS library
        * Use Vue's bult-in component style scoping
        * Use Angular's built-in component style scoping
        * "Namespace" all your CSS
            ex : <div class="auth">
                <h1>
                    Sign In
                <h1>
            </div>
            css : .auth h1 {color: 'green'}
            So in any project the most root element must have general class name so that we scoop it with that name : .auth h1 {color: 'green'}
     2 - CSS Coming from a component library or CSS library (bootstrap, material UI)
        * Use a component library that does css-in-js
        * Manually build your css library and apply namespacing techniques to it

     # Class Name Collision
        Two different projects using the same  css-in-js library. Any time this happens you might get class name collision in PRODUCTION.

    # SOLUTION for Class Name Collision in PRODUCTION
        when push code in production rather than give ou css-in-js library to randomly generated classes for us we will have different class name with differences when it is generated.
        In our case we are using material UI
        so we do in app.js:
        // When starting building the application for production rather than generate classes like jss1 or jss2, generate classes with 'ma'
        const generateClassName = createGenerateClassName({
        productionPrefix: 'ma'
        }) and we provide it to our <StylesProvider generateClassName={generateClassName}></StylesProvider>


# ROUTING in micro frontend

    ## Inflexible Requirement #1
        Both the container + Individual SubApps need routing features

        Users can navigate around to different sub-apps using routing logic build into the container

        Users can navigate around in a subapp using routing logic build into the sub-app itself

        Not all sub-apps will require routing features

    ## Inflexible Requirement #2
        SUB APPS might need to add in new pages/routes all the time

        New routes added to sub-apps should not require a redeployment of the container.

    ## Inflexible Requirement #3
        We might need to show two or more microFrontends at the same time

        This will occur all the time if we have some kind of sidebar nav that is built as a separate micro-frontend (when having persistent data on the screen).
    
    ## Inflexible Requirement #4
        We want to use off-the-shelf routing solutions

        Building a routing library can hard - we dont't want to author a new one

        Some amount of custom coding is OK
        
    ## Inflexible Requirement #5
        We nned navigation feature for sub apps in both hosted mode and an in isolation

        Developing for each environment should be easy - a developer should immediately be able to see what path the are visiting.

    Inflexible Requirement #6
        If different apps need to communicate information about routing, it should be done in as generic a fashion as possible

        Each app might be using a completely different navigation framework

        We might be swap out or upgrade navigation libraries all the time - should not require a  rewrite of the rest of the app.

# A Few Solution ROUTING in micro frontend for our application

    # 1 Both the container + the individual SubApps need routing features

        ### Container:::REACT-ROUTER =======> Marketing:::: REACT-ROUTER 
          The container and each sub app can optionally have a routing library 


    # 2 Sub apps might need to add in new pages/routes all the times
      
        Containers routing will be used to decide which microfrontend to show
        ### CONTAINER
            / =====> MARKETING
            /pricing =====> MARKETING
            /auth =====> AUTH
            / dashboard =====> DASHBOARD

        Marketing router used to decide wich page to show
        ### MARKETING
            / =====> Landing
            /pricing =====> Pricing

    # 3 We might need to show two or more microfrontends at the same time

        Container's routing will be used to decide which microfrontend to show
        ### CONTAINER
        / =====> MARKETING + PRICING


# Routing libraries decide what content to show on the screen.
    ## HISTORY ===> Object to get and set the current path the user is visiting
        ### Browser History => Look at the path portion of the url (everything after the domain) to figure out what the current path is
        ### Memory or Abstract History => Keep track of the current path in memory
    ## ROUTER ====> Shows different content based on the current path.

# IN OUR APPLICATION WE 'll be using this :
    ## CONTAINER ====> React-Router using BROWSER HISTORY
    ## MARKETING ====> React-Router using MEMORY HISTORY
    ## AUTH ====> React-Router using MEMBER HISTORY

# Communication about routing between Container and SubApp! It should be done in as generic way as possible

    ## User cliks link governed by CONTAINER(BrowserHistory) ===> Communicate change DOWN to Marketing ==> Marketing's Memory History should update it's current path

    ## User cliks link governed by MARKETING(MemoryHistory) ===> Communicate change UP to Container ==> Container's BrowserHistory should update it's current path
