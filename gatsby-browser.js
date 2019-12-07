exports.shouldUpdateScroll = ({
    routerProps: {
        location
    },
    getSavedScrollPosition,
}) => {
    if (location.action === 'PUSH') {
        window.scrollTo(0, 0)
    } else {
        const savedPosition = getSavedScrollPosition(location)
        window.scrollTo(...(savedPosition || [0, 0]))
    }
    return false
}


const embedClasses = [
    `.twitter-tweet`,
    `.twitter-timeline`,
    `.twitter-follow-button`,
    `.twitter-share-button`,
].join(`,`)

exports.onRouteUpdate = () => {
    // If there's an embedded element, lazy-load the twitter script (if it hasn't
    // already been loaded), and then run the twitter load function.
    if (document.querySelector(embedClasses) !== null) {

        if (
            typeof twttr !== `undefined` &&
            window.twttr.widgets &&
            typeof window.twttr.widgets.load === `function`
        ) {
            window.twttr.widgets.load()
        }
    }
}
