class RedirectService {

    redirectTo(location) {
        window.location.replace(`#${location}`);
    }
}

export default RedirectService;