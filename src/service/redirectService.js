class RedirectService {

    redirectTo(location) {
        window.location.assign(`#${location}`);
    }
}

export const redirectService = new RedirectService();