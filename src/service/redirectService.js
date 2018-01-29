class RedirectService {

    redirectTo(location) {
<<<<<<< HEAD
        window.location.assign(`${location}`);
=======
        window.location.assign(`#${location}`);
>>>>>>> fde72efd108d318247f21039197bc7e8e31a0ce3
    }
}

export const redirectService = new RedirectService();