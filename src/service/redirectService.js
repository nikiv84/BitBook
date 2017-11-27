class RedirectService {

    redirectTo(location) {
        window.location.assign(`#${location}`);
    }
}

export default RedirectService;