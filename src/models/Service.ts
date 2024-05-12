import HttpClient from "../services/HttpClient";

type ServiceType = {
    id: number,
    name_ar: string,
    name_en: string,
    administration_name_ar: string,
    administration_name_en: string,
    description_ar: string,
    description_en: string,
    fees: string,
    government_fees: string,
    tax: string,
    execution_days: string,
    number: string,
    period_type_fk: string,
    target_fk: string,
    channel_fk: string,
    details?: {
        name_ar: string,
        name_en: string,
    }[],
    docs?: {
        id: number,
        name_ar: string,
        name_en: string,
    }[],
    notes?: {
        name_ar: string,
        name_en: string,
    }[],
    conditions?: {
        name_ar: string,
        name_en: string,
    }[],
};

class Service {

    public static getList = async (administrationId: number) => {
        return HttpClient.get(`/service/list/${administrationId}`);
    }

    public static getDetails = async (serviceId: number) => {
        return HttpClient.get(`/service/details/${serviceId}`);
    }
}

export { type ServiceType };

export default Service;