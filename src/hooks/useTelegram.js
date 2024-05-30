const tg = window.Telegram.WebApp;

export function  useTelegram(params) {

    return {
        tg,
        user: tg.initDataUnsafe?.user,
    }
}