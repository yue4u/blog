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