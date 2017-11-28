export default class RedirectService {

    redirectTo(location) {
        window.location.assign(`#${location}`);
    }
}