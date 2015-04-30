# SMC_roots-ualib-child
Sanford Media Center's "child" theme of the roots-ualib WordPress theme

## What's different from roots-ualib theme?
1. SASS instead of LESS support
2. Build CSS is `assets/css/smc.css`
3. No `grunt build` support. **Only** `grunt dev` and `grunt watch` (the default task points to `dev` so `grunt` works as well)
    * Production build tasks will be implemented later on.
    
## Activating the theme
When activating the theme in WordPress, select `No` for options *Create navigation menu?* and *Add pages to menu?*

## Updating the theme
After testing theme changes, but before committing them, use the `grunt bump` task to update the theme's version. This will allow other build scripts to know when the theme has been updated.

`grunt bump` follows the [semantic versioning](http://semver.org/) convention.

Given a version number 1.2.3, increment the:

1. MAJOR version when you make incompatible API changes - `grunt bump:major`
2. MINOR version when you add functionality in a backwards-compatible manner - `grunt bump:minor`
3. PATCH version when you make backwards-compatible bug fixes - `grunt bump`
Additional labels for pre-release and build metadata are available as extensions to the MAJOR.MINOR.PATCH format.

## roots-ualib dependencies
This theme has `roots-ualib` as a bower dependency and an `update-ualib` grunt task that will copy the needed `roots-ualib` styles, javascripts, and WordPress templates.

`grunt update-ualib` will update the following:
*CSS*
* `assets/css/main.css`
* `assets/css/main.css.map`
 
*Javascript*
* `assets/js/scripts.js`
    
*WordPress Templates*
* `templates/*.php`

### Updating roots-ualib dependencies
When `roots-ualib` repo is updated, just run these commands:

```Shell
bower update
grunt update-ualib
```



