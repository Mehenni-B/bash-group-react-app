import HttpClient from "../services/HttpClient";

type FileType = {
    number: number,
    file: File,
}
type StoreOrderType = {
    service_id: number,
    government_id: File,
    commercial_register: File,
    financial_certificate: File,
    name?: string,
    email?: string,
    phone?: string,
    birth_date?: string,
    gender?: 'M' | 'F',
    tin_number?: number,
    country?: string,
    city?: string,
    note?: string,
    files: FileType[],
};

type OrderCollectionType = {
    total: number,
    count: number,
    per_page: number,
    currentPage: number,
    lastPage: number,
    totalPages: number,
    previousPageUrl?: string,
    nextPageUrl?: string,
    not_paid_count: number,
    pending_count: number,
    accepted_count: number,
    finished_count: number,
    canceled_by_client_count: number,
    canceled_by_admin_count: number,
    orders: OrderType[],
}

type OrderType = {
    id: number,
    administration_name_ar: string,
    service_name_ar: string,
    service_name_en: string,
    status: string,
    total_price: string,
    created_at: string,

    user_name: string,
    user_phone: string,
    user_email: string,
    fees: string,
    tax: string,
    execution_days: string,
    government_fees: string,
    files: {
        id: number,
        name_ar: string,
        name_en: string,
        path: string,
        status: string
    }[],
}

type FetchOrderListType = {
    page?: number,
    query?: string,
    orderBy?: 'date' | 'price',
    sortingMethod?: 'desc' | 'asc',
};

const multipartConfig = {
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'multipart/form-data',
    },
    withCredentials: true
}

class Order {
    public static store = async (data: any) => {
        return HttpClient.post('/order/store', data, multipartConfig);
    }

    public static getList = async (data: FetchOrderListType) => {
        return HttpClient.get(`/order/list?page=${data.page ?? 1}&&query=${data.query ?? ""}&&orderBy=${data.orderBy ?? "date"}&&sortingMethod=${data.sortingMethod ?? "desc"}`);
    }

    public static getDetails = async (orderId: number) => {
        return HttpClient.get(`/order/${orderId}`);
    }
}

export { type StoreOrderType, type OrderCollectionType, type OrderType, type FetchOrderListType };

export default Order;