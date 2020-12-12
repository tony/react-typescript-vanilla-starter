See also: https://github.com/tony/vue-typescript-vanilla-starter

Split off of https://github.com/tony/cv v2 in the initial stages

MIT licensed. Feel free to copy, fork, etc.

Summary
-------
Dev server, typed webpack config, typescript, jsx, babel.

No SASS/SCSS/LESS. No static files. Wiring those in are highly dependent on
integration.

Usage
-----

.. code-block:: bash
   
   npm install  # install packages

   npm run start  # launch + hot reloading + watch file changes http://localhost:3099

   npm run build  # build to dist/

Environmental variables
"""""""""""""""""""""""

`Webpack's environmental variables`_ can be passed (``--env``):

``npm run start -- --env.devServerPort 3082``, build + watch at http://localhost:3082

``npm run start -- --env.production``

``npm run start -- --open``  Launch browser + build + watch files, http://localhost:3099

.. _Webpack's environmental variables: https://webpack.js.org/guides/environment-variables/

Contribution guidelines
-----------------------
Corrections: ✔️

Package updates: ✔️ (*please QA to verify build output / watch / reloading works*)

CI System: ✔️  (*get travis setup*)

New feature / Loader: 🚫  (*please create a fork!*)

Weakness of most starters (e.g. create-react-app):
--------------------------------------------------
- Opaque: No way to see the innards of what's being built

  Even ``npm run eject`` shows tons of macro code that resembles nothing
  like what a webpack config would look like on a project.
- Labyrinthian: Tons of stuff to remove, overlapping dependencies. Many things
  of which aren't being used. 

  *package.json* riddled with stuff you don't even know they're for.

  You'll then go out and find starters in github repos to find they
  add tons of specialized stuff that wouldn't fit your unique integration.
  You don't want jest, or wouldn't integrate it they way they do.

  Same thing. *package.json* is like Windows' *services.msc* - everything
  sounds important, but you're probably not using half of them.

  You're really not much better off than you were with an ejected
  ``create-react-app``. It's faster to just start anew and add what you want.

  But a scratch project with webpack and react is actually hard:
  
  Webpack, ts-loader, babel, webpack-dev-server, so on. There's so many
  projects to synthesize and all their usages every 3 months. You have
  to drop by each project, see the minimal example, and hope they fit
  and you can get a *basic build*

That's all this is.
