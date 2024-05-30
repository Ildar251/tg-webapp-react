const tg = window.Telegram.WebApp;

export function  useTelegram(params) {

    const MainButton = () => {
        tg.MainButton.show();
    }

    return {
        tg,
        MainButton,
        user: tg.initDataUnsafe?.user,
    }
}