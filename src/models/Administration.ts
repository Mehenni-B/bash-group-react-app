import HttpClient from "../services/HttpClient";

type AdministrationType = {
    id: number,
    name_ar: string,
    name_en: string,
};

class Administration {
    static TTL = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

    public static getList = async () => {
        return HttpClient.get('/administration/list');
    }
}

export { type AdministrationType };

export default Administration;